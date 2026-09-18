/**
 * SARTOR Bespoke Tailoring House - TypeScript Definitions
 * Domain: sartor.pk | Location: Moon Tower, Model Town, Lahore
 */

export type SuitType = 
  | 'women-pantsuit'
  | 'three-piece-tuxedo'
  | 'sculpted-blazer'
  | 'longline-coat'
  | 'ceremonial-suit'
  | 'wideleg-coord';

export interface SuitOption {
  id: SuitType;
  name: string;
  subtitle: string;
  basePrice: string;
  image: string;
  description: string;
  occasions: string[];
}

export type FabricCategory = 'all' | 'wool' | 'cashmere' | 'linen' | 'cotton' | 'ceremonial';

export interface Fabric {
  id: string;
  name: string;
  code: string;
  category: FabricCategory;
  origin: string;
  composition: string;
  weight: string;
  season: string;
  texture: string;
  imageUrl: string;
  swatchColor: string;
  priceGrade: 'Premier' | 'Heritage' | 'Imperial Bespoke';
  featured?: boolean;
}

export interface SizeMeasurement {
  sizeLabel: string;
  jacketChest: number; // inches
  jacketShoulder: number;
  jacketSleeve: number;
  jacketLength: number;
  trouserWaist: number;
  trouserHip: number;
  trouserInseam: number;
  euSize: number;
  ukUsSize: number;
}

export interface MeasureGuideStep {
  id: string;
  name: string;
  urduName: string;
  instruction: string;
  tip: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  title: string;
  location: string;
  suitCrafted: string;
  quote: string;
  rating: number;
  date: string;
  verified: boolean;
}

export interface BookingFormState {
  fullName: string;
  phone: string;
  email?: string;
  suitType: SuitType;
  fabricPreference: string;
  occasion: string;
  consultationType: 'studio' | 'home-lahore' | 'overseas-virtual';
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface ContactFormState {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: number;
  eventType: 
    | 'page_view'
    | 'whatsapp_click'
    | 'suit_booking_start'
    | 'suit_booking_complete'
    | 'fabric_view'
    | 'fabric_inquiry_whatsapp'
    | 'size_chart_view'
    | 'measurement_calculator_use'
    | 'map_directions_click'
    | 'contact_form_submit';
  metadata?: Record<string, string | number | boolean>;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  whatsappConversions: number;
  bookingAttempts: number;
  fabricViews: number;
  sizeGuideEngagements: number;
  contactInquiries: number;
  conversionRate: number;
}
