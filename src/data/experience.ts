import type { Employer, Role } from "../types";
import { formatDuration, formatPeriod, months } from "../lib/tenure";

type RoleEntry = Omit<Role, "period" | "duration"> & {
  start: string;
  end: string | null;
};

type EmployerEntry = Omit<Employer, "period" | "roles"> & { roles: RoleEntry[] };

/** Grouped by employer, newest first. Dates are YYYY-MM; end null means present. */
const entries: EmployerEntry[] = [
  {
    org: "Inboxkit",
    url: "https://inboxkit.com",
    roles: [
      {
        title: "Software Engineer",
        start: "2026-10",
        end: null,
        type: "Full-time",
        location: "Gurugram, Haryana, India",
        blurb:
          "Building and maintaining scalable backend systems while contributing to API development, database management, and overall product performance.",
        tags: ["Backend", "APIs", "Databases"],
      },
    ],
  },
  {
    org: "Techsolace",
    url: "https://techsolace.in",
    roles: [
      {
        title: "Chief Technology Officer",
        start: "2024-10",
        end: null,
        type: "Part-time",
        location: "Jaipur, Rajasthan, India",
        blurb:
          "Company-wide technical leadership: architecting and shipping production-ready systems across TypeScript, Python, Go and Java, into scalable backend infrastructure supporting the full product and DevOps lifecycle.",
        tags: ["TypeScript", "Python", "Go", "Java", "DevOps"],
      },
      {
        title: "Back End Developer",
        start: "2024-02",
        end: "2024-10",
        type: "Full-time",
        location: "Jaipur, Rajasthan, India",
        blurb:
          "Built 20+ scalable backend applications in Node.js and Python, delivering the product portfolio that carried the company through its early growth phase.",
        tags: ["Node.js", "Python"],
      },
    ],
  },
  {
    org: "Midnight",
    url: "https://midnight.foundation",
    roles: [
      {
        title: "Tech Lead, Brickchain",
        start: "2026-02",
        end: "2026-04",
        location: null,
        blurb:
          "Selected into a limited cohort of builders in Midnight's Build Club. Architected the backend and smart contract systems for Brickchain, a privacy-first real estate tokenization platform.",
        tags: ["Smart contracts", "Zero-knowledge"],
      },
    ],
  },
  {
    org: "Major League Hacking",
    url: "https://mlh.io",
    roles: [
      {
        title: "Software Engineering Fellow",
        start: "2025-10",
        end: "2025-12",
        location: "New York, United States",
        // The source PDF repeats the Brickchain text here; replace with the real one.
        blurb:
          "Software Engineering Fellow in MLH's open-source track, working alongside a cohort of engineers on production codebases and code review practice.",
        tags: ["Open source"],
      },
    ],
  },
  {
    org: "Freelance",
    url: null,
    roles: [
      {
        title: "Back End Developer",
        start: "2021-10",
        end: "2024-06",
        location: "New Delhi, India",
        blurb:
          "Sustained multi-client delivery: designed and built 20+ dashboards and admin panels across Django, Spring Boot and Express.js, meeting varied technical and business requirements over a 2.9-year engagement.",
        tags: ["Django", "Spring Boot", "Express.js"],
      },
    ],
  },
];

const resolve = ({ roles, ...org }: EmployerEntry): Employer => {
  const spans = roles.map(({ start, end }) => ({ start, end }));
  const earliest = spans.reduce((a, b) => (a.start <= b.start ? a : b));
  const latest = spans.some((s) => s.end === null)
    ? null
    : spans.reduce((a, b) => (a.end! >= b.end! ? a : b)).end;

  return {
    ...org,
    period: formatDuration(months(earliest.start, latest)),
    roles: roles.map(({ start, end, ...role }) => ({
      ...role,
      period: formatPeriod(start, end),
      duration: formatDuration(months(start, end)),
    })),
  };
};

export const experience: Employer[] = entries.map(resolve);
