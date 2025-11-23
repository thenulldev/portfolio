import { useState, useEffect, useCallback } from 'react';

interface UseApiDataOptions {
  refreshInterval?: number;
  timeout?: number;
}

interface UseApiDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
}

const cache: Record<string, { data: unknown; timestamp: number; promise?: Promise<unknown> }> = {};

export function useApiData<T>(
  endpoint: string,
  options: UseApiDataOptions = {}
): UseApiDataReturn<T> {
  const { refreshInterval = 300000, timeout = 15000 } = options;

  const [data, setData] = useState<T | null>(() => {
    const cached = cache[endpoint];
    if (cached && Date.now() - cached.timestamp < refreshInterval) {
      return cached.data as T;
    }
    return null;
  });

  const [loading, setLoading] = useState(() => {
    const cached = cache[endpoint];
    return !(cached && Date.now() - cached.timestamp < refreshInterval);
  });

  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    const cached = cache[endpoint];
    return cached ? new Date(cached.timestamp) : null;
  });

  const fetchData = useCallback(async (force = false) => {
    // If we have fresh data in cache and not forcing refresh, don't fetch
    if (!force) {
      const cached = cache[endpoint];
      if (cached && Date.now() - cached.timestamp < refreshInterval) {
        setData(cached.data as T);
        setLoading(false);
        setLastUpdated(new Date(cached.timestamp));
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      // Check for existing in-flight request
      if (cache[endpoint]?.promise) {
        const responseData = await cache[endpoint].promise;
        setData(responseData as T);
        setLastUpdated(new Date());
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const fetchPromise = (async () => {
        try {
          const response = await fetch(endpoint, {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return await response.json();
        } finally {
          // Clear promise from cache when done (success or failure)
          if (cache[endpoint]) {
            cache[endpoint].promise = undefined;
          }
        }
      })();

      // Store promise in cache
      if (!cache[endpoint]) {
        cache[endpoint] = { data: null, timestamp: 0, promise: fetchPromise };
      } else {
        cache[endpoint].promise = fetchPromise;
      }

      const jsonResponse = await fetchPromise;

      // Update cache data
      cache[endpoint] = {
        data: jsonResponse,
        timestamp: Date.now(),
        promise: undefined
      };

      setData(jsonResponse as T);
      setLastUpdated(new Date());

    } catch (err) {
      console.error(`Error fetching data from ${endpoint}:`, err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [endpoint, timeout, refreshInterval]);

  useEffect(() => {
    fetchData();

    if (refreshInterval > 0) {
      const interval = setInterval(() => fetchData(true), refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: () => fetchData(true),
  };
}
