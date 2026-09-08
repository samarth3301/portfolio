import { cachedFetch } from "../cache";
import { SVGL, assetUrl } from "./sources";
import type { Icon, WithIcon } from "../../types";

const EMPTY: Icon = { svg: null, svgLight: null };

const memo = new Map<string, Icon>();

/** Intrinsic size is dropped so CSS owns it; the label lives on the wrapper. */
const normalize = (svg: string) => {
  let cleaned = svg
    .replace(/<svg /, '<svg aria-hidden="true" ')
    .replace(/\s(?:width|height)="[^"]*"/g, "");
  if (!cleaned.includes("fill=") && !cleaned.includes("stroke=")) {
    cleaned = cleaned.replace(/<svg /, '<svg fill="currentColor" ');
  }
  return cleaned;
};

const fetchSvg = async (file: string) =>
  normalize(await cachedFetch(assetUrl(file)));

/** Fetched at build time and inlined, so the page makes no runtime requests. */
export async function getIcon(slug: string): Promise<Icon> {
  const hit = memo.get(slug);
  if (hit) return hit;

  const source = SVGL[slug];
  let icon = EMPTY;

  if (source) {
    try {
      icon =
        typeof source === "string"
          ? { svg: await fetchSvg(source), svgLight: null }
          : {
              svg: await fetchSvg(source.dark),
              svgLight: await fetchSvg(source.light),
            };
    } catch {
      // Offline build: callers fall back to a text label.
    }
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
