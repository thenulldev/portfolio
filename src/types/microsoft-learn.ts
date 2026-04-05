// Microsoft Learn types
export interface MsLearnProfile {
  docsId: string;
  totalXp: number;
  currentLevel: number;
  currentLevelLow: number;
  currentLevelHigh: number;
  currentLevelPointsEarned: number;
  nextLevel: number;
  pointsUntilNextLevel: number;
  achievementCategories: Record<string, number>;
}
