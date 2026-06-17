"use client";

import React from "react";
import Image from "next/image";
import { useData } from "@/hooks/useData";
import { TryHackMeProfile, HTBProfile } from "@/types";
import {
    SectionContainer,
    SectionHeader,
} from "@/components/ui";

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

function StatSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 sm:p-4 animate-pulse">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="space-y-1">
          <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="w-16 h-3 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center space-y-1">
          <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
          <div className="w-8 h-3 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
        </div>
        <div className="text-center space-y-1">
          <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
          <div className="w-8 h-3 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
        </div>
        <div className="text-center space-y-1">
          <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
          <div className="w-8 h-3 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}

function StatError({ name, error, onRetry }: { name: string; error: string | null; onRetry: () => void }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 sm:p-4">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-xl opacity-50">{name === "TryHackMe" ? "🛡️" : "🎯"}</span>
        <h3 className="text-sm sm:text-base font-semibold text-slate-400 dark:text-slate-500">{name}</h3>
      </div>
      <p className="text-xs text-red-500 dark:text-red-400 mb-2">{error || "Failed to load"}</p>
      <button
        onClick={onRetry}
        className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

function StatUnavailable({ name, reason }: { name: string; reason?: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 sm:p-4 opacity-75">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-xl opacity-50 grayscale">{name === "TryHackMe" ? "🛡️" : "🎯"}</span>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-400 dark:text-slate-500">{name}</h3>
          <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">Temporarily unavailable</p>
        </div>
      </div>
      {reason && (
        <p className="text-[10px] text-slate-400 dark:text-slate-500">{reason}</p>
      )}
    </div>
  );
}

export default function StatsOverview(): React.JSX.Element {
  const {
    data: thmData,
    loading: thmLoading,
    error: thmError,
    refetch: thmRefetch,
  } = useData<unknown, TryHackMeProfile>("/api/tryhackme");

  const {
    data: htbData,
    loading: htbLoading,
    error: htbError,
    refetch: htbRefetch,
  } = useData<unknown, HTBProfile>("/api/htb");

  const allLoading = thmLoading && htbLoading;
  const anyReady = thmData || htbData;

  // Don't render anything if both are loading and nothing cached
  if (allLoading && !anyReady) {
    return (
      <SectionContainer maxWidth="7xl" variant="transparent" className="py-4">
        <SectionHeader
          title="Platform Stats"
          description="Live progress across cybersecurity training platforms."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <StatSkeleton />
          <StatSkeleton />
        </div>
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
        {thmData ? (
          <THMBadge profile={thmData} />
        ) : thmError && thmError.includes("not found") ? (
          <StatUnavailable name="TryHackMe" reason="Profile data unavailable" />
        ) : thmError ? (
          <StatError name="TryHackMe" error={thmError} onRetry={thmRefetch} />
        ) : (
          <StatSkeleton />
        )}

        {htbData ? (
          <HTBBadge profile={htbData} />
        ) : htbError ? (
          <StatError name="Hack The Box" error={htbError} onRetry={htbRefetch} />
        ) : (
          <StatSkeleton />
        )}
      </div>
    </SectionContainer>
  );
}
