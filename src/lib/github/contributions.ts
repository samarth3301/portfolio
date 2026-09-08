import { cachedFetch } from "../cache";
import { user } from "./client";
import type { Contributions, Day } from "../../types";

const CELL = /<td[^>]*class="ContributionCalendar-day"[^>]*>/g;
const TOOLTIP =
  /<tool-tip[^>]*for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)<\/tool-tip>/g;
const TOTAL = /([\d,]+)\s*\n?\s*contributions\s*\n?\s*in the last year/;
const attr = (tag: string, key: string) =>
  new RegExp(`${key}="([^"]+)"`).exec(tag)?.[1];

/**
 * Scrapes the same HTML endpoint github.com uses to render the calendar on a
 * profile page. The GraphQL alternative would require a personal access token
 * for what is already public data.
 */
export async function getContributions(): Promise<Contributions> {
  const html = await cachedFetch(
    `https://github.com/users/${user()}/contributions`,
    { headers: { "x-requested-with": "XMLHttpRequest" } },
  );

  // Per-day counts live in sibling <tool-tip> elements, keyed by cell id.
  const counts = new Map<string, number>();
  for (const [, id, text] of html.matchAll(TOOLTIP)) {
    counts.set(id, /^\d+/.test(text.trim()) ? parseInt(text, 10) : 0);
  }

  const days: Day[] = [];
  for (const [tag] of html.matchAll(CELL)) {
    const date = attr(tag, "data-date");
    if (!date) continue;
    days.push({
      date,
      level: Number(attr(tag, "data-level") ?? 0),
      count: counts.get(attr(tag, "id") ?? "") ?? 0,
    });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));

  const total =
    Number(TOTAL.exec(html)?.[1]?.replace(/,/g, "")) ||
    days.reduce((sum, d) => sum + d.count, 0);

  return { days, total };
}
