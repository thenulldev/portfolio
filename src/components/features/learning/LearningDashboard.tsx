"use client";

import React from "react";
import { useApiData } from "@/hooks/useApiData";
import { MsLearnProfile, TryHackMeProfile } from "@/types";
import MicrosoftLearnCard from "./MicrosoftLearnCard";
import TryHackMeCard from "./TryHackMeCard";
import {
    SectionContainer,
    SectionHeader,
    SectionDivider,
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
        <SectionContainer maxWidth="7xl" variant="transparent">
            <SectionHeader 
                title="Learning Dashboard"
                description="Tracking my continuous learning journey across Microsoft Learn and TryHackMe."
            />

            {/* Microsoft Learn Section */}
            <div className="mb-12">
                <SectionDivider 
                    title="Microsoft Learn" 
                    subtitle="Cloud & Microsoft Technologies"
                />

                <div className="max-w-3xl mx-auto">
                    <MicrosoftLearnCard profile={msLearn} />
                </div>
            </div>

            {/* TryHackMe Section */}
            <div>
                <SectionDivider 
                    title="TryHackMe" 
                    subtitle="Cybersecurity & Penetration Testing"
                />

                <div className="max-w-3xl mx-auto">
                    <TryHackMeCard profile={thm} />
                </div>
            </div>
        </SectionContainer>
    );
}
