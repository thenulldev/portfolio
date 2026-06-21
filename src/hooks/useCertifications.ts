import { useData, UseDataResult } from "./useData";
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

  const allSkills = validData
    .reduce((acc: { name: string }[], item: Root) => {
      const skills = item.badge_template.skills.slice(0, 5);
      return acc.concat(skills);
    }, [])
    .filter((skill) => !skill.name.toLowerCase().includes("comptia"));

  const uniqueSkills: { name: string }[] = [];
  const counts: { [name: string]: number } = {};

  allSkills.forEach((skill) => {
    if (!uniqueSkills.find((s) => s.name === skill.name)) {
      uniqueSkills.push(skill);
    }
    counts[skill.name] = (counts[skill.name] || 0) + 1;
  });

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
    useData<{ data: Root[] }, ProcessedCerts>("/api/certifications", {
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
