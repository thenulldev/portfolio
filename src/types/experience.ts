// Career / work experience types

export interface CareerEntry {
  id: string;
  company: string;
  companyUrl?: string | null;
  logo?: string | null;
  title: string;
  employmentType: "Full-time" | "Contract" | "Freelance" | "Internship" | "Part-time";
  location: string;
  locationType: "On-site" | "Hybrid" | "Remote";
  startDate: string; // ISO date
  endDate?: string | null; // null = present
  description: string[]; // bullet points
  skills: string[]; // technologies/tools used
  highlights?: string[]; // key achievements
}

export interface CareerSummary {
  headline: string;
  summary: string;
  yearsOfExperience: number;
  industries: string[];
  coreCompetencies: string[];
}
