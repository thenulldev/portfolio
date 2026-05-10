import { useState, useEffect, useCallback, useRef } from 'react';
import { Root, UseCertificationsReturn } from "@/types";

interface ProcessedData {
  certifications: Root[];
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
}

interface CacheEntry {
  data: ProcessedData;
  timestamp: number;
  promise?: Promise<ProcessedData>;
}

const CACHE_KEY = 'certifications';
const cache: Map<string, CacheEntry> = new Map();

// Prefetch function for certifications
export function prefetchCertifications(timeout = 15000): Promise<ProcessedData> {
  const cached = cache.get(CACHE_KEY);
  
  if (cached?.promise) {
    return cached.promise;
  }
  
  if (cached && Date.now() - cached.timestamp < 300000) {
    return Promise.resolve(cached.data);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const promise = fetch("/api/certifications", {
    method: "GET",
    headers: { "content-type": "application/json" },
    signal: controller.signal,
  }).then(async (response) => {
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const jsonResponse = await response.json();
    const dataArray = Array.isArray(jsonResponse) ? jsonResponse : jsonResponse.data;
    
    if (!dataArray) {
      throw new Error('No data array found in response');
    }

    // Process the data
    const validData = dataArray.filter(
      (item: Root) => !item.expires_at_date || new Date(item.expires_at_date) >= new Date()
    ).sort((a: Root, b: Root) => new Date(b.issued_at_date).getTime() - new Date(a.issued_at_date).getTime());

    const allSkills = validData.reduce((acc: { name: string }[], item: Root) => {
      const skills = item.badge_template.skills.slice(0, 5);
      return acc.concat(skills);
    }, []).filter((skill: { name: string }) => !skill.name.toLowerCase().includes('comptia'));

    const uniqueSkills: { name: string }[] = [];
    const counts: { [name: string]: number } = {};

    allSkills.forEach((skill: { name: string }) => {
      if (!uniqueSkills.find(s => s.name === skill.name)) {
        uniqueSkills.push(skill);
      }
      counts[skill.name] = (counts[skill.name] || 0) + 1;
    });

    const result = {
      certifications: validData,
      skills: uniqueSkills,
      skillCounts: counts
    };
    
    cache.set(CACHE_KEY, {
      data: result,
      timestamp: Date.now(),
    });
    
    return result;
  }).catch((err) => {
    clearTimeout(timeoutId);
    throw err;
  });

  cache.set(CACHE_KEY, {
    data: null as unknown as ProcessedData,
    timestamp: 0,
    promise,
  });

  return promise;
}

interface UseCertificationsOptions {
  refreshInterval?: number;
  staleWhileRevalidate?: boolean;
}

export function useCertifications(
  options: UseCertificationsOptions = {}
): UseCertificationsReturn {
  const { 
    refreshInterval = 300000, // 5 minutes
    staleWhileRevalidate = true 
  } = options;

  const cached = cache.get(CACHE_KEY);
  const isFresh = cached && Date.now() - cached.timestamp < refreshInterval;
  const isStaleCache = cached && (Date.now() - cached.timestamp > refreshInterval / 2) && (Date.now() - cached.timestamp < refreshInterval);

  const [certifications, setCertifications] = useState<Root[]>(() => {
    return isFresh ? cached!.data.certifications : [];
  });

  const [skills, setSkills] = useState<{ name: string }[]>(() => {
    return isFresh ? cached!.data.skills : [];
  });

  const [skillCounts, setSkillCounts] = useState<{ [name: string]: number }>(() => {
    return isFresh ? cached!.data.skillCounts : {};
  });

  const [loading, setLoading] = useState(() => !isFresh);
  const [isStale, setIsStale] = useState(() => isStaleCache || false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    return cached ? new Date(cached.timestamp) : null;
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchCertifications = useCallback(async (force = false) => {
    const currentCached = cache.get(CACHE_KEY);
    
    // If we have fresh data and not forcing refresh, don't fetch
    if (!force && currentCached && Date.now() - currentCached.timestamp < refreshInterval) {
      setCertifications(currentCached.data.certifications);
      setSkills(currentCached.data.skills);
      setSkillCounts(currentCached.data.skillCounts);
      setLoading(false);
      setLastUpdated(new Date(currentCached.timestamp));
      setIsStale(Date.now() - currentCached.timestamp > refreshInterval / 2);
      return;
    }

    // Stale-while-revalidate: show stale data while fetching fresh data
    if (staleWhileRevalidate && currentCached && Date.now() - currentCached.timestamp < refreshInterval * 2) {
      setIsStale(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      // Check for existing in-flight request
      if (currentCached?.promise) {
        const result = await currentCached.promise;
        setCertifications(result.certifications);
        setSkills(result.skills);
        setSkillCounts(result.skillCounts);
        setLastUpdated(new Date());
        setIsStale(false);
        return;
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const fetchPromise = fetch("/api/certifications", {
        method: "GET",
        headers: { "content-type": "application/json" },
        signal: controller.signal,
      }).then(async (response) => {
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        const dataArray = Array.isArray(jsonResponse) ? jsonResponse : jsonResponse.data;

        if (!dataArray) {
          throw new Error('No data array found in response');
        }

        // Process the data
        const validData = dataArray.filter(
          (item: Root) => !item.expires_at_date || new Date(item.expires_at_date) >= new Date()
        ).sort((a: Root, b: Root) => new Date(b.issued_at_date).getTime() - new Date(a.issued_at_date).getTime());

        const allSkills = validData.reduce((acc: { name: string }[], item: Root) => {
          const skills = item.badge_template.skills.slice(0, 5);
          return acc.concat(skills);
        }, []).filter((skill: { name: string }) => !skill.name.toLowerCase().includes('comptia'));

        const uniqueSkills: { name: string }[] = [];
        const counts: { [name: string]: number } = {};

        allSkills.forEach((skill: { name: string }) => {
          if (!uniqueSkills.find(s => s.name === skill.name)) {
            uniqueSkills.push(skill);
          }
          counts[skill.name] = (counts[skill.name] || 0) + 1;
        });

        return {
          certifications: validData,
          skills: uniqueSkills,
          skillCounts: counts
        };
      });

      // Store promise in cache
      cache.set(CACHE_KEY, {
        ...(currentCached || { data: null as unknown as ProcessedData, timestamp: 0 }),
        promise: fetchPromise,
      });

      const result = await fetchPromise;

      // Update cache
      cache.set(CACHE_KEY, {
        data: result,
        timestamp: Date.now(),
      });

      setCertifications(result.certifications);
      setSkills(result.skills);
      setSkillCounts(result.skillCounts);
      setLastUpdated(new Date());
      setIsStale(false);

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // If we have stale data, keep showing it on error
      if (staleWhileRevalidate && currentCached?.data) {
        setCertifications(currentCached.data.certifications);
        setSkills(currentCached.data.skills);
        setSkillCounts(currentCached.data.skillCounts);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [refreshInterval, staleWhileRevalidate]);

  useEffect(() => {
    fetchCertifications();

    // Set up visibility change listener for instant refresh when tab becomes active
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const currentCached = cache.get(CACHE_KEY);
        if (currentCached && Date.now() - currentCached.timestamp > refreshInterval) {
          fetchCertifications(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Set up interval for periodic updates
    let interval: NodeJS.Timeout;
    if (refreshInterval > 0) {
      interval = setInterval(() => fetchCertifications(true), refreshInterval);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (interval) clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchCertifications, refreshInterval]);

  return {
    certifications,
    skills,
    skillCounts,
    loading,
    error,
    lastUpdated,
    isStale,
    refetch: () => fetchCertifications(true),
  };
}
