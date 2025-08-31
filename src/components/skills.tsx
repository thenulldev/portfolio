"use client";

import React from "react";
import SkillList from "./SkillList";
import { useCertifications } from "./useCertifications";

export default function Skills(): React.JSX.Element {
  const { skills, skillCounts, loading, error } = useCertifications();

  if (loading) {
    return (
      <div className="mx-auto bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-4xl border border-slate-200 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Skills & Expertise</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent"></div>
          </div>
          <p className="mt-4 text-sm text-slate-600 font-medium">Loading skills...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-4xl border border-red-200 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Skills & Expertise</h2>
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-700 text-sm font-medium">Error loading skills</p>
          <p className="text-xs text-red-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-4xl border border-slate-200 shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Skills & Expertise</h2>
        {skills.length === 0 ? (
          <p className="text-slate-600 font-medium">No skills found</p>
        ) : (
          <SkillList skills={skills} skillCounts={skillCounts} />
        )}
      </div>
    </div>
  );
}
