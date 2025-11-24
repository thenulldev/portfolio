"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface SkillListProps {
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
}

const SkillList: React.FC<SkillListProps> = ({ skills, skillCounts }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {skills.map((skill, index) => {
        const count = skillCounts[skill.name] || 1;
        const variant = count > 1 ? "success" : "info";

        return (
          <HoverCard key={`${skill.name}-${index}`}>
            <HoverCardTrigger asChild>
              <Badge
                variant={variant}
                className="text-sm font-semibold px-4 py-2 cursor-pointer transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
              >
                {skill.name}
                {count > 1 && (
                  <span className="ml-2 bg-white dark:bg-slate-800 bg-opacity-50 dark:bg-opacity-50 rounded-full px-2 py-0.5 text-xs font-bold">
                    {count}
                  </span>
                )}
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  This skill appears in {count} certification{count > 1 ? 's' : ''}.
                </p>
                {count > 1 && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    This skill is highly valued across multiple certifications.
                  </p>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
};

export default SkillList;
