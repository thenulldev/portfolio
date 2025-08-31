import { useState, useEffect } from 'react';

export interface Root {
  id: string;
  expires_at_date: string;
  issued_at_date: string;
  issued_to: string;
  locale: string;
  public: boolean;
  state: string;
  translate_metadata: boolean;
  accepted_at: string;
  expires_at: string;
  issued_at: string;
  last_updated_at: string;
  updated_at: string;
  earner_path: string;
  earner_photo_url: string;
  is_private_badge: boolean;
  user_is_earner: boolean;
  printable: boolean;
  issuer: Issuer;
  badge_template: BadgeTemplate;
  image: Image3;
  image_url: string;
}

export interface Issuer {
  summary: string;
  entities: Entity[];
}

export interface Entity {
  label: string;
  primary: boolean;
  entity: Entity2;
}

export interface Entity2 {
  type: string;
  id: string;
  name: string;
  url: string;
  vanity_url: string;
  internationalize_badge_templates: boolean;
  share_to_ziprecruiter: boolean;
  twitter_url: string;
  verified: boolean;
}

export interface BadgeTemplate {
  id: string;
  description: string;
  global_activity_url: string;
  enable_earn_this_badge: boolean;
  enable_detail_attribute_visibility: boolean;
  name: string;
  public: boolean;
  recipient_type: string;
  vanity_slug: string;
  show_badge_lmi: boolean;
  show_skill_tag_links: boolean;
  settings_enable_related_badges: boolean;
  translatable: boolean;
  image: Image;
  image_url: string;
  url: string;
  owner_vanity_slug: string;
  badge_template_earnable: boolean;
  recommendable: boolean;
  issuer: Issuer2;
  related_badge_templates: RelatedBadgeTemplate[];
  badge_template_activities: BadgeTemplateActivity[];
  skills: Skill[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Issuer2 {
  summary: string;
  entities: Entity3[];
}

export interface Entity3 {
  label: string;
  primary: boolean;
  entity: Entity4;
}

export interface Entity4 {
  type: string;
  id: string;
  name: string;
  url: string;
  vanity_url: string;
  internationalize_badge_templates: boolean;
  share_to_ziprecruiter: boolean;
  twitter_url: string;
  verified: boolean;
}

export interface RelatedBadgeTemplate {
  id: string;
  name: string;
  image: Image2;
  image_url: string;
  url: string;
}

export interface Image2 {
  id: string;
  url: string;
}

export interface BadgeTemplateActivity {
  id: string;
  activity_type: string;
  required_badge_template_id: string;
  title: string;
  url: string;
}

export interface Skill {
  id: string;
  name: string;
  vanity_slug: string;
}

export interface Image3 {
  id: string;
  url: string;
}

interface UseCertificationsReturn {
  certifications: Root[];
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useCertifications(refreshInterval: number = 300000): UseCertificationsReturn {
  const [certifications, setCertifications] = useState<Root[]>([]);
  const [skills, setSkills] = useState<{ name: string }[]>([]);
  const [skillCounts, setSkillCounts] = useState<{ [name: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching certifications from API...');
      
      const response = await fetch("/api/certifications", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jsonResponse = await response.json();
      console.log('API response received:', jsonResponse);
      
      const dataArray = Array.isArray(jsonResponse)
        ? jsonResponse
        : jsonResponse.data;

      if (!dataArray) {
        throw new Error('No data array found in response');
      }

      // Only keep items that haven't expired
      const validData = dataArray.filter(
        (item: Root) => new Date(item.expires_at_date) >= new Date()
      );

      console.log(`Found ${validData.length} valid certifications out of ${dataArray.length} total`);

      setCertifications(validData);
      setLastUpdated(new Date());

      // Process skills
      const allSkills = validData.reduce((acc: { name: string }[], item: Root) => {
        const skills = item.badge_template.skills.slice(0, 5);
        return acc.concat(skills);
      }, []);

      // Create unique skills list and count occurrences
      const uniqueSkills: { name: string }[] = [];
      const counts: { [name: string]: number } = {};
      
      allSkills.forEach((skill: { name: string }) => {
        if (!uniqueSkills.find(s => s.name === skill.name)) {
          uniqueSkills.push(skill);
        }
        counts[skill.name] = (counts[skill.name] || 0) + 1;
      });

      console.log(`Found ${uniqueSkills.length} unique skills`);

      setSkills(uniqueSkills);
      setSkillCounts(counts);
      
    } catch (err) {
      console.error('Error in fetchCertifications:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchCertifications();

    // Set up interval for periodic updates
    const interval = setInterval(fetchCertifications, refreshInterval);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return {
    certifications,
    skills,
    skillCounts,
    loading,
    error,
    lastUpdated,
  };
}
