/**
 * simple-icons removed LinkedIn on brand request; pin the last version that
 * shipped it. Anything not listed here comes from the current set.
 */
export const PINNED: Record<string, string> = {
  linkedin: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/linkedin.svg",
};

/** Not brands, so drawn here rather than borrowing a browser's logo. */
export const LOCAL: Record<string, string> = {
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><ellipse cx="12" cy="12" rx="4" ry="9.2"/><path d="M3.2 9h17.6M3.2 15h17.6"/></svg>`,
};

export const cdnUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}`;
