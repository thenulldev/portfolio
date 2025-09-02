import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui";
import Link from "next/link";
import { notFound } from "next/navigation";

// Static blog data - in a real app, this would come from a CMS or database
const posts = [
  {
    slug: "getting-started-with-cybersecurity",
    title: "Getting Started with Cybersecurity: A Beginner's Guide",
    description: "Essential steps and resources for anyone looking to start their cybersecurity journey",
    date: "2024-12-02",
    tags: ["cybersecurity", "beginner", "learning"],
    author: "Stephen Freerking",
    readTime: "5 min read",
    content: `
      <h2>Why Cybersecurity Matters</h2>
      <p>In today's digital world, cybersecurity isn't just for IT professionals. Everyone who uses technology needs to understand the basics of protecting their digital assets and personal information.</p>
      
      <h2>Essential First Steps</h2>
      <h3>1. Learn the Fundamentals</h3>
      <ul>
        <li><strong>Networking basics</strong>: Understand how the internet works</li>
        <li><strong>Operating systems</strong>: Learn Linux and Windows fundamentals</li>
        <li><strong>Programming</strong>: Start with Python and Bash scripting</li>
      </ul>
      
      <h3>2. Hands-On Practice</h3>
      <ul>
        <li><strong>TryHackMe</strong>: Perfect for beginners with guided learning paths</li>
        <li><strong>HackTheBox</strong>: More advanced challenges for experienced learners</li>
        <li><strong>VulnHub</strong>: Practice on vulnerable virtual machines</li>
      </ul>
      
      <h3>3. Certifications to Consider</h3>
      <ul>
        <li><strong>CompTIA Security+</strong>: Industry-standard entry-level certification</li>
        <li><strong>CEH (Certified Ethical Hacker)</strong>: Practical penetration testing skills</li>
        <li><strong>OSCP (Offensive Security Certified Professional)</strong>: Advanced hands-on certification</li>
      </ul>
      
      <h2>Learning Resources</h2>
      <h3>Free Resources</h3>
      <ul>
        <li><strong>YouTube channels</strong>: NetworkChuck, The Cyber Mentor</li>
        <li><strong>Podcasts</strong>: Darknet Diaries, Security Now</li>
        <li><strong>Books</strong>: "The Web Application Hacker's Handbook"</li>
      </ul>
      
      <h3>Paid Platforms</h3>
      <ul>
        <li><strong>Pluralsight</strong>: Comprehensive video courses</li>
        <li><strong>Udemy</strong>: Affordable courses on specific topics</li>
        <li><strong>SANS</strong>: Industry-leading training (expensive but worth it)</li>
      </ul>
      
      <h2>Building Your Lab</h2>
      <p>Setting up a home lab is crucial for hands-on practice:</p>
      <pre><code># Basic lab setup with VirtualBox
# Install Kali Linux, Windows VM, and vulnerable targets
# Practice on intentionally vulnerable systems</code></pre>
      
      <h2>Next Steps</h2>
      <ol>
        <li><strong>Join communities</strong>: Reddit r/netsec, Discord servers</li>
        <li><strong>Follow security news</strong>: KrebsOnSecurity, The Hacker News</li>
        <li><strong>Practice regularly</strong>: Set aside time each week for learning</li>
        <li><strong>Build projects</strong>: Create your own security tools</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Cybersecurity is a journey, not a destination. Start small, practice consistently, and never stop learning. The field is constantly evolving, which means there's always something new to discover.</p>
      
      <blockquote>
        <p><strong>Remember:</strong> The best time to start learning cybersecurity was yesterday. The second best time is now.</p>
      </blockquote>
    `
  },
  {
    slug: "microsoft-learn-journey",
    title: "My Microsoft Learn Journey: From Beginner to Level 30+",
    description: "How I used Microsoft Learn to advance my IT career and earn valuable certifications",
    date: "2024-12-01",
    tags: ["microsoft", "learning", "certifications", "career"],
    author: "Stephen Freerking",
    readTime: "7 min read",
    content: `
      <h2>Why Microsoft Learn?</h2>
      <p>Microsoft Learn stands out from other learning platforms for several reasons:</p>
      <ul>
        <li><strong>Free access</strong>: Most content is completely free</li>
        <li><strong>Hands-on labs</strong>: Real-world practice environments</li>
        <li><strong>Gamification</strong>: Points, levels, and achievements keep you motivated</li>
        <li><strong>Official content</strong>: Direct from Microsoft experts</li>
        <li><strong>Certification paths</strong>: Clear roadmaps to industry-recognized credentials</li>
      </ul>
      
      <h2>My Learning Strategy</h2>
      <h3>1. Start with Fundamentals</h3>
      <p>I began with the basics:</p>
      <ul>
        <li><strong>Azure Fundamentals (AZ-900)</strong>: Understanding cloud concepts</li>
        <li><strong>Microsoft 365 Fundamentals (MS-900)</strong>: Modern workplace essentials</li>
        <li><strong>Power Platform Fundamentals (PL-900)</strong>: Low-code development</li>
      </ul>
      
      <h3>2. Focus on High-Value Paths</h3>
      <p>Based on my career goals, I prioritized:</p>
      <ul>
        <li><strong>Security</strong>: SC-900, SC-300, AZ-500</li>
        <li><strong>Administration</strong>: AZ-104, MS-102</li>
        <li><strong>Development</strong>: AZ-204, PL-200</li>
      </ul>
      
      <h3>3. Consistent Daily Practice</h3>
      <ul>
        <li><strong>30 minutes minimum</strong>: Even on busy days</li>
        <li><strong>Weekend deep-dives</strong>: Longer sessions for complex topics</li>
        <li><strong>Review sessions</strong>: Weekly recap of learned concepts</li>
      </ul>
      
      <h2>Maximizing Points and Achievements</h2>
      <h3>Point-Earning Strategies</h3>
      <ul>
        <li><strong>Complete modules</strong>: Each module gives 25-100 points</li>
        <li><strong>Take assessments</strong>: Practice tests provide additional points</li>
        <li><strong>Participate in challenges</strong>: Special events offer bonus points</li>
        <li><strong>Daily streak</strong>: Maintain consistent activity</li>
      </ul>
      
      <h2>Tips for Success</h2>
      <h3>1. Use the Learning Paths</h3>
      <p>Don't jump around randomly. Follow the structured paths:</p>
      <ul>
        <li>They build knowledge progressively</li>
        <li>Ensure you don't miss important concepts</li>
        <li>Provide clear certification preparation</li>
      </ul>
      
      <h3>2. Take Notes</h3>
      <ul>
        <li>Use OneNote or similar tools</li>
        <li>Create mind maps for complex topics</li>
        <li>Build your own knowledge base</li>
      </ul>
      
      <h2>Results and Impact</h2>
      <h3>Career Benefits</h3>
      <ul>
        <li><strong>Increased confidence</strong>: Better understanding of Microsoft technologies</li>
        <li><strong>Job opportunities</strong>: New roles opened up due to certifications</li>
        <li><strong>Salary growth</strong>: Higher compensation for specialized skills</li>
        <li><strong>Professional credibility</strong>: Recognition from peers and employers</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Microsoft Learn has been transformative for my career. The combination of free content, hands-on practice, and gamification makes it an excellent platform for continuous learning.</p>
      
      <p>Whether you're just starting your IT journey or looking to advance your career, Microsoft Learn offers the tools and structure you need to succeed.</p>
    `
  },
  {
    slug: "tryhackme-learning-path",
    title: "Mastering TryHackMe: My Complete Learning Path Guide",
    description: "A comprehensive guide to navigating TryHackMe's learning paths and maximizing your cybersecurity skills",
    date: "2024-11-30",
    tags: ["tryhackme", "cybersecurity", "hands-on", "learning"],
    author: "Stephen Freerking",
    readTime: "8 min read",
    content: `
      <h2>Why TryHackMe?</h2>
      <p>TryHackMe has become my go-to platform for practical cybersecurity learning. Unlike traditional courses, it provides hands-on experience in a safe, controlled environment.</p>
      
      <h2>Getting Started: The Right Path</h2>
      <h3>1. Complete Beginner Path</h3>
      <p>If you're new to cybersecurity, start here:</p>
      <ul>
        <li><strong>Pre Security</strong>: Basic concepts and tools</li>
        <li><strong>Web Fundamentals</strong>: Understanding web vulnerabilities</li>
        <li><strong>Network Fundamentals</strong>: TCP/IP, subnetting, and protocols</li>
      </ul>
      
      <h3>2. Intermediate Paths</h3>
      <p>Once you have the basics, explore specialized areas:</p>
      <ul>
        <li><strong>Offensive Security</strong>: Penetration testing techniques</li>
        <li><strong>Defensive Security</strong>: Incident response and forensics</li>
        <li><strong>Web Application Security</strong>: OWASP Top 10 and beyond</li>
      </ul>
      
      <h2>My Learning Strategy</h2>
      <h3>Daily Practice Routine</h3>
      <ul>
        <li><strong>Morning warm-up</strong>: 15 minutes on easy rooms</li>
        <li><strong>Lunch break</strong>: Work on current learning path</li>
        <li><strong>Evening deep-dive</strong>: Complex challenges and CTFs</li>
      </ul>
      
      <h3>Room Selection Strategy</h3>
      <p>I follow this approach when choosing rooms:</p>
      <ol>
        <li>Complete learning paths in order</li>
        <li>Mix easy and challenging rooms</li>
        <li>Focus on one topic at a time</li>
        <li>Review and document everything</li>
      </ol>
      
      <h2>Essential Tools and Techniques</h2>
      <h3>Must-Know Tools</h3>
      <ul>
        <li><strong>Nmap</strong>: Network discovery and enumeration</li>
        <li><strong>Burp Suite</strong>: Web application testing</li>
        <li><strong>Metasploit</strong>: Exploitation framework</li>
        <li><strong>Wireshark</strong>: Network traffic analysis</li>
      </ul>
      
      <h3>Problem-Solving Approach</h3>
      <p>When stuck on a room, I use this method:</p>
      <ol>
        <li>Read the room description carefully</li>
        <li>Enumerate everything systematically</li>
        <li>Document findings in a notebook</li>
        <li>Use hints sparingly</li>
        <li>Join the community for help</li>
      </ol>
      
      <h2>Building Your Home Lab</h2>
      <p>TryHackMe inspired me to build a comprehensive home lab:</p>
      <pre><code># Lab Setup
- Kali Linux VM for offensive tools
- Windows 10 VM for testing
- Vulnerable web applications
- Network segmentation for practice</code></pre>
      
      <h2>Community and Networking</h2>
      <p>The TryHackMe community is incredibly supportive:</p>
      <ul>
        <li><strong>Discord servers</strong>: Real-time help and discussions</li>
        <li><strong>Reddit communities</strong>: r/tryhackme for tips and tricks</li>
        <li><strong>Write-ups</strong>: Learn from others' approaches</li>
        <li><strong>CTF teams</strong>: Join competitions and challenges</li>
      </ul>
      
      <h2>Measuring Progress</h2>
      <h3>Key Metrics to Track</h3>
      <ul>
        <li><strong>Rooms completed</strong>: Aim for consistent daily progress</li>
        <li><strong>Learning paths finished</strong>: Complete structured courses</li>
        <li><strong>Streak maintenance</strong>: Build consistent habits</li>
        <li><strong>Skill development</strong>: Track areas of improvement</li>
      </ul>
      
      <h2>Common Challenges and Solutions</h2>
      <h3>1. Information Overload</h3>
      <p><strong>Challenge:</strong> Too many tools and techniques to learn at once</p>
      <p><strong>Solution:</strong> Focus on one learning path at a time, master fundamentals before moving to advanced topics</p>
      
      <h3>2. Time Management</h3>
      <p><strong>Challenge:</strong> Balancing learning with work and life</p>
      <p><strong>Solution:</strong> Set realistic daily goals, use time-boxing techniques</p>
      
      <h2>Conclusion</h2>
      <p>TryHackMe has been instrumental in my cybersecurity journey. The hands-on approach, structured learning paths, and supportive community make it an excellent platform for both beginners and experienced professionals.</p>
      
      <blockquote>
        <p><strong>Pro tip:</strong> Consistency beats intensity. 30 minutes daily on TryHackMe will get you further than occasional marathon sessions.</p>
      </blockquote>
      
      <p>Ready to start your TryHackMe journey? Begin with the Pre Security path and work your way up. Remember, every expert was once a beginner.</p>
    `
  }
];

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
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${tag}`}>
                    <Badge 
                      variant="secondary" 
                      className="px-4 py-2 text-sm hover:bg-sky-100 dark:hover:bg-sky-800 transition-all duration-300 hover:scale-105 hover:shadow-md"
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
              dangerouslySetInnerHTML={{ __html: post.content }}
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
