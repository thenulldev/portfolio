import { TryHackMeProfile } from "@/types/tryhackme";

/**
 * Static snapshot of TryHackMe profile data.
 * Captured from browser session on 2025-07-02.
 * Source: https://tryhackme.com/api/v2/public-profile?username=ThatNullDev
 * THM API is now behind Cloudflare bot protection — live scraping no longer viable.
 */
export const staticTryHackMeProfile: TryHackMeProfile = {
  username: "ThatNullDev",
  found: true,
  rank: 27167,
  points: 21777,
  avatar: "https://secure.gravatar.com/avatar/229898830cf6f25f21e69166d68225ca.jpg?s=200&d=robohash&r=x",
  subscribed: true,
  level: 13,
  country: "us",
  about: "",
  streak: 0,
  badgesNumber: 27,
  completedRoomsNumber: 168,
  topPercentage: 2,
  isInTopTenPercent: true,
  userRole: "professional",
  leagueTier: "bronze",
  dateSignUp: "2024-10-20T04:48:22.985Z",
  social: {
    linkedIn: "thatnulldev",
    github: null,
    twitter: null,
    instagram: null,
    personalWebsite: "thenull.dev",
    reddit: null,
    discord: "stephenfdev",
    calendly: null,
  },
  certificates: ["SAL1", "SEC1"],
  capabilityScore: {
    rawScore: 54.96,
    pov: "red",
    components: {
      baseline: 0,
      foundation: 0,
      activity: 0,
      specialism: 0,
      versatility: 0,
      relevancy: 0,
    },
    value: 54.96,
  },
  badgeImageURL: "https://tryhackme-badges.s3.amazonaws.com/ThatNullDev.png",
  badges: [],
};
