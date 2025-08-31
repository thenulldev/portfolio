"use client";

import React from "react";
import SkillList from "./SkillList";
import { useCertifications } from "./useCertifications";
import { 
  SectionContainer,
  SectionHeader,
  LoadingState,
  ErrorState
} from "./ui";

export default function Skills(): React.JSX.Element {
  const { skills, skillCounts, loading, error } = useCertifications();

  if (loading) {
    return <LoadingState title="Skills & Expertise" message="Loading skills..." />;
  }

  if (error) {
    return <ErrorState title="Skills & Expertise" error={error} />;
  }

  return (
    <SectionContainer maxWidth="4xl">
      <SectionHeader title="Skills & Expertise" />
      {skills.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400 font-medium text-center">No skills found</p>
      ) : (
        <SkillList skills={skills} skillCounts={skillCounts} />
      )}
    </SectionContainer>
  );
}
