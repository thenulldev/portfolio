"use client";

import React from "react";
import { TryHackMeProfile } from "@/types";
import { formatCompact } from "@/lib/format";
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

function formatBadgeName(name: string): string {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getTierColor(tier: string): string {
    switch (tier.toLowerCase()) {
        case 'bronze': return 'text-amber-600 dark:text-amber-400';
        case 'silver': return 'text-slate-500 dark:text-slate-400';
        case 'gold': return 'text-yellow-600 dark:text-yellow-400';
        case 'platinum': return 'text-cyan-600 dark:text-cyan-400';
        case 'diamond': return 'text-purple-600 dark:text-purple-400';
        default: return 'text-slate-600 dark:text-slate-400';
    }
}

export default function TryHackMeCard({ profile }: TryHackMeCardProps): React.JSX.Element {
    const tierLabel = profile.leagueTier.charAt(0).toUpperCase() + profile.leagueTier.slice(1);

    return (
        <Card className="h-full border-red-100 dark:border-red-800/50">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-xl">🛡️</span> TryHackMe
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                {/* Primary Stats */}
                <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-xl text-center border border-red-100 dark:border-red-800">
                        <div className="text-xl font-bold text-slate-800 dark:text-slate-200">#{formatCompact(profile.rank)}</div>
                        <div className="text-[10px] text-red-600 dark:text-red-400 font-medium uppercase tracking-wide">Rank</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{formatCompact(profile.points)}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Points</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{formatCompact(profile.badgesNumber)}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Badges</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{formatCompact(profile.completedRoomsNumber)}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Rooms</div>
                    </div>
                </div>

                {/* Secondary Row */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                        <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{profile.level}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Level</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                        <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{profile.streak}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Streak</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                        <div className={`text-lg font-bold capitalize ${getTierColor(profile.leagueTier)}`}>
                            {tierLabel}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Tier</div>
                    </div>
                </div>

                {/* Capability Score */}
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Capability Score</h4>
                    <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{Math.round(profile.capabilityScore.value)}</div>
                        <div className="flex-1 space-y-1">
                            {Object.entries(profile.capabilityScore.components).map(([component, value]) => (
                                <div key={component} className="flex items-center gap-2">
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 w-16 capitalize">{component}</span>
                                    <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 rounded-full"
                                            style={{ width: `${Math.min(100, value)}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 w-8 text-right">{value.toFixed(0)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Badges */}
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Recent Badges</h4>
                    <div className="flex flex-wrap gap-2">
                        {profile.badges
                            .filter(b => b.earnedAt)
                            .sort((a, b) => new Date(b.earnedAt!).getTime() - new Date(a.earnedAt!).getTime())
                            .slice(0, 4)
                            .map((badge) => (
                                <Badge key={badge.id} variant="outline" className="text-[10px] border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-2 py-1">
                                    {formatBadgeName(badge.name)}
                                </Badge>
                            ))}
                    </div>
                </div>

                {/* Certificates */}
                {profile.certificates.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Certificates</h4>
                        <div className="flex flex-wrap gap-2">
                            {profile.certificates.map((cert) => (
                                <Badge key={cert} variant="outline" className="text-[10px] border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400">
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
