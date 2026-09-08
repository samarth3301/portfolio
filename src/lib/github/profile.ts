import { api, user } from "./client";

export type GitHubProfile = {
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  html_url: string;
  hireable: boolean;
};

export async function getProfile(): Promise<GitHubProfile> {
  return JSON.parse(await api(`/users/${user()}`));
}
