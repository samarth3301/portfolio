import type { Employer } from "../types";

/** Grouped by employer, newest first. */
export const experience: Employer[] = [
  {
    org: "Inboxkit",
    url: "https://inboxkit.com",
    period: "1 mo",
    roles: [
      {
        title: "Software Engineer",
        period: "Oct 2026 - Present",
        duration: "1 mo",
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
    period: "2 yrs 9 mos",
    roles: [
      {
        title: "Chief Technology Officer",
        period: "Oct 2024 - Present",
        duration: "2 yrs 1 mo",
        type: "Part-time",
        location: "Jaipur, Rajasthan, India",
        blurb:
          "Company-wide technical leadership: architecting and shipping production-ready systems across TypeScript, Python, Go and Java, into scalable backend infrastructure supporting the full product and DevOps lifecycle.",
        tags: ["TypeScript", "Python", "Go", "Java", "DevOps"],
      },
      {
        title: "Back End Developer",
        period: "Feb 2024 - Oct 2024",
        duration: "9 mos",
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
    period: "3 mos",
    roles: [
      {
        title: "Tech Lead, Brickchain",
        period: "Feb 2026 - Apr 2026",
        duration: "3 mos",
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
    period: "3 mos",
    roles: [
      {
        title: "Software Engineering Fellow",
        period: "Oct 2025 - Dec 2025",
        duration: "3 mos",
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
    period: "2 yrs 9 mos",
    roles: [
      {
        title: "Back End Developer",
        period: "Oct 2021 - Jun 2024",
        duration: "2 yrs 9 mos",
        location: "New Delhi, India",
        blurb:
          "Sustained multi-client delivery: designed and built 20+ dashboards and admin panels across Django, Spring Boot and Express.js, meeting varied technical and business requirements over a 2.9-year engagement.",
        tags: ["Django", "Spring Boot", "Express.js"],
      },
    ],
  },
];
