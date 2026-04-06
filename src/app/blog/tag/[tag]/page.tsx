"use client";

import React from "react";
import { useParams } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import BlogContent from "@/components/features/blog/BlogContent";
import NewsletterSignup from "@/components/features/blog/NewsletterSignup";
import { LoadingState, ErrorState, EmptyState } from "@/components/ui";
import { useGhostPosts } from "@/hooks/useGhostPosts";

export default function BlogTagPage(): React.JSX.Element {
  const params = useParams();
  const tag = params?.tag as string;
  const { posts, loading, error } = useGhostPosts();

  // Filter posts by tag
  const filteredPosts = posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );

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
          <ErrorState title="Blog" error={`${error}. Please try again later.`} />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell activeTab="blog">
      <div className="max-w-4xl mx-auto">
        {filteredPosts.length > 0 ? (
          <>
            <BlogContent
              posts={filteredPosts}
              title={`Articles about "${tag}"`}
              subtitle={`${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} tagged with ${tag}`}
            />
            <NewsletterSignup />
          </>
        ) : (
          <>
            <EmptyState 
              title={`No articles found for "${tag}"`}
              description={`No articles are tagged with "${tag}". Check out all articles for more content.`}
            />
            <div className="mt-6 text-center">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                View All Articles
              </a>
            </div>
            <NewsletterSignup />
          </>
        )}
      </div>
    </AppShell>
  );
}
