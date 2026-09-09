import { getRepos, getContributions } from "./github";
import { withIcons } from "./icons";
import { projects, stack, links } from "../data";
import type { ResolvedProject } from "../types";

/**
 * Everything the page needs, resolved once. Copy stays hand-written in
 * src/data; stars, source URLs and live links come from GitHub at build time
 * so they never go stale. The avatar is a local asset, not the GitHub one,
 * so no profile request is made.
 */
export async function loadContent() {
  const [repos, contributions] = await Promise.all([
    getRepos(),
    getContributions(),
  ]);

  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
  const work: ResolvedProject[] = projects.map((p) => {
    const repo = p.repo ? byName.get(p.repo.toLowerCase()) : undefined;
    return {
      ...p,
      url: repo?.html_url ?? null,
      stars: repo?.stargazers_count ?? 0,
      homepage: repo?.homepage || null,
    };
  });

  const [stackGroups, socials] = await Promise.all([
    Promise.all(
      stack.map(async (g) => ({ ...g, items: await withIcons(g.items) })),
    ),
    withIcons(links),
  ]);

  return { contributions, work, stackGroups, socials };
}
