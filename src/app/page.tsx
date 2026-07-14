import PortfolioLayout from "@components/layout/PortfolioLayout";
import SkillsTab from "@/components/features/skills/SkillsTab";
import CareerDashboard from "@/components/features/career/CareerDashboard";
import LearningDashboard from "@/components/features/learning/LearningDashboard";

// Server Component. The Skills tab is rendered through a separate
// Server Component that does the data fetch server-side. Career
// renders from local static data (already SSR-friendly). Learning
// is a Client Component (uses live API hooks) and is fetched
// client-side after hydration; that's out of scope for this branch.
//
// All three tabs ship in the initial HTML response so search engines
// see them, even though PortfolioLayout only shows one at a time.
export default function Home() {
    return (
        <PortfolioLayout
            skillsSlot={<SkillsTab />}
            careerSlot={<CareerDashboard />}
            learningSlot={<LearningDashboard />}
        />
    );
}
