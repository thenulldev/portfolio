import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      "https://credly-scraper.nulldev.workers.dev/stephen-freerking",
      {
        method: "GET",
        headers: {
          "user-agent": "NullDev-Frontend",
          "content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}
