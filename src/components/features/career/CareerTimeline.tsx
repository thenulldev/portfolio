"use client";

import React from "react";
import Image from "next/image";
import { CareerEntry } from "@/types/experience";
import { Badge } from "@/components/ui";

interface CareerTimelineProps {
  entries: CareerEntry[];
}

function getEmploymentTypeColor(type: string): string {
  switch (type.toLowerCase()) {
    case "full-time": return "bg-sky-500";
    case "contract": return "bg-amber-500";
    case "freelance": return "bg-purple-500";
    case "internship": return "bg-emerald-500";
    case "part-time": return "bg-rose-500";
    default: return "bg-slate-500";
  }
}

function getEmploymentTypeBorder(type: string): string {
  switch (type.toLowerCase()) {
    case "full-time": return "border-sky-200 dark:border-sky-800";
    case "contract": return "border-amber-200 dark:border-amber-800";
    case "freelance": return "border-purple-200 dark:border-purple-800";
    case "internship": return "border-emerald-200 dark:border-emerald-800";
    case "part-time": return "border-rose-200 dark:border-rose-800";
    default: return "border-slate-200 dark:border-slate-800";
  }
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatDuration(start: string, end: string | null): string {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (e.getDate() < s.getDate()) months -= 1;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years !== 1 ? "s" : ""}`);
  if (remMonths > 0) parts.push(`${remMonths} mo${remMonths !== 1 ? "s" : ""}`);
  if (parts.length === 0) parts.push("< 1 mo");
  return parts.join(" ");
}

export default function CareerTimeline({ entries }: CareerTimelineProps) {
  const sorted = React.useMemo(() => {
    return [...entries].sort((a, b) => {
      const aStart = new Date(a.startDate).getTime();
      const bStart = new Date(b.startDate).getTime();
      return bStart - aStart;
    });
  }, [entries]);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[15px] sm:left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-300 via-slate-200 to-slate-100 dark:from-sky-800 dark:via-slate-700 dark:to-slate-800" />

      <div className="space-y-8 sm:space-y-10">
        {sorted.map((entry, idx) => {
          const isPresent = !entry.endDate;
          const colorClass = getEmploymentTypeColor(entry.employmentType);
          const borderClass = getEmploymentTypeBorder(entry.employmentType);
          const duration = formatDuration(entry.startDate, entry.endDate ?? null);
          const dateRange = `${formatDate(entry.startDate)} – ${formatDate(entry.endDate)}`;

          return (
            <div key={entry.id} className="relative">
              {/* Year / Dot */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md shrink-0 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600">
                  {entry.logo ? (
                    <Image
                      src={entry.logo}
                      alt={entry.company}
                      width={36}
                      height={36}
                      className="w-7 h-7 sm:w-9 sm:h-9 object-contain rounded-full"
                      unoptimized
                    />
                  ) : (
                    <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                      {entry.company.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {isPresent && (
                      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${colorClass}`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-75`} />
                      </span>
                    )}
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {dateRange}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
                      · {duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className={`pl-10 sm:pl-16`}>
                <div className={`group relative bg-white dark:bg-slate-800 rounded-xl border ${borderClass} p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <div className="min-w-0">
                      <h4 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {entry.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {entry.companyUrl ? (
                          <a
                            href={entry.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-sky-600 dark:hover:text-sky-400 transition-colors underline underline-offset-2 decoration-slate-300 dark:decoration-slate-600"
                          >
                            {entry.company}
                          </a>
                        ) : (
                          <span className="font-medium">{entry.company}</span>
                        )}
                        <span>·</span>
                        <span>{entry.location}</span>
                        <span>·</span>
                        <span className="capitalize">{entry.locationType.toLowerCase()}</span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`shrink-0 self-start text-[10px] sm:text-xs ${colorClass.replace("bg-", "bg-opacity-10 text-")} dark:${colorClass.replace("bg-", "bg-opacity-20 text-")} ${colorClass.replace("bg-", "bg-")}/10`}
                    >
                      {entry.employmentType}
                    </Badge>
                  </div>

                  {/* Description */}
                  <ul className="space-y-1.5 mb-3 sm:mb-4">
                    {entry.description.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className={`mt-1.5 shrink-0 w-1 h-1 rounded-full ${colorClass}`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlights */}
                  {entry.highlights && entry.highlights.length > 0 && (
                    <div className="mb-3 sm:mb-4">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {entry.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] sm:text-xs font-medium border border-emerald-200 dark:border-emerald-800"
                          >
                            <span>★</span>
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {entry.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {entry.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-medium border border-slate-200 dark:border-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
