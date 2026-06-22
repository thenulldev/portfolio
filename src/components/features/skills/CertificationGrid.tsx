"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Root } from "@/types";
import { Badge } from "@/components/ui";

interface CertificationGridProps {
  certifications: Root[];
  onSelectCert: (cert: Root) => void;
}

function getIssuerColor(issuerName: string): string {
  const colors: Record<string, string> = {
    Microsoft: "bg-blue-500",
    CompTIA: "bg-red-500",
    AWS: "bg-orange-500",
    Google: "bg-emerald-500",
    ISC2: "bg-purple-500",
    "Offensive Security": "bg-slate-700",
    LPI: "bg-yellow-500",
    TryHackMe: "bg-green-600",
  };
  return colors[issuerName] || "bg-sky-500";
}

function getIssuerBg(issuerName: string): string {
  const colors: Record<string, string> = {
    Microsoft: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
    CompTIA: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
    AWS: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
    Google: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
    ISC2: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
    "Offensive Security": "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300",
    LPI: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
    TryHackMe: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
  };
  return colors[issuerName] || "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300";
}

function getExpiryStatus(expiresAt?: string): { label: string; color: string } | null {
  if (!expiresAt) return null;
  const exp = new Date(expiresAt);
  const now = new Date();
  const months = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (months < 0) return { label: "Expired", color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20" };
  if (months < 6) return { label: `Exp ${Math.ceil(months)}mo`, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20" };
  return null;
}

function groupByYear(certs: Root[]): { year: number; certs: Root[] }[] {
  const groups: Record<number, Root[]> = {};
  certs.forEach((cert) => {
    const year = new Date(cert.issued_at_date).getFullYear();
    if (!groups[year]) groups[year] = [];
    groups[year].push(cert);
  });
  return Object.entries(groups)
    .map(([year, c]) => ({ year: parseInt(year), certs: c }))
    .sort((a, b) => b.year - a.year);
}

export default function CertificationGrid({ certifications, onSelectCert }: CertificationGridProps) {
  const grouped = useMemo(() => groupByYear(certifications), [certifications]);

  return (
    <div className="space-y-8 sm:space-y-10">
      {grouped.map(({ year, certs }) => (
        <div key={year}>
          {/* Year header */}
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 dark:bg-slate-100 flex items-center justify-center shadow-md shrink-0">
              <span className="text-[10px] sm:text-xs font-bold text-white dark:text-slate-900">
                {year.toString().slice(-2)}
              </span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
              {year}
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 shrink-0">
              {certs.length} cert{certs.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {certs.map((cert) => {
              const issuerName = cert.issuer.entities[0]?.entity.name || "Certified";
              const issuerDot = getIssuerColor(issuerName);
              const issuerBadge = getIssuerBg(issuerName);
              const issued = new Date(cert.issued_at_date);
              const dateStr = issued.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              });
              const expiry = getExpiryStatus(cert.expires_at_date);
              const skills = cert.badge_template.skills?.slice(0, 3) || [];

              return (
                <div
                  key={cert.id}
                  onClick={() => onSelectCert(cert)}
                  className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-sky-200 dark:hover:border-sky-700"
                >
                  {/* Top row: badge + status */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 ${issuerDot} rounded-lg blur-md opacity-15 group-hover:opacity-25 transition-opacity`}
                      />
                      <Image
                        src={cert.image.url}
                        alt={cert.badge_template.name}
                        width={56}
                        height={56}
                        className="relative w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-lg bg-white dark:bg-slate-900"
                        unoptimized
                      />
                    </div>
                    {expiry && (
                      <span
                        className={`text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded-md shrink-0 ${expiry.color}`}
                      >
                        {expiry.label}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug mb-1 sm:mb-1.5 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
                  >
                    {cert.badge_template.name}
                  </h4>

                  {/* Meta */}
                  <div className="flex items-center gap-1.5 mb-2 sm:mb-3 text-[10px] sm:text-xs">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${issuerDot}`} />
                    <span className="text-slate-500 dark:text-slate-400 truncate max-w-[80px] sm:max-w-[100px]">
                      {issuerName}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-slate-400 dark:text-slate-500 shrink-0">{dateStr}</span>
                  </div>

                  {/* Skills */}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {skills.map((s) => (
                        <Badge
                          key={s.name}
                          variant="outline"
                          className="text-[10px] px-1 py-0 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                        >
                          {s.name}
                        </Badge>
                      ))}
                      {cert.badge_template.skills.length > 3 && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 self-center">
                          +{cert.badge_template.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
