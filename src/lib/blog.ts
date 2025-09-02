import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

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

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getAllPosts(): BlogPost[] {
  // Get file names under /src/content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');
      
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      
      // Convert markdown content to HTML
      const processedContent = remark()
        .use(html)
        .processSync(matterResult.content)
        .toString();
      
      // Combine the data with the id
      return {
        id,
        slug: id,
        title: matterResult.data.title,
        description: matterResult.data.description,
        date: matterResult.data.date,
        tags: matterResult.data.tags,
        author: matterResult.data.author,
        readTime: matterResult.data.readTime,
        content: processedContent,
      } as BlogPost;
    });
  
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostById(id: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const matterResult = matter(fileContents);
    
    // Convert markdown content to HTML
    const processedContent = remark()
      .use(html)
      .processSync(matterResult.content)
      .toString();
    
    return {
      id,
      slug: id,
      title: matterResult.data.title,
      description: matterResult.data.description,
      date: matterResult.data.date,
      tags: matterResult.data.tags,
      author: matterResult.data.author,
      readTime: matterResult.data.readTime,
      content: processedContent,
    } as BlogPost;
  } catch {
    return null;
  }
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const allTags = allPosts.flatMap(post => post.tags);
  return [...new Set(allTags)];
}
