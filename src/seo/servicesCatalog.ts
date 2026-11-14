import { SITE_CONFIG } from '../config/site';
import { DIASPORA_IN_LANGUAGE } from './geoSchemas';

export interface AtelierServiceItem {
  id: string;
  categoryLabel: string;
  schemaCategory: string;
  name: string;
  serviceType: string;
  description: string;
  features: string[];
  priceDisplay: string;
  pkrMin: number;
  pkrMax: number;
  usdMin: number;
  usdMax: number;
  leadTimeMinDays: number;
  leadTimeMaxDays: number;
  ctaLabel: string;
  whatsappTopic: string;
  relatedBlogSlug: string;
  relatedBlogLabel: string;
}

export const ATELIER_SERVICES: AtelierServiceItem[] = [
  {
    id: 'lehenga-tailoring-couture',
    categoryLabel: 'Bridal & Baraat',
    schemaCategory: 'Bridal Couture Tailoring',
    name: 'Lehenga Tailoring & Couture',
    serviceType: 'Bespoke Pakistani Bridal Lehenga & Zardozi Couture Tailoring',
    description:
      'Specialized tailoring for heavy Zardozi bridal skirts, flared can-can suspension, farshi ghararas, and cholis engineered with 2.5-inch hidden alteration margins and pure silk bases.',
    features: [
      '3-tier canvas waistband suspension eliminates waist drop',
      'Pure 80g/100g raw silk bases & Habotai slip linings',
      'Weekly live video updates on the embroidery adda frame',
    ],
    priceDisplay: 'From PKR 10,000 / $2,000+ Custom',
    pkrMin: 10000,
    pkrMax: 1250000,
    usdMin: 65,
    usdMax: 4500,
    leadTimeMinDays: 7,
    leadTimeMaxDays: 98,
    ctaLabel: 'Book Fitting',
    whatsappTopic: 'Lehenga Tailoring & Bridal Couture',
    relatedBlogSlug: 'remote-bridal-lehenga-fitting-lahore',
    relatedBlogLabel: '28-Point Remote Bridal Fitting Protocol',
  },
  {
    id: 'saree-blouse-fall-tailoring',
    categoryLabel: 'Saree Specialists',
    schemaCategory: 'Saree Blouse & Drape Tailoring',
    name: 'Saree Blouse & Fall Tailoring',
    serviceType: 'Custom Saree Blouse, Anti-Gape Scye & Pre-Pleated Saree Stitching',
    description:
      'Premier saree blouse and fall tailoring in Model Town, Lahore. Blouse cups engineered to bust anatomy, deep-back structuring with secure tie-backs, pre-washed cotton fall stitching, and delicate pico finish.',
    features: [
      'Built-in contoured padding & bra-strap security locks',
      'Seamless pre-washed cotton fall prevents silk puckering',
      'Ready-to-wear pleated saree drape options available',
    ],
    priceDisplay: 'From PKR 7,000 (Set)',
    pkrMin: 7000,
    pkrMax: 35000,
    usdMin: 45,
    usdMax: 185,
    leadTimeMinDays: 7,
    leadTimeMaxDays: 10,
    ctaLabel: 'Order Saree Stitching',
    whatsappTopic: 'Saree Blouse & Fall Tailoring',
    relatedBlogSlug: 'the-scye-depth-equation-why-saree-blouses-gape-at-the-back',
    relatedBlogLabel: 'The Scye Depth & Anti-Gape Blouse Equation',
  },
  {
    id: '16-kali-kalidar-flow-maxis',
    categoryLabel: 'Festive Silhouette',
    schemaCategory: 'Formal & Festive Tailoring',
    name: '16-Kali Kalidar & Flow Maxis',
    serviceType: '16-Kali Radial Pattern Kalidar & Bridals Anarkali Stitching',
    description:
      'Flawlessly calibrated radial panels along true warp grainlines with zero waist bunching. Ideal for Mehndis, Mayuns, and formal evenings with hand-worked bodice yokes, kiran trim, and pure malmal or Habotai silk lining.',
    features: [
      'Full 180° to 360° circular flare drafting',
      'Even floor hemline leveling with bridal shoes calibrated',
      'Breathable natural silk linings for non-itch wear',
    ],
    priceDisplay: 'From PKR 7,000',
    pkrMin: 7000,
    pkrMax: 45000,
    usdMin: 48,
    usdMax: 240,
    leadTimeMinDays: 7,
    leadTimeMaxDays: 12,
    ctaLabel: 'Book Kalidar Fit',
    whatsappTopic: '16-Kali Kalidar & Festive Maxis',
    relatedBlogSlug: '16-kali-vs-24-kali-lehenga-flare-grainline-guide',
    relatedBlogLabel: '16-Kali vs. 24-Kali Flare Grainline Guide',
  },
  {
    id: 'unstitched-designer-suit-tailoring',
    categoryLabel: 'Designer Unstitched',
    schemaCategory: 'Designer Suit Bespoke Stitching',
    name: 'Unstitched Designer Suit Tailoring',
    serviceType: 'Custom Unstitched Lawn, Chiffon & Silk Suit Tailoring (Maria.B, Elan, Suffuse)',
    description:
      'Complete Lahore fabric consolidation and bespoke tailoring for unstitched Pakistani designer collections—finished with anti-curl micro-woven interfacing, Habotai silk linings, and 2-inch internal seam allowances.',
    features: [
      'Direct studio reception for Maria.B, Elan, Suffuse & Sana Safinaz parcels',
      'Anti-curl neckline interfacing & hidden 2-inch side margins',
      'DHL Express consolidation ships 3–10 stitched suits together worldwide',
    ],
    priceDisplay: 'From PKR 2,500 – 4,000+',
    pkrMin: 2500,
    pkrMax: 12000,
    usdMin: 22,
    usdMax: 75,
    leadTimeMinDays: 5,
    leadTimeMaxDays: 10,
    ctaLabel: 'Book Designer Stitching',
    whatsappTopic: 'Unstitched Designer Suit Tailoring',
    relatedBlogSlug: 'unstitched-pakistani-designer-suit-stitching-uk-usa-guide',
    relatedBlogLabel: 'Overseas Unstitched Suit Tailoring Playbook',
  },
  {
    id: 'bespoke-groom-sherwani-menswear',
    categoryLabel: 'Groomswear & Boski',
    schemaCategory: 'Bespoke Menswear & Groomswear',
    name: 'Bespoke Groom Sherwanis & Pure Boski',
    serviceType: 'Custom Pakistani Groom Sherwani, Prince Coat & Pure Boski Menswear Tailoring',
    description:
      'Architectural groomswear drafted with 3-layer floating horsehair chest canvas instead of stiff glued buckram, high-armhole scye geometry for Baraat arm lift, and book-matched Kadhwa Banarsi Jamawar front plackets.',
    features: [
      'Hand-padded floating wool & horsehair canvas chest structure',
      'High-scye armhole pitch & bilateral shoulder slope grading',
      'Symmetrical book-matched Banarsi Jamawar front placket alignment',
    ],
    priceDisplay: 'From $380 – $1,450 / £300+',
    pkrMin: 18000,
    pkrMax: 410000,
    usdMin: 380,
    usdMax: 1450,
    leadTimeMinDays: 10,
    leadTimeMaxDays: 21,
    ctaLabel: 'Book Groom Consultation',
    whatsappTopic: 'Bespoke Groom Sherwani & Pure Boski Menswear',
    relatedBlogSlug: 'custom-pakistani-groom-sherwani-usa-jamawar-architecture-guide',
    relatedBlogLabel: 'Jamawar Sherwani & Floating Canvas Architecture',
  },
  {
    id: 'farshi-gharara-remote-protocol',
    categoryLabel: 'Heritage & Remote Fit',
    schemaCategory: 'Remote Custom Couture & Ghararas',
    name: 'Farshi Ghararas & 28-Point Video Sizing',
    serviceType: 'Bespoke Royal Farshi Gharara Tailoring & Remote Biometric Video Fitting',
    description:
      'Heritage Awadh divided ghararas with concealed bias-cut silk knee expansion channels paired with live 28-point biometric WhatsApp sizing via app.sartor.pk and mid-production baste-fit video verification.',
    features: [
      '28-point anatomical digital profile logged at app.sartor.pk',
      'Pre-closure baste-fitting video checkpoint on steel ruler',
      'Protected by 10/30/30/30 milestone approvals & 3–5 day DHL transit',
    ],
    priceDisplay: 'From PKR 10,000 / $850+ Custom',
    pkrMin: 10000,
    pkrMax: 680000,
    usdMin: 85,
    usdMax: 2400,
    leadTimeMinDays: 7,
    leadTimeMaxDays: 60,
    ctaLabel: 'Start 28-Point Profile',
    whatsappTopic: 'Farshi Gharara & 28-Point Remote Sizing',
    relatedBlogSlug: 'antique-gold-tissue-bridal-gharara-architecture-guide',
    relatedBlogLabel: 'Tissue Bridal Gharara Knee-Mobility Architecture',
  },
];

