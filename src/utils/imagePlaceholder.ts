const shimmerSvg = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1c1917" offset="20%" />
      <stop stop-color="#292524" offset="50%" />
      <stop stop-color="#1c1917" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1c1917" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.4s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const SHIMMER_BLUR_DATA_URL = `data:image/svg+xml;base64,${toBase64(shimmerSvg(700, 475))}`;

export const DEFAULT_FALLBACK_IMAGE = '/images/services/simple-suit.jpg';
export const DEFAULT_BRIDAL_FALLBACK_IMAGE = '/images/royal-crimson-barat-lehenga-zardozi-architecture-guide.jpg';

const TRACKING_QUERY_PARAMS = new Set([
  'fbclid',
  'gclid',
  'dclid',
  'epik',
  'pp',
  'pin_campaign',
  'pin_ad_group',
  'pin_creative',
  'igshid',
  'mc_cid',
  'mc_eid',
  'ref',
  'si',
]);

function stripTrackingParams(searchParams: URLSearchParams): void {
  const keys = Array.from(searchParams.keys());
  for (const key of keys) {
    if (/^utm_/i.test(key) || TRACKING_QUERY_PARAMS.has(key.toLowerCase())) {
      searchParams.delete(key);
    }
  }
}

/**
 * Sanitizes any image src (cover image, inline markdown image, or OG image):
 * - Preserves `data:` and `blob:` URIs.
 * - Unwraps `sartor.pk` / `www.sartor.pk` URLs to clean root-relative `/images/...` paths.
 * - Strips UTM / Pinterest / social tracking query parameters.
 * - Normalizes relative paths (`images/...`, `./images/...`, `../images/...`, `public/images/...`)
 *   into strict root-relative paths starting with `/`.
 */
export function sanitizeImageSrc(
  rawSrc?: string | null,
  fallback: string = DEFAULT_BRIDAL_FALLBACK_IMAGE
): string {
  if (typeof rawSrc !== 'string') return fallback;
  const trimmed = rawSrc.trim();
  if (!trimmed) return fallback;

  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Handle full URLs or protocol-relative URLs
  if (/^(https?:)?\/\//i.test(trimmed)) {
    try {
      const urlCandidate = trimmed.startsWith('//') ? `https:${trimmed}` : trimmed;
      const parsed = new URL(urlCandidate);
      const host = parsed.hostname.toLowerCase();

      if (host === 'sartor.pk' || host === 'www.sartor.pk') {
        const cleanPathname = parsed.pathname.replace(/\/{2,}/g, '/');
        return cleanPathname.startsWith('/') ? cleanPathname : `/${cleanPathname}`;
      }

      stripTrackingParams(parsed.searchParams);
      if (parsed.protocol === 'http:') {
        parsed.protocol = 'https:';
      }
      return parsed.toString();
    } catch {
      return fallback;
    }
  }

  // Strip query string and hash from local/relative paths so UTM params never break static lookup
  let pathOnly = trimmed.split('?')[0].split('#')[0].replace(/\\/g, '/').trim();
  if (!pathOnly) return fallback;

  // Strip repeated relative prefixes (`./`, `../`) and accidental `public/` prefix
  pathOnly = pathOnly
    .replace(/^(?:\.\.?\/)+/, '')
    .replace(/^\/+/, '')
    .replace(/^public\//i, '')
    .replace(/\/{2,}/g, '/');

  if (!pathOnly) return fallback;
  return `/${pathOnly}`;
}

/**
 * Converts any image path into a canonical absolute HTTPS URL on www.sartor.pk
 * for OpenGraph, Twitter Cards, and Schema.org structured metadata.
 */
export function toCanonicalSartorImageUrl(
  rawSrc?: string | null,
  canonicalOrigin: string = 'https://www.sartor.pk',
  fallback: string = DEFAULT_BRIDAL_FALLBACK_IMAGE
): string {
  const sanitized = sanitizeImageSrc(rawSrc, fallback);
  if (/^https?:\/\//i.test(sanitized) || sanitized.startsWith('data:') || sanitized.startsWith('blob:')) {
    return sanitized;
  }
  const cleanOrigin = canonicalOrigin.replace(/\/+$/, '');
  return `${cleanOrigin}${sanitized.startsWith('/') ? sanitized : `/${sanitized}`}`;
}

