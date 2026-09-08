import type { StackGroup } from "../types";

/** "Top skills" as listed on the LinkedIn profile. */
export const topSkills = ["Blockchain", "Python", "Server-Side Programming"];

export const stack: StackGroup[] = [
  {
    group: "Languages",
    items: [
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
      { name: "Go", icon: "go" },
      { name: "Java", icon: "openjdk" },
      { name: "C++", icon: "cplusplus" },
      { name: "Solidity", icon: "solidity" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "Fastify", icon: "fastify" },
      { name: "Django", icon: "django" },
      { name: "Spring Boot", icon: "springboot" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    group: "Data & Infra",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
      { name: "Docker", icon: "docker" },
      { name: "Nginx", icon: "nginx" },
      { name: "Linux", icon: "linux" },
      { name: "Git", icon: "git" },
    ],
  },
];
