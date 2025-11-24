"use client";

import React, { useState } from "react";
import AppShell from "./AppShell";
import BlogSection from "@components/features/blog/BlogSection";
import SkillsAndCertifications from "@components/features/skills/SkillsAndCertifications";
import LearningDashboard from "@components/features/learning/LearningDashboard";

type Tab = "skills" | "certifications" | "learning" | "blog";

export default function PortfolioLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("skills");

  const renderContent = () => {
    switch (activeTab) {
      case "skills":
        return <SkillsAndCertifications />;
      case "learning":
        return <LearningDashboard />;
      case "blog":
        return <BlogSection />;
      default:
        return <SkillsAndCertifications />;
    }
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AppShell>
  );
}
