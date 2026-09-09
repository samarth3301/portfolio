import type { APIRoute } from "astro";

// The only server-rendered route on the site. It exists because Spotify's
// token exchange needs the client secret, which must never reach a browser.
export const prerender = false;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type Track = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string | null;
  art: string | null;
  url: string | null;
  playedAt: string | null;
};

/** Spotify's shape, narrowed to the handful of fields the widget renders. */
type SpotifyItem = {
  name?: string;
  external_urls?: { spotify?: string };
  artists?: { name?: string }[];
  album?: { name?: string; images?: { url?: string }[] };
};

function shape(item: SpotifyItem, isPlaying: boolean, playedAt: string | null): Track {
  const images = item.album?.images ?? [];
  return {
    isPlaying,
    title: item.name ?? "Unknown track",
    artist: (item.artists ?? []).map((a) => a.name).filter(Boolean).join(", "),
    album: item.album?.name ?? null,
    // Images come widest-first; the last is the small thumbnail we want.
    art: images.at(-1)?.url ?? images[0]?.url ?? null,
    url: item.external_urls?.spotify ?? null,
    playedAt,
  };
}

async function getAccessToken(
  id: string,
  secret: string,
  refreshToken: string,
): Promise<string | null> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

export const GET: APIRoute = async () => {
  // Cached at the edge so a busy page doesn't hammer Spotify; 30s is well
  // inside "live" for a track that runs three minutes.
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
  };
  const silent = (reason: string) =>
    new Response(JSON.stringify({ isPlaying: false, reason }), { headers });

  const id = import.meta.env.SPOTIFY_CLIENT_ID;
  const secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

  // Unconfigured is a normal state, not an error: the widget stays hidden.
  if (!id || !secret || !refreshToken) return silent("not-configured");

  try {
    const token = await getAccessToken(id, secret, refreshToken);
    if (!token) return silent("auth-failed");

    const auth = { Authorization: `Bearer ${token}` };

    // 204 means the player is idle; 200 with a body means a track.
    const playing = await fetch(NOW_PLAYING_URL, { headers: auth });
    if (playing.status === 200) {
      const json = (await playing.json()) as {
        item?: SpotifyItem;
        is_playing?: boolean;
      };
      if (json.item) {
        return new Response(
          JSON.stringify(shape(json.item, json.is_playing !== false, null)),
          { headers },
        );
      }
    }

    // Idle: show the last thing that played instead of an empty widget.
    const recent = await fetch(RECENT_URL, { headers: auth });
    if (recent.ok) {
      const json = (await recent.json()) as {
        items?: { track?: SpotifyItem; played_at?: string }[];
      };
      const last = json.items?.[0];
      if (last?.track) {
        return new Response(
          JSON.stringify(shape(last.track, false, last.played_at ?? null)),
          { headers },
        );
      }
    }

    return silent("idle");
  } catch {
    return silent("unreachable");
  }
};
