"use client";

import React from "react";
import { useCertifications } from "./useCertifications";

export default function Credential(): React.JSX.Element {
  const { certifications, loading, error } = useCertifications();

  if (loading) {
    return (
      <div className="text-black flex flex-wrap justify-center items-center gap-6 p-4">
        <div className="w-full sm:w-72 h-96 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
          <p className="mt-4 text-sm text-slate-600 font-medium">Loading certifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-black flex flex-wrap justify-center items-center gap-6 p-4">
        <div className="w-full sm:w-72 h-96 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 shadow-lg border border-red-200">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-700 text-sm text-center font-medium">Error loading certifications</p>
          <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-black flex flex-wrap justify-center items-center gap-6 p-4">
      {certifications.length === 0 ? (
        <div className="w-full sm:w-72 h-96 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-slate-600 text-center font-medium">No certifications found</p>
        </div>
      ) : (
        certifications.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-72 h-96 flex flex-col items-center justify-start bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-sky-200 group"
          >
            <div className="relative mb-6">
              <img
                className="w-24 h-24 rounded-xl object-contain shadow-md group-hover:scale-105 transition-transform duration-300"
                src={item.image.url}
                alt={item.badge_template.name}
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-center flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-bold leading-tight text-slate-800 mb-2 line-clamp-3">
                {item.badge_template.name}
              </h3>
              <div className="flex items-center justify-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                  {item.issuer.entities[0]?.entity.name || 'Certified'}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(item.issued_at_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
