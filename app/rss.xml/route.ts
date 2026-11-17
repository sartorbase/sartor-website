import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';
import { BLOG_POSTS } from '../../src/data/blogPosts';

const SITE_URL = 'https://sartor.pk';
const CHANNEL_TITLE = 'SARTOR Lahore Atelier & Fashion-Tech Journal';
const CHANNEL_DESCRIPTION =
  'Bespoke Pakistani bridal couture, wooden adda Zardozi handwork masterclasses, 28-point biometric sizing guides, and diaspora tailoring logistics from Master Tailor Abdul Ghaffar in Model Town, Lahore.';
const CHANNEL_LANGUAGE = 'en';

export const revalidate = 3600;

interface RssPostItem {
  title: string;
  slug: string;
  description: string;
  date: string;
  author?: string;
  category?: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toValidTimestamp(dateStr: string): number {
  const parsed = Date.parse(dateStr);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function toRfc822Date(dateStr: string): string {
  const timestamp = toValidTimestamp(dateStr);
  return (timestamp > 0 ? new Date(timestamp) : new Date()).toUTCString();
}

function resolveBlogDirectories(): string[] {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, 'src', 'content', 'blog'),
    path.join(cwd, 'content', 'posts'),
  ];
  return candidates.filter((dir) => {
    try {
      return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
    } catch {
      return false;
    }
  });
}

function collectPublishedPosts(): RssPostItem[] {
  const postsBySlug = new Map<string, RssPostItem>();
  const blogDirs = resolveBlogDirectories();

  for (const dir of blogDirs) {
    let entries: string[] = [];
    try {
      entries = fs.readdirSync(dir).filter((file) => /\.(mdx|md)$/i.test(file));
    } catch (dirErr) {
      console.error(`[RSS] Failed to read blog directory "${dir}":`, dirErr);
      continue;
    }

    for (const file of entries) {
      try {
        const fullPath = path.join(dir, file);
        const raw = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(raw);

        if (data.draft === true || data.published === false) {
          continue;
        }

        const fileSlug = file.replace(/\.(mdx|md)$/i, '').trim();
        const slug =
          typeof data.slug === 'string' && data.slug.trim().length > 0
            ? data.slug.trim()
            : fileSlug;

        if (!slug || postsBySlug.has(slug)) {
          continue;
        }

        const title =
          typeof data.title === 'string' && data.title.trim().length > 0
            ? data.title.trim()
            : slug;

        const rawDesc =
          typeof data.description === 'string' && data.description.trim().length > 0
            ? data.description.trim()
            : typeof data.excerpt === 'string'
              ? data.excerpt.trim()
              : '';

        const date =
          data.date instanceof Date
            ? data.date.toISOString()
            : typeof data.date === 'string' && data.date.trim().length > 0
              ? data.date.trim()
              : new Date().toISOString();

        postsBySlug.set(slug, {
          title,
          slug,
          description: rawDesc || title,
          date,
          author: typeof data.author === 'string' ? data.author.trim() : undefined,
          category: typeof data.category === 'string' ? data.category.trim() : undefined,
        });
      } catch (fileErr) {
        console.error(`[RSS] Failed parsing MDX/Markdown post "${file}":`, fileErr);
      }
    }
  }

  // Merge any additional published posts stored in src/data/blogPosts.ts not yet mirrored as MDX
  for (const post of BLOG_POSTS) {
    if (!post.slug || postsBySlug.has(post.slug)) {
      continue;
    }
    postsBySlug.set(post.slug, {
      title: post.title,
      slug: post.slug,
      description: post.excerpt || post.title,
      date: post.date,
      author: post.author,
      category: post.category,
    });
  }

  return Array.from(postsBySlug.values()).sort(
    (a, b) => toValidTimestamp(b.date) - toValidTimestamp(a.date)
  );
}

function buildRssXml(posts: RssPostItem[]): string {
  const latestPubDate =
    posts.length > 0 ? toRfc822Date(posts[0].date) : new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`;
      const categoryNode = post.category
        ? `\n      <category>${escapeXml(post.category)}</category>`
        : '';

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${escapeXml(toRfc822Date(post.date))}</pubDate>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <author>contact@sartor.pk (${escapeXml(post.author || 'Abdul Ghaffar, Master Tailor')})</author>${categoryNode}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(CHANNEL_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(CHANNEL_DESCRIPTION)}</description>
    <language>${CHANNEL_LANGUAGE}</language>
    <lastBuildDate>${escapeXml(latestPubDate)}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;
}

export async function GET(): Promise<NextResponse> {
  try {
    const posts = collectPublishedPosts();
    const xml = buildRssXml(posts);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('[RSS] Unexpected failure generating feed:', error);
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate RSS feed</error>',
      {
        status: 500,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}
