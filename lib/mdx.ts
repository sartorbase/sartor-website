import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug?: string;
  tags: string[];
  coverImage?: string;
  category?: string;
  readingTime?: string;
  faqs?: FAQItem[];
  imageWebp?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

function getPostsDirectory(): string {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
  }
  return POSTS_DIRECTORY;
}

function estimateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

export function getPostFiles(): string[] {
  const dir = getPostsDirectory();
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const dir = getPostsDirectory();
  const decodedSlug = decodeURIComponent(slug);

  const mdxPath = path.join(dir, `${decodedSlug}.mdx`);
  const mdPath = path.join(dir, `${decodedSlug}.md`);

  let filePath = '';
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const frontmatter: PostFrontmatter = {
    title: (data.title as string) || 'Untitled Post',
    excerpt: (data.excerpt as string) || '',
    date: (data.date as string) || new Date().toISOString().split('T')[0],
    author: (data.author as string) || 'Sartor Master Atelier',
    slug: (data.slug as string) || decodedSlug,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    coverImage: (data.coverImage as string) || undefined,
    category: (data.category as string) || 'Bespoke Tailoring',
    readingTime: (data.readingTime as string) || estimateReadingTime(content),
    faqs: Array.isArray(data.faqs) ? (data.faqs as FAQItem[]) : undefined,
    imageWebp: (data.imageWebp as string) || undefined,
  };

  return {
    slug: decodedSlug,
    frontmatter,
    content,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const files = getPostFiles();

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.(mdx|md)$/, '');
      return await getPostBySlug(slug);
    })
  );

  return (posts.filter((post): post is Post => post !== null)).sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const files = getPostFiles();
  return files.map((file) => ({
    slug: file.replace(/\.(mdx|md)$/, ''),
  }));
}

/**
 * Get up to `limit` related posts for a given slug based on shared category and tags.
 */
export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<Post[]> {
  const currentPost = await getPostBySlug(currentSlug);
  const allPosts = await getAllPosts();

  if (!currentPost) {
    return allPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);
  }

  const currentCategory = (currentPost.frontmatter.category || '').toLowerCase().trim();
  const currentTags = (currentPost.frontmatter.tags || []).map((t) => t.toLowerCase().trim());

  const candidates = allPosts.filter((p) => p.slug !== currentPost.slug);

  const scored = candidates.map((post) => {
    let score = 0;
    const postCategory = (post.frontmatter.category || '').toLowerCase().trim();
    const postTags = (post.frontmatter.tags || []).map((t) => t.toLowerCase().trim());

    if (currentCategory && postCategory === currentCategory) {
      score += 4;
    }

    for (const tag of postTags) {
      if (currentTags.includes(tag)) {
        score += 2;
      }
    }

    return { post, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const dateA = new Date(a.post.frontmatter.date || 0).getTime();
    const dateB = new Date(b.post.frontmatter.date || 0).getTime();
    return dateB - dateA;
  });

  return scored.slice(0, limit).map((s) => s.post);
}

