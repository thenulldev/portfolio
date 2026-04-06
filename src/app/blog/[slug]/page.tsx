"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Badge, Card, CardContent } from "@/components/ui";
import Link from "next/link";
import { useParams } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { SectionDivider } from "@/components/ui";
import { LoadingState, ErrorState } from "@/components/ui";
import { useGhostPosts } from "@/hooks/useGhostPosts";

interface GhostPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  slug: string;
  author: string;
  readTime: string;
  tags: string[];
  imageUrl: string | null;
}

export default function BlogPostPage(): React.JSX.Element {
  const params = useParams();
  const slug = params?.slug as string;
  const { posts, loading, error } = useGhostPosts();
  const [post, setPost] = useState<GhostPost | null>(null);

  useEffect(() => {
    if (posts.length > 0 && slug) {
      const foundPost = posts.find(p => p.slug === slug || p.id === slug);
      setPost(foundPost || null);
    }
  }, [posts, slug]);

  if (loading) {
    return (
      <AppShell activeTab="blog">
        <div className="max-w-4xl mx-auto">
          <LoadingState title="Article" message="Loading article..." />
        </div>
      </AppShell>
    );
  }

  if (error || !post) {
    return (
      <AppShell activeTab="blog">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <ErrorState 
            title="Article Not Found" 
            error={error || "The article you're looking for doesn't exist or has been removed."}
          />
        </div>
      </AppShell>
    );
  }

  // Get related posts (excluding current)
  const relatedPosts = posts
    .filter(p => p.id !== post.id)
    .slice(0, 2);

  return (
    <AppShell activeTab="blog">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Article */}
        <Card className="border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header Image */}
          {post.imageUrl && (
            <div className="relative w-full h-48 sm:h-64 lg:h-80 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardContent className="p-6 sm:p-10">
            {/* Header */}
            <header className="mb-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4 leading-tight break-words overflow-wrap-anywhere hyphens-auto">
                {post.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${tag}`}>
                    <Badge
                      variant="secondary"
                      className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </header>

            {/* Divider */}
            <div className="h-px bg-slate-200 dark:bg-slate-700 mb-8"></div>

            {/* Post Content */}
            <div
              className="prose prose-slate dark:prose-invert max-w-none overflow-hidden
                prose-headings:text-slate-800 dark:prose-headings:text-slate-200 
                prose-headings:break-words
                prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:break-words prose-p:overflow-wrap-anywhere
                prose-a:text-sky-600 dark:prose-a:text-sky-400 prose-a:break-words
                prose-strong:text-slate-800 dark:prose-strong:text-slate-200 
                prose-code:text-sky-600 dark:prose-code:text-sky-400 prose-code:break-words prose-code:text-xs sm:prose-code:text-sm
                prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-pre:overflow-x-auto
                prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700 
                prose-pre:rounded-lg prose-pre:p-4 prose-pre:text-xs sm:prose-pre:text-sm
                prose-blockquote:border-l-slate-300 dark:prose-blockquote:border-l-slate-600 
                prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400
                prose-blockquote:break-words
                prose-li:text-slate-600 dark:prose-li:text-slate-400
                prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:break-words
                prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:break-words
                prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base
                [&_*]:max-w-full"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <SectionDivider title="More Articles" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <Card className="h-full border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600 transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-5">
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span>{format(new Date(relatedPost.date), 'MMM dd, yyyy')}</span>
                        <span>•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
