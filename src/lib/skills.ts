import type { Root } from "@/types";

/** Output of the certification → skill pipeline. */
export interface ProcessedCerts {
  /** Active (non-expired) certifications, newest first. */
  certifications: Root[];
  /** Unique skill names in first-seen order. */
  skills: { name: string }[];
  /** Number of active certifications that contributed each skill. */
  skillCounts: { [name: string]: number };
}

/**
 * Shape raw Credly/OffSec certification records into the UI-ready form.
 *
 * - Filters out expired certifications so they don't inflate skill counts.
 * - Sorts by `issued_at_date` descending (newest first).
 * - Includes every skill from every active cert; preserves first-seen order;
 *   tallies how many certifications contributed each skill.
 *
 * Why this lives in src/lib: it was a module-private function inside
 * useCertifications.ts but is the only piece of business logic in that
 * file. Hoisting it makes it testable from a sibling test file without
 * mocking React hooks, and stops it from being silently duplicated by
 * other data sources in the future.
 *
 * Historical bug this avoids: an earlier version did
 *     skills.slice(0, 5)
 *     .filter(!name.includes("comptia"))
 * which silently dropped data — only first 5 skills per cert counted,
 * and any skill name containing "comptia" (e.g. "CompTIA PenTest+")
 * was filtered out. Don't reintroduce either trap; the node:test
 * suite (src/lib/skills.test.ts) catches regressions.
 */
export function processCertifications(response: {
  data: Root[];
}): ProcessedCerts {
  const dataArray = response.data;

  const certifications = dataArray
    .filter(
      (item) =>
        !item.expires_at_date ||
        new Date(item.expires_at_date).getTime() >= Date.now()
    )
    .sort(
      (a, b) =>
        new Date(b.issued_at_date).getTime() -
        new Date(a.issued_at_date).getTime()
    );

  const skills: { name: string }[] = [];
  const skillCounts: { [name: string]: number } = {};

  for (const cert of certifications) {
    for (const skill of cert.badge_template.skills) {
      if (skillCounts[skill.name] === undefined) {
        skillCounts[skill.name] = 0;
        skills.push({ name: skill.name });
      }
      skillCounts[skill.name] += 1;
    }
  }

  return { certifications, skills, skillCounts };
}
