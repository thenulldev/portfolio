import React from "react";

interface ErrorStateProps {
  title: string;
  error: string;
  className?: string;
}

export function ErrorState({ title, error, className = "" }: ErrorStateProps) {
  return (
    <div className={`mx-auto bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-7xl border border-red-200 dark:border-red-800 shadow-lg ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">{title}</h2>
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-red-700 dark:text-red-400 text-sm font-medium">Error loading data</p>
        <p className="text-xs text-red-500 dark:text-red-400 mt-2">{error}</p>
      </div>
    </div>
  );
}
