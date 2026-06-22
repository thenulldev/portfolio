import React from "react";
import { Card, CardContent, Badge } from "@/components/ui";
import { HTBProfile } from "@/types/htb";
import { formatCompact } from "@/lib/format";
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
    <Card className="h-full border-emerald-100 dark:border-emerald-800/50">
      <CardContent className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          {profile.rankImage && (
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src={profile.rankImage}
                alt={profile.levelTitle}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-slate-800 dark:text-slate-200 truncate">ThatNullDev</span>
              <Badge variant="outline" className="text-[10px] shrink-0">
                Lvl {profile.level}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {profile.levelTitle} · Grade {profile.levelGrade}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-center border border-emerald-100 dark:border-emerald-800">
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{formatCompact(profile.totalExperiencePoints)}</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-wide">Total XP</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{formatCompact(profile.level)}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Level</div>
          </div>
        </div>

        {/* XP Progress */}
        <div>
          <div className="flex justify-between mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>XP to Next Level</span>
            <span>{profile.experienceUntilNextLevel.toLocaleString()} XP</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full transition-all"
              style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-100 dark:border-amber-800">
          <div className="text-xl">🔥</div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-amber-700 dark:text-amber-300">
              {streak.counter} Day Streak
            </div>
            <div className="text-[10px] text-amber-600/70 dark:text-amber-400/70 truncate">
              {streak.isCompleted ? "Completed today" : `${formatCompact(streak.remainingExperiencePoints)} XP remaining`}
              {streak.inDanger ? " · In danger!" : ""}
              {streak.streakSavers > 0 ? ` · ${streak.streakSavers} saver(s)` : ""}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
