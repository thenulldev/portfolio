"use client";
"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import SkillList from "./SkillList";
import { useCertifications } from "@/hooks/useCertifications";
import { Root } from "@/types";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Badge,
    SectionContainer,
    LoadingState,
    ErrorState,
    EmptyState,
    CheckmarkBadge,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui";

export default function SkillsAndCertifications(): React.JSX.Element {
    const { skills, skillCounts, certifications, loading, error } = useCertifications();
    const [selectedCert, setSelectedCert] = useState<Root | null>(null);

    if (loading) {
        return <LoadingState title="Skills & Certifications" message="Loading your professional profile..." />;
    }

    if (error) {
        return <ErrorState title="Skills & Certifications" error={error} />;
    }

    return (
        <SectionContainer maxWidth="7xl">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                    Skills & Certifications
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    A comprehensive overview of my technical expertise and professional qualifications.
                </p>
            </div>

            {/* Certifications Section */}
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-sm">
                        Professional Certifications
                    </h3>
                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                </div>

                {certifications.length === 0 ? (
                    <EmptyState title="No certifications found" />
                ) : (
                    <>
                        <div className="flex flex-wrap justify-center gap-6 w-full">
                            {certifications.map((item) => (
                                <Card
                                    key={item.id}
                                    onClick={() => setSelectedCert(item)}
                                    className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] h-72 sm:h-80 flex flex-col items-center justify-start bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-500 group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-8">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-sky-100 dark:bg-sky-900/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <Image
                                                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain shadow-sm group-hover:scale-105 transition-transform duration-300"
                                                src={item.image.url}
                                                alt={item.badge_template.name}
                                                width={96}
                                                height={96}
                                                unoptimized
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="text-center flex-1 flex flex-col justify-center pt-0 px-6 pb-6 w-full">
                                        <CardTitle className="text-base font-bold leading-tight text-slate-800 dark:text-slate-200 mb-3 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                            {item.badge_template.name}
                                        </CardTitle>

                                        <div className="mt-auto w-full pt-4 border-t border-slate-100 dark:border-slate-700/50 flex flex-col items-center gap-2">
                                            <Badge variant="secondary" className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                                {item.issuer.entities[0]?.entity.name || 'Certified'}
                                            </Badge>
                                            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                                                {new Date(item.issued_at_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
                            <DialogContent className="sm:max-w-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                                {selectedCert && (
                                    <>
                                        <DialogHeader className="flex flex-col items-center sm:items-start gap-4 mb-4">
                                            <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                                                <div className="relative shrink-0">
                                                    <div className="absolute inset-0 bg-sky-100 dark:bg-sky-900/30 rounded-xl blur-lg"></div>
                                                    <Image
                                                        src={selectedCert.image.url}
                                                        alt={selectedCert.badge_template.name}
                                                        width={120}
                                                        height={120}
                                                        className="relative rounded-xl shadow-md bg-white dark:bg-slate-900 p-2"
                                                        unoptimized
                                                    />
                                                </div>
                                                <div className="text-center sm:text-left space-y-2">
                                                    <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                                        {selectedCert.badge_template.name}
                                                    </DialogTitle>
                                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                                        <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                                                            {selectedCert.issuer.entities[0]?.entity.name || 'Certified'}
                                                        </Badge>
                                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                                            Issued: {new Date(selectedCert.issued_at_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                        </span>
                                                        {selectedCert.expires_at_date && (
                                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                                • Expires: {new Date(selectedCert.expires_at_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogHeader>

                                        <div className="space-y-6">
                                            <DialogDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                                                {selectedCert.badge_template.description}
                                            </DialogDescription>

                                            {selectedCert.badge_template.skills?.length > 0 && (
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                                                        Skills Validated
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedCert.badge_template.skills.map((skill) => (
                                                            <Badge
                                                                key={skill.name}
                                                                variant="outline"
                                                                className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                            >
                                                                {skill.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
                                                <a
                                                    href={`https://www.credly.com/badges/${selectedCert.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                                >
                                                    View on Credly
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </div>

            {/* Skills Section */}
            <div>
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-sm">
                        Technical Expertise
                    </h3>
                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {skills.length === 0 ? (
                        <p className="text-slate-600 dark:text-slate-400 font-medium text-center">No skills found</p>
                    ) : (
                        <SkillList skills={skills} skillCounts={skillCounts} />
                    )}
                </div>
            </div>
        </SectionContainer>
    );
}
