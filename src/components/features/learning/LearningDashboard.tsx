"use client";

import React from "react";
import { useParallelData } from "@/hooks/useData";
import { MsLearnProfile, TryHackMeProfile, HTBProfile } from "@/types";
import MicrosoftLearnCard from "./MicrosoftLearnCard";
import TryHackMeCard from "./TryHackMeCard";
import HTBCard from "./HTBCard";
import {
    SectionContainer,
    SectionHeader,
    LoadingState,
    ErrorState
} from "@/components/ui";
import { formatCompact } from "@/lib/format";

type LearningData = {
  msLearn: MsLearnProfile;
  thm: TryHackMeProfile;
  htb: HTBProfile;
};

function StatPill({ label, value, accent }: { label: string; value: string; accent: string }) {
    const accentMap: Record<string, string> = {
        sky: "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-100 dark:border-sky-800",
        red: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-800",
        emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800",
    };
    return (
        <div className={`flex flex-col items-center px-4 py-2 rounded-xl border ${accentMap[accent] || accentMap.sky}`}>
            <span className="text-lg font-bold">{value}</span>
            <span className="text-[10px] uppercase tracking-wide opacity-70">{label}</span>
        </div>
    );
}

export default function LearningDashboard(): React.JSX.Element {
    const { data, loading, error, refetch } = useParallelData<LearningData>({
        msLearn: "/api/ms-learn",
        thm: "/api/tryhackme",
        htb: "/api/htb",
    });

    if (loading) {
        return <LoadingState title="Learning Dashboard" message="Gathering your learning stats..." />;
    }

    if (error || !data.msLearn || !data.thm || !data.htb) {
        return (
            <ErrorState 
                title="Learning Dashboard" 
                error={error || "Failed to load data"}
                onRetry={refetch}
            />
        );
    }

    const msTotalAchievements = Object.values(data.msLearn.achievementCategories).reduce((a, b) => a + b, 0);

    return (
        <SectionContainer maxWidth="7xl" variant="transparent">
            <SectionHeader 
                title="Learning Dashboard"
                description="Hands-on progress across Microsoft Learn, TryHackMe, and Hack The Box."
            />

            {/* Unified Overview Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                <StatPill label="MS Learn Level" value={`${data.msLearn.currentLevel}`} accent="sky" />
                <StatPill label="MS XP" value={formatCompact(data.msLearn.totalXp)} accent="sky" />
                <StatPill label="THM Rank" value={`#${formatCompact(data.thm.rank)}`} accent="red" />
                <StatPill label="THM Rooms" value={`${formatCompact(data.thm.completedRoomsNumber)}`} accent="red" />
                <StatPill label="HTB Level" value={`${data.htb.level}`} accent="emerald" />
                <StatPill label="HTB XP" value={formatCompact(data.htb.totalExperiencePoints)} accent="emerald" />
            </div>

            {/* Three-column card grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <MicrosoftLearnCard profile={data.msLearn} />
                <TryHackMeCard profile={data.thm} />
                <HTBCard profile={data.htb} />
            </div>
        </SectionContainer>
    );
}
