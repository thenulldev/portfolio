"use client";

import React from "react";
import { useApiData } from "@/hooks/useApiData";
import { MsLearnProfile, TryHackMeProfile } from "@/types";
import MicrosoftLearnCard from "./MicrosoftLearnCard";
import TryHackMeCard from "./TryHackMeCard";
import {
    SectionContainer,
    LoadingState,
    ErrorState
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

            {/* Microsoft Learn Section */}
            <div className="mb-16">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent flex-1"></div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 rounded-full border border-sky-200 dark:border-sky-700">
                        <span className="text-2xl">🎓</span>
                        <span className="text-lg font-bold text-sky-700 dark:text-sky-300">Microsoft Learn</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent flex-1"></div>
                </div>

                {/* MS Learn Content */}
                <div className="max-w-3xl mx-auto">
                    <MicrosoftLearnCard profile={msLearn} />
                </div>
            </div>

            {/* Visual Divider */}
            <div className="flex items-center justify-center mb-16">
                <div className="w-24 h-1 bg-gradient-to-r from-sky-400 via-purple-400 to-red-400 rounded-full"></div>
            </div>

            {/* TryHackMe Section */}
            <div>
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent flex-1"></div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-full border border-red-200 dark:border-red-700">
                        <span className="text-2xl">🛡️</span>
                        <span className="text-lg font-bold text-red-700 dark:text-red-300">TryHackMe</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent flex-1"></div>
                </div>

                {/* TryHackMe Content */}
                <div className="max-w-3xl mx-auto">
                    <TryHackMeCard profile={thm} />
                </div>
            </div>
        </SectionContainer>
    );
}
