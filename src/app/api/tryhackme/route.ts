import { NextResponse } from 'next/server';
import { staticTryHackMeProfile } from "@/lib/static-data";

export async function GET(): Promise<NextResponse> {
  // THM API is behind Cloudflare bot protection — live scraping no longer viable.
  // Serve static snapshot captured from authenticated browser session.
  // To update: refresh the snapshot in src/lib/static-data.ts
  return NextResponse.json(staticTryHackMeProfile, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
    },
  });
}
