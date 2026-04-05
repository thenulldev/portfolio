"use client";

import React, { useState, useMemo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  SkillRadarData,
  SkillCategory,
  SkillProficiency,
  SKILL_CATEGORIES,
  calculateCategoryScores,
  getSkillsByCategory,
  getSkillCategory,
  getSkillWeight,
  getSkillLevelColor,
} from "@/types/skills-visualization";
import { Card, CardContent, Badge } from "@/components/ui";

interface SkillsVisualizationProps {
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: SkillRadarData }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-slate-800 dark:text-slate-200">{label}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Proficiency: <span className="font-bold text-sky-600 dark:text-sky-400">{value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

// Get weight badge color using sky theme
const getWeightBadgeColor = (weight: number): string => {
  switch (weight) {
    case 5: return 'bg-sky-600 text-white';
    case 4: return 'bg-sky-500 text-white';
    case 3: return 'bg-sky-400 text-white';
    case 2: return 'bg-sky-300 text-slate-800';
    default: return 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400';
  }
};

// Get weight label
const getWeightLabel = (weight: number): string => {
  switch (weight) {
    case 5: return 'Expert';
    case 4: return 'Advanced';
    case 3: return 'Proficient';
    case 2: return 'Intermediate';
    default: return 'Foundation';
  }
};

