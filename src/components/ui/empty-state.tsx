import React from "react";

interface EmptyStateProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, icon, className = "" }: EmptyStateProps) {
  const defaultIcon = (
    <svg className="w-6 h-6 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
        {icon || defaultIcon}
      </div>
      <p className="text-slate-600 dark:text-slate-400 font-medium">{title}</p>
    </div>
  );
}
