import assert from "node:assert/strict";
import test from "node:test";
import { formatDuration, formatPeriod, months } from "./tenure.ts";

const now = new Date("2026-11-05T00:00:00Z");

test("tenure", () => {
  assert.equal(months("2026-10", null, now), 2);
  assert.equal(months("2024-02", "2024-10", now), 9);
  assert.equal(months("2021-10", "2024-06", now), 33);
  assert.equal(formatDuration(33), "2 yrs 9 mos");
  assert.equal(formatDuration(1), "1 mo");
  assert.equal(formatDuration(24), "2 yrs");
  assert.equal(formatPeriod("2026-10", null), "Oct 2026 - Present");
  assert.equal(formatPeriod("2025-10", "2025-12"), "Oct 2025 - Dec 2025");
});
