"use client";

import { useApiData } from "../hooks/useApiData";
import { MsLearnProfile } from "../types";
import { 
  SectionContainer,
  SectionHeader,
  LoadingState,
  ErrorState
} from "./ui";

export default function MsLearnProgress() {
  const { data: profile, loading, error } = useApiData<MsLearnProfile>("/api/ms-learn");

  if (loading) {
    return <LoadingState title="Learning Progress" message="Loading Microsoft Learn data..." />;
  }

  if (error || !profile) {
    return <ErrorState title="Learning Progress" error={error || "Failed to load profile data"} />;
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
    <SectionContainer maxWidth="4xl">
      <SectionHeader 
        title="Learning Progress" 
        description="Microsoft Learn achievements and progress" 
      />

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
    </SectionContainer>
  );
}
