import { NextResponse } from 'next/server';
import { getApiData } from '../../../lib/api';

export async function GET() {
  try {
    const response = await getApiData(
      "https://credly.thenull.dev/stephen-freerking"
    );

    if (response.error) {
      console.error('Error fetching certifications:', response.error);
      return NextResponse.json(
        { error: 'Failed to fetch certifications' },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Unexpected error in certifications API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
