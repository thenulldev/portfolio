/**
 * Format a number into human-readable form.
 *
 *   21777  → "21.8K"
 *   168    → "168"
 *   27167  → "27.2K"
 *   1500000 → "1.5M"
 */
export function formatCompact(n: number): string {
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

/** Full number with commas */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}
