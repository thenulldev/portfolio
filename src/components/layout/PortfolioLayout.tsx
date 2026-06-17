"use client";

import React, { useState } from "react";
import AppShell from "./AppShell";
import SkillsAndCertifications from "@components/features/skills/SkillsAndCertifications";
import LearningDashboard from "@components/features/learning/LearningDashboard";
import CareerDashboard from "@components/features/career/CareerDashboard";
import StatsOverview from "@components/features/stats/StatsOverview";

type Tab = "skills" | "learning";

export default function PortfolioLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("skills");

  const renderContent = () => {
    switch (activeTab) {
      case "skills":
        return (
          <>
            <CareerDashboard />
            <SkillsAndCertifications />
            <StatsOverview />
          </>
        );
      case "learning":
        return <LearningDashboard />;
      default:
        return (
          <>
            <CareerDashboard />
            <SkillsAndCertifications />
            <StatsOverview />
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
