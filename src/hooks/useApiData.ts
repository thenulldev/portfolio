import { useState, useEffect, useCallback, useRef } from 'react';

interface UseApiDataOptions {
  refreshInterval?: number;
  timeout?: number;
  staleWhileRevalidate?: boolean;
}

interface UseApiDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isStale: boolean;
  refetch: () => Promise<void>;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  promise?: Promise<T>;
}

const cache: Map<string, CacheEntry<unknown>> = new Map();

// Prefetch function that can be called before component mount
export function prefetchApiData<T>(endpoint: string, timeout = 15000): Promise<T> {
  const cached = cache.get(endpoint);
  
  if (cached?.promise) {
    return cached.promise as Promise<T>;
  }
  
  if (cached && Date.now() - cached.timestamp < 300000) {
    return Promise.resolve(cached.data as T);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const promise = fetch(endpoint, {
    method: "GET",
    headers: { "content-type": "application/json" },
    signal: controller.signal,
    // Enable HTTP caching
    cache: 'force-cache',
  }).then(async (response) => {
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    cache.set(endpoint, {
      data,
      timestamp: Date.now(),
    });
    
    return data as T;
  }).catch((err) => {
    clearTimeout(timeoutId);
    throw err;
  });

  cache.set(endpoint, {
    data: null as unknown as T,
    timestamp: 0,
    promise,
  });

  return promise;
}

export function useApiData<T>(
  endpoint: string,
  options: UseApiDataOptions = {}
): UseApiDataReturn<T> {
  const { 
    refreshInterval = 300000, // 5 minutes
    timeout = 15000,
    staleWhileRevalidate = true 
  } = options;

  const [data, setData] = useState<T | null>(() => {
    const cached = cache.get(endpoint);
    if (cached && Date.now() - cached.timestamp < refreshInterval) {
      return cached.data as T;
    }
    return null;
  });

  const [loading, setLoading] = useState(() => {
    const cached = cache.get(endpoint);
    const isFresh = cached && Date.now() - cached.timestamp < refreshInterval;
    return !isFresh;
  });

  const [isStale, setIsStale] = useState(() => {
    const cached = cache.get(endpoint);
    if (!cached) return false;
    const age = Date.now() - cached.timestamp;
    return age > refreshInterval / 2 && age < refreshInterval;
  });

  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    const cached = cache.get(endpoint);
    return cached ? new Date(cached.timestamp) : null;
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (force = false) => {
    const cached = cache.get(endpoint);
    
    // If we have fresh data and not forcing refresh, don't fetch
    if (!force && cached && Date.now() - cached.timestamp < refreshInterval) {
      setData(cached.data as T);
      setLoading(false);
      setLastUpdated(new Date(cached.timestamp));
      setIsStale(Date.now() - cached.timestamp > refreshInterval / 2);
      return;
    }

    // Stale-while-revalidate: show stale data while fetching fresh data
    if (staleWhileRevalidate && cached && Date.now() - cached.timestamp < refreshInterval * 2) {
      setIsStale(true);
      // Don't set loading to true if we have stale data
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      // Check for existing in-flight request
      if (cached?.promise) {
        const responseData = await cached.promise;
        setData(responseData as T);
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
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const fetchPromise = fetch(endpoint, {
        method: "GET",
        headers: { "content-type": "application/json" },
        signal: controller.signal,
      }).then(async (response) => {
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      });

      // Store promise in cache
      cache.set(endpoint, {
        ...(cached || { data: null as T, timestamp: 0 }),
        promise: fetchPromise,
      });

      const jsonResponse = await fetchPromise;

      // Update cache data
      cache.set(endpoint, {
        data: jsonResponse,
        timestamp: Date.now(),
      });

      setData(jsonResponse as T);
      setLastUpdated(new Date());
      setIsStale(false);

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Ignore abort errors
      }
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // If we have stale data, keep showing it on error
      if (staleWhileRevalidate && cached?.data) {
        setData(cached.data as T);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [endpoint, timeout, refreshInterval, staleWhileRevalidate]);

  useEffect(() => {
    fetchData();

    // Set up visibility change listener for instant refresh when tab becomes active
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const cached = cache.get(endpoint);
        if (cached && Date.now() - cached.timestamp > refreshInterval) {
          fetchData(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Set up interval for periodic updates
    let interval: NodeJS.Timeout;
    if (refreshInterval > 0) {
      interval = setInterval(() => fetchData(true), refreshInterval);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (interval) clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, refreshInterval, endpoint]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    isStale,
    refetch: () => fetchData(true),
  };
}

// Hook for parallel fetching of multiple endpoints
export function useMultipleApiData<T extends Record<string, unknown>>(
  endpoints: { [K in keyof T]: string },
  options: UseApiDataOptions = {}
): { [K in keyof T]: UseApiDataReturn<T[K]> } {
  const results = {} as { [K in keyof T]: UseApiDataReturn<T[K]> };
  
  for (const key of Object.keys(endpoints)) {
    const k = key as keyof T;
    // Dynamic hook dispatch within loop - intentional pattern for multiple endpoints
    results[k] = useApiData<T[typeof k]>(endpoints[k], options);
  }
  
  return results;
}

// Hook that waits for all data to load before rendering
export function useParallelApiData<T extends Record<string, unknown>>(
  endpoints: { [K in keyof T]: string },
  options: UseApiDataOptions = {}
): {
  data: { [K in keyof T]: T[K] | null };
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const endpointsRef = useRef(endpoints);
  endpointsRef.current = endpoints;
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const [data, setData] = useState<{ [K in keyof T]: T[K] | null }>({} as { [K in keyof T]: T[K] | null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const fetchedRef = useRef(false);

  const fetchAll = useCallback(async (force = false) => {
    if (!mountedRef.current) return;
    if (!force && fetchedRef.current) return;

    setLoading(true);
    setError(null);
    fetchedRef.current = true;

    const currentEndpoints = endpointsRef.current;
    const entries = Object.entries(currentEndpoints);
    const refreshInterval = optionsRef.current.refreshInterval || 300000;

    try {
      const promises = entries.map(async ([key, endpoint]) => {
        const cached = cache.get(endpoint as string);

        if (cached && Date.now() - cached.timestamp < refreshInterval) {
          return { key, data: cached.data };
        }

        const response = await fetch(endpoint as string, {
          headers: { "content-type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`HTTP error for ${key}: ${response.status}`);
        }

        const jsonData = await response.json();

        cache.set(endpoint as string, {
          data: jsonData,
          timestamp: Date.now(),
        });

        return { key, data: jsonData };
      });

      const results = await Promise.all(promises);

      const newData = {} as { [K in keyof T]: T[K] };
      results.forEach(({ key, data: d }) => {
        newData[key as keyof T] = d as T[keyof T];
      });

      if (mountedRef.current) {
        setData(newData);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    fetchAll();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchAll]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchAll(true),
  };
}
