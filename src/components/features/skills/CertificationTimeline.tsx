"use client";

import React from "react";
import Image from "next/image";
import { Root } from "@/types";

interface CertificationTimelineProps {
  certifications: Root[];
  onSelectCert: (cert: Root) => void;
}

function getIssuerColor(issuerName: string): string {
  const colors: Record<string, string> = {
    "Microsoft": "bg-blue-500",
    "CompTIA": "bg-red-500",
    "AWS": "bg-orange-500",
    "Google": "bg-emerald-500",
    "ISC2": "bg-purple-500",
    "Offensive Security": "bg-slate-700",
  };
  return colors[issuerName] || "bg-sky-500";
}

function getIssuerBorderColor(issuerName: string): string {
  const colors: Record<string, string> = {
    "Microsoft": "border-blue-200 dark:border-blue-800",
    "CompTIA": "border-red-200 dark:border-red-800",
    "AWS": "border-orange-200 dark:border-orange-800",
    "Google": "border-emerald-200 dark:border-emerald-800",
    "ISC2": "border-purple-200 dark:border-purple-800",
    "Offensive Security": "border-slate-300 dark:border-slate-600",
  };
  return colors[issuerName] || "border-sky-200 dark:border-sky-800";
}

export default function CertificationTimeline({ certifications, onSelectCert }: CertificationTimelineProps) {
  const sortedCerts = React.useMemo(() => {
    return [...certifications].sort((a, b) => {
      return new Date(b.issued_at_date).getTime() - new Date(a.issued_at_date).getTime();
    });
  }, [certifications]);

  const groupedByYear = React.useMemo(() => {
    const groups: Record<number, Root[]> = {};
    sortedCerts.forEach(cert => {
      const year = new Date(cert.issued_at_date).getFullYear();
      if (!groups[year]) groups[year] = [];
      groups[year].push(cert);
    });
    return Object.entries(groups)
      .map(([year, certs]) => ({ year: parseInt(year), certs }))
      .sort((a, b) => b.year - a.year);
  }, [sortedCerts]);

  if (certifications.length === 0) return null;

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-[15px] sm:left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-300 via-slate-200 to-slate-100 dark:from-sky-800 dark:via-slate-700 dark:to-slate-800" />

      <div className="space-y-8 sm:space-y-10">
        {groupedByYear.map(({ year, certs }) => (
          <div key={year} className="relative">
            {/* Year marker */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-slate-900 dark:bg-slate-100 flex items-center justify-center shadow-md shrink-0">
                <span className="text-[10px] sm:text-sm font-bold text-white dark:text-slate-900">
                  {year.toString().slice(-2)}
                </span>
              </div>
              <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 shrink-0">
                {year}
              </span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700 min-w-0" />
              <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 shrink-0">
                {certs.length} cert{certs.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Certs for this year */}
            <div className="space-y-3 pl-10 sm:pl-16">
              {certs.map((cert) => {
                const issuerName = cert.issuer.entities[0]?.entity.name || 'Certified';
                const colorClass = getIssuerColor(issuerName);
                const borderClass = getIssuerBorderColor(issuerName);
                const issuedDate = new Date(cert.issued_at_date);
                const dateStr = issuedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

                return (
                  <div
                    key={cert.id}
                    onClick={() => onSelectCert(cert)}
                    className={`group relative bg-white dark:bg-slate-800 rounded-xl border ${borderClass} p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
                  >
                    {/* Mobile: stacked vertical layout */}
                    <div className="flex sm:hidden items-start gap-2.5">
                      <div className="relative shrink-0">
                        <div className={`absolute inset-0 ${colorClass} rounded-md blur-md opacity-20 group-hover:opacity-30 transition-opacity`} />
                        <Image
                          src={cert.image.url}
                          alt={cert.badge_template.name}
                          width={36}
                          height={36}
                          className="relative w-9 h-9 rounded-md object-contain bg-white dark:bg-slate-900"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                          {cert.badge_template.name}
                        </h4>
                        <div className="mt-1 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-x-2 gap-y-0.5 flex-wrap">
                            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <span className={`inline-block w-1.5 h-1.5 rounded-full ${colorClass}`} />
                              <span className="truncate max-w-[140px]">{issuerName}</span>
                            </span>
                            <span className="text-slate-400 dark:text-slate-500">{dateStr}</span>
                          </div>
                          {cert.expires_at_date && (
                            <span className="text-amber-600 dark:text-amber-400 font-medium whitespace-nowrap shrink-0">
                              Exp {new Date(cert.expires_at_date).getFullYear()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop: horizontal layout */}
                    <div className="hidden sm:flex items-start gap-3">
                      <div className="relative shrink-0 mt-0.5">
                        <div className={`absolute inset-0 ${colorClass} rounded-lg blur-md opacity-20 group-hover:opacity-30 transition-opacity`} />
                        <Image
                          src={cert.image.url}
                          alt={cert.badge_template.name}
                          width={48}
                          height={48}
                          className="relative w-12 h-12 rounded-lg object-contain bg-white dark:bg-slate-900"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {cert.badge_template.name}
                        </h4>
                        <div className="mt-1.5 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-x-3">
                            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                              <span className={`inline-block w-2 h-2 rounded-full ${colorClass}`} />
                              {issuerName}
                            </span>
                            <span className="text-slate-400 dark:text-slate-500">{dateStr}</span>
                          </div>
                          {cert.expires_at_date && (
                            <span className="text-amber-600 dark:text-amber-400 font-medium whitespace-nowrap shrink-0">
                              Exp {new Date(cert.expires_at_date).getFullYear()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
