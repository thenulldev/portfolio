import { useData } from "./useData";
import type { Root } from "@/types";

export interface ProcessedCerts {
  certifications: Root[];
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
}

function processCertifications(response: { data: Root[] }): ProcessedCerts {
  const dataArray = response.data;
  const validData = dataArray
    .filter(
      (item) =>
        !item.expires_at_date || new Date(item.expires_at_date) >= new Date()
    )
    .sort(
      (a, b) =>
        new Date(b.issued_at_date).getTime() -
        new Date(a.issued_at_date).getTime()
    );

  // Include every skill from every (non-expired) certification. The previous
  // implementation silently dropped data in two ways:
  //   - slice(0, 5) capped each cert to its first 5 skills, hiding the rest
  //     from the radar and the count totals
  //   - substring filtering on "comptia" dropped legitimate CompTIA skill
  //     names (e.g. "CompTIA Security+", "CompTIA PenTest+") because they
  //     happened to be in a cert's tag list
  // O(n) dedup preserves first-seen order; counts tally contributions.
  const uniqueSkills: { name: string }[] = [];
  const counts: { [name: string]: number } = {};

  for (const cert of validData) {
    for (const skill of cert.badge_template.skills) {
      if (counts[skill.name] === undefined) {
        uniqueSkills.push({ name: skill.name });
        counts[skill.name] = 0;
      }
      counts[skill.name] += 1;
    }
  }

  return {
    certifications: validData,
    skills: uniqueSkills,
    skillCounts: counts,
  };
}

export interface UseCertificationsReturn {
  certifications: Root[];
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isStale: boolean;
  refetch: () => void;
}

export function useCertifications(): UseCertificationsReturn {
  const { data, loading, error, lastUpdated, isStale, refetch } =
    useData<{ data: Root[] }, ProcessedCerts>("/api/certifications?v=2", {
      transform: processCertifications,
      ttlMs: 60 * 60 * 1000, // 1 hour — certs change frequently
    });

  return {
    certifications: data?.certifications ?? [],
    skills: data?.skills ?? [],
    skillCounts: data?.skillCounts ?? {},
    loading,
    error,
    lastUpdated,
    isStale,
    refetch,
  };
}
