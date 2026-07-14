"use client";

import React, { useState } from "react";
import AppShell from "./AppShell";

type Tab = "skills" | "career" | "learning";

interface PortfolioLayoutProps {
    skillsSlot: React.ReactNode;
    careerSlot: React.ReactNode;
    learningSlot: React.ReactNode;
}

/**
 * Top-level layout. Owns tab state and decides which tab is visible.
 *
 * Each tab's content is a React node passed in as a prop. The
 * server-rendered tab content (skillsSlot especially) ships in the
 * initial HTML and is hidden via CSS when a different tab is active,
 * which keeps SSR meaningful for SEO without re-architecting all
 * tabs into Server Components.
 *
 * Hidden tabs do not render visually but they're still in the DOM,
 * preserving the SSR'd content for crawlers and lazy-loading it
 * only when the user switches tabs.
 */
export default function PortfolioLayout({
    skillsSlot,
    careerSlot,
    learningSlot,
}: PortfolioLayoutProps) {
    const [activeTab, setActiveTab] = useState<Tab>("skills");

    return (
        <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
            <div hidden={activeTab !== "skills"} id="tabpanel-skills">
                {skillsSlot}
            </div>
            <div hidden={activeTab !== "career"} id="tabpanel-career">
                {careerSlot}
            </div>
            <div hidden={activeTab !== "learning"} id="tabpanel-learning">
                {learningSlot}
            </div>
        </AppShell>
    );
}
