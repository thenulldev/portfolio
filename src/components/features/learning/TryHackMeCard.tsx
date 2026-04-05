"use client";

import React from "react";
import { TryHackMeProfile } from "@/types";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Badge
} from "@/components/ui";

interface TryHackMeCardProps {
    profile: TryHackMeProfile;
}

export default function TryHackMeCard({ profile }: TryHackMeCardProps): React.JSX.Element {
    // Format THM Badge Name
    const formatBadgeName = (name: string) => {
        return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    // Get capability score color based on value
    const getScoreColor = (score: number) => {
        if (score >= 70) return 'text-emerald-600 dark:text-emerald-400';
        if (score >= 50) return 'text-sky-600 dark:text-sky-400';
        if (score >= 30) return 'text-amber-600 dark:text-amber-400';
        return 'text-slate-600 dark:text-slate-400';
    };

    // Get tier color
    const getTierColor = (tier: string) => {
        switch (tier.toLowerCase()) {
            case 'bronze': return 'text-amber-700 dark:text-amber-500';
            case 'silver': return 'text-slate-500 dark:text-slate-400';
            case 'gold': return 'text-yellow-600 dark:text-yellow-400';
            case 'platinum': return 'text-cyan-600 dark:text-cyan-400';
            case 'diamond': return 'text-purple-600 dark:text-purple-400';
            default: return 'text-slate-600 dark:text-slate-400';
        }
    };

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-2xl">🛡️</span> TryHackMe
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Key Metrics Row */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="p-3 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl text-center border border-red-100 dark:border-red-800">
                        <div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">Rank</div>
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">#{profile.rank.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Points</div>
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{profile.points.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Badges</div>
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{profile.badgesNumber}</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Rooms</div>
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{profile.completedRoomsNumber}</div>
                    </div>
                </div>

                {/* Secondary Stats Row */}
                <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                        <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{profile.level}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Level</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                        <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{profile.streak}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Streak</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                        <div className={`text-lg font-bold ${getScoreColor(profile.capabilityScore.value)}`}>
                            {Math.round(profile.capabilityScore.value)}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Score</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                        <div className={`text-lg font-bold capitalize ${getTierColor(profile.leagueTier)}`}>
                            {profile.leagueTier.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Tier</div>
                    </div>
                </div>

                {/* Capability Score Components */}
                <div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Capability Score Breakdown</h4>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.entries(profile.capabilityScore.components).map(([component, value]) => (
                            <div key={component} className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                                <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{value.toFixed(1)}</div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{component}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Badges */}
                <div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Recent Badges</h4>
                    <div className="grid grid-cols-3 gap-3">
                        {profile.badges
                            .filter(b => b.earnedAt)
                            .sort((a, b) => new Date(b.earnedAt!).getTime() - new Date(a.earnedAt!).getTime())
                            .slice(0, 3)
                            .map((badge) => (
                                <div key={badge.id} className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
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

                {/* Certificates */}
                {profile.certificates.length > 0 && (
                    <div>
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Certificates</h4>
                        <div className="flex flex-wrap gap-2">
                            {profile.certificates.map((cert) => (
                                <Badge key={cert} variant="outline" className="border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400">
                                    {cert}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
