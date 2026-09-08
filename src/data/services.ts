import type { Service } from "../types";

export const services: Service[] = [
  {
    title: "Backend architecture",
    body: "APIs and data models designed for fault tolerance from day one, not bolted on after the first outage. Clean schema design, sane boundaries, and systems that don't collapse under their own complexity six months later.",
    tags: ["Node.js", "TypeScript", "Go", "Python"],
  },
  {
    title: "Infrastructure & delivery",
    body: "Containerized infrastructure that deploys without downtime, real-time PostgreSQL replication for zero data loss, and CI/CD that doesn't require a prayer before every release.",
    tags: ["Docker", "PostgreSQL", "CI/CD", "Linux"],
  },
  {
    title: "Engineering leadership",
    body: "Fractional CTO work: turning a demo into a product, setting technical direction, and building the review and observability habits a team needs before it doubles in size.",
    tags: ["Architecture review", "Team scaling", "Observability"],
  },
];
