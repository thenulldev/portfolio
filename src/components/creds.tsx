"use client";

import React from "react";
import { useCertifications } from "./useCertifications";

export default function Credential(): React.JSX.Element {
  const { certifications, loading, error, lastUpdated } = useCertifications();

  if (loading) {
    return (
      <div className="text-black flex flex-wrap justify-center items-center">
        <div className="w-full sm:w-64 h-80 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-4 m-4 shadow-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          <p className="mt-2 text-sm text-gray-600">Loading certifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-black flex flex-wrap justify-center items-center">
        <div className="w-full sm:w-64 h-80 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-4 m-4 shadow-md">
          <p className="text-red-600 text-sm text-center">Error loading certifications</p>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-black flex flex-wrap justify-center items-center">
      {certifications.length === 0 ? (
        <div className="w-full sm:w-64 h-80 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-4 m-4 shadow-md">
          <p className="text-gray-600 text-center">No certifications found</p>
        </div>
      ) : (
        <>
          {certifications.map((item) => (
            <figure
              key={item.id}
              className="w-full sm:w-64 h-80 flex flex-col items-center justify-start bg-slate-100 rounded-xl p-4 m-4 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <img
                className="w-32 h-32 rounded-lg object-contain"
                src={item.image.url}
                alt={item.badge_template.name}
              />
              <div className="mt-4 text-center flex-1 flex flex-col justify-center">
                <h1 className="text-lg font-bold leading-tight overflow-hidden text-ellipsis">
                  {item.badge_template.name}
                </h1>
              </div>
            </figure>
          ))}
          {lastUpdated && (
            <div className="w-full text-center mt-4">
              <p className="text-xs text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
