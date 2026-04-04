import { NextResponse } from 'next/server';
import { getApiData } from "@/lib/api";
import { TryHackMeApiResponse, TryHackMeProfile } from "@/types";

export async function GET(): Promise<NextResponse> {
  try {
    const response = await getApiData<TryHackMeApiResponse>(
      "https://thm-scraper-v2.thenull.dev/ThatNullDev",
      15000
    );

    if (response.error) {
      console.error('Error fetching TryHackMe profile:', response.error);
      return NextResponse.json(
        { error: 'Failed to fetch TryHackMe profile' },
        { status: response.status || 500 }
      );
    }

    // Unwrap the data from the API response
    const apiResponse = response.data;
    if (!apiResponse.success || !apiResponse.data) {
      return NextResponse.json(
        { error: 'Invalid response from TryHackMe API' },
        { status: 500 }
      );
    }

    // Return just the profile data (not the wrapper)
    return NextResponse.json(apiResponse.data);
  } catch (error) {
    console.error('Unexpected error in TryHackMe API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
