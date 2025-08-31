"use client";

import React from "react";
import { useCertifications } from "./useCertifications";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function Credential(): React.JSX.Element {
  const { certifications, loading, error } = useCertifications();

  if (loading) {
    return (
      <div className="mx-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-7xl border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Certifications</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent"></div>
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 font-medium">Loading certifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-7xl border border-red-200 dark:border-red-800 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Certifications</h2>
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-700 dark:text-red-400 text-sm font-medium">Error loading certifications</p>
          <p className="text-xs text-red-500 dark:text-red-400 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 font-[family-name:var(--font-poppins-sans)] w-full sm:w-auto max-w-7xl border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">Certifications</h2>
        <p className="text-slate-600 dark:text-slate-400">Professional credentials and achievements</p>
      </div>
      
      {certifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">No certifications found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certifications.map((item) => (
            <HoverCard key={item.id}>
              <HoverCardTrigger asChild>
                <Card className="h-80 flex flex-col items-center justify-start bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 border-slate-200 dark:border-slate-600 hover:border-sky-200 dark:hover:border-sky-500 group cursor-pointer transition-all duration-300 hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <img
                        className="w-20 h-20 rounded-xl object-contain shadow-md group-hover:scale-105 transition-transform duration-300"
                        src={item.image.url}
                        alt={item.badge_template.name}
                      />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center flex-1 flex flex-col justify-center pt-0">
                    <CardTitle className="text-base font-bold leading-tight text-slate-800 dark:text-slate-200 mb-2 line-clamp-3">
                      {item.badge_template.name}
                    </CardTitle>
                    <div className="flex flex-col items-center space-y-2">
                      <Badge variant="info" className="text-xs">
                        {item.issuer.entities[0]?.entity.name || 'Certified'}
                      </Badge>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(item.issued_at_date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">{item.badge_template.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.badge_template.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-600">
                    <span>Issued: {new Date(item.issued_at_date).toLocaleDateString()}</span>
                    <span>Expires: {new Date(item.expires_at_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      )}
    </div>
  );
}
