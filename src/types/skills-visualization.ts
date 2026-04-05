// Skill categorization and proficiency types

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
  weight: number; // 1-5 scale for skill importance/depth
}

export interface SkillRadarData {
  subject: string;
  A: number; // Current proficiency
  fullMark: number;
}

// Skill weights based on industry demand and certification depth
export const SKILL_WEIGHTS: { [key: string]: number } = {
  // High weight (5) - Core security skills
  'Penetration Testing': 5,
  'Ethical Hacking': 5,
  'Incident Response': 5,
  'Threat Analysis': 5,
  'Malware Analysis': 5,
  'Cryptography': 5,
  'OSCP': 5,
  'CISSP': 5,
  'CEH': 5,
  
  // High weight (4) - Important technical skills
  'Cloud Security': 4,
  'Azure': 4,
  'AWS': 4,
  'Python': 4,
  'PowerShell': 4,
  'Linux': 4,
  'Active Directory': 4,
  'SIEM': 4,
  'Forensics': 4,
  'Risk Management': 4,
  'Compliance': 4,
  
  // Medium weight (3) - Standard skills
  'Network Security': 3,
  'TCP/IP': 3,
  'DNS': 3,
  'VPN': 3,
  'Windows Server': 3,
  'Virtualization': 3,
  'Scripting': 3,
  'Automation': 3,
  'Vulnerability Assessment': 3,
  'Security Operations': 3,
  
  // Lower weight (2) - Supporting skills
  'Wireshark': 2,
  'Nmap': 2,
  'Metasploit': 2,
  'Burp Suite': 2,
  'Bash': 2,
  'SQL': 2,
  'Git': 2,
  'Monitoring': 2,
  
  // Default weight (1) - Basic skills
  'default': 1,
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: 'security', name: 'Security', color: '#ef4444', description: 'Cybersecurity & defensive skills' },
  { id: 'cloud', name: 'Cloud', color: '#3b82f6', description: 'Cloud platforms & services' },
  { id: 'networking', name: 'Networking', color: '#10b981', description: 'Network infrastructure & protocols' },
  { id: 'programming', name: 'Programming', color: '#8b5cf6', description: 'Development & scripting' },
  { id: 'infrastructure', name: 'Infrastructure', color: '#f59e0b', description: 'Systems & server management' },
  { id: 'data', name: 'Data & Analytics', color: '#06b6d4', description: 'Databases, data analysis & BI' },
  { id: 'tools', name: 'Tools', color: '#ec4899', description: 'Security tools & utilities' },
];

