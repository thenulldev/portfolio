"use client";

import React, { useState } from "react";
import AppShell from "./AppShell";
import SkillsAndCertifications from "@components/features/skills/SkillsAndCertifications";
import LearningDashboard from "@components/features/learning/LearningDashboard";
import StatsOverview from "@components/features/stats/StatsOverview";

type Tab = "skills" | "learning";

export default function PortfolioLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("skills");

  const renderContent = () => {
    switch (activeTab) {
      case "skills":
        return (
          <>
            <StatsOverview />
            <SkillsAndCertifications />
          </>
        );
      case "learning":
        return <LearningDashboard />;
      default:
        return (
          <>
            <StatsOverview />
            <SkillsAndCertifications />
          </>
        );
    }
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AppShell>
  );
}
