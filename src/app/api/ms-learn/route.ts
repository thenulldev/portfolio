import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://microsoft-learn.nulldev.workers.dev/",
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
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
