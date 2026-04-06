import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "7xl";
  variant?: "default" | "transparent" | "gradient";
}

export function SectionContainer({
  children,
  className = "",
  maxWidth = "7xl",
  variant = "default"
}: SectionContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "7xl": "max-w-7xl"
  };

  const variantClasses = {
    default: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm",
    transparent: "bg-transparent border-0 shadow-none",
    gradient: "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm"
  };

  return (
    <div className={cn(
      "mx-auto rounded-2xl p-6 sm:p-8 w-full",
      maxWidthClasses[maxWidth],
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  );
}

interface SectionDividerProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SectionDivider({ title, subtitle, className = "" }: SectionDividerProps) {
  return (
    <div className={cn("flex items-center gap-4 my-10", className)}>
      <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent flex-1"></div>
      {(title || subtitle) ? (
        <div className="text-center px-4">
          {title && (
            <h3 className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
      ) : null}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent flex-1"></div>
    </div>
  );
}
