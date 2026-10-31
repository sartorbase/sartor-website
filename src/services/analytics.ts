import { track } from '@vercel/analytics';
import { SITE_CONFIG } from '../config/site';

export const SARTOR_PHONE_LOCAL = SITE_CONFIG.whatsapp.local;
export const SARTOR_PHONE_INTL = SITE_CONFIG.whatsapp.number;
export const SARTOR_PHONE_DISPLAY = SITE_CONFIG.whatsapp.display;
export const SARTOR_GOOGLE_MAPS_LINK = SITE_CONFIG.address.googleMaps;

export function buildWhatsAppLink(message: string, source?: string): string {
  return SITE_CONFIG.whatsapp.getLink(message, source);
}

export const analytics = {
  trackEvent: (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: eventName,
          ...params,
        });
      }
      try {
        track(eventName, params);
      } catch (_e) {
        // Silently continue if tracking fails in non-prod or blocked environments
      }
    }
  },
};
