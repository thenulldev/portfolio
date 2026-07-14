import React from "react";
import Image from "next/image";
import { Root } from "@/types";
import { Badge } from "@/components/ui";

/**
 * Server-rendered cert grid.
 *
 * Why a Server Component (no "use client"):
 *   - Crawlers see the cert list, names, issuers, dates, and skills
 *     in the initial HTML response, not a loading skeleton.
 *   - Each cert card is an <article> with rich semantic markup.
 *   - The "Verify" link is a real anchor with a real destination
 *     so search engines can crawl it.
 *
 * Interactivity model:
 *   - This component renders the static markup.
 *   - The parent (SkillsAndCertifications, client component)
 *     attaches a click-handler to each card after hydration, which
 *     opens the existing detail dialog.
 *   - Filters work by toggling visibility on cards via data attributes
 *     the server already emits (data-issuer="Microsoft", etc.).
 *
 * No client state lives in this file — that's intentional. Mixing it
 * in would force a `"use client"` boundary that breaks RSC streaming
 * for the rest of the layout.
 */

interface CertificationGridProps {
  certifications: Root[];
}

interface YearGroup {
  year: number;
  certs: Root[];
}

const ISSUER_COLORS: Record<string, string> = {
  Microsoft: "bg-blue-500",
  CompTIA: "bg-red-500",
  AWS: "bg-orange-500",
  Google: "bg-emerald-500",
  ISC2: "bg-purple-500",
  "Offensive Security": "bg-slate-700",
  LPI: "bg-yellow-500",
  TryHackMe: "bg-green-600",
};

function getIssuerColor(issuerName: string): string {
  return ISSUER_COLORS[issuerName] || "bg-sky-500";
}

function getExpiryStatus(
  expiresAt?: string | null
): { label: string; color: string } | null {
  if (!expiresAt) return null;
  const exp = new Date(expiresAt);
  const now = new Date();
  const months =
    (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (months < 0)
    return {
      label: "Expired",
      color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20",
    };
  if (months < 6)
    return {
      label: `Exp ${Math.ceil(months)}mo`,
      color:
        "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20",
    };
  return null;
}

function groupByYear(certs: Root[]): YearGroup[] {
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

export default function CertificationGrid({
  certifications,
}: CertificationGridProps): React.JSX.Element {
  const grouped = groupByYear(certifications);

  return (
    <div className="space-y-8 sm:space-y-10">
      {grouped.map(({ year, certs }) => (
        <section key={year} aria-label={`Certifications from ${year}`}>
          {/* Year header */}
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 dark:bg-slate-100 flex items-center justify-center shadow-md shrink-0"
              aria-hidden="true"
            >
              <span className="text-[10px] sm:text-xs font-bold text-white dark:text-slate-900">
                {year.toString().slice(-2)}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
              {year}
            </h3>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 shrink-0">
              {certs.length} cert{certs.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grid */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            data-skill-grid
          >
            {certs.map((cert) => {
              const issuerName =
                cert.issuer.entities[0]?.entity.name || "Certified";
              const issuerDot = getIssuerColor(issuerName);
              const issued = new Date(cert.issued_at_date);
              const dateStr = issued.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              });
              const expiry = getExpiryStatus(cert.expires_at_date);
              const skills = cert.badge_template.skills?.slice(0, 3) || [];
              const fullSkills = cert.badge_template.skills || [];

              return (
                <article
                  key={cert.id}
                  data-issuer={issuerName}
                  data-cert-card
                  data-cert-id={cert.id}
                  className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-sky-200 dark:hover:border-sky-700"
                >
                  {/* Top row: badge image + optional expiry badge */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 ${issuerDot} rounded-lg blur-md opacity-15 group-hover:opacity-25 transition-opacity`}
                        aria-hidden="true"
                      />
                      <Image
                        src={cert.image.url}
                        alt={cert.badge_template.name}
                        width={56}
                        height={56}
                        className="relative w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-lg bg-white p-1 shadow-sm border border-slate-100 dark:border-slate-300"
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

                  {/* Title — h4 inside an article puts the cert under the
                      year's <h3> heading; search engines read this hierarchy */}
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug mb-1 sm:mb-1.5 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {cert.badge_template.name}
                  </h4>

                  {/* Meta — issuer + date */}
                  <div className="flex items-center gap-1.5 mb-2 sm:mb-3 text-[10px] sm:text-xs">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${issuerDot}`}
                      aria-hidden="true"
                    />
                    <span className="text-slate-500 dark:text-slate-400 truncate max-w-[80px] sm:max-w-[100px]">
                      {issuerName}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">
                      ·
                    </span>
                    <time
                      dateTime={cert.issued_at_date}
                      className="text-slate-400 dark:text-slate-500 shrink-0"
                    >
                      {dateStr}
                    </time>
                  </div>

                  {/* Skills — semantically a ul of li so screen readers
                      announce "list of N items" */}
                  {skills.length > 0 && (
                    <ul
                      className="flex flex-wrap gap-1"
                      aria-label={`Skills validated by ${cert.badge_template.name}`}
                    >
                      {skills.map((s) => (
                        <li key={s.name}>
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1 py-0 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                          >
                            {s.name}
                          </Badge>
                        </li>
                      ))}
                      {fullSkills.length > 3 && (
                        <li className="text-[10px] text-slate-400 dark:text-slate-500 self-center">
                          +{fullSkills.length - 3}
                        </li>
                      )}
                    </ul>
                  )}

                  {/* Verification link — a real anchor crawlers can follow.
                      Stays inside the article so it doesn't break the
                      dialog-click contract the parent client component
                      wires up after hydration. */}
                  {cert.verification_url && (
                    <a
                      href={cert.verification_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cert-verify
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                      title="Verify credential"
                      aria-label={`Verify ${cert.badge_template.name} (opens in new tab)`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-3 h-3 text-slate-400 dark:text-slate-500 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M432 320h-32a16 16 0 0 0-16 16v112H64V128h144a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16v384a16 16 0 0 0 16 16h384a16 16 0 0 0 16-16V336a16 16 0 0 0-16-16zM488 0H360c-21.4 0-32 25.9-16.9 41l65.6 65.6L247 268.4a16 16 0 0 0 0 22.6l22.6 22.6a16 16 0 0 0 22.6 0l161.6-161.6L520.9 217C536 232 560 222.6 560 200V24a24 24 0 0 0-24-24z" />
                      </svg>
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
