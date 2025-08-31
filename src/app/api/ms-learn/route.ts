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
    
    // Return a mock response for now so the UI doesn't break
    return NextResponse.json({
      docsId: "16d3f83e-b773-4ad9-b6b9-cd42cac7c6a7",
      totalXp: 0,
      currentLevel: 1,
      currentLevelLow: 0,
      currentLevelHigh: 100,
      currentLevelPointsEarned: 0,
      nextLevel: 2,
      pointsUntilNextLevel: 100,
      achievementCategories: {
        "Unknown": 0,
        "Modules": 0,
        "Courses": 0,
        "Qna": 0,
        "Challenges": 0,
        "Events": 0,
        "LearningPaths": 0,
        "Plans": 0,
        "Special": 0
      }
    });
  }
}
