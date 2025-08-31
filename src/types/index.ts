// Certification types
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

// TryHackMe types
export interface TryHackMeBadge {
  name: string;
  earnedAt?: string;
  _id: string;
}

export interface TryHackMeRoom {
  type: string;
  tags: Array<{
    id: string;
    weight: number;
    _id?: string;
  }>;
  difficulty: string;
  code: string;
  title: string;
  description: string;
  image: string;
  banner: string;
}

export interface TryHackMeActivityEvent {
  _id: {
    year: string;
    month: string;
    day: string;
    action: string;
  };
  events: number;
}

export interface TryHackMeProfile {
  badges: TryHackMeBadge[];
  userRank: number;
  points: number;
  avatar: string;
  subscribed: number;
  completedRooms: number;
  allCompletedRooms: TryHackMeRoom[];
  activityEvents: TryHackMeActivityEvent[];
  lastActivityDate: string;
}

// Hook return types
export interface UseCertificationsReturn {
  certifications: Root[];
  skills: { name: string }[];
  skillCounts: { [name: string]: number };
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}
