"use client";

import { useEffect, useState } from "react";

interface MsLearnProfile {
  docsId: string;
  totalXp: number;
  currentLevel: number;
  currentLevelLow: number;
  currentLevelHigh: number;
  currentLevelPointsEarned: number;
  nextLevel: number;
  pointsUntilNextLevel: number;
  achievementCategories: Record<string, number>;
}

export default function MsLearnProgress() {
  const [profile, setProfile] = useState<MsLearnProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/ms-learn");

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError("Failed to load Microsoft Learn profile data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-lg border bg-gray-200 shadow-sm">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-lg border border-red-200 bg-red-50 text-red-700">
        <p>{error || "Failed to load profile data"}</p>
      </div>
    );
  }

  // Calculate level progress percentage
  const levelTotalPoints = profile.currentLevelHigh - profile.currentLevelLow;
  const levelEarnedPoints = profile.currentLevelPointsEarned;
  const percentage = Math.min(
    Math.round((levelEarnedPoints / levelTotalPoints) * 100),
    100
  );

  // Count total achievements
  const totalAchievements = Object.values(profile.achievementCategories).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="text-black w-full max-w-md mx-auto p-6 rounded-lg border bg-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Microsoft Learn</h2>
        <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
          Level {profile.currentLevel}
        </span>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>Level Progress</span>
          <span>{percentage}%</span>
        </div>

        <div className="relative h-6 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          {/* Progress fill */}
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />

          {/* XP Text */}
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
            <span
              className={`${
                percentage > 50
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {levelEarnedPoints.toLocaleString()} /{" "}
              {levelTotalPoints.toLocaleString()} XP
            </span>
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {profile.pointsUntilNextLevel.toLocaleString()} XP needed to reach
          Level {profile.nextLevel}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500">Total XP</div>
          <div className="text-lg font-bold">
            {profile.totalXp.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500">Achievements</div>
          <div className="text-lg font-bold">{totalAchievements}</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Achievement Breakdown</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(profile.achievementCategories)
            .filter(([_, count]) => count > 0)
            .map(([category, count]) => (
              <div key={category} className="flex justify-between text-sm">
                <span className="text-gray-600">{category}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
