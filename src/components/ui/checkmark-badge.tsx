import React from "react";
import { cn } from "@/lib/utils";

interface CheckmarkBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CheckmarkBadge({ size = "md", className = "" }: CheckmarkBadgeProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const iconSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-4 h-4",
    lg: "w-6 h-6"
  };

  return (
    <div className={cn(
      "bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg",
      sizeClasses[size],
      className
    )}>
      <svg className={cn("text-white", iconSizes[size])} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );
}
