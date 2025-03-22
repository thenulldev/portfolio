import React from "react";

interface SkillListProps {
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
}

const SkillList: React.FC<SkillListProps> = ({ skills, skillCounts }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {skills.map((skill, index) => {
        const count = skillCounts[skill.name] || 1;
        const fontSizeClass = count > 1 ? "text-lg" : "text-sm";
        const hoverColorClass =
          count > 1 ? "hover:bg-green-300" : "hover:bg-blue-300";

        return (
          <span
            key={index}
            className={`bg-gray-200 rounded-full px-3 py-1 ${fontSizeClass} font-semibold text-gray-700 mr-2 mb-2 ${hoverColorClass} transition duration-200 flex items-center`}
          >
            {skill.name}
          </span>
        );
      })}
    </div>
  );
};

export default SkillList;
