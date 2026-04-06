"use client";

import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Badge, Card, CardContent } from "@/components/ui";
import { SectionDivider, SectionHeader } from "@/components/ui";

interface BlogPost {
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

interface BlogContentProps {
  posts: BlogPost[];
  title?: string;
  subtitle?: string;
}

// Function to extract preview content
function getContentPreview(htmlContent: string): string {
  const contentWithoutTitle = htmlContent.replace(/<h1>.*?<\/h1>\s*/, '');
  const paragraphs = contentWithoutTitle.match(/<p>.*?<\/p>/g) || [];
  const previewParagraphs = paragraphs.slice(0, 2);

  if (previewParagraphs.length > 0) {
    return previewParagraphs.join('') + '<p class="text-slate-500 dark:text-slate-400 italic text-sm mt-4">...</p>';
  }

  const textContent = contentWithoutTitle.replace(/<[^>]*>/g, '');
  return `<p class="text-slate-600 dark:text-slate-400 text-sm">${textContent.substring(0, 200)}...</p>`;
}

export default function BlogContent({ posts, title = "All Articles", subtitle }: BlogContentProps): React.JSX.Element {
  // Extract unique tags from all posts
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  return (
    <>
      {/* Header */}
      <SectionHeader
        title={title}
        description={subtitle || `${posts.length} article${posts.length !== 1 ? 's' : ''}`}
      />

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Link href="/blog">
            <Badge
              variant={title === "All Articles" ? "default" : "outline"}
              className="px-3 py-1.5 text-xs cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
            >
              All ({posts.length})
            </Badge>
          </Link>
          {allTags.map((tag: string) => {
            const tagCount = posts.filter(post => post.tags.includes(tag)).length;
            return (
              <Link key={tag} href={`/blog/tag/${tag}`}>
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 text-xs cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-300 transition-colors"
                >
                  {tag} ({tagCount})
                </Badge>
              </Link>
            );
          })}
        </div>
      )}

      {/* Blog Posts */}
      <div className="space-y-8">
        {posts.map((post, index) => (
          <article key={post.id}>
            <Card className="border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600 transition-all duration-300 hover:shadow-md overflow-hidden">
              {/* Header Image */}
              {post.imageUrl && (
                <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <CardContent className="p-6 sm:p-8">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
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
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors cursor-pointer break-words overflow-wrap-anywhere">
                    {post.title}
                  </h2>
                </Link>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog/tag/${tag}`}>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>

                {/* Preview Content */}
                <div
                  className="prose prose-sm prose-slate dark:prose-invert max-w-none mb-6
                    prose-p:text-slate-600 dark:prose-p:text-slate-400 
                    prose-a:text-sky-600 dark:prose-a:text-sky-400 
                    prose-strong:text-slate-800 dark:prose-strong:text-slate-200"
                  dangerouslySetInnerHTML={{ __html: getContentPreview(post.content) }}
                />

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                >
                  Read Full Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>

            {/* Divider between posts */}
            {index < posts.length - 1 && (
              <div className="my-8 flex items-center justify-center">
                <div className="w-16 h-px bg-slate-200 dark:bg-slate-700"></div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* No Posts Message */}
      {posts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            No articles found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No articles available at the moment. Check back soon for new content!
          </p>
        </div>
      )}
    </>
  );
}
