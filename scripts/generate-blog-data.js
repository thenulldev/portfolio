const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
// Enhanced markdown to HTML conversion that's compatible with Cloudflare Workers
function markdownToHtml(markdown) {
  try {
    // Split content into lines for better processing
    const lines = markdown.split('\n');
    const htmlLines = [];
    let inCodeBlock = false;
    let codeBlockLanguage = '';
    let inUnorderedList = false;
    let inOrderedList = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Handle code blocks
      if (trimmedLine.startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          codeBlockLanguage = trimmedLine.slice(3).trim();
          htmlLines.push(`<pre><code class="language-${codeBlockLanguage}">`);
          inCodeBlock = true;
        } else {
          // End of code block
          htmlLines.push('</code></pre>');
          inCodeBlock = false;
          codeBlockLanguage = '';
        }
        continue;
      }
      
      if (inCodeBlock) {
        htmlLines.push(line);
        continue;
      }
      
      // Handle headers
      if (trimmedLine.startsWith('### ')) {
        closeLists();
        htmlLines.push(`<h3>${trimmedLine.slice(4)}</h3>`);
        continue;
      }
      if (trimmedLine.startsWith('## ')) {
        closeLists();
        htmlLines.push(`<h2>${trimmedLine.slice(3)}</h2>`);
        continue;
      }
      if (trimmedLine.startsWith('# ')) {
        closeLists();
        htmlLines.push(`<h1>${trimmedLine.slice(2)}</h1>`);
        continue;
      }
      
      // Handle horizontal rules
      if (trimmedLine === '---') {
        closeLists();
        htmlLines.push('<hr>');
        continue;
      }
      
      // Handle unordered lists
      if (/^[-*+]\s+/.test(trimmedLine)) {
        if (!inUnorderedList) {
          closeLists();
          htmlLines.push('<ul>');
          inUnorderedList = true;
        }
        const content = trimmedLine.replace(/^[-*+]\s+/, '');
        htmlLines.push(`<li>${processInlineMarkdown(content)}</li>`);
        continue;
      }
      
      // Handle ordered lists
      if (/^\d+\.\s+/.test(trimmedLine)) {
        if (!inOrderedList) {
          closeLists();
          htmlLines.push('<ol>');
          inOrderedList = true;
        }
        const content = trimmedLine.replace(/^\d+\.\s+/, '');
        htmlLines.push(`<li>${processInlineMarkdown(content)}</li>`);
        continue;
      }
      
      // Handle blockquotes
      if (trimmedLine.startsWith('> ')) {
        closeLists();
        htmlLines.push(`<blockquote><p>${processInlineMarkdown(trimmedLine.slice(2))}</p></blockquote>`);
        continue;
      }
      
      // Handle empty lines
      if (trimmedLine === '') {
        closeLists();
        continue;
      }
      
      // Handle regular paragraphs
      closeLists();
      htmlLines.push(`<p>${processInlineMarkdown(trimmedLine)}</p>`);
    }
    
    // Close any remaining lists
    closeLists();
    
    function closeLists() {
      if (inUnorderedList) {
        htmlLines.push('</ul>');
        inUnorderedList = false;
      }
      if (inOrderedList) {
        htmlLines.push('</ol>');
        inOrderedList = false;
      }
    }
    
    function processInlineMarkdown(text) {
      return text
        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    }
    
    return htmlLines.join('\n');
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    // Fallback to basic conversion if enhanced conversion fails
    return simpleMarkdownToHtml(markdown);
  }
}

// Simple markdown to HTML conversion (basic)
function simpleMarkdownToHtml(markdown) {
  // Basic conversions for now - can be enhanced later
  return markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    .replace(/\n/gim, '<br>');
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');
const outputFile = path.join(process.cwd(), 'src/data/blog-posts.json');

// Ensure the data directory exists
const dataDir = path.dirname(outputFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function generateBlogData() {
  try {
    console.log('Generating blog data...');
    
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
        
        // Convert markdown content to HTML using simple conversion
        const processedContent = markdownToHtml(matterResult.content);
        
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
        };
      });
    
    // Sort posts by date
    const sortedPosts = allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
    
    // Write the data to a JSON file
    fs.writeFileSync(outputFile, JSON.stringify(sortedPosts, null, 2));
    
    console.log(`✅ Generated blog data for ${sortedPosts.length} posts`);
    console.log(`📁 Output: ${outputFile}`);
    
  } catch (error) {
    console.error('❌ Error generating blog data:', error);
    process.exit(1);
  }
}

generateBlogData();
