/**
 * ==============================================================================
 * SARTOR ATELIER - SINGLE SOURCE OF TRUTH (SITE & CONTACT CONFIGURATION)
 * Defines primary atelier phone numbers, WhatsApp gateways, addresses, and helpers.
 * ==============================================================================
 */

export interface SiteConfig {
  name: string;
  legalName: string;
  domain: string;
  url: string;
  appUrl: string;
  address: {
    shop: string;
    market: string;
    locality: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    full: string;
    googleMaps: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  whatsapp: {
    number: string;
    local: string;
    display: string;
    base: string;
    getLink: (message?: string, source?: string) => string;
  };
  contact: {
    email: string;
    masterTailor: string;
    experienceYears: string;
  };
}

const WHATSAPP_RAW_NUMBER = '923320500904';
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_RAW_NUMBER}`;

export const SITE_CONFIG: SiteConfig = {
  name: 'SARTOR',
  legalName: 'SARTOR Bespoke Atelier',
  domain: 'sartor.pk',
  url: 'https://sartor.pk',
  appUrl: 'https://app.sartor.pk',
  address: {
    shop: 'Shop F-9, Moon Tower, Block 30-M',
    market: 'International Market',
    locality: 'Model Town',
    city: 'Lahore',
    province: 'Punjab',
    postalCode: '54700',
    country: 'Pakistan',
    full: 'Shop F-9, Moon Tower, Block 30-M, International Market, Model Town, Lahore, Pakistan',
    googleMaps: 'https://maps.app.goo.gl/7JKsRY1k9Aw4MJC68',
    coordinates: {
      latitude: '31.4826',
      longitude: '74.3142',
    },
  },
  whatsapp: {
    number: WHATSAPP_RAW_NUMBER,
    local: '0332-0500904',
    display: '+92 332 0500904',
    base: WHATSAPP_BASE_URL,
    getLink: (message?: string, _source?: string): string => {
      if (!message || message.trim() === '') {
        return WHATSAPP_BASE_URL;
      }
      return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message.trim())}`;
    },
  },
  contact: {
    email: 'sartorbase@gmail.com',
    masterTailor: 'Abdul Ghaffar',
    experienceYears: '13+',
  },
};

export default SITE_CONFIG;
