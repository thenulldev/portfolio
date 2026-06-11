"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation, faCircleXmark, faArrowRotateRight, faServer, faGlobe } from "@fortawesome/free-solid-svg-icons";

type ServiceStatus = "up" | "down" | "slow";

interface ServiceCheck {
  name: string;
  status: ServiceStatus;
  latency: number;
  error?: string;
}

interface StatusData {
  status: "healthy" | "degraded" | "operational";
  checkedAt: string;
  uptime: string;
  services: ServiceCheck[];
}

function StatusDot({ status }: { status: ServiceStatus }) {
  const colors = {
    up: "bg-emerald-500",
    slow: "bg-amber-500",
    down: "bg-red-500",
  };

  const icons = {
    up: faCircleCheck,
    slow: faCircleExclamation,
    down: faCircleXmark,
  };

  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={icons[status]} className={`w-4 h-4 ${colors[status]} rounded-full`} />
    </div>
  );
}

function StatusBadge({ status }: { status: "healthy" | "degraded" | "operational" }) {
  const styles = {
    healthy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    operational: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    degraded: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
      <span className={`w-2 h-2 rounded-full animate-pulse ${
        status === "healthy" ? "bg-emerald-500" :
        status === "operational" ? "bg-sky-500" : "bg-amber-500"
      }`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function StatusPage() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date());
    } catch (err) {
      setData({
        status: "degraded",
        checkedAt: new Date().toISOString(),
        uptime: "unknown",
        services: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 mb-4">
            <FontAwesomeIcon icon={faServer} className="w-3 h-3" />
            System Status
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            thenull.dev Status
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Real-time monitoring of portfolio infrastructure and external service dependencies.
          </p>
        </div>

        {/* Overall Status Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {data ? (
                <StatusBadge status={data.status} />
              ) : (
                <div className="w-24 h-6 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
              )}
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {data ? `Uptime: ${data.uptime}` : "Checking..."}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Refreshes automatically
              </span>
              <button
                onClick={fetchStatus}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faArrowRotateRight} className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          {data && (
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/50 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {data.services.filter(s => s.status === "up").length}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Healthy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {data.services.filter(s => s.status === "slow").length}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Slow</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {data.services.filter(s => s.status === "down").length}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Down</div>
              </div>
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            External Dependencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {loading || !data ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 animate-pulse">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                </div>
              ))
            ) : data.services.length === 0 ? (
              <div className="col-span-full text-center py-8 text-slate-500 dark:text-slate-400">
                No services configured for monitoring.
              </div>
            ) : (
              data.services.map((service) => (
                <div
                  key={service.name}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <StatusDot status={service.status} />
                    <div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {service.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {service.latency}ms
                      </div>
                    </div>
                  </div>
                  {service.error && (
                    <span className="text-xs text-red-500 dark:text-red-400 truncate max-w-[120px]" title={service.error}>
                      {service.error}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Incident History (placeholder) */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Recent Incidents
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center">
            <FontAwesomeIcon icon={faGlobe} className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No incidents in the last 30 days.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              All systems operating normally.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 dark:text-slate-500">
          <p>
            Last checked: {lastRefresh.toLocaleTimeString()} · Auto-refreshes every 30s
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1 mt-2 text-sky-600 dark:text-sky-400 hover:underline"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
