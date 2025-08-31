"use client";

import React from "react";
import SkillList from "./SkillList";
import { useCertifications } from "./useCertifications";

export default function Skills(): React.JSX.Element {
  const { skills, skillCounts, loading, error, lastUpdated } = useCertifications();

  if (loading) {
    return (
      <figure className="mx-auto bg-slate-100 rounded-xl p-4 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-xl">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500"></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Loading skills...</p>
        </div>
      </figure>
    );
  }

  if (error) {
    return (
      <figure className="mx-auto bg-slate-100 rounded-xl p-4 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-xl">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <p className="text-red-600 text-sm">Error loading skills</p>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
        </div>
      </figure>
    );
  }

  return (
    <figure className="mx-auto bg-slate-100 rounded-xl p-4 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-xl">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Skills</h2>
        {skills.length === 0 ? (
          <p className="text-gray-600">No skills found</p>
        ) : (
          <>
            <SkillList skills={skills} skillCounts={skillCounts} />
            {lastUpdated && (
              <p className="text-xs text-gray-500 mt-4">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </>
        )}
      </div>
    </figure>
  );
}
