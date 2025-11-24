"use client";

import React from "react";
import { useApiData } from "@/hooks/useApiData";
import { MsLearnProfile, TryHackMeProfile } from "@/types";
import {
    SectionContainer,
    LoadingState,
    ErrorState,
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui";

export default function LearningDashboard() {
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

    // Calculate MS Learn Progress
    const levelTotalPoints = msLearn.currentLevelHigh - msLearn.currentLevelLow;
    const levelEarnedPoints = msLearn.currentLevelPointsEarned;
    const msPercentage = Math.min(Math.round((levelEarnedPoints / levelTotalPoints) * 100), 100);

    // Format THM Badge Name
    const formatBadgeName = (name: string) => {
        return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

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
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">#{thm.userRank.toLocaleString()}</div>
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
                            {thm.badges.length + Object.values(msLearn.achievementCategories).reduce((a, b) => a + b, 0)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Microsoft Learn Section */}
                <Card className="h-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <span className="text-2xl">🎓</span> Microsoft Learn
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Level Progress */}
                        <div>
                            <div className="flex justify-between mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                <span>Level {msLearn.currentLevel} Progress</span>
                                <span>{msPercentage}%</span>
                            </div>
                            <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500"
                                    style={{ width: `${msPercentage}%` }}
                                />
                            </div>
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-right">
                                {msLearn.pointsUntilNextLevel.toLocaleString()} XP to Level {msLearn.nextLevel}
                            </p>
                        </div>

                        {/* Achievement Categories */}
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(msLearn.achievementCategories)
                                .filter(([, count]) => count > 0)
                                .slice(0, 6)
                                .map(([category, count]) => (
                                    <div key={category} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                        <span className="text-sm text-slate-600 dark:text-slate-400 truncate pr-2">{category}</span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs bg-white dark:bg-slate-700 px-2 py-1 rounded-full">
                                            {count}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                {/* TryHackMe Section */}
                <Card className="h-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <span className="text-2xl">🛡️</span> TryHackMe
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{thm.completedRooms}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Rooms Completed</div>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{thm.badges.length}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Total Badges</div>
                            </div>
                        </div>

                        {/* Recent Badges */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Recent Badges</h4>
                            <div className="grid grid-cols-3 gap-3">
                                {thm.badges
                                    .filter(b => b.earnedAt)
                                    .sort((a, b) => new Date(b.earnedAt!).getTime() - new Date(a.earnedAt!).getTime())
                                    .slice(0, 3)
                                    .map((badge) => (
                                        <div key={badge._id} className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                                            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-2 text-xs">
                                                🏆
                                            </div>
                                            <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">
                                                {formatBadgeName(badge.name)}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </SectionContainer>
    );
}
