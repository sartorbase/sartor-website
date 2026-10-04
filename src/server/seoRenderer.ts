import { BLOG_POSTS, BlogPostData, getBlogPostBySlug } from '../data/blogPosts';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function generateSitemapXml(): string {
  const baseUrl = 'https://sartor.pk';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticUrls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily', lastmod: currentDate },
    { loc: `${baseUrl}/blog`, priority: '0.9', changefreq: 'daily', lastmod: currentDate },
    { loc: `${baseUrl}/custom-bridal`, priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
  ];

  const blogUrls = BLOG_POSTS.map((post) => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: post.date || currentDate,
  }));

  const allUrls = [...staticUrls, ...blogUrls];

  const xmlEntries = allUrls
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

function formatInline(text: string): string {
  let res = escapeHtml(text);
  res = res.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300 text-xs font-mono">$1</code>');
  res = res.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-stone-100 font-bold"><em class="italic">$1</em></strong>');
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-100 font-bold">$1</strong>');
  res = res.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  res = res.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-amber-400 hover:text-amber-300 underline underline-offset-4 font-medium transition-colors">$1</a>');
  return res;
}

function markdownToHtml(md: string): string {
  const cleanMd = md
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  const lines = cleanMd.split('\n');
  const htmlLines: string[] = [];
  let inTable = false;
  let inUl = false;
  let inOl = false;
  let quoteBuffer: string[] = [];

  const flushQuote = () => {
    if (quoteBuffer.length === 0) return;
    const innerText = quoteBuffer.join('\n');
    quoteBuffer = [];

    const parsedQuote = innerText
      .split('\n')
      .map((qLine) => {
        const trimmed = qLine.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('### ')) {
          return `<h3 class="text-amber-700 dark:text-amber-400 font-serif font-bold text-lg mb-2 mt-1 tracking-wide uppercase">${formatInline(trimmed.slice(4))}</h3>`;
        }
        if (trimmed.startsWith('## ')) {
          return `<h2 class="text-amber-700 dark:text-amber-400 font-serif font-bold text-xl mb-2 mt-1 tracking-wide uppercase">${formatInline(trimmed.slice(3))}</h2>`;
        }
        return `<p class="my-2 leading-relaxed text-stone-200">${formatInline(trimmed)}</p>`;
      })
      .filter(Boolean)
      .join('\n');

    htmlLines.push(
      `<div class="my-8 rounded-2xl border border-stone-800/80 border-l-4 border-l-amber-600 bg-stone-900/90 p-5 sm:p-7 shadow-lg shadow-stone-950/10">
        <blockquote class="font-sans not-italic text-stone-200 text-base leading-relaxed [&>p]:text-stone-200 [&>p>strong]:text-stone-100 dark:[&>p>strong]:text-amber-300 [&>strong]:text-stone-100 dark:[&>strong]:text-amber-300">${parsedQuote}</blockquote>
      </div>`
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (trimmed.startsWith('>')) {
      if (inTable) { htmlLines.push('</tbody></table></div>'); inTable = false; }
      if (inUl) { htmlLines.push('</ul>'); inUl = false; }
      if (inOl) { htmlLines.push('</ol>'); inOl = false; }
      quoteBuffer.push(trimmed.replace(/^>\s?/, ''));
      continue;
    } else {
      flushQuote();
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (inUl) { htmlLines.push('</ul>'); inUl = false; }
      if (inOl) { htmlLines.push('</ol>'); inOl = false; }
      if (!inTable) {
        htmlLines.push('<div class="my-8 overflow-x-auto rounded-2xl border border-stone-800 bg-stone-900/60 shadow-xl"><table class="w-full min-w-[540px] border-collapse text-left text-sm">');
        const headers = trimmed.split('|').filter(c => c.trim().length > 0);
        htmlLines.push('<thead><tr class="bg-stone-900 border-b border-stone-700">');
        headers.forEach(h => htmlLines.push(`<th class="p-3.5 font-semibold uppercase tracking-wider text-xs text-amber-300 border-r border-stone-800/80 last:border-r-0">${formatInline(h.trim())}</th>`));
        htmlLines.push('</tr></thead><tbody>');
        inTable = true;
        continue;
      } else {
        if (trimmed.includes('---')) continue;
        const cells = trimmed.split('|').filter(c => c !== '');
        htmlLines.push('<tr class="hover:bg-stone-800/40 border-b border-stone-800/60 transition-colors">');
        cells.forEach(c => htmlLines.push(`<td class="p-3.5 text-stone-300 border-r border-stone-800/60 last:border-r-0 leading-relaxed">${formatInline(c.trim())}</td>`));
        htmlLines.push('</tr>');
        continue;
      }
    } else if (inTable) {
      htmlLines.push('</tbody></table></div>');
      inTable = false;
    }

    if (trimmed === '---') {
      if (inUl) { htmlLines.push('</ul>'); inUl = false; }
      if (inOl) { htmlLines.push('</ol>'); inOl = false; }
      htmlLines.push('<hr class="my-10 border-stone-800/90" />');
      continue;
    }

    if (trimmed.startsWith('# ')) {
      htmlLines.push(`<h1 class="text-3xl sm:text-4xl font-serif font-bold text-stone-50 my-6 leading-tight">${formatInline(trimmed.slice(2))}</h1>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      htmlLines.push(`<h2 class="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-12 mb-5 pb-3 border-b border-stone-800/80 leading-snug tracking-tight">${formatInline(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith('### ')) {
      htmlLines.push(`<h3 class="text-xl sm:text-2xl font-serif font-semibold text-amber-200/90 mt-8 mb-3 leading-snug">${formatInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      if (!inUl) { htmlLines.push('<ul class="list-disc list-outside ml-6 space-y-2.5 my-5 text-stone-300">'); inUl = true; }
      htmlLines.push(`<li class="leading-relaxed pl-1 marker:text-amber-400">${formatInline(trimmed.slice(2))}</li>`);
      continue;
    } else if (inUl) {
      htmlLines.push('</ul>');
      inUl = false;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      if (!inOl) { htmlLines.push('<ol class="list-decimal list-outside ml-6 space-y-2.5 my-5 text-stone-300 font-sans">'); inOl = true; }
      const itemText = trimmed.replace(/^\d+\.\s/, '');
      htmlLines.push(`<li class="leading-relaxed pl-1 marker:text-amber-400">${formatInline(itemText)}</li>`);
      continue;
    } else if (inOl) {
      htmlLines.push('</ol>');
      inOl = false;
    }

    if (trimmed.length > 0) {
      htmlLines.push(`<p class="my-4 text-stone-300 leading-relaxed font-sans text-base sm:text-lg">${formatInline(trimmed)}</p>`);
    }
  }

  flushQuote();
  if (inTable) htmlLines.push('</tbody></table></div>');
  if (inUl) htmlLines.push('</ul>');
  if (inOl) htmlLines.push('</ol>');

  return htmlLines.join('\n');
}

export function injectSeoIntoHtml(baseHtml: string, pathname: string): { status: number; html: string } {
  const cleanPath = pathname.toLowerCase().split('?')[0].split('#')[0];

  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '').split('/')[0];
    const post = getBlogPostBySlug(slug);

    if (!post) {
      return { status: 404, html: baseHtml };
    }

    const articleUrl = `https://sartor.pk/blog/${post.slug}`;
    const pageTitle = `${post.title} | SARTOR Atelier`;
    const renderedBody = markdownToHtml(post.content);

    // Extract FAQs for Schema.org JSON-LD
    const faqMatches: { question: string; answer: string }[] = [];
    const faqSectionMatch = post.content.match(/## Frequently Asked Questions([\s\S]*?)(?:---|\n## About the Author|$)/i);
    if (faqSectionMatch) {
      const faqText = faqSectionMatch[1];
      const qaRegex = /###\s+(.+?)\n([\s\S]*?)(?=\n###|\n---|$)/g;
      let match;
      while ((match = qaRegex.exec(faqText)) !== null) {
        const question = match[1].trim();
        const answer = match[2].trim().replace(/\n+/g, ' ');
        if (question && answer) {
          faqMatches.push({ question, answer });
        }
      }
    }

    let faqJsonLd = '';
    if (faqMatches.length > 0) {
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqMatches.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };
      faqJsonLd = `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`;
    }

    let transformedHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`)
      .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(post.excerpt)}" />`)
      .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${articleUrl}" />`);

    if (faqJsonLd) {
      transformedHtml = transformedHtml.replace('</head>', `${faqJsonLd}</head>`);
    }

    transformedHtml = transformedHtml.replace('<div id="root"></div>', `<div id="root"><main class="max-w-3xl mx-auto px-4 py-12">${renderedBody}</main></div>`);

    return { status: 200, html: transformedHtml };
  }

  if (cleanPath === '/blog') {
    const pageTitle = 'Atelier Journal & Couture Guides | SARTOR Bespoke Lahore';
    const pageDesc = 'Insights on bespoke women tailoring, saree stitching, and Lahore couture.';
    const archiveUrl = 'https://sartor.pk/blog';

    let transformedHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`)
      .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(pageDesc)}" />`)
      .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${archiveUrl}" />`);

    return { status: 200, html: transformedHtml };
  }

  if (cleanPath === '/custom-bridal') {
    const bridalTitle = 'Custom Bridal ($2k+) & Overseas Bespoke Wedding Tailoring | SARTOR';
    const bridalDesc = 'Commission bespoke bridal lehengas, royal farshi ghararas, and gowns directly from master artisans in Lahore.';
    const bridalUrl = 'https://sartor.pk/custom-bridal';

    let transformedHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(bridalTitle)}</title>`)
      .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(bridalDesc)}" />`)
      .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${bridalUrl}" />`);

    return { status: 200, html: transformedHtml };
  }

  return { status: 200, html: baseHtml };
}
