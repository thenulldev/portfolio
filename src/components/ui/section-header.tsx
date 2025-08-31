import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{title}</h2>
      {description && (
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </div>
  );
}
