"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";

export default function PreviewBanner(): React.ReactElement | null {
    const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";
    const branch = process.env.NEXT_PUBLIC_BRANCH_NAME;

    if (!isPreview) return null;

    return (
        <div className="sticky top-0 z-[100] bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-800 dark:text-amber-200">
                <FontAwesomeIcon icon={faCodeBranch} className="w-3 h-3" />
                <span className="font-medium">Preview Deployment</span>
                <span className="text-amber-600/60 dark:text-amber-400/60">·</span>
                <span className="font-mono text-xs bg-amber-100 dark:bg-amber-800/50 px-1.5 py-0.5 rounded">
                    {branch || "unknown"}
                </span>
            </div>
        </div>
    );
}
