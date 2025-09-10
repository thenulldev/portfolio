import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";

// Get all blog posts from markdown files
const posts = getAllPosts();

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
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
            {/* Header */}
            <header className="mb-10">
              {/* Meta Information */}
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

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-4xl">
                {post.description}
              </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/blog/tag/${tag}`}>
                        <Badge 
                          variant="secondary" 
                          className="px-2 py-1 text-xs hover:bg-sky-100 dark:hover:bg-sky-800 transition-colors duration-200"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
            </header>

            {/* Post Content */}
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
              dangerouslySetInnerHTML={{ __html: post.content.replace(/<h1>.*?<\/h1>\s*/, '') }}
            />
          </div>
        </article>

        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center">
            More Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts
              .filter(p => p.slug !== post.slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link 
                  key={relatedPost.slug} 
                  href={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                      {relatedPost.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span>{format(new Date(relatedPost.date), 'MMM dd, yyyy')}</span>
                      <span>•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
