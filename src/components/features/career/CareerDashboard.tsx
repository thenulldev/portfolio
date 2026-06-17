"use client";

import React from "react";
import Image from "next/image";
import { careerSummary, careerEntries } from "@/lib/experience-data";
import { Badge, SectionContainer, SectionHeader, SectionDivider } from "@/components/ui";
import CareerTimeline from "./CareerTimeline";

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 text-center hover:shadow-md transition-shadow">
      <div className="text-2xl sm:text-3xl mb-1">{icon}</div>
      <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">{value}</div>
      <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</div>
    </div>
  );
}

export default function CareerDashboard(): React.JSX.Element {
  const summary = careerSummary;
  const entries = careerEntries;
  const presentRoles = entries.filter((e) => !e.endDate).length;
  const totalRoles = entries.length;

  return (
    <SectionContainer maxWidth="7xl" variant="transparent">
      {/* Hero Header */}
      <SectionHeader
        title="Career Experience"
        description={summary.headline}
      />

      {/* Bio */}
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto text-center"
      >
        {summary.summary}
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
        <SummaryCard
          label="Years Active"
          value={<>
            {summary.yearsOfExperience}
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">+ yrs</span>
          </>}
          icon="📅"
        />
        <SummaryCard
          label="Roles Held"
          value={<>
            {totalRoles}
            {presentRoles > 0 && (
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                {" "}
                ({presentRoles} active)
              </span>
            )}
          </>}
          icon="💼"
        />
        <SummaryCard
          label="Industries"
          value={summary.industries.length}
          icon="🏭"
        />
        <SummaryCard
          label="Core Skills"
          value={summary.coreCompetencies.length}
          icon="🛠️"
        />
      </div>

      {/* Core Competencies */}
      <div className="mb-8 sm:mb-10">
        <SectionDivider title="Core Competencies" />
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {summary.coreCompetencies.map((comp) => (
            <Badge
              key={comp}
              variant="info"
              className="text-xs sm:text-sm px-3 py-1"
            >
              {comp}
            </Badge>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="mb-8 sm:mb-10">
        <SectionDivider title="Industries" />
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {summary.industries.map((ind) => (
            <Badge
              key={ind}
              variant="outline"
              className="text-xs sm:text-sm px-3 py-1 border-slate-300 dark:border-slate-600"
            >
              {ind}
            </Badge>
          ))}
        </div>
      </div>

      {/* Work History Timeline */}
      <div className="mb-8">
        <SectionDivider
          title="Work History"
          subtitle="Career progression over time"
        />
        <CareerTimeline entries={entries} />
      </div>
    </SectionContainer>
  );
}
