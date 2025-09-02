"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import BlogCard from "./BlogCard";
import NewsletterSignup from "./NewsletterSignup";
import { 
  SectionContainer,
  SectionHeader,
  Badge
} from "@/components/ui";
import { BlogPost } from "@/lib/blog";

export default function BlogSection(): React.JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const allTags = [...new Set(posts.flatMap(post => post.tags))].slice(0, 5);

  if (loading) {
    return (
      <SectionContainer maxWidth="4xl">
        <SectionHeader 
          title="Blog & Articles" 
          description="Thoughts, tutorials, and insights from my journey"
        />
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading blog posts...</p>
        </div>
      </SectionContainer>
    );
  }

  if (error) {
    return (
      <SectionContainer maxWidth="4xl">
        <SectionHeader 
          title="Blog & Articles" 
          description="Thoughts, tutorials, and insights from my journey"
        />
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400 mb-4">
            Error loading blog posts: {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </SectionContainer>
    );
  }

  if (posts.length === 0) {
    return (
      <SectionContainer maxWidth="4xl">
        <SectionHeader 
          title="Blog & Articles" 
          description="Thoughts, tutorials, and insights from my journey"
        />
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            No blog posts yet, but I&apos;m working on some great content!
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Check back soon for cybersecurity tips, learning resources, and career insights.
          </p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer maxWidth="4xl">
      <SectionHeader 
        title="Latest Articles" 
        description="Recent insights and tutorials from my learning journey"
      />
      
      {/* Featured Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-lg"
        >
          Read All Articles
          <svg 
            className="w-5 h-5" 
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
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Explore by topic:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {allTags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-sm hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-200 dark:hover:border-sky-700 transition-all duration-300 hover:scale-105 cursor-pointer"
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
