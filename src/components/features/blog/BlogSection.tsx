"use client";

import React from "react";
import Link from "next/link";
import BlogCard from "./BlogCard";
import NewsletterSignup from "./NewsletterSignup";
import {
  SectionContainer,
  SectionHeader,
  SectionDivider,
  Badge,
  ErrorState,
  EmptyState
} from "@/components/ui";
import { useGhostPosts } from "@/hooks/useGhostPosts";

export default function BlogSection(): React.JSX.Element {
  const { posts, loading, error } = useGhostPosts();

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).slice(0, 5);
  }, [posts]);

  if (loading) {
    return (
      <SectionContainer maxWidth="7xl" variant="transparent">
        <SectionHeader
          title="Blog & Articles"
          description="Thoughts, tutorials, and insights from my journey"
        />
        <div className="py-12">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-sky-200 dark:border-sky-800 border-t-sky-500 dark:border-t-sky-400"></div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">Loading blog posts...</p>
        </div>
      </SectionContainer>
    );
  }

  if (error) {
    return (
      <SectionContainer maxWidth="7xl" variant="transparent">
        <SectionHeader
          title="Blog & Articles"
          description="Thoughts, tutorials, and insights from my journey"
        />
        <ErrorState 
          title="Blog & Articles" 
          error={`Error loading blog posts: ${error}`}
        />
      </SectionContainer>
    );
  }

  if (posts.length === 0) {
    return (
      <SectionContainer maxWidth="7xl" variant="transparent">
        <SectionHeader
          title="Blog & Articles"
          description="Thoughts, tutorials, and insights from my journey"
        />
        <EmptyState 
          title="No blog posts yet"
          description="Check back soon for new content!"
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer maxWidth="7xl" variant="transparent">
      <SectionHeader 
        title="Blog & Articles"
        description="Recent insights and tutorials from my learning journey"
      />

      {/* Featured Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-sm"
        >
          Read All Articles
          <svg
            className="w-4 h-4"
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
        <div className="mb-12">
          <SectionDivider title="Explore by Topic" />
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <Link key={tag} href={`/blog/tag/${tag}`}>
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 text-xs hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-300 dark:hover:border-sky-700 transition-colors duration-200 cursor-pointer"
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
