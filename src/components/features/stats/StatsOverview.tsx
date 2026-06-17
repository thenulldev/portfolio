"use client";

import React from "react";
import Image from "next/image";
import { useParallelData } from "@/hooks/useData";
import { TryHackMeProfile, HTBProfile } from "@/types";
import {
    SectionContainer,
    SectionHeader,
    LoadingState,
    ErrorState
} from "@/components/ui";

type StatsData = {
  thm: TryHackMeProfile;
  htb: HTBProfile;
};

function THMBadge({ profile }: { profile: TryHackMeProfile }) {
  const tierColor = React.useMemo(() => {
    switch (profile.leagueTier.toLowerCase()) {
      case 'bronze': return 'text-amber-700 dark:text-amber-500';
      case 'silver': return 'text-slate-500 dark:text-slate-400';
      case 'gold': return 'text-yellow-600 dark:text-yellow-400';
      case 'platinum': return 'text-cyan-600 dark:text-cyan-400';
      case 'diamond': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  }, [profile.leagueTier]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-red-100 dark:border-red-800/50 p-3 sm:p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-xl">🛡️</span>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">TryHackMe</h3>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Level {profile.level} · <span className={`capitalize font-medium ${tierColor}`}>{profile.leagueTier}</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">#{profile.rank.toLocaleString()}</div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Rank</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">{profile.points.toLocaleString()}</div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Points</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">{profile.completedRoomsNumber}</div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Rooms</div>
        </div>
      </div>
    </div>
  );
}

function HTBBadge({ profile }: { profile: HTBProfile }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-emerald-800/50 p-3 sm:p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2.5 mb-3">
        {profile.rankImage ? (
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
            <Image
              src={profile.rankImage}
              alt={profile.levelTitle}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ) : <span className="text-xl">🎯</span>}
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">Hack The Box</h3>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            {profile.levelTitle} · Level {profile.level}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">{profile.level}</div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Level</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">{profile.totalExperiencePoints.toLocaleString()}</div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Total XP</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400">{profile.streak.counter}</div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Streak</div>
        </div>
      </div>
    </div>
  );
}

export default function StatsOverview(): React.JSX.Element {
  const { data, loading, error, refetch } = useParallelData<StatsData>({
    thm: "/api/tryhackme",
    htb: "/api/htb",
  });

  if (loading) {
    return (
      <SectionContainer maxWidth="7xl" variant="transparent" className="py-4">
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </SectionContainer>
    );
  }

  if (error || !data.thm || !data.htb) {
    return (
      <SectionContainer maxWidth="7xl" variant="transparent" className="py-4">
        <ErrorState
          title="Platform Stats"
          error={error || "Failed to load stats"}
          onRetry={refetch}
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer maxWidth="7xl" variant="transparent" className="py-4">
      <SectionHeader
        title="Platform Stats"
        description="Live progress across cybersecurity training platforms."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <THMBadge profile={data.thm} />
        <HTBBadge profile={data.htb} />
      </div>
    </SectionContainer>
  );
}
