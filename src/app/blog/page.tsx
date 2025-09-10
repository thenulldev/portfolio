import React, { Suspense } from "react";
import Link from "next/link";
import BlogContent from "@/components/blog/BlogContent";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage(): React.JSX.Element {
  // Get blog posts from markdown files
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
             {/* Hero Section */}
       <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 dark:from-sky-700 dark:via-blue-700 dark:to-indigo-800">
         <div className="absolute inset-0 bg-black/10"></div>
         
         {/* Navigation */}
         <div className="absolute top-4 left-4 z-20">
           <Link 
             href="/"
             className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-lg transition-all duration-300 hover:scale-105"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
             </svg>
             Back to Home
           </Link>
         </div>
         
         <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">
           <div className="text-center">
             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
               Blog & Articles
             </h1>
            <p className="text-xl sm:text-2xl text-sky-100 max-w-4xl mx-auto leading-relaxed">
              Sharing insights, tutorials, and experiences from my journey in IT, cybersecurity, and continuous learning.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white text-sm font-medium">
                {posts.length} Articles
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white text-sm font-medium">
                Latest: {new Date(posts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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


      </div>
    </div>
  );
}
