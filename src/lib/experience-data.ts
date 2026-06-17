import { CareerEntry, CareerSummary } from "@/types/experience";

/**
 * Static career data — update from LinkedIn profile.
 *
 * To update: copy your LinkedIn experience section into the
 * entries array below. The type (CareerEntry) guides the shape.
 */

export const careerSummary: CareerSummary = {
  headline: "Cloud & Cybersecurity Engineer",
  summary:
    "Building secure, scalable infrastructure and automating everything that can be automated. " +
    "Specializing in cloud architecture, DevSecOps, and offensive security. " +
    "Active practitioner on TryHackMe and Hack The Box with ongoing commitment to hands-on learning.",
  yearsOfExperience: 2, // <-- update this
  industries: ["Cybersecurity", "Cloud Computing", "DevOps / DevSecOps"],
  coreCompetencies: [
    "Cloud Architecture (AWS, Azure)",
    "Infrastructure as Code (Terraform, CloudFormation)",
    "CI/CD & Automation (GitHub Actions, GitLab CI)",
    "Penetration Testing & Red Teaming",
    "Container Security (Docker, Kubernetes)",
    "Identity & Access Management",
  ],
};

export const careerEntries: CareerEntry[] = [
  // Placeholder template — duplicate and fill for each role.
  // {
  //   id: "unique-id",
  //   company: "Company Name",
  //   companyUrl: "https://company.com",
  //   logo: "https://logo-url.png",
  //   title: "Job Title",
  //   employmentType: "Full-time",
  //   location: "City, State / Remote",
  //   locationType: "Remote",
  //   startDate: "2024-01-01",
  //   endDate: null, // null = Present
  //   description: [
  //     "Key responsibility or achievement 1",
  //     "Key responsibility or achievement 2",
  //   ],
  //   skills: ["AWS", "Terraform", "Python"],
  //   highlights: [
  //     "Reduced deployment time by 60%",
  //   ],
  // },

  {
    id: "current-role-placeholder",
    company: "[Your Current Company]",
    companyUrl: null,
    logo: null,
    title: "Cloud & Cybersecurity Engineer",
    employmentType: "Full-time",
    location: "United States",
    locationType: "Remote",
    startDate: "2024-01-01",
    endDate: null,
    description: [
      "Design and implement secure cloud architectures across multi-provider environments.",
      "Automate security controls into CI/CD pipelines with Infrastructure-as-Code policies.",
      "Conduct internal penetration tests and vulnerability assessments.",
      "Lead incident response drills and tabletop exercises.",
    ],
    skills: ["AWS", "Azure", "Terraform", "Docker", "Kubernetes", "Python", "Go"],
    highlights: [
      "Achieved top 2% ranking on TryHackMe (27,167 out of ~2M users).",
      "Completed 168+ hands-on labs across THM and HTB platforms.",
    ],
  },

  {
    id: "prev-role-placeholder",
    company: "[Previous Company]",
    companyUrl: null,
    logo: null,
    title: "[Previous Title]",
    employmentType: "Full-time",
    location: "United States",
    locationType: "On-site",
    startDate: "2022-06-01",
    endDate: "2023-12-01",
    description: [
      "Placeholder — paste from LinkedIn.",
    ],
    skills: ["Linux", "Bash", "Networking", "Security"],
    highlights: [],
  },
];
