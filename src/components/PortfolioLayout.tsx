"use client";

import React, { useState } from "react";
import Image from "next/image";
import Social from "@components/socials";
import BlogSection from "@components/blog/BlogSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faGraduationCap, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import SkillsAndCertifications from "@components/SkillsAndCertifications";
import LearningDashboard from "@components/LearningDashboard";

type Tab = "skills" | "certifications" | "learning" | "blog";

export default function PortfolioLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("skills");

  const renderContent = () => {
    switch (activeTab) {
      case "skills":
        return <SkillsAndCertifications />;
      case "learning":
        return <LearningDashboard />;
      case "blog":
        return <BlogSection />;
      default:
        return <SkillsAndCertifications />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-900 font-[family-name:var(--font-geist-sans)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex fixed lg:static inset-y-0 left-0 z-40 w-80 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-col overflow-y-auto shadow-xl">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="relative w-40 h-40 mb-6 group">
            <div className="absolute inset-0 bg-sky-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <Image
              className="relative object-cover rounded-full shadow-lg border-4 border-white dark:border-slate-700 group-hover:scale-105 transition-transform duration-300"
              src="/avatar.png"
              alt="Stephen Freerking"
              fill
              priority
            />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Stephen Freerking
          </h1>
          <p className="text-sky-600 dark:text-sky-400 font-medium mb-6 bg-sky-50 dark:bg-sky-900/30 px-3 py-1 rounded-full text-sm">
            IT Professional
          </p>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
            I love technology and breaking things to see how they work. I
            have a passion for learning and am always looking for new ways
            to apply my skills.
          </p>

          <div className="mb-2">
            <Social />
          </div>
        </div>

        <nav className="flex-1 px-4 pb-8">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("skills")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === "skills"
                  ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 font-semibold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeTab === "skills"
                  ? "bg-sky-100 dark:bg-sky-800/50"
                  : "bg-slate-100 dark:bg-slate-700 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20"
                  }`}>
                  <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                </div>
                Skills & Certifications
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("learning")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === "learning"
                  ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 font-semibold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeTab === "learning"
                  ? "bg-sky-100 dark:bg-sky-800/50"
                  : "bg-slate-100 dark:bg-slate-700 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20"
                  }`}>
                  <FontAwesomeIcon icon={faGraduationCap} className="w-4 h-4" />
                </div>
                Learning Journey
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("blog")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === "blog"
                  ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 font-semibold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeTab === "blog"
                  ? "bg-sky-100 dark:bg-sky-800/50"
                  : "bg-slate-100 dark:bg-slate-700 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20"
                  }`}>
                  <FontAwesomeIcon icon={faNewspaper} className="w-4 h-4" />
                </div>
                Blog & Articles
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-6 text-center text-xs text-slate-400 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <p>Made with <span className="text-red-500">♥️</span> by Stephen F</p>
          <p className="mt-1">© {new Date().getFullYear()}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto scroll-smooth bg-slate-50 dark:bg-slate-900 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto p-4 sm:p-8 lg:p-12 min-h-full">

          {/* Mobile Profile View */}
          <div className="lg:hidden flex flex-col items-center text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="relative w-32 h-32 mb-4 group">
              <div className="absolute inset-0 bg-sky-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <Image
                className="relative object-cover rounded-full shadow-lg border-4 border-white dark:border-slate-700 group-hover:scale-105 transition-transform duration-300"
                src="/avatar.png"
                alt="Stephen Freerking"
                fill
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
              Stephen Freerking
            </h1>
            <p className="text-sky-600 dark:text-sky-400 font-medium mb-4 bg-sky-50 dark:bg-sky-900/30 px-3 py-1 rounded-full text-sm inline-block">
              IT Professional
            </p>
            <div className="mb-6">
              <Social />
            </div>
            <div className="w-full h-px bg-slate-200 dark:bg-slate-700 mb-6"></div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          <button
            onClick={() => setActiveTab("skills")}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === "skills"
              ? "text-sky-600 dark:text-sky-400"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            <FontAwesomeIcon icon={faCode} className="w-5 h-5" />
            <span className="text-[10px] font-medium">Skills</span>
          </button>

          <button
            onClick={() => setActiveTab("learning")}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === "learning"
              ? "text-sky-600 dark:text-sky-400"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            <FontAwesomeIcon icon={faGraduationCap} className="w-5 h-5" />
            <span className="text-[10px] font-medium">Learning</span>
          </button>

          <button
            onClick={() => setActiveTab("blog")}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === "blog"
              ? "text-sky-600 dark:text-sky-400"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            <FontAwesomeIcon icon={faNewspaper} className="w-5 h-5" />
            <span className="text-[10px] font-medium">Blog</span>
          </button>
        </div>
      </div>
    </div>
  );
}
