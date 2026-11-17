import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';
import { BLOG_POSTS } from '../../src/data/blogPosts';

const CANONICAL_SITE_URL = 'https://sartor.pk';
const CHANNEL_TITLE = 'SARTOR Lahore Atelier & Fashion-Tech Journal';
const CHANNEL_DESCRIPTION =
  'Bespoke Pakistani bridal couture, wooden adda Zardozi handwork masterclasses, 28-point biometric sizing guides, and diaspora tailoring logistics from Master Tailor Abdul Ghaffar in Model Town, Lahore.';
const CHANNEL_LANGUAGE = 'en';
const AUTHOR_EMAIL_FORMAT = 'contact@sartor.pk (Abdul Ghaffar, Master Tailor)';

export const revalidate = 3600;

interface RssPostItem {
  title: string;
  slug: string;
  description: string;
  date: string;
  category?: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toSafeCdata(value: string): string {
  const sanitized = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '').trim();
  return `<![CDATA[${sanitized.replace(/\]\]>/g, ']]]]><![CDATA[>')}]]>`;
}

function toValidTimestamp(dateStr: string): number {
  const parsed = Date.parse(dateStr);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function toRfc822Date(dateStr: string): string {
  const timestamp = toValidTimestamp(dateStr);
  return (timestamp > 0 ? new Date(timestamp) : new Date()).toUTCString();
}

function resolveSelfFeedUrl(request: Request): string {
  try {
    const parsedUrl = new URL(request.url);
    const forwardedProto = request.headers.get('x-forwarded-proto');
    const rawProto =
      forwardedProto?.split(',')[0]?.trim().replace(/:$/, '') ||
      parsedUrl.protocol.replace(/:$/, '') ||
      'https';
    const protocol = rawProto === 'http' || rawProto === 'https' ? rawProto : 'https';

    const forwardedHost = request.headers.get('x-forwarded-host');
    const hostHeader = request.headers.get('host');
    const rawHost =
      forwardedHost?.split(',')[0]?.trim() ||
      hostHeader?.split(',')[0]?.trim() ||
      parsedUrl.host ||
      'sartor.pk';
    const safeHost = rawHost.replace(/[^a-zA-Z0-9.:-]/g, '') || 'sartor.pk';

    const pathname = parsedUrl.pathname && parsedUrl.pathname !== '/' ? parsedUrl.pathname : '/rss.xml';
    return `${protocol}://${safeHost}${pathname}`;
  } catch {
    return `${CANONICAL_SITE_URL}/rss.xml`;
  }
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
          category: typeof data.category === 'string' ? data.category.trim() : undefined,
        });
      } catch (fileErr) {
        console.error(`[RSS] Failed parsing MDX/Markdown post "${file}":`, fileErr);
      }
    }
  }

  for (const post of BLOG_POSTS) {
    if (!post.slug || postsBySlug.has(post.slug)) {
      continue;
    }
    postsBySlug.set(post.slug, {
      title: post.title,
      slug: post.slug,
      description: post.excerpt || post.title,
      date: post.date,
      category: post.category,
    });
  }

  return Array.from(postsBySlug.values()).sort(
    (a, b) => toValidTimestamp(b.date) - toValidTimestamp(a.date)
  );
}

function buildRssXml(posts: RssPostItem[], selfUrl: string): string {
  const latestPubDate =
    posts.length > 0 ? toRfc822Date(posts[0].date) : new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${CANONICAL_SITE_URL}/blog/${encodeURIComponent(post.slug)}`;
      const categoryNode = post.category
        ? `\n      <category>${toSafeCdata(post.category)}</category>`
        : '';

      return `    <item>
      <title>${toSafeCdata(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <description>${toSafeCdata(post.description)}</description>
      <pubDate>${escapeXml(toRfc822Date(post.date))}</pubDate>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <author>${escapeXml(AUTHOR_EMAIL_FORMAT)}</author>${categoryNode}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${toSafeCdata(CHANNEL_TITLE)}</title>
    <link>${CANONICAL_SITE_URL}</link>
    <description>${toSafeCdata(CHANNEL_DESCRIPTION)}</description>
    <language>${CHANNEL_LANGUAGE}</language>
    <lastBuildDate>${escapeXml(latestPubDate)}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const selfUrl = resolveSelfFeedUrl(request);
    const posts = collectPublishedPosts();
    const xml = buildRssXml(posts, selfUrl);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'Vary': 'Host, X-Forwarded-Host, X-Forwarded-Proto',
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
