import React from "react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title: string;
  error: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorState({ title, error, className = "", onRetry }: ErrorStateProps) {
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
        <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-4">
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
