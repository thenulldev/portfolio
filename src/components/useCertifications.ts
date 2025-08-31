import { useState, useEffect } from 'react';
import { Root, UseCertificationsReturn } from '../types';

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
