import { useState, useEffect, useCallback, useRef } from "react";
import {
  getCacheEntry,
  setCacheEntry,
  isCacheFresh,
  isCacheStale,
} from "@/lib/cache";

export interface UseDataOptions<T, R = T> {
  transform?: (raw: T) => R;
  ttlMs?: number;
  timeoutMs?: number;
  staleWhileRevalidate?: boolean;
}

export interface UseDataResult<R> {
  data: R | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isStale: boolean;
  refetch: () => void;
}

/** Fetch a single endpoint with persistent cache */
export function useData<T, R = T>(
  endpoint: string | null,
  options: UseDataOptions<T, R> = {}
): UseDataResult<R> {
  const {
    transform,
    ttlMs = 24 * 60 * 60 * 1000,
    timeoutMs = 15000,
    staleWhileRevalidate = true,
  } = options;

  const cacheKey = endpoint ?? "";

  const cached = cacheKey ? getCacheEntry<R>(cacheKey) : undefined;
  const fresh = cacheKey ? isCacheFresh(cacheKey, ttlMs) : false;
  const stale = cacheKey ? isCacheStale(cacheKey, ttlMs) : false;

  const [data, setData] = useState<R | null>(() => (fresh ? cached!.data : null));
  const [loading, setLoading] = useState(() => !!endpoint && !fresh);
  const [isStale, setIsStale] = useState(() => stale || false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() =>
    cached ? new Date(cached.timestamp) : null
  );

  const abortRef = useRef<AbortController | null>(null);
  const fetchingRef = useRef(false);

  const fetchData = useCallback(
    async (force = false) => {
      if (!cacheKey) return;
      // Guard: prevent concurrent fetches
      if (fetchingRef.current && !force) return;
      fetchingRef.current = true;

      const currentCached = getCacheEntry<R>(cacheKey);
      const currentFresh = isCacheFresh(cacheKey, ttlMs);

      if (!force && currentFresh && currentCached) {
        setData(currentCached.data);
        setLoading(false);
        setLastUpdated(new Date(currentCached.timestamp));
        setIsStale(false);
        fetchingRef.current = false;
        return;
      }

      if (
        staleWhileRevalidate &&
        currentCached &&
        Date.now() - currentCached.timestamp < ttlMs * 2
      ) {
        setIsStale(true);
      } else {
        setLoading(true);
      }

      setError(null);

      try {
        if ((currentCached as any)?.promise) {
          const result = await (currentCached as any).promise;
          setData(result);
          setLastUpdated(new Date());
          setIsStale(false);
          return;
        }

        if (abortRef.current) abortRef.current.abort();

        const controller = new AbortController();
        abortRef.current = controller;
        const tid = setTimeout(() => controller.abort(), timeoutMs);

        const fetchPromise = fetch(endpoint!, {
          method: "GET",
          headers: { "content-type": "application/json" },
          signal: controller.signal,
        }).then(async (res) => {
          clearTimeout(tid);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const raw: T = await res.json();
          return transform ? transform(raw) : (raw as unknown as R);
        });

        setCacheEntry(cacheKey, {
          data: (currentCached?.data ?? null) as R,
          timestamp: currentCached?.timestamp ?? 0,
          promise: fetchPromise as Promise<unknown>,
        });

        const result = await fetchPromise;

        setCacheEntry(cacheKey, {
          data: result as unknown,
          timestamp: Date.now(),
        });

        setData(result);
        setLastUpdated(new Date());
        setIsStale(false);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Request failed");

        if (staleWhileRevalidate && currentCached?.data) {
          setData(currentCached.data);
        }
      } finally {
        setLoading(false);
        abortRef.current = null;
        fetchingRef.current = false;
      }
    },
    [cacheKey, endpoint, transform, ttlMs, timeoutMs, staleWhileRevalidate]
  );

  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }
    fetchData();

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchData, endpoint]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    isStale,
    refetch: () => fetchData(true),
  };
}

/** Fetch multiple endpoints in parallel with persistent cache */
export function useParallelData<T extends Record<string, unknown>>(
  endpoints: { [K in keyof T]: string },
  options: {
    ttlMs?: number;
    timeoutMs?: number;
  } = {}
): {
  data: { [K in keyof T]: T[K] | null };
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const { ttlMs = 24 * 60 * 60 * 1000, timeoutMs = 15000 } = options;

  const [data, setData] = useState<{ [K in keyof T]: T[K] | null }>(
    {} as { [K in keyof T]: T[K] | null }
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const fetchingRef = useRef(false);

  const endpointKey = JSON.stringify(endpoints);

  const fetchAll = useCallback(
    async (force = false) => {
      if (!mountedRef.current) return;
      // Guard: prevent concurrent fetches (React 18+ concurrent mode can fire
      // useEffect multiple times during mount before the first fetch completes)
      if (fetchingRef.current && !force) return;
      fetchingRef.current = true;
      setLoading(true);
      setError(null);

      const currentEndpoints = JSON.parse(endpointKey) as { [K in keyof T]: string };
      const entries = Object.entries(currentEndpoints) as [keyof T, string][];

      try {
        const results = await Promise.all(
          entries.map(async ([key, endpoint]) => {
            const cacheKey = endpoint;
            const cached = getCacheEntry<unknown>(cacheKey);
            const fresh = isCacheFresh(cacheKey, ttlMs);

            if (!force && fresh && cached) {
              return { key, data: cached.data };
            }

            const res = await fetch(endpoint, {
              headers: { "content-type": "application/json" },
              signal: AbortSignal.timeout(timeoutMs),
            });
            if (!res.ok) throw new Error(`${String(key)}: HTTP ${res.status}`);

            const raw = (await res.json()) as unknown;

            setCacheEntry(cacheKey, {
              data: raw,
              timestamp: Date.now(),
            });

            return { key, data: raw };
          })
        );

        const next = {} as { [K in keyof T]: T[K] | null };
        for (const { key, data: d } of results) {
          next[key] = d as T[keyof T];
        }

        if (mountedRef.current) {
          setData(next);
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(err instanceof Error ? err.message : "Request failed");
        }
      } finally {
        fetchingRef.current = false;
        if (mountedRef.current) setLoading(false);
      }
    },
    [endpointKey, ttlMs, timeoutMs]
  );

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
