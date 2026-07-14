import { fetchCertificationsServer } from "@/lib/certifications-server";
import CertificationGrid from "./CertificationGrid";
import type { Root } from "@/types";

/**
 * Server Component for the certification grid.
 *
 * Fetches the cert list during SSR/ISR, processes it through the
 * shared `processCertifications` (so behavior matches the client
 * hook exactly), and emits the grid markup. Returns the processed
 * list as well so the client parent can compute its issuer list
 * without a second network round-trip.
 *
 * Why this lives separately:
 *   - Forces a clear boundary between "server-rendered content"
 *     and "client-enhanced behavior". Mixing the two in one file
 *     pushes `"use client"` everywhere and defeats the win.
 *   - Easier to test the SSR output in isolation if needed.
 */
export default async function CertificationsServer(): Promise<{
  certs: Root[];
  grid: React.JSX.Element;
}> {
  const certs = await fetchCertificationsServer();
  const grid = <CertificationGrid certifications={certs} />;
  return { certs, grid };
}
