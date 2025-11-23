import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blog/BlogContent";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import { getAllPosts, getAllTags } from "@/lib/blog";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 dark:from-sky-700 dark:via-blue-700 dark:to-indigo-800">
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Navigation */}
        <div className="absolute top-4 left-4 z-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Articles about &quot;{tag}&quot;
            </h1>
            <p className="text-xl sm:text-2xl text-sky-100 max-w-4xl mx-auto leading-relaxed">
              Discover insights and tutorials related to {tag}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white text-sm font-medium">
                {filteredPosts.length} Articles
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white text-sm font-medium">
                Tag: {tag}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Blog Content with Suspense - same as main blog page */}
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

        {/* Newsletter Signup - same as main blog page */}
        <NewsletterSignup />
      </div>
    </div>
  );
}
