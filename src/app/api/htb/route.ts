import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://htb-worker.nulldev.workers.dev', {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTB worker error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch HTB data' },
      { status: 500 }
    );
  }
}
