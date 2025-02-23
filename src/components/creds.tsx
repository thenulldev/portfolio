import React from "react";
import { JSX } from "react";

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
  evidence: any[];
  recommendations: any[];
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
  earn_this_badge_url: any;
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
  level: any;
  time_to_earn: any;
  cost: any;
  type_category: any;
  image: Image;
  image_url: string;
  url: string;
  owner_vanity_slug: string;
  badge_template_earnable: boolean;
  recommendable: boolean;
  issuer: Issuer2;
  related_badge_templates: RelatedBadgeTemplate[];
  alignments: any[];
  badge_template_activities: BadgeTemplateActivity[];
  endorsements: any[];
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

export default async function Credential(): Promise<JSX.Element> {
  const response = await fetch(
    "https://credly-scraper.nulldev.workers.dev/stephen-freerking",
    {
      method: "GET",
      headers: {
        "user-agent": "NullDev-Frontend",
        "content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const jsonResponse = await response.json();
  const dataArray = Array.isArray(jsonResponse)
    ? jsonResponse
    : jsonResponse.data;

  // Only keep items that haven't expired
  const validData = dataArray.filter(
    (item: Root) => new Date(item.expires_at_date) >= new Date()
  );

  return (
    <div className="text-black flex flex-wrap justify-center items-center">
      {validData.map((item: Root) => (
        <figure
          key={item.id}
          className="w-64 h-64 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-4 m-4"
        >
          <img
            className="w-32 h-32 rounded-lg"
            src={item.image.url}
            alt={item.badge_template.name}
          />
          <div className="mt-2 text-center">
            <h1 className="text-xl font-bold">{item.badge_template.name}</h1>
          </div>
        </figure>
      ))}
    </div>
  );
}
