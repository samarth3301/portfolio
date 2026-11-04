const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const parse = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return { y, m: m - 1 };
};

const label = (ym: string) => {
  const { y, m } = parse(ym);
  return `${MONTHS[m]} ${y}`;
};

const currentMonth = (now: Date) =>
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

/** Inclusive of both endpoint months, matching LinkedIn's tenure maths. */
export const months = (start: string, end: string | null, now = new Date()) => {
  const a = parse(start);
  const b = parse(end ?? currentMonth(now));
  return Math.max(1, (b.y - a.y) * 12 + (b.m - a.m) + 1);
};

export const formatDuration = (total: number) => {
  const y = Math.floor(total / 12);
  const m = total % 12;
  const parts = [];
  if (y) parts.push(`${y} ${y === 1 ? "yr" : "yrs"}`);
  if (m || !y) parts.push(`${m} ${m === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
};

export const formatPeriod = (start: string, end: string | null) =>
  `${label(start)} - ${end ? label(end) : "Present"}`;
