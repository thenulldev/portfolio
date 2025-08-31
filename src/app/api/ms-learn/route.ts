import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://microsoft-learn.nulldev.workers.dev/",
      {
        method: "GET",
        headers: {
          "user-agent": "NullDev-Frontend",
          "content-type": "application/json",
          "Accept": "application/json",
        },
        // Add timeout
        signal: AbortSignal.timeout(15000), // 15 second timeout
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Microsoft Learn profile:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch Microsoft Learn profile" },
      { status: 500 }
    );
  }
}
