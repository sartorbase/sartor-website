import { BLOG_POSTS, BlogPostData } from '../data/blogPosts';
import { DIASPORA_IN_LANGUAGE } from './geoSchemas';

export type BridalFaqTopic =
  | 'Remote Fitting & Escrow'
  | 'Velvet, Silk & Textiles'
  | 'Fit, Boning & Waistbands'
  | 'Zardozi & Embroidery'
  | 'Pricing & Global Shipping';

export interface AggregatedBridalFaq {
  id: string;
  question: string;
  answer: string;
  sourceSlug: string;
  sourceTitle: string;
  sourceCategory: string;
  topic: BridalFaqTopic;
  date: string;
}

const BRIDAL_SLUG_PRIORITY: string[] = [
  'remote-bridal-lehenga-fitting-lahore',
  'micro-velvet-9000-vs-pure-silk-velvet-bridal-lehenga-usa-guide',
  'pakistani-bridal-lehenga-price-guide-atelier-costs-shipping',
  'choli-boning-blueprint-why-bridal-blouses-dig-into-ribs-bow-at-hem',
  'pakistani-bridal-lehenga-cancan-canvas-waistband-blueprint',
  'zardozi-vs-dabka',
  'pakistani-bridal-emerald-banarsi-jamawar-lehenga-guide',
  'the-two-dupatta-bridal-protocol-weight-distribution-guide',
  'london-uk-brides-guide-zardozi-bridalwear-lahore',
  'farshi-lehenga-barat-trail-engineering-guide',
  'pure-katan-silk-vs-french-tissue-pakistani-bridal-guide',
  'royal-crimson-barat-lehenga-zardozi-architecture-guide',
  'the-scye-depth-equation-why-saree-blouses-gape-at-the-back',
  'indian-vs-pakistani-bridal-tailoring-lahore-guide',
];

const BRIDAL_CATEGORIES = new Set([
  'Bridal Masterclass',
  'Bridal Pricing & Logistics',
  'Couture Engineering',
  'Couture Masterclass',
  'Embroidery & Craft',
  'Bespoke Tailoring',
  'Overseas Tailoring',
  'Measurement Masterclass',
]);

function stripMarkdownForPlainText(input: string): string {
  return input
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*\*([^*]+)\*\*\*/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function classifyBridalTopic(question: string, answer: string, slug: string): BridalFaqTopic {
  const haystack = `${slug} ${question} ${answer}`.toLowerCase();

  if (
    haystack.includes('10/30/30/30') ||
    haystack.includes('escrow') ||
    haystack.includes('milestone') ||
    haystack.includes('baste-fit') ||
    haystack.includes('28-point') ||
    haystack.includes('remote') ||
    haystack.includes('online with custom measurements') ||
    haystack.includes('app.sartor.pk')
  ) {
    return 'Remote Fitting & Escrow';
  }

  if (
    haystack.includes('price') ||
    haystack.includes('cost') ||
    haystack.includes('dhl') ||
    haystack.includes('customs') ||
    haystack.includes('$800') ||
    haystack.includes('£135') ||
    haystack.includes('turnaround') ||
    haystack.includes('shipping')
  ) {
    return 'Pricing & Global Shipping';
  }

  if (
    haystack.includes('boning') ||
    haystack.includes('scye') ||
    haystack.includes('waistband') ||
    haystack.includes('can-can') ||
    haystack.includes('cancan') ||
    haystack.includes('dupatta') ||
    haystack.includes('seam allowance') ||
    haystack.includes('gape') ||
    haystack.includes('blouse') ||
    haystack.includes('choli')
  ) {
    return 'Fit, Boning & Waistbands';
  }

  if (
    haystack.includes('zardozi') ||
    haystack.includes('dabka') ||
    haystack.includes('kora') ||
    haystack.includes('adda') ||
    haystack.includes('gotapatti') ||
    haystack.includes('embroidery')
  ) {
    return 'Zardozi & Embroidery';
  }

  return 'Velvet, Silk & Textiles';
}

export function extractFaqsFromPost(post: BlogPostData): AggregatedBridalFaq[] {
  const faqSectionMatch = post.content.match(
    /##\s*(?:\d+[\.\)]\s*)?Frequently Asked Questions(?:\s*\(FAQ\))?([\s\S]*?)(?:\n---|\n##\s+[^#]|$)/i
  );
  if (!faqSectionMatch) return [];

  const faqText = faqSectionMatch[1];
  const qaRegex = /###\s+(.+?)\n([\s\S]*?)(?=\n###|\n---|$)/g;
  const results: AggregatedBridalFaq[] = [];
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = qaRegex.exec(faqText)) !== null) {
    const question = stripMarkdownForPlainText(match[1]);
    const answer = stripMarkdownForPlainText(match[2]);
    if (question && answer) {
      index += 1;
      results.push({
        id: `${post.slug}--faq-${index}`,
        question,
        answer,
        sourceSlug: post.slug,
        sourceTitle: post.title,
        sourceCategory: post.category,
        topic: classifyBridalTopic(question, answer, post.slug),
        date: post.date,
      });
    }
  }

  return results;
}

