"use client";
"use client";

import React from "react";
import Image from "next/image";
import SkillList from "./SkillList";
import { useCertifications } from "./useCertifications";
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
    CheckmarkBadge
} from "./ui";

export default function SkillsAndCertifications(): React.JSX.Element {
    const { skills, skillCounts, certifications, loading, error } = useCertifications();

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
                    <div className="flex flex-wrap justify-center gap-6 w-full">
                        {certifications.map((item) => (
                            <Card
                                key={item.id}
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
                                        <CheckmarkBadge size="sm" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
