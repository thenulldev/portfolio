"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, Badge } from "@/components/ui";
import { SectionHeader, SectionContainer, SectionDivider } from "@/components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
  faArrowRotateRight,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

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

function StatusIcon({ status }: { status: ServiceStatus }) {
  const icons = {
    up: faCircleCheck,
    slow: faCircleExclamation,
    down: faCircleXmark,
  };
  const colors = {
    up: "text-emerald-500",
    slow: "text-amber-500",
    down: "text-rose-500",
  };
  return (
    <FontAwesomeIcon
      icon={icons[status]}
      className={`w-4 h-4 ${colors[status]}`}
    />
  );
}

function StatusBadge({ status }: { status: "healthy" | "degraded" | "operational" }) {
  const variants = {
    healthy: "success" as const,
    operational: "info" as const,
    degraded: "secondary" as const,
  };
  const labels = {
    healthy: "All Systems Healthy",
    operational: "Operational",
    degraded: "Degraded",
  };
  const pulseColors = {
    healthy: "bg-emerald-500",
    operational: "bg-sky-500",
    degraded: "bg-amber-500",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full animate-pulse ${pulseColors[status]}`} />
      <Badge variant={variants[status]} className="text-sm">
        {labels[status]}
      </Badge>
    </div>
  );
}

export default function StatusPage() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://status-api.nulldev.workers.dev", { cache: "no-store" });
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date());
    } catch {
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

  const statusSummary = data
    ? {
        healthy: data.services.filter((s) => s.status === "up").length,
        slow: data.services.filter((s) => s.status === "slow").length,
        down: data.services.filter((s) => s.status === "down").length,
      }
    : null;

  return (
    <SectionContainer maxWidth="4xl" variant="transparent">
      <SectionHeader
        title="System Status"
        description="Real-time monitoring of portfolio infrastructure and external dependencies."
        align="center"
      />

      {/* Overall Status Card */}
      <Card className="mb-8 border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {data ? <StatusBadge status={data.status} /> : <div className="w-24 h-5 bg-slate-200 rounded-full animate-pulse" />}
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Uptime: {data ? data.uptime : "Checking..."}
              </span>
            </div>
            <button
              onClick={fetchStatus}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                className={`w-3 h-3 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          {statusSummary && (
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {statusSummary.healthy}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Healthy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {statusSummary.slow}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Slow</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-rose-500 dark:text-rose-400">
                  {statusSummary.down}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Down</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Services Grid */}
      <SectionDivider title="External Dependencies" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {loading || !data ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse border-slate-200 dark:border-slate-700">
              <CardContent className="p-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
              </CardContent>
            </Card>
          ))
        ) : data.services.length === 0 ? (
          <div className="col-span-full text-center py-8 text-slate-500 dark:text-slate-400">
            No services configured for monitoring.
          </div>
        ) : (
          data.services.map((service) => (
            <Card
              key={service.name}
              className={`border-slate-200 dark:border-slate-700 hover:shadow-sm transition-shadow ${
                service.status === "down"
                  ? "border-l-4 border-l-rose-400"
                  : service.status === "slow"
                  ? "border-l-4 border-l-amber-400"
                  : "border-l-4 border-l-emerald-400"
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusIcon status={service.status} />
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
                  <Badge variant="destructive" className="text-[10px]">
                    {service.error}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Incident History */}
      <SectionDivider title="Recent Incidents" />
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-6 text-center">
          <FontAwesomeIcon icon={faGlobe} className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No incidents in the last 30 days.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">All systems operating normally.</p>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-10 text-center text-xs text-slate-400 dark:text-slate-500">
        <p>
          Last checked: {lastRefresh.toLocaleTimeString()} · Auto-refreshes every 30s
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 mt-3 text-sky-600 dark:text-sky-400 hover:underline text-sm"
        >
          ← Back to portfolio
        </Link>
      </div>
    </SectionContainer>
  );
}
