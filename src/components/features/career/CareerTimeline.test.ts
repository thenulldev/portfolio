import test from "node:test";
import assert from "node:assert/strict";
import { formatDuration } from "@/components/features/career/CareerTimeline";

test("calculates a current role through the supplied current date", () => {
  assert.equal(
    formatDuration("2023-05-01", null, new Date("2026-07-24T12:00:00Z")),
    "3 yrs 2 mos",
  );
});

test("calculates completed roles through their end date", () => {
  assert.equal(
    formatDuration("2023-05-01", "2024-08-01", new Date("2026-07-24T12:00:00Z")),
    "1 yr 3 mos",
  );
});
