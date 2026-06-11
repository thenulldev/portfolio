// Skill categorization and proficiency types — dynamically computed, no hardcoded weights

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface SkillProficiency {
  name: string;
  category: string;
  level: number; // 1-10 scale
  yearsOfExperience: number;
  certificationCount: number;
  description: string;
  weight: number; // 1-5 dynamically computed
}

export interface SkillRadarData {
  subject: string;
  A: number; // Current proficiency 0-100
  fullMark: number;
}

export interface StrengthWeakness {
  category: string;
  score: number;
  skills: SkillProficiency[];
  trend: 'strong' | 'moderate' | 'weak';
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: 'security', name: 'Security', color: '#ef4444', description: 'Cybersecurity, defensive & offensive operations' },
  { id: 'cloud', name: 'Cloud', color: '#3b82f6', description: 'Cloud platforms, DevOps & infrastructure-as-code' },
  { id: 'networking', name: 'Networking', color: '#10b981', description: 'Network protocols, routing & infrastructure' },
  { id: 'programming', name: 'Programming', color: '#8b5cf6', description: 'Development, scripting & automation' },
  { id: 'infrastructure', name: 'Infrastructure', color: '#f59e0b', description: 'Systems, servers & IT administration' },
  { id: 'data', name: 'Data & Analytics', color: '#06b6d4', description: 'Databases, analytics & data engineering' },
  { id: 'compliance', name: 'Compliance', color: '#14b8a6', description: 'GRC, audit frameworks & regulatory standards' },
];

// Normalized keyword matching
function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function containsAny(name: string, keywords: string[]): boolean {
  const n = normalize(name);
  return keywords.some(k => n.includes(k.toLowerCase()));
}

// Map issuer names to prestige tiers (affects weight calculation)
function getIssuerPrestige(issuerName: string): number {
  const tier1 = ['offensive security', 'oscp', 'sans', 'cissp'];
  const tier2 = ['compTIA', 'microsoft', 'aws', 'cisco', 'isc2'];
  const n = normalize(issuerName);
  if (tier1.some(t => n.includes(t))) return 1.4;
  if (tier2.some(t => n.includes(t))) return 1.2;
  return 1.0;
}

export function getSkillCategory(skillName: string): string {
  const security = [
    'security', 'cyber', 'threat', 'vulnerability', 'penetration', 'pentest', 'ethical hack',
    'incident', 'response', 'forensic', 'malware', 'siem', 'soc', 'defense', 'protect',
    'risk', 'governance', 'identity', 'access', 'iam', 'cryptography', 'encryption',
    'firewall', 'intrusion', 'detection', 'prevention', 'ids', 'ips',
    'ceh', 'security+', 'cissp', 'cism', 'cisa', 'oscp',
    'defensive', 'offensive', 'red team', 'blue team', 'purple team', 'threat hunt',
    'vulnerability assessment', 'security operations', 'appsec', 'application security',
    ' Zero Trust ', ' ZeroTrust ', 'zero trust'
  ];
  
  const cloud = [
    'azure', 'aws', 'amazon web', 'gcp', 'google cloud', 'cloud',
    'microsoft 365', 'office 365', 'm365', 'o365', 'entra', 'intune', 'azure ad',
    'devops', 'ci/cd', 'cicd', 'container', 'docker', 'kubernetes', 'k8s',
    'microservices', 'serverless', 'terraform', 'cloudformation', 'infrastructure as code', 'iac',
    'pulumi', 'helm', 'istio', 'envoy', 'service mesh'
  ];
  
  const networking = [
    'network', 'tcp/ip', 'tcp', 'ip', 'subnet', 'routing', 'switching', 'vlan',
    'dns', 'dhcp', 'vpn', 'load balancer', 'proxy', 'nat', 'wan', 'lan',
    'cisco', 'ccna', 'ccnp', 'wireless', 'wifi', 'osi', 'protocol',
    'ethernet', 'mpls', 'bgp', 'ospf', 'packet', 'traffic', 'bandwidth',
    'sd-wan', 'mpls', 'bgp', 'ospf'
  ];
  
  const programming = [
    'python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'csharp', 'ruby',
    'go', 'golang', 'rust', 'swift', 'kotlin', 'powershell', 'bash', 'shell',
    'scripting', 'automation', 'coding', 'development', 'programming', 'api',
    'rest', 'graphql', 'json', 'xml', 'yaml', 'html', 'css', 'react', 'angular',
    'vue', 'node', 'django', 'flask', 'spring', 'dotnet', 'framework',
    'next.js', 'svelte', 'htmx', 'tailwind'
  ];
  
  const infrastructure = [
    'windows', 'linux', 'unix', 'macos', 'server', 'workstation', 'desktop',
    'active directory', 'ad', 'ldap', 'domain', 'group policy',
    'hyper-v', 'vmware', 'virtualbox', 'virtualization', 'hypervisor',
    'backup', 'recovery', 'disaster', 'high availability', 'ha', 'failover',
    'monitoring', 'system center', 'sccm', 'wsus', 'patch management',
    'exchange', 'sharepoint', 'teams'
  ];
  
  const data = [
    'sql', 'database', 'mysql', 'postgresql', 'oracle', 'mongodb', 'nosql',
    'data analysis', 'analytics', 'bi', 'business intelligence', 'power bi',
    'tableau', 'excel', 'data visualization', 'etl', 'data warehouse', 'big data',
    'machine learning', 'ml', 'ai', 'artificial intelligence', 'data science',
    'hadoop', 'spark', 'kafka', 'elasticsearch', 'splunk', 'logging'
  ];
  
  const compliance = [
    'compliance', 'audit', 'governance', 'regulatory', 'framework',
    'iso 27001', 'nist', 'pci dss', 'gdpr', 'hipaa', 'soc 2', 'soc2',
    'risk assessment', 'control', 'policy', 'standard',
    'cmmi', 'itil', 'cobit', 'sox', 'ferpa', 'ccpa'
  ];
  
  if (containsAny(skillName, compliance)) return 'compliance';
  if (containsAny(skillName, security)) return 'security';
  if (containsAny(skillName, cloud)) return 'cloud';
  if (containsAny(skillName, programming)) return 'programming';
  if (containsAny(skillName, data)) return 'data';
  if (containsAny(skillName, networking)) return 'networking';
  if (containsAny(skillName, infrastructure)) return 'infrastructure';
  return 'security'; // Default for unclassified IT skills
}

