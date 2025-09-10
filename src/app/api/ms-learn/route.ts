import { NextResponse } from "next/server";
import { getApiData } from '../../../lib/api';

export async function GET() {
  try {
    const response = await getApiData(
      "https://mslearn.thenull.dev/"
    );

    if (response.error) {
      console.error('Error fetching Microsoft Learn profile:', response.error);
      return NextResponse.json(
        { error: 'Failed to fetch Microsoft Learn profile' },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Unexpected error in Microsoft Learn API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
