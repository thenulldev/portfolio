"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Social from "@components/shared/Socials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faGraduationCap, faNewspaper } from "@fortawesome/free-solid-svg-icons";

type Tab = "skills" | "certifications" | "learning" | "blog";

interface AppShellProps {
    children: React.ReactNode;
    activeTab?: Tab;
    onTabChange?: (tab: Tab) => void;
}

export default function AppShell({ children, activeTab, onTabChange }: AppShellProps) {
    const router = useRouter();

    const handleTabClick = (tab: Tab) => {
        if (onTabChange) {
            onTabChange(tab);
        } else {
            router.push("/");
        }
    };

    const navItems = [
        { id: "skills" as Tab, label: "Skills & Certifications", icon: faCode, shortLabel: "Skills" },
        { id: "learning" as Tab, label: "Learning Journey", icon: faGraduationCap, shortLabel: "Learning" },
        { id: "blog" as Tab, label: "Blog & Articles", icon: faNewspaper, shortLabel: "Blog" },
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-900 font-[family-name:var(--font-geist-sans)]">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex fixed lg:static inset-y-0 left-0 z-40 w-80 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-col overflow-y-auto">
                {/* Profile Section */}
                <div className="p-8 flex flex-col items-center text-center border-b border-slate-100 dark:border-slate-700/50">
                    <div className="relative w-36 h-36 mb-5 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <Image
                            className="relative object-cover rounded-full shadow-xl border-4 border-white dark:border-slate-600 group-hover:scale-105 transition-transform duration-300"
                            src="/avatar.png"
                            alt="Stephen Freerking"
                            fill
                            priority
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                        Stephen Freerking
                    </h1>
                    <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-5 px-4 py-1.5 bg-sky-50 dark:bg-sky-900/30 rounded-full border border-sky-100 dark:border-sky-800">
                        IT Professional
                    </p>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-xs">
                        I love technology and breaking things to see how they work. Always learning and looking for new ways to apply my skills.
                    </p>

                    <Social />
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">
                    <ul className="space-y-1.5">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleTabClick(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                                        ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 font-semibold shadow-sm border border-sky-100 dark:border-sky-800"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200"
                                        }`}
                                >
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${activeTab === item.id
                                        ? "bg-sky-100 dark:bg-sky-800/50 text-sky-600 dark:text-sky-400"
                                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20 group-hover:text-sky-600 dark:group-hover:text-sky-400"
                                        }`}>
                                        <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-6 text-center border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        Made with <span className="text-red-400">♥</span> by Stephen F
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-1">
                        © {new Date().getFullYear()} All rights reserved
                    </p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto scroll-smooth bg-slate-50 dark:bg-slate-900 pb-20 lg:pb-0">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 min-h-full">
                    
                    {/* Mobile Profile Header */}
                    <div className="lg:hidden mb-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-28 h-28 mb-4">
                                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full blur-lg opacity-20"></div>
                                <Image
                                    className="relative object-cover rounded-full shadow-lg border-4 border-white dark:border-slate-600"
                                    src="/avatar.png"
                                    alt="Stephen Freerking"
                                    fill
                                    priority
                                />
                            </div>
                            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                                Stephen Freerking
                            </h1>
                            <p className="text-xs font-medium text-sky-600 dark:text-sky-400 mb-4 px-3 py-1 bg-sky-50 dark:bg-sky-900/30 rounded-full">
                                IT Professional
                            </p>
                            <Social />
                        </div>
                        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                    </div>

                    {/* Page Content */}
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 z-50 safe-area-pb">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabClick(item.id)}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${activeTab === item.id
                                ? "text-sky-600 dark:text-sky-400"
                                : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                                }`}
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                            <span className="text-[10px] font-medium">{item.shortLabel}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
