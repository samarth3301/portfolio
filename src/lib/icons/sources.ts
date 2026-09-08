/**
 * Logos come from svgl.app, keyed by the slug used in src/data. A pair means
 * the logo is drawn in near-black and needs a lighter variant on dark themes.
 */
type Source = string | { light: string; dark: string };

export const SVGL: Record<string, Source> = {
  typescript: "typescript",
  python: "python",
  go: { light: "golang", dark: "golang_dark" },
  openjdk: "java",
  cplusplus: "c-plusplus",
  solidity: "solidity",
  nodedotjs: "nodejs",
  express: { light: "expressjs", dark: "expressjs_dark" },
  fastify: { light: "fastify", dark: "fastify_dark" },
  django: "django",
  springboot: "spring",
  graphql: "graphql",
  postgresql: "postgresql",
  redis: "redis",
  docker: "docker",
  nginx: "nginx",
  linux: "linux",
  git: "git",
  github: { light: "github_light", dark: "github_dark" },
  linkedin: "linkedin",
  x: { light: "x", dark: "x_dark" },
};

export const assetUrl = (file: string) => `https://svgl.app/library/${file}.svg`;
