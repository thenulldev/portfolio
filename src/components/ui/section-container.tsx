import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "7xl";
}

export function SectionContainer({
  children,
  className = "",
  maxWidth = "7xl"
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

  return (
    <div className={cn(
      "mx-auto bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-4 sm:p-8 font-[family-name:var(--font-poppins-sans)] w-full border border-slate-200 dark:border-slate-700 shadow-lg",
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  );
}
