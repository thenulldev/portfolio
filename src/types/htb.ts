export interface HTBStreak {
  counter: number;
  currentExperiencePoints: number;
  requiredExperiencePoints: number;
  remainingExperiencePoints: number;
  expiresAt: string | null;
  isCompleted: boolean;
  inDanger: boolean;
  maxStreak: number;
  streakSavers: number;
}

export interface HTBProfile {
  level: number;
  levelTitle: string;
  levelGrade: string;
  rankImage: string;
  rankImageBackground: string;
  totalExperiencePoints: number;
  levelExperiencePoints: number;
  experienceUntilNextLevel: number;
  streak: HTBStreak;
  activeMultipliers: unknown[];
  fetchedAt: string;
  source?: string;
}
