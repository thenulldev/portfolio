"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

interface GhostPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  slug: string;
  author: string;
  readTime: string;
  tags: string[];
  imageUrl: string | null;
}

interface CacheEntry {
  data: GhostPost[];
  timestamp: number;
  promise?: Promise<GhostPost[]>;
}

const CACHE_KEY = 'ghost-posts';
const cache: Map<string, CacheEntry> = new Map();

interface UseGhostPostsOptions {
  refreshInterval?: number;
  staleWhileRevalidate?: boolean;
}

interface UseGhostPostsReturn {
  posts: GhostPost[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isStale: boolean;
  refetch: () => Promise<void>;
}

// Prefetch function for Ghost posts
export function prefetchGhostPosts(timeout = 15000): Promise<GhostPost[]> {
  const cached = cache.get(CACHE_KEY);
  
  if (cached?.promise) {
    return cached.promise;
  }
  
  if (cached && Date.now() - cached.timestamp < 300000) {
    return Promise.resolve(cached.data);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const promise = fetch('/api/ghost', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    signal: controller.signal,
    cache: 'force-cache',
  }).then(async (response) => {
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const posts = data.posts || [];
    
    cache.set(CACHE_KEY, {
      data: posts,
      timestamp: Date.now(),
    });
    
    return posts;
  }).catch((err) => {
    clearTimeout(timeoutId);
    throw err;
  });

  cache.set(CACHE_KEY, {
    data: [],
    timestamp: 0,
    promise,
  });

  return promise;
}

export function useGhostPosts(options: UseGhostPostsOptions = {}): UseGhostPostsReturn {
  const { 
    refreshInterval = 300000, // 5 minutes
    staleWhileRevalidate = true 
  } = options;

  const cached = cache.get(CACHE_KEY);
  const isFresh = cached && Date.now() - cached.timestamp < refreshInterval;
  const isStaleCache = cached && (Date.now() - cached.timestamp > refreshInterval / 2) && (Date.now() - cached.timestamp < refreshInterval);

  const [posts, setPosts] = useState<GhostPost[]>(() => {
    return isFresh ? cached!.data : [];
  });

  const [loading, setLoading] = useState(() => !isFresh);
  const [isStale, setIsStale] = useState(() => isStaleCache || false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    return cached ? new Date(cached.timestamp) : null;
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchPosts = useCallback(async (force = false) => {
    const currentCached = cache.get(CACHE_KEY);
    
    // If we have fresh data and not forcing refresh, don't fetch
    if (!force && currentCached && Date.now() - currentCached.timestamp < refreshInterval) {
      setPosts(currentCached.data);
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
        const postsData = await currentCached.promise;
        setPosts(postsData);
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

      const fetchPromise = fetch('/api/ghost', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
        signal: controller.signal,
      }).then(async (response) => {
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.posts || [];
      });

      // Store promise in cache
      cache.set(CACHE_KEY, {
        ...(currentCached || { data: [], timestamp: 0 }),
        promise: fetchPromise,
      });

      const postsData = await fetchPromise;

      // Update cache
      cache.set(CACHE_KEY, {
        data: postsData,
        timestamp: Date.now(),
      });

      setPosts(postsData);
      setLastUpdated(new Date());
      setIsStale(false);

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // If we have stale data, keep showing it on error
      if (staleWhileRevalidate && currentCached?.data) {
        setPosts(currentCached.data);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [refreshInterval, staleWhileRevalidate]);

  useEffect(() => {
    fetchPosts();

    // Set up visibility change listener for instant refresh when tab becomes active
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const currentCached = cache.get(CACHE_KEY);
        if (currentCached && Date.now() - currentCached.timestamp > refreshInterval) {
          fetchPosts(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Set up interval for periodic updates
    let interval: NodeJS.Timeout;
    if (refreshInterval > 0) {
      interval = setInterval(() => fetchPosts(true), refreshInterval);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (interval) clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchPosts, refreshInterval]);

  return {
    posts,
    loading,
    error,
    lastUpdated,
    isStale,
    refetch: () => fetchPosts(true),
  };
}

// Helper function to get all unique tags from posts
export function getAllTagsFromPosts(posts: GhostPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}
