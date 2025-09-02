"use client";

import React from "react";
import Link from "next/link";
import BlogCard from "./BlogCard";
import NewsletterSignup from "./NewsletterSignup";
import { 
  SectionContainer,
  SectionHeader,
  Badge
} from "@/components/ui";

// Static blog data for now
const samplePosts = [
  {
    id: "getting-started-with-cybersecurity",
    title: "Getting Started with Cybersecurity: A Beginner's Guide",
    description: "Essential steps and resources for anyone looking to start their cybersecurity journey",
    date: "2024-12-02",
    tags: ["cybersecurity", "beginner", "learning"],
    author: "Stephen Freerking",
    readTime: "5 min read",
    excerpt: "Cybersecurity is one of the most exciting and rapidly evolving fields in technology today..."
  },
  {
    id: "microsoft-learn-journey",
    title: "My Microsoft Learn Journey: From Beginner to Level 30+",
    description: "How I used Microsoft Learn to advance my IT career and earn valuable certifications",
    date: "2024-12-01",
    tags: ["microsoft", "learning", "certifications", "career"],
    author: "Stephen Freerking",
    readTime: "7 min read",
    excerpt: "Microsoft Learn has been an incredible platform for my professional development..."
  },
  {
    id: "tryhackme-learning-path",
    title: "Mastering TryHackMe: My Complete Learning Path Guide",
    description: "A comprehensive guide to navigating TryHackMe's learning paths and maximizing your cybersecurity skills",
    date: "2024-11-30",
    tags: ["tryhackme", "cybersecurity", "hands-on", "learning"],
    author: "Stephen Freerking",
    readTime: "8 min read",
    excerpt: "TryHackMe has become my go-to platform for practical cybersecurity learning..."
  }
];

export default function BlogSection(): React.JSX.Element {
  const posts = samplePosts;
  const allTags = [...new Set(posts.flatMap(post => post.tags))].slice(0, 5);

  if (posts.length === 0) {
    return (
      <SectionContainer maxWidth="4xl">
        <SectionHeader 
          title="Blog & Articles" 
          description="Thoughts, tutorials, and insights from my journey"
        />
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            No blog posts yet, but I&apos;m working on some great content!
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Check back soon for cybersecurity tips, learning resources, and career insights.
          </p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer maxWidth="4xl">
      <SectionHeader 
        title="Latest Articles" 
        description="Recent insights and tutorials from my learning journey"
      />
      
      {/* Featured Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-lg"
        >
          Read All Articles
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </Link>
      </div>

      {/* Quick Topic Navigation */}
      {allTags.length > 0 && (
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Explore by topic:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {allTags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-sm hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-200 dark:hover:border-sky-700 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </SectionContainer>
  );
}
