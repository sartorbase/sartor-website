import { SITE_CONFIG } from '../src/config/site';

export const SARTOR_PHONE_LOCAL = SITE_CONFIG.whatsapp.local;
export const SARTOR_PHONE_INTL = SITE_CONFIG.whatsapp.number;
export const SARTOR_PHONE_DISPLAY = SITE_CONFIG.whatsapp.display;
export const SARTOR_GOOGLE_MAPS_LINK = SITE_CONFIG.address.googleMaps;

export function buildWhatsAppLink(message: string, source?: string): string {
  return SITE_CONFIG.whatsapp.getLink(message, source);
}

export function trackWhatsAppClick(location: string, label?: string) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'whatsapp_click',
      click_location: location,
      label: label || 'WhatsApp Conversion',
    });
  }
}

export const TRACKING_CONFIG = {
  phone: SARTOR_PHONE_DISPLAY,
  whatsapp: SARTOR_PHONE_INTL,
};
