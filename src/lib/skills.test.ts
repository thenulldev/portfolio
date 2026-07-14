import test from "node:test";
import assert from "node:assert/strict";
import { processCertifications } from "./skills";
import type { Root } from "@/types";

/**
 * Tests for processCertifications.
 *
 * Historically this function dropped data via two silent bugs:
 *   - skills.slice(0, 5) per cert
 *   - .filter(!name.toLowerCase().includes("comptia"))
 *
 * The tests below pin both behaviors down. If anyone reintroduces
 * either bug, the suite fails.
 */

const SAMPLE_SKILL_NAMES = [
  "Penetration Testing",
  "CompTIA PenTest+",
  "Linux",
  "Bash",
  "Python",
  "Networking",
  "Cryptography", // past the old slice(0, 5) boundary
];

/**
 * Build a Root-shaped cert fixture. Only the fields the processor
 * actually inspects are required; everything else is stubbed by
 * the `as unknown as Root` cast.
 */
function cert(opts: {
  id?: string;
  issued_at_date?: string;
  expires_at_date?: string | null;
  skills?: string[];
} = {}): Root {
  return {
    id: opts.id ?? "1",
    issued_at_date: opts.issued_at_date ?? "2024-01-01",
    expires_at_date: opts.expires_at_date ?? null,
    issuer: { entities: [{ entity: { name: "Sample Issuer" } }] },
    badge_template: {
      skills: (opts.skills ?? SAMPLE_SKILL_NAMES).map((name) => ({ name })),
    },
  } as unknown as Root;
}

test("includes every skill from every cert (no slice loss)", () => {
  const out = processCertifications({ data: [cert()] });

  assert.equal(
    out.skills.length,
    SAMPLE_SKILL_NAMES.length,
    `expected ${SAMPLE_SKILL_NAMES.length} skills, got ${out.skills.length}: ${out.skills
      .map((s) => s.name)
      .join(", ")}`
  );

  assert.ok(
    out.skills.find((s) => s.name === "Cryptography"),
    "Cryptography was dropped (slice(0,5) regression)"
  );
});

test("preserves legitimate CompTIA skill names (no substring filter)", () => {
  const out = processCertifications({ data: [cert()] });

  assert.ok(
    out.skills.find((s) => s.name === "CompTIA PenTest+"),
    "CompTIA PenTest+ was dropped (substring filter regression)"
  );

  assert.equal(
    out.skillCounts["CompTIA PenTest+"],
    1,
    "CompTIA PenTest+ count is wrong"
  );
});

test("preserves skill order determined by cert date (newest first)", () => {
  const out = processCertifications({
    data: [
      // Newer cert is iterated first; its skills become index 0..n.
      cert({
        id: "later",
        issued_at_date: "2025-01-01",
        skills: ["Newer Only", "Penetration Testing"],
      }),
      cert({ id: "earlier", issued_at_date: "2024-01-01" }),
    ],
  });

  // Certifications are sorted newest-first.
  assert.equal(out.certifications[0].id, "later");
  assert.equal(out.certifications[1].id, "earlier");

  // Newest cert's first-listed skill comes first.
  assert.equal(out.skills[0].name, "Newer Only");
  // The rest come from whichever cert supplied them.
  assert.ok(out.skills.find((s) => s.name === "Penetration Testing"));
  assert.ok(out.skills.find((s) => s.name === "Cryptography"));
});

test("filters expired certifications", () => {
  const out = processCertifications({
    data: [
      cert({
        id: "expired",
        issued_at_date: "2022-01-01",
        expires_at_date: "2023-01-01",
        skills: ["Expired Skill"],
      }),
      cert({ id: "active" }),
    ],
  });

  const ids = out.certifications.map((c) => c.id);
  assert.deepEqual(ids, ["active"]);
  assert.ok(
    !out.skills.find((s) => s.name === "Expired Skill"),
    "expired cert's skills leaked into the count"
  );
});

test("treats null and undefined expires_at_date as non-expiring", () => {
  const out = processCertifications({
    data: [
      cert({ expires_at_date: null, skills: ["A"] }),
      cert({ expires_at_date: undefined, skills: ["B"] }),
    ],
  });

  assert.equal(out.certifications.length, 2);
  assert.ok(out.skills.find((s) => s.name === "A"));
  assert.ok(out.skills.find((s) => s.name === "B"));
});

test("counts how many certs contributed each skill", () => {
  const out = processCertifications({
    data: [
      cert({ id: "a", skills: ["Linux", "Bash"] }),
      cert({ id: "b", skills: ["Linux", "Python"] }),
      cert({ id: "c", skills: ["Linux"] }),
    ],
  });

  assert.equal(out.skillCounts["Linux"], 3);
  assert.equal(out.skillCounts["Bash"], 1);
  assert.equal(out.skillCounts["Python"], 1);
});

test("deduplicates skills across multiple certifications", () => {
  const out = processCertifications({
    data: [
      cert({ id: "a", skills: ["A", "B"] }),
      cert({ id: "b", skills: ["B", "C"] }),
    ],
  });

  // The ordering reflects cert date (a first, then b); within each
  // cert, skills appear in their input order.
  const names = out.skills.map((s) => s.name);
  assert.deepEqual(names, ["A", "B", "C"]);
});

test("handles empty input", () => {
  const out = processCertifications({ data: [] });
  assert.deepEqual(out.certifications, []);
  assert.deepEqual(out.skills, []);
  assert.deepEqual(out.skillCounts, {});
});

test("handles certs with zero skills", () => {
  const out = processCertifications({
    data: [
      cert({ id: "no-skills", skills: [] }),
      cert({ id: "with-skills" }),
    ],
  });

  // Empty-skills certs are still kept; they just don't add to counts.
  assert.equal(out.certifications.length, 2);
  assert.equal(out.skills.length, SAMPLE_SKILL_NAMES.length);
});

test("requires a data array (caller contract)", () => {
  // The function trusts its input shape; only callers passing real
  // arrays from /api/certifications should invoke it. Document that
  // contract by asserting the failure mode here.
  assert.throws(() =>
    processCertifications(
      // @ts-expect-error — by design
      { data: null }
    )
  );
  assert.throws(() =>
    processCertifications(
      // @ts-expect-error — by design
      {}
    )
  );
});
