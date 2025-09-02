"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui";

interface BlogPostMeta {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readTime: string;
  excerpt: string;
}

interface BlogCardProps {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps): React.JSX.Element {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-600 hover:border-sky-200 dark:hover:border-sky-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span>{format(new Date(post.date), 'MMM dd, yyyy')}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 line-clamp-3">
              {post.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Author */}
          <div className="flex items-center gap-2 pt-2">
            <div className="w-6 h-6 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {post.author}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
