// Hook return types
export interface UseCertificationsReturn {
  certifications: import('./certifications').Root[];
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}
