"use client";

import React from "react";

interface SkillListProps {
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
}

const SkillList: React.FC<SkillListProps> = ({ skills, skillCounts }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {skills.map((skill, index) => {
        const count = skillCounts[skill.name] || 1;
        const fontSizeClass = count > 1 ? "text-base" : "text-sm";
        const bgGradient = count > 1 
          ? "bg-gradient-to-r from-emerald-100 to-green-100 hover:from-emerald-200 hover:to-green-200 border-emerald-200" 
          : "bg-gradient-to-r from-sky-100 to-blue-100 hover:from-sky-200 hover:to-blue-200 border-sky-200";
        const textColor = count > 1 ? "text-emerald-800" : "text-sky-800";

        return (
          <span
            key={`${skill.name}-${index}`}
            className={`${bgGradient} ${textColor} ${fontSizeClass} font-semibold rounded-full px-4 py-2 border transition-all duration-200 flex items-center cursor-pointer shadow-sm hover:shadow-md transform hover:scale-105`}
            title={`${skill.name} (appears in ${count} certification${count > 1 ? 's' : ''})`}
          >
            {skill.name}
            {count > 1 && (
              <span className="ml-2 bg-white bg-opacity-50 rounded-full px-2 py-0.5 text-xs font-bold">
                {count}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default SkillList;
