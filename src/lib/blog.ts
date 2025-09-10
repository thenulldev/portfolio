import blogPostsData from '@/data/blog-posts.json';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readTime: string;
  content: string;
  slug: string;
}

// Type assertion for the imported JSON data
const posts = blogPostsData as BlogPost[];

// Runtime functions that work with the pre-generated data
export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostById(id: string): BlogPost | null {
  return posts.find(post => post.id === id) || null;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return posts.find(post => post.slug === slug) || null;
}

export function getPostsByTag(tag: string): BlogPost[] {
  return posts.filter(post => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allTags = posts.flatMap(post => post.tags);
  return [...new Set(allTags)];
}

export function getPostsByAuthor(author: string): BlogPost[] {
  return posts.filter(post => post.author === author);
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  return posts.slice(0, limit);
}
