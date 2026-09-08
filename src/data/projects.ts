import type { Project } from "../types";

/** Curated. Stars, source URL and homepage are merged in from GitHub. */
export const projects: Project[] = [
  {
    name: "SyncLayer",
    repo: "SyncLayer",
    blurb:
      "Near real-time PostgreSQL replication as a modular C++17 microservice. Batched writes for throughput, a health-check API exposing live database metrics, and an intentional no-DELETE policy so replication can never destroy data downstream. Published on Docker Hub.",
    tags: ["C++17", "PostgreSQL", "Docker", "CMake"],
    highlight: true,
  },
  {
    name: "Brickchain",
    repo: null,
    blurb:
      "Privacy-first real estate tokenization, built as Tech Lead in Midnight's Build Club. Backend and smart contract systems enabling fractional property ownership and shielded asset transfers through zero-knowledge cryptography.",
    tags: ["Smart contracts", "Zero-knowledge", "Midnight"],
    highlight: true,
  },
  {
    name: "Payment Simulator",
    repo: "payment-simulator",
    blurb:
      "Payment API with machine-learning fraud detection. Simulates UPI transaction flows with configurable success rates, tracks status transitions, and scores transactions in real time. Flask and PostgreSQL, containerized behind Gunicorn.",
    tags: ["Flask", "PostgreSQL", "ML", "Docker"],
  },
  {
    name: "Cow Yield Model",
    repo: "cow-yield-model",
    blurb:
      "Random forest pipeline predicting milk yield per cow from feed quality, fodder type, exercise, weather and history. Shipped end to end: EDA notebook, training pipeline, serialized model and a serving API.",
    tags: ["Python", "scikit-learn", "API"],
  },
  {
    name: "NutriVision",
    repo: "NutriVision",
    blurb:
      "AI-assisted nutrient tracking. Turns what you eat into structured nutritional data instead of another manual food diary.",
    tags: ["TypeScript", "AI"],
  },
  {
    name: "Backend boilerplates",
    repo: "expressJs-boilerplate",
    blurb:
      "Five production-shaped API starters, one per stack: Express, Fastify, GraphQL, Flask and Go. Opinionated structure, typed configuration and the wiring every service needs before feature one.",
    tags: ["Express", "Fastify", "GraphQL", "Flask", "Go"],
    more: {
      label: "All five on GitHub",
      href: "https://github.com/samarth3301?tab=repositories&q=boilerplate",
    },
  },
];