export const SERVICES_CATALOG_SCHEMA_ID = 'services-catalog-structured-data';

export function buildIndividualServiceSchema(item: AtelierServiceItem, index?: number) {
  const serviceUrl = `${SITE_CONFIG.url}/services#${item.id}`;
  return {
    '@type': 'Service',
    '@id': serviceUrl,
    name: item.name,
    category: item.schemaCategory,
    serviceType: item.serviceType,
    description: item.description,
    url: serviceUrl,
    mainEntityOfPage: `${SITE_CONFIG.url}/services`,
    inLanguage: [...DIASPORA_IN_LANGUAGE],
    provider: { '@id': `${SITE_CONFIG.url}/#localbusiness` },
    availableAtOrFrom: { '@id': `${SITE_CONFIG.url}/#lahore-location` },
    serviceOutput: item.features.join('; '),
    termsOfService: `${SITE_CONFIG.appUrl}`,
    areaServed: [
      { '@type': 'City', name: 'Lahore' },
      { '@type': 'Country', name: 'Pakistan' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    additionalProperty: item.features.map((feature, featIdx) => ({
      '@type': 'PropertyValue',
      name: `Engineering Specification ${featIdx + 1}`,
      value: feature,
    })),
    offers: {
      '@type': 'Offer',
      url: serviceUrl,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'PKR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'PKR',
        minPrice: item.pkrMin,
        maxPrice: item.pkrMax,
      },
      deliveryLeadTime: {
        '@type': 'QuantitativeValue',
        minValue: item.leadTimeMinDays,
        maxValue: item.leadTimeMaxDays,
        unitCode: 'DAY',
      },
      eligibleRegion: ['PK', 'GB', 'US', 'CA', 'AE'],
      ...(typeof index === 'number' ? { sku: `SARTOR-SVC-0${index + 1}` } : {}),
    },
  };
}

/**
 * Generates an explicit Schema.org @graph containing an OfferCatalog, an ItemList,
 * and dedicated Service schema entities for every offering displayed on /services.
 */
export function buildServicesCatalogGraph(services: AtelierServiceItem[] = ATELIER_SERVICES) {
  const serviceEntities = services.map((svc, idx) => buildIndividualServiceSchema(svc, idx));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        '@id': `${SITE_CONFIG.url}/services#offer-catalog`,
        name: 'SARTOR Lahore Bespoke Tailoring & Couture Service Catalog',
        url: `${SITE_CONFIG.url}/services`,
        inLanguage: [...DIASPORA_IN_LANGUAGE],
        provider: { '@id': `${SITE_CONFIG.url}/#localbusiness` },
        numberOfItems: services.length,
        itemListElement: services.map((svc, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: { '@id': `${SITE_CONFIG.url}/services#${svc.id}` },
        })),
      },
      ...serviceEntities,
    ],
  };
}
