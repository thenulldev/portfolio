import React, { Suspense } from "react";
import AppShell from "@/components/layout/AppShell";
import BlogContent from "@/components/features/blog/BlogContent";
import NewsletterSignup from "@/components/features/blog/NewsletterSignup";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage(): React.JSX.Element {
  // Get blog posts from markdown files
  const posts = getAllPosts();

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
        <BlogContent posts={posts} />
      </Suspense>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </AppShell>
  );
}
