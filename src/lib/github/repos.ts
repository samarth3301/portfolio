import { api, user } from "./client";

export type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

/** Own, non-archived repos, most-starred first. */
export async function getRepos(): Promise<Repo[]> {
  const all: Repo[] = JSON.parse(
    await api(`/users/${user()}/repos?per_page=100&sort=updated`),
  );
  return all
    .filter((r) => !r.fork && !r.archived && r.name !== user())
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        Date.parse(b.pushed_at) - Date.parse(a.pushed_at),
    );
}
