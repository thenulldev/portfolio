"use client";

import React from "react";
import { MsLearnProfile } from "@/types";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui";

interface MicrosoftLearnCardProps {
    profile: MsLearnProfile;
}

export default function MicrosoftLearnCard({ profile }: MicrosoftLearnCardProps): React.JSX.Element {
    // Calculate MS Learn Progress
    const levelTotalPoints = profile.currentLevelHigh - profile.currentLevelLow;
    const levelEarnedPoints = profile.currentLevelPointsEarned;
    const msPercentage = Math.min(Math.round((levelEarnedPoints / levelTotalPoints) * 100), 100);

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-2xl">🎓</span> Microsoft Learn
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Key Metrics Row */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl text-center border border-sky-100 dark:border-sky-800">
                        <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-1">Level</div>
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{profile.currentLevel}</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Total XP</div>
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{profile.totalXp.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Achievements</div>
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                            {Object.values(profile.achievementCategories).reduce((a, b) => a + b, 0)}
                        </div>
                    </div>
                </div>

                {/* Level Progress */}
                <div>
                    <div className="flex justify-between mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <span>Level {profile.currentLevel} Progress</span>
                        <span>{msPercentage}%</span>
                    </div>
                    <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500"
                            style={{ width: `${msPercentage}%` }}
                        />
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-right">
                        {profile.pointsUntilNextLevel.toLocaleString()} XP to Level {profile.nextLevel}
                    </p>
                </div>

                {/* Achievement Categories */}
                <div className="grid grid-cols-2 gap-3">
                    {Object.entries(profile.achievementCategories)
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
    );
}
