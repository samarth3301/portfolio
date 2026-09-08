import { cachedFetch } from "../cache";
import { readableBrand } from "./brand";
import { PINNED, LOCAL, cdnUrl } from "./sources";
import type { Icon, WithIcon } from "../../types";

const EMPTY: Icon = { svg: null, brandDark: null, brandLight: null };
const BRAND_FILL = /fill="(#[0-9a-fA-F]{6})"/;

const memo = new Map<string, Icon>();

/**
 * Strips the hardcoded fill and title so the glyph inherits currentColor and
 * the surrounding markup supplies the only accessible name.
 */
const normalize = (svg: string) =>
  svg
    .replace(/\sfill="[^"]*"/, "")
    .replace(/<title>.*?<\/title>/, "")
    .replace(/<svg /, '<svg fill="currentColor" aria-hidden="true" ');

/** Fetched at build time and inlined, so the page makes no runtime requests. */
export async function getIcon(slug: string): Promise<Icon> {
  const hit = memo.get(slug);
  if (hit) return hit;

  const local = LOCAL[slug];
  if (local) {
    const icon: Icon = { ...EMPTY, svg: local };
    memo.set(slug, icon);
    return icon;
  }

  let icon = EMPTY;
  try {
    const raw = await cachedFetch(PINNED[slug] ?? cdnUrl(slug));
    const brand = BRAND_FILL.exec(raw)?.[1];
    icon = {
      svg: normalize(raw),
      ...(brand ? readableBrand(brand) : { brandDark: null, brandLight: null }),
    };
  } catch {
    // Offline build: callers fall back to a text label.
  }

  memo.set(slug, icon);
  return icon;
}

export async function withIcons<T extends { icon: string }>(
  items: T[],
): Promise<WithIcon<T>[]> {
  return Promise.all(
    items.map(async (item) => ({ ...item, ...(await getIcon(item.icon)) })),
  );
}
