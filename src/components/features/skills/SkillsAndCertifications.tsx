"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import CertificationGrid from "./CertificationGrid";
import { faShieldHalved, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Root } from "@/types";
import { ProcessedCerts } from "@/lib/skills";
import {
    Badge,
    SectionContainer,
    SectionDivider,
    SectionHeader,
    EmptyState,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui";

interface SkillsAndCertificationsProps {
    /** Server-fetched cert list. The data the SSR HTML was rendered with. */
    initialCerts: Root[];
}

/**
 * The Skills tab body.
 *
 * Receives the cert list from a Server Component (parent: SkillsTab)
 * so the grid is server-rendered into the initial HTML. This Client
 * Component is responsible for:
 *
 *   - Computing the issuer filter chip list
 *   - Toggling visibility of cert cards to match the selected issuer
 *     via data-issuer attribute matching + CSS [hidden]
 *   - Opening a detail dialog when a cert card is clicked (event
 *     delegation on the grid container, so no per-card React state)
 *
 * No data fetch on first paint, no loading flash.
 */
export default function SkillsAndCertifications({
    initialCerts,
}: SkillsAndCertificationsProps): React.JSX.Element {
    const [selectedCert, setSelectedCert] = useState<Root | null>(null);
    const [selectedIssuer, setSelectedIssuer] = useState<string | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);

    // The certs prop is the source of truth on first render. We
    // intentionally do NOT subscribe to the client `useCertifications`
    // hook here — that would re-introduce the loading flash on hydrate.
    // If a refresh is desired later, wire it via an explicit "Refresh"
    // button calling useCertifications().refetch().
    const certifications = initialCerts;

    const issuers = useMemo(() => {
        const uniqueIssuers = new Set<string>();
        certifications.forEach((cert) => {
            const issuerName = cert.issuer.entities[0]?.entity.name;
            if (issuerName) uniqueIssuers.add(issuerName);
        });
        return Array.from(uniqueIssuers).sort();
    }, [certifications]);

    const uniqueSkillsCount = useMemo(() => {
        const names = new Set<string>();
        certifications.forEach((cert) => {
            cert.badge_template.skills.forEach((s) => names.add(s.name));
        });
        return names.size;
    }, [certifications]);

    // After hydration, attach click-to-dialog behavior to every card
    // via event delegation on the grid container. The SSR'd HTML
    // already has the cards in place; this just wires interactivity.
    useEffect(() => {
        const root = gridRef.current;
        if (!root) return;

        const handleClick = (event: MouseEvent) => {
            // Don't open the dialog when the user clicks an explicit
            // anchor inside the card (e.g. the verify-credential link).
            const target = event.target as HTMLElement | null;
            if (target?.closest("a[href]")) return;

            const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(
                "[data-cert-card]"
            );
            const certId = card?.dataset.certId;
            if (!certId) return;
            const cert = certifications.find((c) => c.id === certId);
            if (cert) setSelectedCert(cert);
        };

        root.addEventListener("click", handleClick);
        return () => root.removeEventListener("click", handleClick);
    }, [certifications]);

    // CSS for the filter: hide non-matching cards when a filter is
    // active, while keeping them in the DOM (no layout pop-in, no
    // re-render cost — just a class toggle on the grid container).
    const filterStyle = selectedIssuer
        ? `[data-cert-card]:not([data-issuer="${CSS.escape(selectedIssuer)}"]) { display: none; }`
        : "";

    return (
        <SectionContainer maxWidth="7xl" variant="transparent">
            <style dangerouslySetInnerHTML={{ __html: filterStyle }} />

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-sky-600 dark:text-sky-400">
                        {certifications.length}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Certifications
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-sky-600 dark:text-sky-400">
                        {issuers.length}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Issuers
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-sky-600 dark:text-sky-400">
                        {uniqueSkillsCount}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Unique Skills
                    </div>
                </div>
            </div>

            <SectionHeader
                title="Skills & Certifications"
                description="Professional certifications and technical expertise across cloud, security, and infrastructure domains."
            />

            {/* Issuer Filter — client-side, hides cards via CSS rule above */}
            {certifications.length > 0 && issuers.length > 1 && (
                <div
                    className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8 w-full"
                    role="tablist"
                    aria-label="Filter certifications by issuer"
                >
                    <button
                        role="tab"
                        aria-selected={selectedIssuer === null}
                        onClick={() => setSelectedIssuer(null)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                            selectedIssuer === null
                                ? "bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300 shadow-sm ring-1 ring-sky-200/50 dark:ring-sky-700/50"
                                : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-700 hover:text-sky-600 dark:hover:text-sky-400 shadow-sm"
                        }`}
                    >
                        All Issuers
                    </button>
                    {issuers.map((issuer) => (
                        <button
                            role="tab"
                            key={issuer}
                            aria-selected={selectedIssuer === issuer}
                            onClick={() => setSelectedIssuer(issuer)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                                selectedIssuer === issuer
                                    ? "bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300 shadow-sm ring-1 ring-sky-200/50 dark:ring-sky-700/50"
                                    : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-700 hover:text-sky-600 dark:hover:text-sky-400 shadow-sm"
                            }`}
                        >
                            {issuer}
                        </button>
                    ))}
                </div>
            )}

            {/* Certification Timeline */}
            <div className="mb-12" ref={gridRef}>
                <SectionDivider
                    title="Certification Timeline"
                    subtitle="Career progression over time"
                />

                {certifications.length === 0 ? (
                    <EmptyState title="No certifications found" />
                ) : (
                    <CertificationGrid certifications={certifications} />
                )}
            </div>

            {/* Cert Detail Dialog */}
            <Dialog
                open={!!selectedCert}
                onOpenChange={(open) => !open && setSelectedCert(null)}
            >
                <DialogContent className="w-[95vw] sm:w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                    {selectedCert && (
                        <>
                            <DialogHeader className="flex flex-col items-center sm:items-start gap-3 sm:gap-4 mb-4">
                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
                                    <div className="relative shrink-0">
                                        <div className="absolute inset-0 bg-sky-100 dark:bg-sky-900/30 rounded-xl blur-lg"></div>
                                        <Image
                                            src={selectedCert.image.url}
                                            alt={selectedCert.badge_template.name}
                                            width={100}
                                            height={100}
                                            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl shadow-md bg-white dark:bg-white p-2 border border-slate-100 dark:border-slate-300"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="text-center sm:text-left space-y-2">
                                        <DialogTitle className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                                            {selectedCert.badge_template.name}
                                        </DialogTitle>
                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                            <Badge
                                                variant="secondary"
                                                className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 text-xs sm:text-sm"
                                            >
                                                {selectedCert.issuer.entities[0]?.entity.name ||
                                                    "Certified"}
                                            </Badge>
                                            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                                {new Date(
                                                    selectedCert.issued_at_date
                                                ).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            {selectedCert.expires_at_date && (
                                                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                                    Expires:{" "}
                                                    {new Date(
                                                        selectedCert.expires_at_date
                                                    ).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            )}
                                            {selectedCert.verification_url && (
                                                <a
                                                    href={selectedCert.verification_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs sm:text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faExternalLinkAlt}
                                                        className="w-3 h-3"
                                                    />
                                                    Verify on Credly
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </DialogHeader>

                            <div className="space-y-4 sm:space-y-6">
                                <DialogDescription className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                                    {selectedCert.badge_template.description}
                                </DialogDescription>

                                {selectedCert.badge_template.skills?.length > 0 && (
                                    <div className="space-y-2 sm:space-y-3">
                                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                                            Skills Validated
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {selectedCert.badge_template.skills.map(
                                                (skill) => (
                                                    <Badge
                                                        key={skill.name}
                                                        variant="outline"
                                                        className="text-xs border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                    >
                                                        {skill.name}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {selectedCert.verification_url && (
                                    <a
                                        href={selectedCert.verification_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-sky-600 text-white dark:bg-sky-500 dark:text-white hover:bg-sky-700 dark:hover:bg-sky-600 transition-colors font-medium text-sm sm:text-base"
                                    >
                                        <FontAwesomeIcon
                                            icon={faShieldHalved}
                                            className="w-4 h-4"
                                        />
                                        Verify on Credly
                                        <FontAwesomeIcon
                                            icon={faExternalLinkAlt}
                                            className="w-3 h-3 opacity-70"
                                        />
                                    </a>
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </SectionContainer>
    );
}

// Re-export the ProcessedCerts shape so importing this module gives
// you the data contract — useful for tests or downstream consumers.
export type { ProcessedCerts };
