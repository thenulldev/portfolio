import React from "react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title: string;
  error: string;
  className?: string;
}

export function ErrorState({ title, error, className = "" }: ErrorStateProps) {
  return (
    <div className={cn(
      "mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-12 w-full max-w-7xl border border-red-200 dark:border-red-800/30 shadow-sm",
      className
    )}>
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          {title}
        </h2>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm text-red-600 dark:text-red-400 font-medium">
          {error}
        </p>
      </div>
    </div>
  );
}
