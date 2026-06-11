import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch('https://thm-scraper-v2.thenull.dev/ThatNullDev', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `TryHackMe worker error: ${response.status}` },
        { status: response.status }
      );
    }

    const apiResponse = await response.json();
    if (!apiResponse.success || !apiResponse.data) {
      return NextResponse.json(
        { error: 'Invalid response from TryHackMe API' },
        { status: 500 }
      );
    }

    return NextResponse.json(apiResponse.data, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Unexpected error in TryHackMe API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
