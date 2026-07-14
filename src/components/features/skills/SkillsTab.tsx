import { fetchCertificationsServer } from "@/lib/certifications-server";
import SkillsAndCertifications from "./SkillsAndCertifications";

/**
 * Server Component wrapper for the Skills tab. Fetches the cert list
 * during SSR/ISR, seeds SkillsAndCertifications (the Client Component
 * child that owns filter+dialog state) with the data as a prop, and
 * lets the client render those interactive bits on top of the
 * already-populated grid.
 *
 * Effect:
 *   - Initial HTML response now contains the cert list, names,
 *     issuers, dates, and skills (visible to crawlers and link
 *     preview unfurlers).
 *   - No "Loading your professional profile…" flash on first paint.
 *   - No hydration mismatch because the client uses the same
 *     processor output the server did.
 */
export default async function SkillsTab(): Promise<React.JSX.Element> {
    const initialCerts = await fetchCertificationsServer();
    return <SkillsAndCertifications initialCerts={initialCerts} />;
}
