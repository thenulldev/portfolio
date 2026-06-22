"use client";

import React from "react";
import { MsLearnProfile } from "@/types";
import { formatCompact } from "@/lib/format";
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
    const levelTotalPoints = profile.currentLevelHigh - profile.currentLevelLow;
    const levelEarnedPoints = profile.currentLevelPointsEarned;
    const msPercentage = Math.min(Math.round((levelEarnedPoints / levelTotalPoints) * 100), 100);

    return (
        <Card className="h-full border-sky-100 dark:border-sky-800/50">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-xl">🎓</span> Microsoft Learn
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                {/* Top Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-sky-50 dark:bg-sky-900/20 rounded-xl text-center border border-sky-100 dark:border-sky-800">
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{profile.currentLevel}</div>
                        <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium uppercase tracking-wide">Level</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{formatCompact(profile.totalXp)}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Total XP</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{formatCompact(Object.values(profile.achievementCategories).reduce((a, b) => a + b, 0))}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Achievements</div>
                    </div>
                </div>

                {/* Level Progress */}
                <div>
                    <div className="flex justify-between mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <span>Level {profile.currentLevel} → {profile.nextLevel}</span>
                        <span>{msPercentage}%</span>
                    </div>
                    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500"
                            style={{ width: `${msPercentage}%` }}
                        />
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 text-right">
                        {formatCompact(profile.pointsUntilNextLevel)} XP to next
                    </p>
                </div>

                {/* Achievement Categories */}
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Achievements</h4>
                    <div className="space-y-1.5">
                        {Object.entries(profile.achievementCategories)
                            .filter(([, count]) => count > 0)
                            .slice(0, 5)
                            .map(([category, count]) => (
                                <div key={category} className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-400 truncate pr-2">{category}</span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                                        {formatCompact(count)}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
