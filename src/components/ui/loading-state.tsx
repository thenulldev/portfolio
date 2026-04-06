import React from "react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  title: string;
  message?: string;
  className?: string;
}

export function LoadingState({ title, message = "Loading...", className = "" }: LoadingStateProps) {
  return (
    <div className={cn(
      "mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-12 w-full max-w-7xl border border-slate-200 dark:border-slate-700 shadow-sm",
      className
    )}>
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-8 text-slate-800 dark:text-slate-100">
          {title}
        </h2>
        <div className="flex justify-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-sky-200 dark:border-sky-800 border-t-sky-500 dark:border-t-sky-400"></div>
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          {message}
        </p>
      </div>
    </div>
  );
}
