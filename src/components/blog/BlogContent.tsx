"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui";
import { BlogPost } from "@/lib/blog";

interface BlogContentProps {
  posts: BlogPost[];
}

export default function BlogContent({ posts }: BlogContentProps): React.JSX.Element {
  const allTags = useMemo(() => [...new Set(posts.flatMap(post => post.tags))], [posts]);
  const searchParams = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Handle URL parameters for tags
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam && allTags.includes(tagParam)) {
      setSelectedTag(tagParam);
    }
  }, [searchParams, allTags]);
  
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <>
      {/* Enhanced Tags Filter */}
      <div className="mb-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {selectedTag ? `Articles about "${selectedTag}"` : "All Articles"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {filteredPosts.length} of {posts.length} articles
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Badge 
            variant={selectedTag === null ? "default" : "outline"}
            className="px-6 py-3 text-base cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-200 dark:hover:border-sky-700 transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedTag(null)}
          >
            All Posts ({posts.length})
          </Badge>
          {allTags.map((tag) => (
            <Badge 
              key={tag} 
              variant={selectedTag === tag ? "default" : "outline"}
              className="px-6 py-3 text-base cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-200 dark:hover:border-sky-700 transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag} ({posts.filter(post => post.tags.includes(tag)).length})
            </Badge>
          ))}
        </div>
      </div>

      {/* Blog Posts with Enhanced Layout */}
      <div className="space-y-20">
        {filteredPosts.map((post) => (
          <article key={post.id} className="group">
            {/* Article Container */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              {/* Featured Image Placeholder */}
              <div className="h-64 bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 dark:from-sky-900/50 dark:via-blue-900/50 dark:to-indigo-900/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-blue-500/20 to-indigo-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/80 dark:bg-slate-700/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 9.246 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 19 16.5 19c-1.746 0-3.332-.523-4.5-1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      {post.tags[0].charAt(0).toUpperCase() + post.tags[0].slice(1)}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8 lg:p-12">
                {/* Enhanced Header */}
                <header className="mb-10">
                  {/* Meta Information with Icons */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>By {post.author}</span>
                    </div>
                  </div>

                  {/* Title with Enhanced Typography */}
                  <Link href={`/blog/${post.id}`}>
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6 leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300 cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>

                  {/* Description with Better Styling */}
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-4xl">
                    {post.description}
                  </p>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/blog?tag=${tag}`}>
                        <Badge 
                          variant="secondary" 
                          className="px-4 py-2 text-sm cursor-pointer hover:bg-sky-100 dark:hover:bg-sky-800 transition-all duration-300 hover:scale-105 hover:shadow-md"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </header>

                {/* Enhanced Post Content */}
                <div 
                  className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                    prose-headings:text-slate-800 dark:prose-headings:text-slate-200 
                    prose-p:text-slate-600 dark:prose-p:text-slate-400 
                    prose-a:text-sky-600 dark:prose-a:text-sky-400 
                    prose-strong:text-slate-800 dark:prose-strong:text-slate-200 
                    prose-code:text-sky-600 dark:prose-code:text-sky-400 
                    prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 
                    prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700 
                    prose-pre:rounded-xl prose-pre:p-6
                    prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-600 
                    prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50
                    prose-blockquote:rounded-xl prose-blockquote:p-6
                    prose-li:text-slate-600 dark:prose-li:text-slate-400
                    prose-ul:space-y-2 prose-ol:space-y-2
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
                    prose-p:leading-relaxed prose-p:text-base"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* No Posts Message */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-3">
            No articles found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {selectedTag 
              ? `No articles found for "${selectedTag}". Try selecting a different tag or view all articles.`
              : "No articles available at the moment. Check back soon for new content!"
            }
          </p>
          {selectedTag && (
            <button 
              onClick={() => setSelectedTag(null)}
              className="mt-6 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl transition-colors"
            >
              View All Articles
            </button>
          )}
        </div>
      )}
    </>
  );
}
