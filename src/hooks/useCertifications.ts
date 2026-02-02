import { useState, useEffect, useCallback } from 'react';
import { Root, UseCertificationsReturn } from "@/types";

const cache: {
  data: {
    certifications: Root[];
    skills: { name: string }[];
    skillCounts: { [name: string]: number };
  } | null;
  timestamp: number;
  promise?: Promise<{
    certifications: Root[];
    skills: { name: string }[];
    skillCounts: { [name: string]: number };
  }>;
} = {
  data: null,
  timestamp: 0
};

export function useCertifications(refreshInterval: number = 300000): UseCertificationsReturn {
  const [certifications, setCertifications] = useState<Root[]>(() => {
    if (cache.data && Date.now() - cache.timestamp < refreshInterval) {
      return cache.data.certifications;
    }
    return [];
  });

  const [skills, setSkills] = useState<{ name: string }[]>(() => {
    if (cache.data && Date.now() - cache.timestamp < refreshInterval) {
      return cache.data.skills;
    }
    return [];
  });

  const [skillCounts, setSkillCounts] = useState<{ [name: string]: number }>(() => {
    if (cache.data && Date.now() - cache.timestamp < refreshInterval) {
      return cache.data.skillCounts;
    }
    return {};
  });

  const [loading, setLoading] = useState(() => {
    return !(cache.data && Date.now() - cache.timestamp < refreshInterval);
  });

  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    return cache.data ? new Date(cache.timestamp) : null;
  });

  const fetchCertifications = useCallback(async (force = false) => {
    // If we have fresh data in cache and not forcing refresh, don't fetch
    if (!force && cache.data && Date.now() - cache.timestamp < refreshInterval) {
      setCertifications(cache.data.certifications);
      setSkills(cache.data.skills);
      setSkillCounts(cache.data.skillCounts);
      setLoading(false);
      setLastUpdated(new Date(cache.timestamp));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check for existing in-flight request
      if (cache.promise) {
        const cachedData = await cache.promise;
        setCertifications(cachedData.certifications);
        setSkills(cachedData.skills);
        setSkillCounts(cachedData.skillCounts);
        setLastUpdated(new Date());
        return;
      }

      console.log('Fetching certifications from API...');

      const fetchPromise = (async () => {
        try {
          const response = await fetch("/api/certifications", {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('API response error:', response.status, errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const jsonResponse = await response.json();
          console.log('API response received:', jsonResponse);

          const dataArray = Array.isArray(jsonResponse)
            ? jsonResponse
            : jsonResponse.data;

          if (!dataArray) {
            throw new Error('No data array found in response');
          }

          // Only keep items that haven't expired
          const validData = dataArray.filter(
            (item: Root) => !item.expires_at_date || new Date(item.expires_at_date) >= new Date()
          ).sort((a: Root, b: Root) => new Date(b.issued_at_date).getTime() - new Date(a.issued_at_date).getTime());

          console.log(`Found ${validData.length} valid certifications out of ${dataArray.length} total`);

          // Process skills
          const allSkills = validData.reduce((acc: { name: string }[], item: Root) => {
            const skills = item.badge_template.skills.slice(0, 5);
            return acc.concat(skills);
          }, []).filter((skill: { name: string }) => !skill.name.toLowerCase().includes('comptia'));

          // Create unique skills list and count occurrences
          const uniqueSkills: { name: string }[] = [];
          const counts: { [name: string]: number } = {};

          allSkills.forEach((skill: { name: string }) => {
            if (!uniqueSkills.find(s => s.name === skill.name)) {
              uniqueSkills.push(skill);
            }
            counts[skill.name] = (counts[skill.name] || 0) + 1;
          });

          console.log(`Found ${uniqueSkills.length} unique skills`);

          return {
            certifications: validData,
            skills: uniqueSkills,
            skillCounts: counts
          };
        } finally {
          cache.promise = undefined;
        }
      })();

      cache.promise = fetchPromise;
      const result = await fetchPromise;

      // Update cache
      cache.data = result;
      cache.timestamp = Date.now();

      setCertifications(result.certifications);
      setSkills(result.skills);
      setSkillCounts(result.skillCounts);
      setLastUpdated(new Date());

    } catch (err) {
      console.error('Error in fetchCertifications:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [refreshInterval]);

  useEffect(() => {
    // Initial fetch
    fetchCertifications();

    // Set up interval for periodic updates
    const interval = setInterval(() => fetchCertifications(true), refreshInterval);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [fetchCertifications, refreshInterval]);

  return {
    certifications,
    skills,
    skillCounts,
    loading,
    error,
    lastUpdated,
  };
}
