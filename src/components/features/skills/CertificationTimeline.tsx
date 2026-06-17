"use client";

import React from "react";
import Image from "next/image";
import { Root } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faCalendar, faBuilding } from "@fortawesome/free-solid-svg-icons";

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

                return (
                  <div
                    key={cert.id}
                    onClick={() => onSelectCert(cert)}
                    className={`group relative bg-white dark:bg-slate-800 rounded-xl border ${borderClass} p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Badge image */}
                      <div className="relative shrink-0 mt-0.5">
                        <div className={`absolute inset-0 ${colorClass} rounded-lg blur-md opacity-20 group-hover:opacity-30 transition-opacity`} />
                        <Image
                          src={cert.image.url}
                          alt={cert.badge_template.name}
                          width={48}
                          height={48}
                          className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain bg-white dark:bg-slate-900"
                          unoptimized
                        />
                      </div>

                      {/* Text content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {cert.badge_template.name}
                        </h4>

                        {/* Meta info — stacked on mobile, inline on sm+ */}
                        <div className="mt-1.5 flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-3">
                          {/* Issuer */}
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-block w-2 h-2 rounded-full ${colorClass}`} />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {issuerName}
                            </span>
                          </div>

                          {/* Date + Expiry */}
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-slate-400 dark:text-slate-500">
                              {issuedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </span>
                            {cert.expires_at_date && (
                              <>
                                <span className="text-slate-300 dark:text-slate-600">·</span>
                                <span className="text-amber-600 dark:text-amber-400 font-medium">
                                  Exp {new Date(cert.expires_at_date).getFullYear()}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Award icon — hidden on very small screens */}
                      <FontAwesomeIcon
                        icon={faAward}
                        className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-sky-400 transition-colors mt-1 hidden sm:block shrink-0"
                      />
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
