/**
 * ==============================================================================
 * SARTOR ATELIER - ANALYTICS & CONVERSION TRACKING ENGINE
 * Specialized for High-Ticket Overseas Custom Bridal & Couture Leads ($2,000+ USD)
 * ==============================================================================
 *
 * This utility manages:
 * 1. Meta (Facebook) Pixel Lead Event tracking
 * 2. Google Ads Conversion tracking on WhatsApp clicks
 * 3. Google Analytics 4 (GA4) custom lead event generation
 *
 * Safe for Next.js App Router (SSR & Client-Side Hydration safe).
 */

// ------------------------------------------------------------------------------
// CONFIGURATION: INSERT YOUR CREDENTIALS HERE
// ------------------------------------------------------------------------------
export const TRACKING_CONFIG = {
  // 1. WhatsApp Destination Phone Number (International format without '+' or spaces)
  // Default: SARTOR Lahore Atelier Concierge (+92 335 2209991)
  WHATSAPP_PHONE: '923352209991', // <-- INSERT YOUR WHATSAPP NUMBER HERE

  // 2. Meta (Facebook) Pixel ID
  META_PIXEL_ID: 'YOUR_META_PIXEL_ID', // <-- INSERT YOUR META PIXEL ID (e.g., '123456789012345')

  // 3. Google Analytics 4 Measurement ID
  GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX', // <-- INSERT YOUR GA4 ID (e.g., 'G-ABC1234567')

  // 4. Google Ads Conversion ID & Label
  // Format: 'AW-XXXXXXXXX/YYYYYYYYY' (AW-ConversionID/ConversionLabel)
  GOOGLE_ADS_ID: 'AW-XXXXXXXXX', // <-- INSERT YOUR GOOGLE ADS ID (e.g., 'AW-1122334455')
  GOOGLE_ADS_CONVERSION_LABEL: 'YYYYYYYYY', // <-- INSERT CONVERSION LABEL (e.g., 'abCDefGHIjkL')

  // Benchmark estimated value for overseas bespoke bridal lead
  ESTIMATED_LEAD_VALUE_USD: 2000,
  CURRENCY: 'USD',
};

// ------------------------------------------------------------------------------
// TypeScript Window Augmentations
// ------------------------------------------------------------------------------
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: unknown;
  }
}

/**
 * Fires high-value conversion lead events across Meta Pixel, Google Ads, and GA4
 * before redirecting or opening WhatsApp.
 *
 * @param sourceLocation Identifier for which CTA triggered the lead (e.g., 'hero_cta', 'floating_cta', 'milestone_cta')
 */
export function trackWhatsAppClick(sourceLocation: string): void {
  if (typeof window === 'undefined') return;

  const leadPayload = {
    content_name: sourceLocation,
    currency: TRACKING_CONFIG.CURRENCY,
    value: TRACKING_CONFIG.ESTIMATED_LEAD_VALUE_USD,
  };

  // 1. Meta (Facebook) Pixel Lead Event
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', leadPayload);
      // Optional Custom Event for granular Audiences
      window.fbq('trackCustom', 'WhatsAppInitiated', {
        placement: sourceLocation,
        category: 'HighTicketCustomBridal',
      });
    }
  } catch (error) {
    // Fail silently so adblockers never break user interaction
    console.debug('[Analytics] Meta Pixel track ignored:', error);
  }

  // 2. Google Ads Conversion Event
  try {
    if (typeof window.gtag === 'function') {
      const sendToTag = `${TRACKING_CONFIG.GOOGLE_ADS_ID}/${TRACKING_CONFIG.GOOGLE_ADS_CONVERSION_LABEL}`;
      window.gtag('event', 'conversion', {
        send_to: sendToTag,
        value: TRACKING_CONFIG.ESTIMATED_LEAD_VALUE_USD,
        currency: TRACKING_CONFIG.CURRENCY,
      });

      // 3. Google Analytics 4 (GA4) Lead Event
      window.gtag('event', 'generate_lead', {
        event_category: 'WhatsApp',
        event_label: sourceLocation,
        value: TRACKING_CONFIG.ESTIMATED_LEAD_VALUE_USD,
        currency: TRACKING_CONFIG.CURRENCY,
      });
    }
  } catch (error) {
    console.debug('[Analytics] Google Ads/GA4 track ignored:', error);
  }
}

/**
 * Builds the official URL-encoded WhatsApp click-to-chat URL
 *
 * @param message Pre-filled inquiry message
 * @returns Fully formatted https://wa.me/... link
 */
export function buildWhatsAppLink(
  message = 'Hi Sartor, I am interested in getting a custom bridal/couture outfit stitched. I would like a consultation.'
): string {
  const sanitizedPhone = TRACKING_CONFIG.WHATSAPP_PHONE.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${sanitizedPhone}?text=${encodedText}`;
}
