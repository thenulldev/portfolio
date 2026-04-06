"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Your Substack URL
const SUBSTACK_URL = "https://thatnulldev.substack.com";
const SUBSTACK_EMBED_URL = "https://thatnulldev.substack.com/embed";

export default function NewsletterSignup(): React.JSX.Element {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <Card className="mt-12 border-slate-200 dark:border-slate-700">
      <CardContent className="p-8 sm:p-10">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
            Subscribe to My Newsletter
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Get notified when I publish new articles about cybersecurity, IT career tips, and learning resources. 
            Delivered straight to your inbox.
          </p>

          {!showEmbed ? (
            <div className="space-y-4">
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                Subscribe on Substack
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <button
                onClick={() => setShowEmbed(true)}
                className="block w-full text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                Or subscribe here
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <iframe
                src={SUBSTACK_EMBED_URL}
                width="100%"
                height="320"
                style={{ border: "1px solid #EEE", background: "white", borderRadius: "8px" }}
                frameBorder="0"
                scrolling="no"
                title="Substack Subscription Form"
              />
              <button
                onClick={() => setShowEmbed(false)}
                className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Hide form
              </button>
            </div>
          )}

          {/* Substack Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <span>Powered by</span>
            <a 
              href="https://substack.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
              </svg>
              Substack
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