// Compute dynamic weight based on cert count, issuer prestige, and rarity
export function computeDynamicWeight(
  skillName: string,
  certCount: number,
  issuerName: string
): number {
  // Base from certification count
  let weight = Math.min(certCount + 1, 3); // 1-3 from count alone
  
  // Boost for prestigious issuers
  const prestige = getIssuerPrestige(issuerName);
  weight *= prestige;
  
  // Cap at 5
  weight = Math.min(Math.round(weight), 5);
  
  return Math.max(weight, 1);
}

// Calculate category scores from skills — properly weighted
export function calculateCategoryScores(
  skills: { name: string }[],
  skillCounts: { [name: string]: number },
  issuerInfo?: { [name: string]: string } // skill name -> issuer name
): SkillRadarData[] {
  const totals: { [key: string]: { sum: number; count: number; maxPossible: number } } = {};
  
  // Initialize all categories
  SKILL_CATEGORIES.forEach(cat => {
    totals[cat.id] = { sum: 0, count: 0, maxPossible: 0 };
  });
  
  skills.forEach(skill => {
    const category = getSkillCategory(skill.name);
    const count = skillCounts[skill.name] || 1;
    const issuer = issuerInfo?.[skill.name] || '';
    
    // Dynamic weight
    const weight = computeDynamicWeight(skill.name, count, issuer);
    
    // Score formula: certification-based, starts from 0
    // 1 cert = 20%, each additional cert adds 15%, weight bonus up to 25%
    const baseScore = 15; // floor for having at least 1 cert
    const certBonus = (count - 1) * 12;
    const weightBonus = (weight - 1) * 6;
    let score = baseScore + certBonus + weightBonus;
    score = Math.min(score, 100); // cap at 100
    
    if (totals[category]) {
      totals[category].sum += score;
      totals[category].count += 1;
    }
  });
  
  return SKILL_CATEGORIES.map(cat => {
    const t = totals[cat.id];
    const avg = t.count > 0 ? Math.round(t.sum / t.count) : 0;
    return {
      subject: cat.name,
      A: avg,
      fullMark: 100,
    };
  });
}

// Get detailed skills for a category
export function getSkillsByCategory(
  skills: { name: string }[],
  skillCounts: { [name: string]: number },
  categoryId: string,
  issuerInfo?: { [name: string]: string }
): SkillProficiency[] {
  return skills
    .filter(s => getSkillCategory(s.name) === categoryId)
    .map(skill => {
      const count = skillCounts[skill.name] || 1;
      const issuer = issuerInfo?.[skill.name] || '';
      const weight = computeDynamicWeight(skill.name, count, issuer);
      
      // Level 1-10 based on count + weight
      const level = Math.min(2 + count * 1.5 + (weight - 1) * 0.5, 10);
      
      return {
        name: skill.name,
        category: categoryId,
        level: Math.round(level),
        yearsOfExperience: Math.max(1, Math.floor(count * 0.5)),
        certificationCount: count,
        description: `Validated across ${count} certification${count > 1 ? 's' : ''}`,
        weight,
      };
    })
    .sort((a, b) => b.weight - a.weight || b.level - a.level);
}

// Compute strengths and weaknesses
export function getStrengthsAndWeaknesses(
  radarData: SkillRadarData[]
): { strengths: StrengthWeakness[]; weaknesses: StrengthWeakness[]; moderate: StrengthWeakness[] } {
  const scored = radarData
    .map(d => ({
      category: d.subject,
      score: d.A,
      trend: d.A >= 70 ? 'strong' as const : d.A >= 40 ? 'moderate' as const : 'weak' as const,
      skills: [] as SkillProficiency[],
    }))
    .sort((a, b) => b.score - a.score);
  
  return {
    strengths: scored.filter(s => s.trend === 'strong').slice(0, 3),
    moderate: scored.filter(s => s.trend === 'moderate'),
    weaknesses: scored.filter(s => s.trend === 'weak').slice(0, 3),
  };
}

// Color for skill level + weight combo
export function getSkillLevelColor(level: number, weight: number): string {
  const intensity = (level * 0.6) + (weight * 0.8);
  if (intensity >= 14) return '#0ea5e9';  // sky-500 expert
  if (intensity >= 10) return '#38bdf8';  // sky-400 advanced
  if (intensity >= 6) return '#7dd3fc';   // sky-300 intermediate
  return '#bae6fd';                        // sky-200 beginner
}

// Uncategorised skills diagnostic
export function getUncategorizedSkills(skills: { name: string }[]): string[] {
  return skills
    .filter(skill => getSkillCategory(skill.name) === 'security')
    .map(s => s.name);
}
