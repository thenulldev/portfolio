import { NextResponse } from 'next/server';

// Ghost API configuration
const GHOST_URL = process.env.GHOST_URL || 'https://your-ghost-blog.com';
const GHOST_API_KEY = process.env.GHOST_API_KEY || '';

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

// Calculate read time based on content length
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

// Extract description from content (first paragraph or first 200 chars)
function extractDescription(content: string): string {
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (text.length > 200) {
    return text.substring(0, 200) + '...';
  }
  return text || 'No description available';
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function GET() {
  try {
    // Build API URL - key is optional for public Ghost instances
    let apiUrl = `${GHOST_URL}/ghost/api/v3/content/posts/?include=tags,authors&limit=20`;
    if (GHOST_API_KEY) {
      apiUrl += `&key=${GHOST_API_KEY}`;
    }
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Ghost posts: ${response.status}`);
    }

    const data = await response.json();
    const ghostPosts = data.posts || [];
    
    // Transform Ghost posts to our format
    const posts: GhostPost[] = ghostPosts.map((post: any) => {
      const title = post.title || 'Untitled';
      const content = post.html || post.excerpt || '';
      const pubDate = post.published_at || post.created_at || new Date().toISOString();
      const slug = post.slug || generateSlug(title);
      
      // Extract tags
      const tags = post.tags?.map((tag: any) => tag.name) || ['Blog'];
      
      // Get featured image
      const imageUrl = post.feature_image || null;
      
      // Get author
      const author = post.authors?.[0]?.name || post.author?.name || 'Stephen Freerking';
      
      return {
        id: slug,
        title,
        description: post.excerpt || extractDescription(content),
        content: content,
        date: new Date(pubDate).toISOString(),
        slug,
        author,
        readTime: calculateReadTime(content),
        tags,
        imageUrl,
      };
    });

    return NextResponse.json({
      posts,
      count: posts.length,
      source: 'ghost',
      lastUpdated: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching Ghost posts:', error);
    
    return NextResponse.json(
      { 
        posts: [],
        count: 0,
        source: 'ghost',
        error: 'Failed to fetch posts from Ghost',
      },
      { status: 500 }
    );
  }
}
