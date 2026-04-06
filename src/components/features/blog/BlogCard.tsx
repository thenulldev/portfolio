"use client";

import React, { memo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Badge, Card, CardContent } from "@/components/ui";

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

interface BlogCardProps {
  post: BlogPost;
}

function BlogCard({ post }: BlogCardProps): React.JSX.Element {
  return (
    <Link href={`/blog/${post.id}`}>
      <Card className="group h-full border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer overflow-hidden">
        {/* Header Image */}
        {post.imageUrl && (
          <div className="relative w-full h-36 overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-5">
          <div className="space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{format(new Date(post.date), 'MMM dd, yyyy')}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2 break-words overflow-wrap-anywhere">
                {post.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {post.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Author */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
              <div className="w-5 h-5 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center">
                <span className="text-sky-600 dark:text-sky-400 text-[10px] font-bold">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {post.author}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

const MemoizedBlogCard = memo(BlogCard);
MemoizedBlogCard.displayName = 'BlogCard';

export default MemoizedBlogCard;
