"use client";

import { useApiData } from "../hooks/useApiData";
import { TryHackMeProfile } from "../types";
import { 
  SectionContainer,
  SectionHeader,
  LoadingState,
  ErrorState
} from "./ui";

export default function TryHackMeStats() {
  const { data: profile, loading, error } = useApiData<TryHackMeProfile>("/api/tryhackme");

  if (loading) {
    return <LoadingState title="TryHackMe Stats" message="Loading TryHackMe data..." />;
  }

  if (error || !profile) {
    return <ErrorState title="TryHackMe Stats" error={error || "Failed to load profile data"} />;
  }

  // Sort badges by earned date (most recent first) and get only badges with earnedAt dates
  const sortedBadges = [...profile.badges]
    .filter(badge => badge.earnedAt) // Only include badges with earnedAt dates
    .sort((a, b) => new Date(b.earnedAt!).getTime() - new Date(a.earnedAt!).getTime())
    .slice(0, 6); // Get only the latest 6 badges

  // Format badge names for display
  const formatBadgeName = (name: string) => {
    // Handle special cases for better readability
    const specialCases: { [key: string]: string } = {
      'skilled-navigator': 'Skilled Navigator',
      'network-fundamentals': 'Network Fundamentals',
      'web-fund': 'Web Fundamentals',
      'world-wide-web': 'World Wide Web',
      'terminaled': 'Terminal Master',
      'metasploitable': 'Metasploitable',
      'owasp-10': 'OWASP Top 10',
      'swordapprenticebadge': 'Sword Apprentice',
      'careerreadybadge': 'Career Ready',
      'shieldapprentice': 'Shield Apprentice',
      'friday-fixer': 'Friday Fixer',
      'intro-to-pentesting': 'Intro to Pentesting',
      'intro-to-web-hacking': 'Intro to Web Hacking',
      'burped': 'Burp Suite',
      '7-day-streak': '7 Day Streak'
    };

    if (specialCases[name]) {
      return specialCases[name];
    }

    // Default formatting
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <SectionContainer maxWidth="4xl">
      <SectionHeader 
        title="TryHackMe Stats" 
        description="Cybersecurity training progress and achievements" 
      />

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">TryHackMe</h3>
          <span className="text-sm bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-800 dark:text-red-300 py-2 px-4 rounded-full font-semibold border border-red-200 dark:border-red-700">
            Rank #{profile.userRank.toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Points</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">
              {profile.points.toLocaleString()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Badges Earned</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">
              {profile.badges.length}
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Rooms Completed</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">
              {profile.completedRooms}
            </div>
          </div>
        </div>

                 <div className="space-y-4">
                       <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Recent Badges</h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {profile.badges.filter(b => b.earnedAt).length} total earned badges
              </span>
            </div>
           
                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sortedBadges.map((badge) => (
                <div 
                  key={badge._id} 
                  className="flex flex-col items-center p-5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 hover:shadow-md transition-shadow"
                  title={`${formatBadgeName(badge.name)} - Earned ${new Date(badge.earnedAt!).toLocaleDateString()}`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-3">
                    <span className="text-white text-lg">🏆</span>
                  </div>
                                     <div className="text-xs text-slate-700 dark:text-slate-300 text-center leading-tight font-medium mb-1 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                     {formatBadgeName(badge.name)}
                   </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    {new Date(badge.earnedAt!).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              ))}
            </div>
         </div>

                 <div className="mt-6 space-y-3">
           {profile.subscribed === 1 && (
             <div className="p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-700 rounded-lg">
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                 <span className="text-sm font-medium text-red-800 dark:text-red-300">
                   TryHackMe Pro Member
                 </span>
               </div>
             </div>
           )}
           
           <div className="p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg">
             <div className="flex items-center gap-2">
               <div className="w-4 h-4 bg-slate-500 rounded-full"></div>
               <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                 Last Active: {new Date(profile.lastActivityDate).toLocaleDateString('en-US', { 
                   year: 'numeric', 
                   month: 'long', 
                   day: 'numeric' 
                 })}
               </span>
             </div>
           </div>
         </div>
      </div>
    </SectionContainer>
  );
}
