/**
 * Server-only cert fetcher. Used by server components during SSR/ISR
 * to populate the cert grid in the initial HTML, so the list is
 * visible to crawlers and recruiters sharing the URL on LinkedIn
 * without waiting for a client-side fetch.
 *
 * Strategy:
 *   - Hit the two upstream workers (`credly.thenull.dev`,
 *     `offsec.thenull.dev`) in parallel — same calls the
 *     /api/certifications route makes. Doing it directly here
 *     avoids an in-worker loopback, which is fragile and extra
 *     latency.
 *   - Hand the raw payload to `processCertifications` (the same
 *     pure function the client hook uses) so SSR output matches
 *     client output exactly. The unit tests cover that contract.
 *   - On any error: return an empty array. The client `useCertifications`
 *     hook will retry after hydration.
 *
 * Caching:
 *   - Tagged `certifications` for on-demand revalidation (set up
 *     later via `revalidateTag('certifications')` if you wire a
 *     "new cert detected" webhook).
 *   - 1-hour revalidation matches the API route's Cache-Control.
 */

import { processCertifications } from "./skills";
import type { Root } from "@/types";

interface UpstreamCert {
  id: string;
  badge_template: {
    name: string;
    description: string;
    skills: { name: string }[];
  };
  issued_at_date: string;
  expires_at_date?: string | null;
  issuer: {
    entities: { entity: { name: string } }[];
  };
  image: { url: string };
  verification_url?: string;
}

interface UpstreamOffSecCred {
  id: string;
  name: string;
  description: string;
  outcomes?: string[];
  issuedOn: string;
  expiredOn?: string;
  issuer?: string;
  imageUrl: string;
  url: string;
}

const CREDLY_URL =
  "https://credly.thenull.dev/stephen-freerking";
const OFFSEC_URL =
  "https://offsec.thenull.dev/wallet/stephen-freerking";

const FETCH_TIMEOUT_MS = 8000;

function fetchWithCache(url: string): Promise<Response> {
  // Use Next.js's fetch cache: tagged for on-demand revalidation
  // (`revalidateTag('certifications')`), 1-hour revalidation as a
  // fallback. Renders SSG-by-default but flips to ISR if `next:`
  // options are present. The external callers (credly.thenull.dev
  // and offsec.thenull.dev) honour standard HTTP caching.
  return fetch(url, {
    next: { revalidate: 3600, tags: ["certifications"] },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: { "content-type": "application/json" },
  });
}

export async function fetchCertificationsServer(): Promise<Root[]> {
  try {
    const [credlyRes, offsecRes] = await Promise.all([
      fetchWithCache(CREDLY_URL),
      fetchWithCache(OFFSEC_URL),
    ]);

    const all: UpstreamCert[] = [];

    if (credlyRes.ok) {
      const json = await credlyRes.json();
      const arr: UpstreamCert[] = Array.isArray(json)
        ? json
        : (json?.data ?? []);
      // Credly doesn't always include verification_url; construct it.
      for (const c of arr) {
        if (!c.verification_url && c.id) {
          c.verification_url = `https://www.credly.com/badges/${c.id}/public_url`;
        }
      }
      all.push(...arr);
    }

    if (offsecRes.ok) {
      const json = await offsecRes.json();
      const credentials: UpstreamOffSecCred[] = json?.credentials ?? [];
      for (const c of credentials) {
        all.push({
          id: c.id,
          badge_template: {
            name: c.name,
            description: c.description,
            skills: (c.outcomes || []).map((o) => ({ name: o })),
          },
          issued_at_date: c.issuedOn,
          expires_at_date: c.expiredOn ?? null,
          issuer: {
            entities: [
              { entity: { name: c.issuer || "Offensive Security" } },
            ],
          },
          image: { url: c.imageUrl },
          verification_url: c.url,
        });
      }
    }

    return processCertifications({ data: all as Root[] }).certifications;
  } catch {
    // SSR must never throw on data fetch. The client hook fetches
    // /api/certifications after hydration and will retry.
    return [];
  }
}
