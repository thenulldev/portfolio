"use client";

import React from "react";
import { useParallelApiData } from "@/hooks/useApiData";
import { MsLearnProfile, TryHackMeProfile, HTBProfile } from "@/types";
import MicrosoftLearnCard from "./MicrosoftLearnCard";
import TryHackMeCard from "./TryHackMeCard";
import HTBCard from "./HTBCard";
import {
    SectionContainer,
    SectionHeader,
    SectionDivider,
    LoadingState,
    ErrorState
} from "@/components/ui";

type LearningData = {
  msLearn: MsLearnProfile;
  thm: TryHackMeProfile;
  htb: HTBProfile;
  [key: string]: unknown;
};

export default function LearningDashboard(): React.JSX.Element {
    const { data, loading, error, refetch } = useParallelApiData<LearningData>({
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

    return (
        <SectionContainer maxWidth="7xl" variant="transparent">
            <SectionHeader 
                title="Learning Dashboard"
                description="Hands-on learning progress across cloud platforms and cybersecurity domains."
            />

            {/* Microsoft Learn Section */}
            <div className="mb-12">
                <SectionDivider 
                    title="Microsoft Learn" 
                    subtitle="Cloud & Microsoft Technologies"
                />

                <div className="max-w-3xl mx-auto">
                    <MicrosoftLearnCard profile={data.msLearn} />
                </div>
            </div>

            {/* TryHackMe Section */}
            <div className="mb-12">
                <SectionDivider 
                    title="TryHackMe" 
                    subtitle="Cybersecurity & Penetration Testing"
                />

                <div className="max-w-3xl mx-auto">
                    <TryHackMeCard profile={data.thm} />
                </div>
            </div>

            {/* Hack The Box Section */}
            <div>
                <SectionDivider 
                    title="Hack The Box" 
                    subtitle="Pro Labs & CTF Challenges"
                />

                <div className="max-w-3xl mx-auto">
                    <HTBCard profile={data.htb} />
                </div>
            </div>
        </SectionContainer>
    );
}