export default function SkillsVisualization({
  skills,
  skillCounts,
}: SkillsVisualizationProps): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Calculate radar data
  const radarData = useMemo(() => calculateCategoryScores(skills, skillCounts), [skills, skillCounts]);

  // Get detailed skills for selected category
  const categorySkills = useMemo(() => {
    if (!selectedCategory) return [];
    return getSkillsByCategory(skills, skillCounts, selectedCategory);
  }, [selectedCategory, skills, skillCounts]);

  // Get selected category info
  const selectedCategoryInfo = useMemo(() => {
    return SKILL_CATEGORIES.find((cat) => cat.id === selectedCategory);
  }, [selectedCategory]);

  // Calculate overall stats
  const overallStats = useMemo(() => {
    if (radarData.length === 0) {
      return { avgProficiency: 0, totalSkills: 0, maxCategory: { subject: 'N/A', A: 0, fullMark: 100 } };
    }
    const avgProficiency = Math.round(
      radarData.reduce((acc, item) => acc + item.A, 0) / radarData.length
    );
    const totalSkills = skills.length;
    const maxCategory = radarData.reduce((prev, current) =>
      prev.A > current.A ? prev : current
    );
    return { avgProficiency, totalSkills, maxCategory };
  }, [radarData, skills.length]);

  // Get all skills sorted by weight and count
  const allSkillsSorted = useMemo(() => {
    return skills
      .map((skill) => ({
        name: skill.name,
        count: skillCounts[skill.name] || 1,
        category: getSkillCategory(skill.name),
        weight: getSkillWeight(skill.name),
      }))
      .sort((a, b) => b.weight - a.weight || b.count - a.count);
  }, [skills, skillCounts]);

  // Check if we have data to display
  const hasData = skills.length > 0;

  if (!hasData) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-sky-50 to-slate-50 dark:from-sky-900/20 dark:to-slate-900/30 border-sky-200 dark:border-sky-800">
            <CardContent className="p-4 text-center">
              <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-1">Total Skills</div>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">0</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-sky-50 to-slate-50 dark:from-sky-900/20 dark:to-slate-900/30 border-sky-200 dark:border-sky-800">
            <CardContent className="p-4 text-center">
              <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-1">Avg Proficiency</div>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">0%</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-sky-50 to-slate-50 dark:from-sky-900/20 dark:to-slate-900/30 border-sky-200 dark:border-sky-800">
            <CardContent className="p-4 text-center">
              <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-1">Top Category</div>
              <div className="text-xl font-bold text-slate-800 dark:text-slate-200">N/A</div>
            </CardContent>
          </Card>
        </div>
        <Card className="p-12 border-slate-200 dark:border-slate-700">
          <CardContent className="p-0 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
              Skills Visualization
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              No skills data available. Certifications with skills will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Stats - Sky themed */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-sky-50 to-slate-50 dark:from-sky-900/30 dark:to-slate-900/20 border-sky-200 dark:border-sky-800">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-1">Total Skills</div>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{overallStats.totalSkills}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-sky-50 to-slate-50 dark:from-sky-900/30 dark:to-slate-900/20 border-sky-200 dark:border-sky-800">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-1">Avg Proficiency</div>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{overallStats.avgProficiency}%</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-sky-50 to-slate-50 dark:from-sky-900/30 dark:to-slate-900/20 border-sky-200 dark:border-sky-800">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-1">Top Category</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200 truncate">{overallStats.maxCategory.subject}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <Card className="p-6 border-slate-200 dark:border-slate-700">
          <CardContent className="p-0">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 text-center">
              Skills Proficiency Radar
            </h3>
            <div className="relative" style={{ width: '100%', height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="65%" 
                  data={radarData}
                  margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                >
                  <PolarGrid 
                    stroke="#cbd5e1" 
                    strokeWidth={1}
                  />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ 
                      fill: '#475569', 
                      fontSize: 11, 
                      fontWeight: 600 
                    }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ 
                      fill: '#64748b', 
                      fontSize: 10 
                    }}
                    tickCount={5}
                    stroke="#e2e8f0"
                  />
                  <Radar
                    name="Proficiency"
                    dataKey="A"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    fill="#0ea5e9"
                    fillOpacity={0.25}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
              Click on a category below to see detailed skills
            </p>
          </CardContent>
        </Card>

        {/* Category Selection & Details */}
        <div className="space-y-4">
          {/* Category Buttons - Sky themed */}
          <div className="grid grid-cols-2 gap-3">
            {SKILL_CATEGORIES.map((category) => {
              const categoryScore = radarData.find((d) => d.subject === category.name)?.A || 0;
              const isSelected = selectedCategory === category.id;
              const isHovered = hoveredCategory === category.id;
              const hasSkills = categoryScore > 0;

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : category.id);
                    setShowAllSkills(false);
                  }}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  disabled={!hasSkills}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    !hasSkills 
                      ? 'opacity-50 cursor-not-allowed border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30'
                      : isSelected
                      ? 'shadow-lg scale-105 border-sky-500 bg-sky-50 dark:bg-sky-900/30'
                      : isHovered
                      ? 'shadow-md border-sky-300 dark:border-sky-600 bg-sky-50/50 dark:bg-sky-900/20'
                      : 'hover:shadow-sm border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: hasSkills ? category.color : '#cbd5e1' }}
                    />
                    <span className={`text-xs font-bold ${hasSkills ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'}`}>
                      {hasSkills ? `${categoryScore}%` : '0%'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{category.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* View All Skills Button - Sky themed */}
          <button
            onClick={() => {
              setShowAllSkills(!showAllSkills);
              setSelectedCategory(null);
            }}
            className="w-full p-3 text-center text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 border border-dashed border-sky-300 dark:border-sky-600 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors"
          >
            {showAllSkills ? 'Hide All Skills' : `View All ${skills.length} Skills`}
          </button>

          {/* Selected Category Skills Detail - Sky themed */}
          {selectedCategory && selectedCategoryInfo && (
            <Card
              className="p-4 border-l-4 border-sky-500 animate-in slide-in-from-bottom-4 duration-300 bg-sky-50/30 dark:bg-sky-900/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">
                  {selectedCategoryInfo.name} Skills
                </h4>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                >
                  Close ✕
                </button>
              </div>

              {categorySkills.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg hover:border-sky-300 dark:hover:border-sky-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {skill.name}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getWeightBadgeColor(skill.weight)}`}>
                            {getWeightLabel(skill.weight)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-3 mx-px rounded-sm ${
                                  i < skill.level
                                    ? 'bg-sky-500'
                                    : 'bg-slate-200 dark:bg-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-6">
                            {skill.level}/10
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <Badge variant="secondary" className="text-xs bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                          {skill.certificationCount} cert{skill.certificationCount > 1 ? 's' : ''}
                        </Badge>
                        <span className="text-slate-300">•</span>
                        <span>Weight: {skill.weight}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-slate-500 dark:text-slate-400 py-4">
                  No skills in this category yet.
                </p>
              )}
            </Card>
          )}

          {/* All Skills List - Sky themed */}
          {showAllSkills && (
            <Card className="p-4 border-l-4 border-l-sky-500 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">
                  All Skills from Certifications
                </h4>
                <button
                  onClick={() => setShowAllSkills(false)}
                  className="text-sm text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                >
                  Close ✕
                </button>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {allSkillsSorted.map((skill) => {
                  const categoryColor = SKILL_CATEGORIES.find(c => c.id === skill.category)?.color || '#64748b';
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: categoryColor }}
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {skill.name}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${getWeightBadgeColor(skill.weight)}`}>
                          W{skill.weight}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-sky-200 text-sky-600 dark:border-sky-700 dark:text-sky-400">
                          {skill.count}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
