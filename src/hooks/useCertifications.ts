import { useData } from "./useData";
import type { Root } from "@/types";
import { processCertifications, ProcessedCerts } from "@/lib/skills";

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

// Type re-export for callers who imported it from this module path.
export type { ProcessedCerts };
