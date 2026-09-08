import { cachedFetch } from "../cache";
import { github } from "../../data/profile";

const API = "https://api.github.com";

export const api = (path: string) => cachedFetch(`${API}${path}`);

export const user = () => github.user;