function isBridalRelevantPost(post: BlogPostData): boolean {
  if (BRIDAL_SLUG_PRIORITY.includes(post.slug)) return true;
  if (/bridal|lehenga|choli|zardozi|gharara|sharara|dupatta|nikkah|walima|barat|mehndi|scye/i.test(post.slug)) {
    return true;
  }
  return BRIDAL_CATEGORIES.has(post.category) && /bridal|lehenga|choli|blouse|zardozi/i.test(post.title);
}

/**
 * Programmatically aggregates bridal tailoring Q&As across all bridal masterclasses in BLOG_POSTS.
 * Prioritized signature engineering guides lead the list so flagship Q&As surface cleanly.
 */
export function getAggregatedBridalFaqs(): AggregatedBridalFaq[] {
  const priorityMap = new Map<string, number>();
  BRIDAL_SLUG_PRIORITY.forEach((slug, idx) => priorityMap.set(slug, idx));

  const bridalPosts = BLOG_POSTS.filter(isBridalRelevantPost).sort((a, b) => {
    const pa = priorityMap.has(a.slug) ? priorityMap.get(a.slug)! : Number.MAX_SAFE_INTEGER;
    const pb = priorityMap.has(b.slug) ? priorityMap.get(b.slug)! : Number.MAX_SAFE_INTEGER;
    if (pa !== pb) return pa - pb;
    return (b.date || '').localeCompare(a.date || '');
  });

  const seenQuestions = new Set<string>();
  const aggregated: AggregatedBridalFaq[] = [];

  for (const post of bridalPosts) {
    const extracted = extractFaqsFromPost(post);
    for (const item of extracted) {
      const normalizedQ = item.question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (!seenQuestions.has(normalizedQ)) {
        seenQuestions.add(normalizedQ);
        aggregated.push(item);
      }
    }
  }

  return aggregated;
}

/**
 * Selects the top diverse bridal tailoring FAQs for the homepage by taking
 * up to one flagship question per distinct masterclass guide before cycling further.
 * Shared verbatim between SSR (seoRenderer.ts) and the Homepage UI component (BridalFaqSection.tsx)
 * to preserve strict 1:1 parity between visible DOM and FAQPage JSON-LD.
 */
export function getTopHomepageBridalFaqs(limit = 8): AggregatedBridalFaq[] {
  const allFaqs = getAggregatedBridalFaqs();
  const selected: AggregatedBridalFaq[] = [];
  const usedSlugs = new Set<string>();

  for (const faq of allFaqs) {
    if (selected.length >= limit) break;
    if (!usedSlugs.has(faq.sourceSlug)) {
      usedSlugs.add(faq.sourceSlug);
      selected.push(faq);
    }
  }

  if (selected.length < limit) {
    const selectedIds = new Set(selected.map((s) => s.id));
    for (const faq of allFaqs) {
      if (selected.length >= limit) break;
      if (!selectedIds.has(faq.id)) {
        selected.push(faq);
        selectedIds.add(faq.id);
      }
    }
  }

  return selected;
}

export function buildHomepageFaqPageSchema(faqs: AggregatedBridalFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://sartor.pk/#homepage-faq',
    name: 'Top Bridal Tailoring & Bespoke Lehenga Frequently Asked Questions — SARTOR Lahore',
    url: 'https://sartor.pk/#bridal-faq',
    inLanguage: [...DIASPORA_IN_LANGUAGE],
    about: { '@id': 'https://sartor.pk/#lahore-location' },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      url: `https://sartor.pk/blog/${faq.sourceSlug}`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
