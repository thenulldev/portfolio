"use client";

import React from "react";
import { useCertifications } from "./useCertifications";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Badge,
  SectionContainer,
  SectionHeader,
  LoadingState,
  ErrorState,
  EmptyState,
  CheckmarkBadge
} from "./ui";

export default function Credential(): React.JSX.Element {
  const { certifications, loading, error } = useCertifications();

  if (loading) {
    return <LoadingState title="Certifications" message="Loading certifications..." />;
  }

  if (error) {
    return <ErrorState title="Certifications" error={error} />;
  }

  return (
    <SectionContainer>
      <SectionHeader 
        title="Certifications" 
        description="Professional credentials and achievements" 
      />
      
      {certifications.length === 0 ? (
        <EmptyState title="No certifications found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certifications.map((item) => (
            <Card key={item.id} className="h-80 flex flex-col items-center justify-start bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 border-slate-200 dark:border-slate-600 hover:border-sky-200 dark:hover:border-sky-500 group cursor-pointer transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-4">
                <div className="relative">
                  <img
                    className="w-20 h-20 rounded-xl object-contain shadow-md group-hover:scale-105 transition-transform duration-300"
                    src={item.image.url}
                    alt={item.badge_template.name}
                  />
                  <CheckmarkBadge size="sm" className="absolute -top-2 -right-2" />
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
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
