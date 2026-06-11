import { NextResponse } from 'next/server';

const MS_LEARN_USER_ID = '16d3f83e-b773-4ad9-b6b9-cd42cac7c6a7';

export async function GET() {
  try {
    const response = await fetch(
      `https://learn.microsoft.com/api/achievements/xp/${MS_LEARN_USER_ID}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Microsoft Learn API error: ${response.status}` },
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
      { error: error instanceof Error ? error.message : 'Failed to fetch MS Learn data' },
      { status: 500 }
    );
  }
}
