"use client";

import React from "react";
import { useApiData } from "@/hooks/useApiData";
import { MsLearnProfile, TryHackMeProfile } from "@/types";
import MicrosoftLearnCard from "./MicrosoftLearnCard";
import TryHackMeCard from "./TryHackMeCard";
import {
    SectionContainer,
    LoadingState,
    ErrorState,
    Card,
    CardContent
} from "@/components/ui";

export default function LearningDashboard(): React.JSX.Element {
    const { data: msLearn, loading: msLoading, error: msError } = useApiData<MsLearnProfile>("/api/ms-learn");
    const { data: thm, loading: thmLoading, error: thmError } = useApiData<TryHackMeProfile>("/api/tryhackme");

    const loading = msLoading || thmLoading;
    const error = msError || thmError;

    if (loading) {
        return <LoadingState title="Learning Dashboard" message="Gathering your learning stats..." />;
    }

    if (error || !msLearn || !thm) {
        return <ErrorState title="Learning Dashboard" error={error || "Failed to load data"} />;
    }

    return (
        <SectionContainer maxWidth="7xl">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                    Learning Dashboard
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Tracking my continuous learning journey across Microsoft Learn and TryHackMe.
                </p>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-100 dark:border-sky-800">
                    <CardContent className="p-6 text-center">
                        <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-1">MS Learn Level</div>
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{msLearn.currentLevel}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-100 dark:border-red-800">
                    <CardContent className="p-6 text-center">
                        <div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">THM Rank</div>
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">#{thm.rank.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-800">
                    <CardContent className="p-6 text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Total XP</div>
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                            {(msLearn.totalXp + thm.points).toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-800">
                    <CardContent className="p-6 text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Badges Earned</div>
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                            {thm.badgesNumber + Object.values(msLearn.achievementCategories).reduce((a, b) => a + b, 0)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MicrosoftLearnCard profile={msLearn} />
                <TryHackMeCard profile={thm} />
            </div>
        </SectionContainer>
    );
}
