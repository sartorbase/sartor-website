export const SARTOR_PHONE_LOCAL = '0335-2209991';
export const SARTOR_PHONE_INTL = '923352209991';
export const SARTOR_PHONE_DISPLAY = '+92 335 2209991';
export const SARTOR_GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/7JKsRY1k9Aw4MJC68';

export function buildWhatsAppLink(message: string, source?: string): string {
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${SARTOR_PHONE_INTL}?text=${encodedMsg}`;
}

export const analytics = {
  trackEvent: (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...params,
      });
    }
  },
};
