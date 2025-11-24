import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import BlogContent from "@/components/features/blog/BlogContent";
import NewsletterSignup from "@/components/features/blog/NewsletterSignup";
import { getAllPosts, getAllTags } from "@/lib/blog";
import AppShell from "@/components/layout/AppShell";

interface BlogTagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag } = await params;
  const posts = getAllPosts();
  const allTags = getAllTags();

  // Check if the tag exists
  if (!allTags.includes(tag)) {
    notFound();
  }

  // Filter posts by tag
  const filteredPosts = posts.filter(post => post.tags.includes(tag));

  return (
    <AppShell activeTab="blog">
      {/* Blog Content with Suspense */}
      <Suspense fallback={
        <div className="text-center py-20">
          <div className="w-20 h-20 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Loading Blog Content</h3>
          <p className="text-slate-500 dark:text-slate-400">Please wait while we prepare your reading experience...</p>
        </div>
      }>
        <BlogContent
          posts={filteredPosts}
          title={`Articles about "${tag}"`}
          subtitle={`${filteredPosts.length} articles tagged with ${tag}`}
        />
      </Suspense>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </AppShell>
  );
}
