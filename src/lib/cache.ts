import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DIR = ".cache";
const TTL = 6 * 60 * 60 * 1000; // 6h — a portfolio does not need fresher.

const key = (url: string) =>
  join(DIR, createHash("sha1").update(url).digest("hex").slice(0, 16) + ".json");

async function readCache(file: string) {
  try {
    return JSON.parse(await readFile(file, "utf8")) as {
      at: number;
      body: string;
    };
  } catch {
    return null;
  }
}

/**
 * Fetch with an on-disk cache. Unauthenticated GitHub allows 60 requests/hour
 * per IP and the dev server re-renders on every reload, which exhausts that in
 * minutes. On a failed request we fall back to stale cache rather than break
 * the page — set GITHUB_TOKEN to raise the limit to 5000/hour.
 */
export async function cachedFetch(url: string, init?: RequestInit) {
  const file = key(url);
  const hit = await readCache(file);
  if (hit && Date.now() - hit.at < TTL) return hit.body;

  const headers: Record<string, string> = { ...(init?.headers as any) };
  if (url.startsWith("https://api.github.com/") && process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  let res: Response | null = null;
  try {
    res = await fetch(url, { ...init, headers });
  } catch {
    // Network down — handled below.
  }

  if (!res?.ok) {
    if (hit) {
      console.warn(
        `[fetch] ${url} -> ${res ? res.status : "network error"}, using stale cache`,
      );
      return hit.body;
    }
    throw new Error(
      `${url} -> ${res ? res.status : "network error"}` +
        (res?.status === 403 ? " (rate limited; set GITHUB_TOKEN)" : ""),
    );
  }

  const body = await res.text();
  await mkdir(DIR, { recursive: true });
  await writeFile(file, JSON.stringify({ at: Date.now(), body }));
  return body;
}
