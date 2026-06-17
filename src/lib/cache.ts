// Shared cache with localStorage persistence
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  promise?: Promise<T>;
}

const MEMORY_CACHE = new Map<string, CacheEntry<unknown>>();

const CACHE_PREFIX = "portfolio_cache_";
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function storageKey(key: string): string {
  return `${CACHE_PREFIX}${key}`;
}

function loadFromStorage<T>(key: string): CacheEntry<T> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey(key));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      data: parsed.data as T,
      timestamp: parsed.timestamp as number,
    };
  } catch {
    return null;
  }
}

function saveToStorage<T>(key: string, entry: CacheEntry<T>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      storageKey(key),
      JSON.stringify({ data: entry.data, timestamp: entry.timestamp })
    );
  } catch {
    // Storage might be full; silently fail
  }
}

export function getCacheEntry<T>(key: string): CacheEntry<T> | undefined {
  // Prefer memory; fall back to localStorage
  const mem = MEMORY_CACHE.get(key) as CacheEntry<T> | undefined;
  if (mem) return mem;

  const disk = loadFromStorage<T>(key);
  if (disk) {
    MEMORY_CACHE.set(key, disk as CacheEntry<unknown>);
    return disk;
  }
  return undefined;
}

export function setCacheEntry<T>(key: string, entry: CacheEntry<T>): void {
  MEMORY_CACHE.set(key, entry as CacheEntry<unknown>);
  saveToStorage(key, entry);
}

export function clearCacheEntry(key: string): void {
  MEMORY_CACHE.delete(key);
  if (typeof window !== "undefined") {
    localStorage.removeItem(storageKey(key));
  }
}

export function isCacheFresh(key: string, ttlMs = DEFAULT_TTL_MS): boolean {
  const entry = getCacheEntry<unknown>(key);
  if (!entry) return false;
  return Date.now() - entry.timestamp < ttlMs;
}

export function isCacheStale(key: string, ttlMs = DEFAULT_TTL_MS): boolean {
  const entry = getCacheEntry<unknown>(key);
  if (!entry) return false;
  const age = Date.now() - entry.timestamp;
  return age >= ttlMs / 2 && age < ttlMs;
}
