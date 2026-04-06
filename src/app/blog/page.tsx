"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import BlogContent from "@/components/features/blog/BlogContent";
import NewsletterSignup from "@/components/features/blog/NewsletterSignup";
import { LoadingState, ErrorState, EmptyState } from "@/components/ui";
import { useGhostPosts } from "@/hooks/useGhostPosts";

export default function BlogPage(): React.JSX.Element {
  const { posts, loading, error, refetch } = useGhostPosts();

  if (loading) {
    return (
      <AppShell activeTab="blog">
        <div className="max-w-4xl mx-auto">
          <LoadingState title="Blog" message="Loading articles..." />
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell activeTab="blog">
        <div className="max-w-4xl mx-auto">
          <ErrorState 
            title="Blog" 
            error={`${error}. Please try again later.`}
          />
          <div className="mt-4 text-center">
            <button
              onClick={refetch}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (posts.length === 0) {
    return (
      <AppShell activeTab="blog">
        <div className="max-w-4xl mx-auto">
          <EmptyState 
            title="No articles yet"
            description="Check back soon for new content!"
          />
          <NewsletterSignup />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell activeTab="blog">
      <div className="max-w-4xl mx-auto">
        <BlogContent posts={posts} />
        <NewsletterSignup />
      </div>
    </AppShell>
  );
}
