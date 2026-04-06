"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function NewsletterSignup(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setMessage("");
    
    try {
      // Call our API route that interfaces with Ghost Admin API
      const response = await fetch('/api/newsletter', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Successfully subscribed! Check your email for confirmation.");
        setEmail("");
      } else {
        throw new Error(data.error || "Failed to subscribe");
      }
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

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

          {status === "success" ? (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
              <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">✓ {message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
              {status === "error" && (
                <p className="text-red-600 dark:text-red-400 text-sm">{message}</p>
              )}
            </form>
          )}

          {/* Ghost Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <span>Powered by</span>
            <a 
              href="https://ghost.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Ghost
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
