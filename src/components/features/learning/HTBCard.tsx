import React from "react";
import { Card, CardContent, Badge } from "@/components/ui";
import { HTBProfile } from "@/types/htb";
import Image from "next/image";

interface HTBCardProps {
  profile: HTBProfile;
}

export default function HTBCard({ profile }: HTBCardProps): React.JSX.Element {
  const streak = profile.streak;
  const progressPercent = profile.experienceUntilNextLevel > 0
    ? ((profile.levelExperiencePoints - profile.experienceUntilNextLevel) / profile.levelExperiencePoints) * 100
    : 100;

  return (
    <Card className="border-slate-200 dark:border-slate-700 overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {profile.rankImage && (
            <div className="relative w-16 h-16 shrink-0">
              <Image
                src={profile.rankImage}
                alt={profile.levelTitle}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                ThatNullDev
              </h3>
              <Badge variant="outline" className="text-xs">
                Level {profile.level}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {profile.levelTitle} (Grade {profile.levelGrade})
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {profile.totalExperiencePoints.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Total XP</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
              {profile.level}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Level</div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>XP to Next Level</span>
            <span>{profile.experienceUntilNextLevel.toLocaleString()} XP</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
          <div className="text-2xl">🔥</div>
          <div>
            <div className="text-sm font-semibold text-amber-700 dark:text-amber-300">
              {streak.counter} Day Streak
            </div>
            <div className="text-xs text-amber-600/70 dark:text-amber-400/70">
              {streak.isCompleted ? "Completed today" : `${streak.remainingExperiencePoints} XP remaining`}
              {streak.inDanger ? " · In danger!" : ""}
              {streak.streakSavers > 0 ? ` · ${streak.streakSavers} streak saver(s)` : ""}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>Hack The Box</span>
          <span>{new Date(profile.fetchedAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
