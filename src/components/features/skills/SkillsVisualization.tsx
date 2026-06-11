"use client";

import React, { useState, useMemo } from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  SkillRadarData, SKILL_CATEGORIES, calculateCategoryScores,
  getSkillsByCategory, getStrengthsAndWeaknesses,
  computeDynamicWeight, getSkillCategory,
} from "@/types/skills-visualization";
import { Card, CardContent, Badge } from "@/components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faMinus, faCertificate, faBolt, faShield } from "@fortawesome/free-solid-svg-icons";

interface Props {
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
  selectedIssuer?: string | null;
  onClearFilter?: () => void;
  certCount?: number;
}

// Compute issuer info from certifications if passed via props
// For now we infer from cert count (more certs = likely stronger issuer)

export default function SkillsVisualization({
  skills, skillCounts, selectedIssuer, onClearFilter, certCount,
}: Props): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Build issuer info map (infer from cert counts as proxy for prestige)
  const issuerInfo = useMemo(() => {
    const map: { [name: string]: string } = {};
    skills.forEach(s => {
      const count = skillCounts[s.name] || 1;
      // Higher count suggests more prestigious/repeated validation
      map[s.name] = count >= 3 ? 'Tier 1' : count >= 2 ? 'Tier 2' : 'Standard';
    });
    return map;
  }, [skills, skillCounts]);

  // Radar data with proper scoring
  const radarData = useMemo(() => {
    return calculateCategoryScores(skills, skillCounts, issuerInfo);
  }, [skills, skillCounts, issuerInfo]);

  // Strengths & weaknesses
  const { strengths, weaknesses, moderate } = useMemo(() => {
    return getStrengthsAndWeaknesses(radarData);
  }, [radarData]);

  // Category detail skills
  const categorySkills = useMemo(() => {
    if (!selectedCategory) return [];
    return getSkillsByCategory(skills, skillCounts, selectedCategory, issuerInfo);
  }, [selectedCategory, skills, skillCounts, issuerInfo]);

  const selectedCategoryInfo = useMemo(() => {
    return SKILL_CATEGORIES.find(c => c.id === selectedCategory);
  }, [selectedCategory]);

  // Overall stats
  const overall = useMemo(() => {
    const validScores = radarData.filter(d => d.A > 0);
    const avg = validScores.length > 0
      ? Math.round(validScores.reduce((a, b) => a + b.A, 0) / validScores.length)
      : 0;
    const max = validScores.length > 0
      ? validScores.reduce((a, b) => a.A > b.A ? a : b)
      : { subject: 'N/A', A: 0 };
    return { avg, total: skills.length, max };
  }, [radarData, skills.length]);

  // Sorted skills
  const allSkillsSorted = useMemo(() => {
    return skills
      .map(s => ({
        name: s.name,
        count: skillCounts[s.name] || 1,
        weight: computeDynamicWeight(s.name, skillCounts[s.name] || 1, issuerInfo[s.name] || ''),
      }))
      .sort((a, b) => b.weight - a.weight || b.count - a.count);
  }, [skills, skillCounts, issuerInfo]);

  const hasData = skills.length > 0;
  const isFiltered = !!selectedIssuer;

  // Weight badge
  const weightBadge = (w: number) => {
    const colors: Record<number, string> = {
      5: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      4: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
      3: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
      2: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
      1: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    };
    const labels: Record<number, string> = { 5: 'Core', 4: 'Strong', 3: 'Solid', 2: 'Developing', 1: 'Foundational' };
    return <Badge className={`text-[10px] px-1.5 py-0.5 rounded ${colors[w] || colors[1]}`}>{labels[w] || 'Basic'}</Badge>;
  };

  if (!hasData) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {['Total Skills', 'Avg Proficiency', 'Top Category'].map(label => (
            <Card key={label} className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</div>
                <div className="text-3xl font-bold text-slate-300 dark:text-slate-600">—</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="p-12 border-slate-200 dark:border-slate-700">
          <CardContent className="p-0 text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">No Skills Data</h3>
            <p className="text-sm text-slate-400">{isFiltered ? `No skills for ${selectedIssuer}` : "Certifications with skills will appear here."}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter banner */}
      {isFiltered && (
        <div className="flex items-center justify-between p-3 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl">
          <span className="text-sm text-slate-700 dark:text-slate-300">Showing skills from <span className="font-semibold text-sky-600">{selectedIssuer}</span></span>
          {onClearFilter && (
            <button onClick={onClearFilter} className="text-sm text-sky-600 hover:text-sky-700">Clear ✕</button>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Skills</div>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{overall.total}</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Avg Proficiency</div>
            <div className={`text-3xl font-bold ${overall.avg >= 60 ? 'text-emerald-600 dark:text-emerald-400' : overall.avg >= 40 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>{overall.avg}%</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Top Category</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200 truncate">{overall.max.subject}</div>
          </CardContent>
        </Card>
      </div>

      {/* Strengths / Weaknesses */}
      {(strengths.length > 0 || weaknesses.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {strengths.length > 0 && (
            <Card className="border-l-4 border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FontAwesomeIcon icon={faChevronUp} className="text-emerald-600" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Strengths</span>
                </div>
                <div className="space-y-2">
                  {strengths.map(s => (
                    <div key={s.category} className="flex items-center justify-between">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{s.category}</span>
                      <span className="text-sm font-bold text-emerald-600">{s.score}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {weaknesses.length > 0 && (
            <Card className="border-l-4 border-l-rose-400 bg-rose-50/20 dark:bg-rose-900/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FontAwesomeIcon icon={faChevronDown} className="text-rose-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Growth Areas</span>
                </div>
                <div className="space-y-2">
                  {weaknesses.map(w => (
                    <div key={w.category} className="flex items-center justify-between">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{w.category}</span>
                      <span className="text-sm font-bold text-rose-500">{w.score}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Radar + Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 border-slate-200 dark:border-slate-700">
          <CardContent className="p-0">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 text-center">Skills Radar</h3>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} tickCount={5} />
                  <Radar name="Proficiency" dataKey="A" stroke="#0ea5e9" strokeWidth={2.5} fill="#0ea5e9" fillOpacity={0.2} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const val = payload[0].value as number;
                      return (
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs shadow-lg">
                          <span className="font-semibold">{payload[0].payload.subject}: </span>
                          <span className={val >= 60 ? 'text-emerald-600' : val >= 40 ? 'text-amber-600' : 'text-rose-500'}>{val}%</span>
                        </div>
                      );
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {SKILL_CATEGORIES.map(cat => {
              const score = radarData.find(d => d.subject === cat.name)?.A || 0;
              const isSel = selectedCategory === cat.id;
              const isHover = hoveredCategory === cat.id;
              const hasSkills = score > 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(isSel ? null : cat.id); setShowAllSkills(false); }}
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  disabled={!hasSkills}
                  className={`p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                    !hasSkills ? 'opacity-40 cursor-not-allowed border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20'
                    : isSel ? 'shadow-md border-sky-500 bg-sky-50 dark:bg-sky-900/20'
                    : isHover ? 'border-sky-300 dark:border-sky-600 bg-sky-50/50'
                    : 'border-slate-200 dark:border-slate-700 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hasSkills ? cat.color : '#cbd5e1' }} />
                    <span className={`text-xs font-bold ${hasSkills ? 'text-sky-600' : 'text-slate-400'}`}>{score}%</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{cat.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{cat.description}</div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => { setShowAllSkills(!showAllSkills); setSelectedCategory(null); }}
            className="w-full p-2.5 text-center text-sm font-medium text-sky-600 dark:text-sky-400 border border-dashed border-sky-300 dark:border-sky-600 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
          >
            {showAllSkills ? 'Hide All Skills' : `View All ${skills.length} Skills`}
          </button>
        </div>
      </div>

      {/* Category Detail */}
      {selectedCategory && selectedCategoryInfo && (
        <Card className="border-l-4 border-l-sky-500 animate-in slide-in-from-bottom-3 duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">{selectedCategoryInfo.name} Skills</h4>
              <button onClick={() => setSelectedCategory(null)} className="text-sm text-slate-500 hover:text-sky-600">Close ✕</button>
            </div>
            {categorySkills.length > 0 ? (
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {categorySkills.map(skill => (
                  <div key={skill.name} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg hover:border-sky-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-slate-800 dark:text-slate-200">{skill.name}</span>
                        {weightBadge(skill.weight)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex">
                          {[...Array(10)].map((_, i) => (
                            <div key={i} className={`w-1 h-3 mx-px rounded-sm ${i < skill.level ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500 w-8">{skill.level}/10</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                      <Badge variant="secondary" className="text-[10px] bg-sky-50 text-sky-700 dark:bg-sky-900/30">
                        {skill.certificationCount} cert{skill.certificationCount > 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-500 py-4">No skills in this category.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Skills */}
      {showAllSkills && (
        <Card className="border-l-4 border-l-sky-500 animate-in slide-in-from-bottom-3 duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">All Skills</h4>
              <button onClick={() => setShowAllSkills(false)} className="text-sm text-slate-500 hover:text-sky-600">Close ✕</button>
            </div>
            <div className="space-y-1.5 max-h-80 overflow-y-auto">
              {allSkillsSorted.map(skill => {
                const cat = SKILL_CATEGORIES.find(c => c.id === getSkillCategory(skill.name));
                return (
                  <div key={skill.name} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-sky-200 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat?.color || '#64748b' }} />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{skill.name}</span>
                      {weightBadge(skill.weight)}
                    </div>
                    <Badge variant="outline" className="text-xs border-sky-200 text-sky-600">{skill.count}</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
