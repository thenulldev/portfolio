// TryHackMe types (v2 API)
export interface TryHackMeBadge {
  name: string;
  earnedAt?: string;
  id: string;
  image?: string | null;
}

export interface TryHackMeCapabilityScore {
  rawScore: number;
  pov: string;
  components: {
    baseline: number;
    foundation: number;
    activity: number;
    specialism: number;
    versatility: number;
    relevancy: number;
  };
  value: number;
}

export interface TryHackMeSocial {
  linkedIn?: string | null;
  github?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  personalWebsite?: string | null;
  reddit?: string | null;
  discord?: string | null;
  calendly?: string | null;
}

export interface TryHackMeProfile {
  username: string;
  found: boolean;
  rank: number;
  points: number;
  avatar: string;
  subscribed: boolean;
  level: number;
  country: string;
  about: string;
  streak: number;
  badgesNumber: number;
  completedRoomsNumber: number;
  topPercentage: number;
  isInTopTenPercent: boolean;
  userRole: string;
  leagueTier: string;
  dateSignUp: string;
  social: TryHackMeSocial;
  certificates: string[];
  capabilityScore: TryHackMeCapabilityScore;
  badgeImageURL: string;
  badges: TryHackMeBadge[];
}

// TryHackMe API Response wrapper
export interface TryHackMeApiResponse {
  success: boolean;
  username: string;
  data: TryHackMeProfile;
  fetchedAt: string;
}
