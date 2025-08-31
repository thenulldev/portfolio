import React from "react";

interface LoadingStateProps {
  title: string;
  message?: string;
  className?: string;
}

export function LoadingState({ title, message = "Loading...", className = "" }: LoadingStateProps) {
  return (
    <div className={`mx-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-7xl border border-slate-200 dark:border-slate-700 shadow-lg ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">{title}</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent"></div>
        </div>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{message}</p>
      </div>
    </div>
  );
}
