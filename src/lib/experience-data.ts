import { CareerEntry, CareerSummary } from "@/types/experience";

/**
 * Career data — sourced from resume.
 * Update this file directly when roles change.
 */

export const careerSummary: CareerSummary = {
  headline: "Cloud & Cybersecurity Engineer",
  summary:
    "IT professional with 6+ years in systems administration and cybersecurity, currently pursuing a B.S. in Cybersecurity & Information Assurance. " +
    "Skilled in securing multi-site infrastructure, driving enterprise automation, and translating security frameworks into day-to-day operational controls across complex, multi-tenant environments.",
  yearsOfExperience: 6,
  industries: ["Cybersecurity", "Enterprise IT", "SaaS / Technology"],
  coreCompetencies: [
    "Infrastructure Architecture",
    "Identity & Access Management (AD / GPO / Least Privilege)",
    "Disaster Recovery & Business Continuity",
    "Enterprise Automation & Service Delivery",
    "Incident Management & Tier 1/2 Support",
    "Network & Endpoint Security",
    "Technical Documentation & Knowledge Management",
    "Community & Stakeholder Engagement",
  ],
};

export const careerEntries: CareerEntry[] = [
  {
    id: "reed-family-companies-it-support-specialist",
    company: "Reed Family Companies",
    companyUrl: null,
    logo: null,
    title: "IT Support Specialist",
    employmentType: "Full-time",
    location: "Modesto, CA",
    locationType: "On-site",
    startDate: "2023-06-01",
    endDate: null,
    description: [
      "Architected and secured multi-site network infrastructure (wireless/fiber) and administered multi-tenant Active Directory environments, enforcing least-privilege access controls, GPO policy, and identity lifecycle management — applying defense-in-depth principles to measurably reduce organizational attack surface across all locations.",
      "Designed, documented, and tested comprehensive DR/BCP plans aligned to industry best practices, and engineered high-availability alerting systems to ensure defined RTO/RPO targets were consistently met — maintaining uninterrupted service continuity across a distributed, multi-site environment.",
      "Spearheaded automated onboarding workflows and standardized hardware provisioning processes, and led large-scale enterprise application deployments (PoS, PrinterLogic) — leveraging structured service management practices to improve delivery consistency and reduce mean time to resolution across the organization.",
    ],
    skills: [
      "Active Directory",
      "Group Policy (GPO)",
      "Network Infrastructure",
      "Disaster Recovery",
      "Business Continuity",
      "Automation",
      "PrinterLogic",
      "PoS Systems",
      "Identity Lifecycle Management",
    ],
    highlights: [
      "Reduced attack surface via defense-in-depth across multi-site infrastructure",
      "Met RTO/RPO targets with HA alerting and tested DR/BCP plans",
      "Cut mean time to resolution via automated provisioning workflows",
    ],
  },

  {
    id: "reed-family-companies-it-intern",
    company: "Reed Family Companies",
    companyUrl: null,
    logo: null,
    title: "Information Technology Intern",
    employmentType: "Internship",
    location: "Modesto, CA",
    locationType: "On-site",
    startDate: "2023-04-01",
    endDate: "2023-06-01",
    description: [
      "Delivered rapid-response Tier 1/2 technical support across hardware, software, and network systems, applying structured troubleshooting methodology to diagnose and resolve business-critical incidents — minimizing end-user downtime and contributing to measurable improvements in first-call resolution rates.",
      "Contributed to network expansion projects including device configuration, cabling, and infrastructure documentation; simultaneously executed hardware refresh initiatives using automated OS imaging to ensure security-baseline configuration consistency and accelerate deployment timelines across the environment.",
      "Assisted in developing and formalizing standardized IT service procedures, provisioning checklists, and deployment runbooks — improving repeatability, reducing onboarding time for new equipment, and laying groundwork for scalable service operations.",
    ],
    skills: [
      "Tier 1/2 Support",
      "Hardware Troubleshooting",
      "Network Configuration",
      "OS Imaging",
      "Documentation",
      "Runbooks",
      "Incident Management",
    ],
    highlights: [
      "Improved first-call resolution rates with structured troubleshooting",
      "Accelerated deployment timelines via automated OS imaging",
      "Established repeatable provisioning runbooks for scalable ops",
    ],
  },

  {
    id: "notify-technologies-customer-support-specialist",
    company: "Notify Technologies",
    companyUrl: null,
    logo: null,
    title: "Customer Support Specialist",
    employmentType: "Full-time",
    location: "Remote",
    locationType: "Remote",
    startDate: "2020-01-01",
    endDate: "2023-03-01",
    description: [
      "Delivered platform-level technical support across a fully remote, distributed environment — diagnosing and resolving complex issues with a structured, service-oriented approach that consistently maintained high customer satisfaction scores and minimized escalation rates across a broad, technical user base.",
      "Produced comprehensive runbooks, user guides, and REST API documentation that significantly reduced repeat support incidents, accelerated developer onboarding, and established clear knowledge-sharing standards — demonstrating a strong commitment to continual process improvement and self-service enablement.",
      "Managed and grew developer communities across GitHub, Discord, and internal channels — actively surfacing user feedback, identifying recurring pain points, and delivering actionable product insights that directly contributed to platform improvement cycles and increased community retention.",
    ],
    skills: [
      "Technical Support",
      "Customer Success",
      "REST API",
      "Documentation",
      "Runbooks",
      "GitHub",
      "Discord",
      "Community Management",
      "Remote Collaboration",
    ],
    highlights: [
      "Maintained high CSAT while minimizing escalation rates",
      "Reduced repeat incidents via self-service documentation",
      "Drove platform improvements through community feedback loops",
    ],
  },
];
