import { TESTIMONIALS } from '../data/testimonials';
import { Testimonial } from '../types';
import { SITE_CONFIG } from '../config/site';
import {
  DIASPORA_IN_LANGUAGE,
  LAHORE_ATELIER_ADDRESS,
  LAHORE_GEO_COORDINATES,
} from './geoSchemas';

export const LAHORE_REVIEW_SCHEMA_ID = 'lahore-localbusiness-review-schema';

export interface LahoreReviewSummary {
  averageRating: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

const MONTH_INDEX: Record<string, string> = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
};

export function parseReviewIsoDate(dateLabel: string): string {
  const parts = dateLabel.trim().toLowerCase().split(/\s+/);
  if (parts.length === 2 && MONTH_INDEX[parts[0]] && /^\d{4}$/.test(parts[1])) {
    return `${parts[1]}-${MONTH_INDEX[parts[0]]}-15`;
  }
  return '2026-03-15';
}

export function getLahoreReviewSummary(reviews: Testimonial[] = TESTIMONIALS): LahoreReviewSummary {
  if (reviews.length === 0) {
    return {
      averageRating: 5.0,
      reviewCount: 0,
      bestRating: 5,
      worstRating: 1,
    };
  }

  const total = reviews.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = Number((total / reviews.length).toFixed(2));

  return {
    averageRating,
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
}

/**
 * Programmatically constructs Schema.org LocalBusiness + AggregateRating + Review[] JSON-LD
 * for SARTOR's flagship Model Town, Lahore atelier from verified client testimonials.
 */
export function buildLahoreReviewSchema(reviews: Testimonial[] = TESTIMONIALS) {
  const summary = getLahoreReviewSummary(reviews);

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ClothingStore'],
    '@id': `${SITE_CONFIG.url}/#lahore-atelier-reviews`,
    name: 'SARTOR Bespoke Atelier Lahore',
    url: `${SITE_CONFIG.url}/`,
    telephone: `+${SITE_CONFIG.whatsapp.number}`,
    priceRange: 'PKR 2,500 - PKR 1,250,000 | £22 - £4,500 | $28 - $6,200',
    image: `${SITE_CONFIG.url}/images/how-to-choose-a-good-tailor-in-lahore.jpg`,
    inLanguage: [...DIASPORA_IN_LANGUAGE],
    address: LAHORE_ATELIER_ADDRESS,
    geo: LAHORE_GEO_COORDINATES,
    sameAs: [
      SITE_CONFIG.address.googleMaps,
      SITE_CONFIG.whatsapp.base,
      SITE_CONFIG.appUrl,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: summary.averageRating,
      bestRating: summary.bestRating,
      worstRating: summary.worstRating,
      ratingCount: summary.reviewCount,
      reviewCount: summary.reviewCount,
    },
    review: reviews.map((t) => ({
      '@type': 'Review',
      '@id': `${SITE_CONFIG.url}/#review-${t.id}`,
      name: `${t.suitCrafted}${t.orderType ? ` — ${t.orderType}` : ''}`,
      reviewBody: t.quote,
      datePublished: parseReviewIsoDate(t.date),
      inLanguage: [...DIASPORA_IN_LANGUAGE],
      author: {
        '@type': 'Person',
        name: t.clientName,
        homeLocation: {
          '@type': 'Place',
          name: t.location,
        },
      },
      itemReviewed: {
        '@type': ['LocalBusiness', 'ClothingStore'],
        '@id': `${SITE_CONFIG.url}/#lahore-location`,
        name: 'SARTOR Bespoke Couture Atelier — Model Town, Lahore',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
      ...(t.experienceHighlight
        ? {
            positiveNotes: {
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: t.experienceHighlight,
                },
              ],
            },
          }
        : {}),
    })),
  };
}
