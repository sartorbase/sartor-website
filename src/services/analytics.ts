/**
 * SARTOR Analytics & Conversion Engine
 * Tracks user engagement, funnel conversions, and WhatsApp leads
 */
import { AnalyticsEvent, AnalyticsSummary } from '../types';

const STORAGE_KEY = 'sartor_analytics_events';
const SESSIONS_KEY = 'sartor_session_id';

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch {
      this.events = [];
    }

    // Ensure session ID
    if (!sessionStorage.getItem(SESSIONS_KEY)) {
      sessionStorage.setItem(SESSIONS_KEY, 'sess_' + Math.random().toString(36).substring(2, 9));
      this.trackEvent('page_view', { source: document.referrer || 'direct' });
    }
  }

  public trackEvent(
    eventType: AnalyticsEvent['eventType'],
    metadata?: Record<string, string | number | boolean>
  ) {
    const event: AnalyticsEvent = {
      id: 'evt_' + Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      eventType,
      metadata,
    };

    this.events.unshift(event);

    // Keep last 300 events in localStorage
    if (this.events.length > 300) {
      this.events = this.events.slice(0, 300);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events));
    } catch {
      // Ignore quota errors
    }

    this.notify();
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public getSummary(): AnalyticsSummary {
    const totalPageViews = this.events.filter((e) => e.eventType === 'page_view').length || 1;
    const whatsappConversions = this.events.filter((e) => 
      e.eventType === 'whatsapp_click' || 
      e.eventType === 'suit_booking_complete' || 
      e.eventType === 'fabric_inquiry_whatsapp'
    ).length;
    const bookingAttempts = this.events.filter((e) => e.eventType === 'suit_booking_start').length;
    const fabricViews = this.events.filter((e) => e.eventType === 'fabric_view').length;
    const sizeGuideEngagements = this.events.filter((e) => 
      e.eventType === 'size_chart_view' || e.eventType === 'measurement_calculator_use'
    ).length;
    const contactInquiries = this.events.filter((e) => e.eventType === 'contact_form_submit').length;

    const conversionRate = totalPageViews > 0 
      ? Math.min(100, Math.round(((whatsappConversions + contactInquiries) / totalPageViews) * 100)) 
      : 0;

    return {
      totalPageViews,
      whatsappConversions,
      bookingAttempts,
      fabricViews,
      sizeGuideEngagements,
      contactInquiries,
      conversionRate,
    };
  }

  public clearData() {
    this.events = [];
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    this.trackEvent('page_view', { source: 'reset' });
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }
}

export const analytics = new AnalyticsService();

export const SARTOR_PHONE_RAW = '923352209991';
export const SARTOR_PHONE_DISPLAY = '+92 335 2209991';
export const SARTOR_PHONE_LOCAL = '0335-2209991';
export const SARTOR_GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/7JKsRY1k9Aw4MJC68';

/**
 * Generates an encoded WhatsApp link and tracks the click event
 */
export function buildWhatsAppLink(
  message: string, 
  channel: 'hero' | 'floating' | 'suit_booking' | 'fabric' | 'contact' | 'size_chart' | 'nav' | 'map' | 'hero_pricing_card' | 'hero_cta' | 'showcase' | 'service_showcase'
): string {
  analytics.trackEvent('whatsapp_click', { channel });
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${SARTOR_PHONE_RAW}?text=${encodedText}`;
}
