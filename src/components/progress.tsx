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
      <div className="mx-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-4xl border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Learning Progress</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent"></div>
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 font-medium">Loading Microsoft Learn data...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="mx-auto bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-4xl border border-red-200 dark:border-red-800 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Learning Progress</h2>
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-700 dark:text-red-400 text-sm font-medium">Error loading Microsoft Learn data</p>
          <p className="text-xs text-red-500 dark:text-red-400 mt-2">{error || "Failed to load profile data"}</p>
        </div>
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
    <div className="mx-auto bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-4xl border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">Learning Progress</h2>
        <p className="text-slate-600 dark:text-slate-400">Microsoft Learn achievements and progress</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Microsoft Learn</h3>
          <span className="text-sm bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 text-sky-800 dark:text-sky-300 py-2 px-4 rounded-full font-semibold border border-sky-200 dark:border-sky-700">
            Level {profile.currentLevel}
          </span>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Level Progress</span>
            <span>{percentage}%</span>
          </div>

          <div className="relative h-8 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
            {/* Progress fill */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />

            {/* XP Text */}
            <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
              <span className="text-white drop-shadow-sm">
                {levelEarnedPoints.toLocaleString()} / {levelTotalPoints.toLocaleString()} XP
              </span>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            {profile.pointsUntilNextLevel.toLocaleString()} XP needed to reach Level {profile.nextLevel}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total XP</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">
              {profile.totalXp.toLocaleString()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Achievements</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{totalAchievements}</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Achievement Breakdown</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(profile.achievementCategories)
              .filter((entry) => entry[1] > 0)
              .map(([category, count]) => (
                <div key={category} className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-600">
                  <span className="text-sm text-slate-700 dark:text-slate-300">{category}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-600 px-2 py-1 rounded-full text-xs">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
