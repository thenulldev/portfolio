"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import CertificationGrid from "./CertificationGrid";
import { useCertifications } from "@/hooks/useCertifications";
import { Root } from "@/types";
import {
    Badge,
    SectionContainer,
    SectionDivider,
    SectionHeader,
    LoadingState,
    ErrorState,
    EmptyState,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui";

export default function SkillsAndCertifications(): React.JSX.Element {
    const { certifications, loading, error } = useCertifications();
    const [selectedCert, setSelectedCert] = useState<Root | null>(null);
    const [selectedIssuer, setSelectedIssuer] = useState<string | null>(null);

    const issuers = useMemo(() => {
        const uniqueIssuers = new Set<string>();
        certifications.forEach(cert => {
            const issuerName = cert.issuer.entities[0]?.entity.name;
            if (issuerName) {
                uniqueIssuers.add(issuerName);
            }
        });
        return Array.from(uniqueIssuers).sort();
    }, [certifications]);

    const filteredCertifications = useMemo(() => {
        if (!selectedIssuer) return certifications;
        return certifications.filter(cert => cert.issuer.entities[0]?.entity.name === selectedIssuer);
    }, [certifications, selectedIssuer]);

    if (loading) {
        return <LoadingState title="Skills & Certifications" message="Loading your professional profile..." />;
    }

    if (error) {
        return <ErrorState title="Skills & Certifications" error={error} />;
    }

    return (
        <SectionContainer maxWidth="7xl" variant="transparent">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-sky-600 dark:text-sky-400">{certifications.length}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Certifications</div>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-sky-600 dark:text-sky-400">{issuers.length}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Issuers</div>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-sky-600 dark:text-sky-400">
                        {[...new Set(certifications.flatMap(c => c.badge_template.skills.map(s => s.name)))].length}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Unique Skills</div>
                </div>
            </div>

            <SectionHeader
                title="Skills & Certifications"
                description="Professional certifications and technical expertise across cloud, security, and infrastructure domains."
            />

            {/* Issuer Filter */}
            {certifications.length > 0 && issuers.length > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8 w-full">
                    <button
                        onClick={() => setSelectedIssuer(null)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${selectedIssuer === null
                                ? "bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300 shadow-sm ring-1 ring-sky-200/50 dark:ring-sky-700/50"
                                : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-700 hover:text-sky-600 dark:hover:text-sky-400 shadow-sm"
                            }`}
                    >
                        All Issuers
                    </button>
                    {issuers.map(issuer => (
                        <button
                            key={issuer}
                            onClick={() => setSelectedIssuer(issuer)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${selectedIssuer === issuer
                                    ? "bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300 shadow-sm ring-1 ring-sky-200/50 dark:ring-sky-700/50"
                                    : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-700 hover:text-sky-600 dark:hover:text-sky-400 shadow-sm"
                                }`}
                        >
                            {issuer}
                        </button>
                    ))}
                </div>
            )}

            {/* Certification Timeline (replaces card grid) */}
            <div className="mb-12">
                <SectionDivider title="Certification Timeline" subtitle="Career progression over time" />

                {certifications.length === 0 ? (
                    <EmptyState title="No certifications found" />
                ) : filteredCertifications.length === 0 ? (
                    <EmptyState title="No certifications found for this issuer" />
                ) : (
                    <CertificationGrid
                        certifications={filteredCertifications}
                        onSelectCert={setSelectedCert}
                    />
                )}
            </div>

            {/* Cert Detail Dialog */}
            <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
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
                                            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl shadow-md bg-white dark:bg-slate-900 p-2"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="text-center sm:text-left space-y-2">
                                        <DialogTitle className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                                            {selectedCert.badge_template.name}
                                        </DialogTitle>
                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                            <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 text-xs sm:text-sm">
                                                {selectedCert.issuer.entities[0]?.entity.name || 'Certified'}
                                            </Badge>
                                            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                                {new Date(selectedCert.issued_at_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                            </span>
                                            {selectedCert.expires_at_date && (
                                                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                                    Expires: {new Date(selectedCert.expires_at_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                </span>
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
                                            {selectedCert.badge_template.skills.map((skill) => (
                                                <Badge
                                                    key={skill.name}
                                                    variant="outline"
                                                    className="text-xs border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                >
                                                    {skill.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedCert.verification_url && (
                                    <div className="flex justify-end pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-700">
                                        <a
                                            href={selectedCert.verification_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center rounded-md text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 sm:h-10 px-3 sm:px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                                        >
                                            View Credential
                                        </a>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </SectionContainer>
    );
}