// Helper function to normalize skill names for matching
function normalizeSkillName(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Check if skill name contains any of the keywords
function matchesKeywords(name: string, keywords: string[]): boolean {
  const normalized = normalizeSkillName(name);
  return keywords.some(keyword => normalized.includes(keyword.toLowerCase()));
}

// Get skill weight
export function getSkillWeight(skillName: string): number {
  // Exact match first
  if (SKILL_WEIGHTS[skillName]) {
    return SKILL_WEIGHTS[skillName];
  }
  
  // Partial match
  const normalized = normalizeSkillName(skillName);
  for (const [key, weight] of Object.entries(SKILL_WEIGHTS)) {
    if (key !== 'default' && normalized.includes(key.toLowerCase())) {
      return weight;
    }
  }
  
  return SKILL_WEIGHTS['default'];
}

// Determine category for a skill using multiple strategies
export function getSkillCategory(skillName: string): string {
  const normalized = normalizeSkillName(skillName);
  
  // Security keywords
  const securityKeywords = [
    'security', 'cyber', 'threat', 'vulnerability', 'penetration', 'pentest', 'ethical hack',
    'incident', 'response', 'forensic', 'malware', 'siem', 'soc', 'defense', 'protect',
    'compliance', 'audit', 'risk', 'governance', 'identity', 'access', 'iam', 'cryptography',
    'encryption', 'firewall', 'intrusion', 'detection', 'prevention', 'ids', 'ips',
    'certified ethical hacker', 'ceh', 'security+', 'cissp', 'cism', 'cisa', 'oscp',
    'defensive', 'offensive', 'red team', 'blue team', 'purple team', 'threat hunt'
  ];
  
  // Cloud keywords
  const cloudKeywords = [
    'azure', 'aws', 'amazon web', 'gcp', 'google cloud', 'cloud', 'saas', 'paas', 'iaas',
    'microsoft 365', 'office 365', 'm365', 'o365', 'entra', 'intune', 'azure ad',
    'aws certified', 'cloud practitioner', 'solutions architect', 'devops', 'cicd',
    'container', 'docker', 'kubernetes', 'k8s', 'microservices', 'serverless',
    'terraform', 'cloudformation', 'infrastructure as code', 'iac'
  ];
  
  // Networking keywords
  const networkingKeywords = [
    'network', 'tcp/ip', 'tcp', 'ip', 'subnet', 'routing', 'switching', 'vlan',
    'dns', 'dhcp', 'vpn', 'firewall', 'load balancer', 'proxy', 'nat', 'wan', 'lan',
    'cisco', 'ccna', 'ccnp', 'wireless', 'wifi', 'bluetooth', 'osi', 'protocol',
    'ethernet', 'mpls', 'bgp', 'ospf', 'packet', 'traffic', 'bandwidth'
  ];
  
  // Programming keywords
  const programmingKeywords = [
    'python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'csharp', 'ruby',
    'go', 'golang', 'rust', 'swift', 'kotlin', 'powershell', 'bash', 'shell',
    'scripting', 'automation', 'coding', 'development', 'programming', 'api',
    'rest', 'graphql', 'json', 'xml', 'yaml', 'html', 'css', 'react', 'angular',
    'vue', 'node', 'django', 'flask', 'spring', 'dotnet', 'framework'
  ];
  
  // Infrastructure keywords
  const infrastructureKeywords = [
    'windows', 'linux', 'unix', 'macos', 'server', 'workstation', 'desktop',
    'active directory', 'ad', 'ldap', 'domain', 'group policy', 'dns server',
    'hyper-v', 'vmware', 'virtualbox', 'virtualization', 'hypervisor',
    'backup', 'recovery', 'disaster', 'high availability', 'ha', 'failover',
    'monitoring', 'system center', 'sccm', 'wsus', 'patch management'
  ];
  
  // Data keywords
  const dataKeywords = [
    'sql', 'database', 'mysql', 'postgresql', 'oracle', 'mongodb', 'nosql',
    'data analysis', 'analytics', 'bi', 'business intelligence', 'power bi',
    'tableau', 'excel', 'data visualization', 'etl', 'data warehouse', 'big data',
    'machine learning', 'ml', 'ai', 'artificial intelligence', 'data science',
    'hadoop', 'spark', 'kafka', 'elasticsearch', 'splunk', 'logging'
  ];
  
  // Tools keywords (specific security/IT tools)
  const toolsKeywords = [
    'wireshark', 'nmap', 'metasploit', 'burp suite', 'nessus', 'qualys',
    'kali linux', 'parrot os', 'backbox', 'owasp', 'zap', 'nikto', 'john',
    'hashcat', 'sqlmap', 'aircrack', 'snort', 'suricata', 'bro', 'zeek',
    'elk', 'elastic', 'kibana', 'grafana', 'prometheus', 'nagios',
    'prtg', 'solarwinds', 'ansible', 'puppet', 'chef', 'salt', 'git', 'github'
  ];
  
  // Check each category (order matters - more specific first)
  if (matchesKeywords(skillName, toolsKeywords)) return 'tools';
  if (matchesKeywords(skillName, programmingKeywords)) return 'programming';
  if (matchesKeywords(skillName, cloudKeywords)) return 'cloud';
  if (matchesKeywords(skillName, dataKeywords)) return 'data';
  if (matchesKeywords(skillName, securityKeywords)) return 'security';
  if (matchesKeywords(skillName, networkingKeywords)) return 'networking';
  if (matchesKeywords(skillName, infrastructureKeywords)) return 'infrastructure';
  
  // Default to infrastructure for IT-related skills, tools for others
  if (normalized.includes('admin') || normalized.includes('support') || normalized.includes('it ')) {
    return 'infrastructure';
  }
  
  return 'tools';
}

// Calculate category scores from skills with weights
export function calculateCategoryScores(
  skills: { name: string }[],
  skillCounts: { [name: string]: number }
): SkillRadarData[] {
  const categoryScores: { [key: string]: { total: number; count: number; weightedSum: number } } = {
    security: { total: 0, count: 0, weightedSum: 0 },
    cloud: { total: 0, count: 0, weightedSum: 0 },
    networking: { total: 0, count: 0, weightedSum: 0 },
    programming: { total: 0, count: 0, weightedSum: 0 },
    infrastructure: { total: 0, count: 0, weightedSum: 0 },
    data: { total: 0, count: 0, weightedSum: 0 },
    tools: { total: 0, count: 0, weightedSum: 0 },
  };

  skills.forEach((skill) => {
    const category = getSkillCategory(skill.name);
    const count = skillCounts[skill.name] || 1;
    const weight = getSkillWeight(skill.name);
    
    // Calculate proficiency based on certification count AND weight
    // Base: 40%, certifications add up to 40%, weight adds up to 20%
    const certBonus = Math.min((count - 1) * 8, 40);
    const weightBonus = (weight - 1) * 5; // 0-20% based on weight 1-5
    const proficiency = Math.min(40 + certBonus + weightBonus, 100);
    
    if (categoryScores[category]) {
      categoryScores[category].total += proficiency;
      categoryScores[category].count += 1;
      categoryScores[category].weightedSum += proficiency * weight;
    }
  });

  // Convert to radar data format using weighted average
  return SKILL_CATEGORIES.map((cat) => {
    const score = categoryScores[cat.id];
    const average = score.count > 0 
      ? Math.round(score.weightedSum / score.count / 5 * 100 / 20) // Normalize to 0-100
      : 0;
    return {
      subject: cat.name,
      A: Math.min(average, 100),
      fullMark: 100,
    };
  });
}

// Get detailed skills for a category with weights
export function getSkillsByCategory(
  skills: { name: string }[],
  skillCounts: { [name: string]: number },
  categoryId: string
): SkillProficiency[] {
  return skills
    .filter((skill) => getSkillCategory(skill.name) === categoryId)
    .map((skill) => {
      const count = skillCounts[skill.name] || 1;
      const weight = getSkillWeight(skill.name);
      // Calculate level 1-10 based on certifications AND weight
      const level = Math.min(4 + count * 1.2 + (weight - 1) * 0.8, 10);
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

// Get skill level color based on proficiency
export function getSkillLevelColor(level: number, weight: number): string {
  // Combine level and weight for color intensity
  const intensity = (level + weight * 2) / 2;
  
  if (intensity >= 12) return '#0ea5e9'; // sky-500 - expert
  if (intensity >= 9) return '#38bdf8'; // sky-400 - advanced
  if (intensity >= 6) return '#7dd3fc'; // sky-300 - intermediate
  return '#bae6fd'; // sky-200 - beginner
}

// Debug function to see uncategorized skills
export function getUncategorizedSkills(skills: { name: string }[]): string[] {
  return skills
    .filter(skill => {
      const category = getSkillCategory(skill.name);
      return category === 'tools' && getSkillWeight(skill.name) === 1;
    })
    .map(s => s.name);
}
