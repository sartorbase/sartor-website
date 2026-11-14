export interface DiasporaRegionSpec {
  id: string;
  countryName: string;
  countryCode: string;
  languageTag: string;
  wikiUrl: string;
  currency: string;
  transitDaysMin: number;
  transitDaysMax: number;
  customsNote: string;
  cities: string[];
  serviceName: string;
  serviceDescription: string;
}

/**
 * Explicit BCP-47 language codes communicating diaspora support across UK, USA, Canada, UAE, and Lahore.
 */
export const DIASPORA_IN_LANGUAGE = ['en-GB', 'en-US', 'en-CA', 'en-AE', 'en-PK'] as const;

export const LAHORE_ATELIER_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Shop F-9, Moon Tower, Block 30-M, International Market, Model Town',
  addressLocality: 'Lahore',
  addressRegion: 'Punjab',
  postalCode: '54700',
  addressCountry: 'PK',
} as const;

export const LAHORE_GEO_COORDINATES = {
  '@type': 'GeoCoordinates',
  latitude: 31.4828,
  longitude: 74.3184,
} as const;

export const LAHORE_LOCAL_ZONES = [
  'Model Town',
  'DHA Lahore (Phase 1-8)',
  'Gulberg',
  'Lahore Cantt',
  'Johar Town',
  'Bahria Town Lahore',
  'Cavalry Ground',
  'Garden Town',
];

export const DIASPORA_REGIONS: DiasporaRegionSpec[] = [
  {
    id: 'https://sartor.pk/#diaspora-uk',
    countryName: 'United Kingdom',
    countryCode: 'GB',
    languageTag: 'en-GB',
    wikiUrl: 'https://en.wikipedia.org/wiki/United_Kingdom',
    currency: 'GBP',
    transitDaysMin: 3,
    transitDaysMax: 5,
    customsNote: 'Compliant export commercial invoicing structured around the £135 GBP customs threshold; 3–5 business day insured DHL Express transit.',
    cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bradford', 'Slough', 'Glasgow'],
    serviceName: 'Bespoke Pakistani Tailoring & Zardozi Bridal Couture — United Kingdom Diaspora',
    serviceDescription:
      'Remote custom Pakistani bridal lehengas, 16-kali kalidars, pre-pleated sarees, unstitched designer suits, and groom sherwanis tailored in Model Town Lahore for UK clients in London, Manchester, Birmingham, and Bradford. Includes 28-point digital sizing on app.sartor.pk, pre-closure baste-fitting video checkpoints, 2-inch silk-bound seam margins, 10/30/30/30 milestone payments in GBP, and 3–5 day DHL Express delivery.',
  },
  {
    id: 'https://sartor.pk/#diaspora-usa',
    countryName: 'United States',
    countryCode: 'US',
    languageTag: 'en-US',
    wikiUrl: 'https://en.wikipedia.org/wiki/United_States',
    currency: 'USD',
    transitDaysMin: 3,
    transitDaysMax: 5,
    customsNote: 'Export documentation aligned with the $800 USD de minimis threshold; 3–5 business day insured DHL Express and FedEx Priority shipping.',
    cities: ['New York', 'Houston', 'Dallas', 'Chicago', 'San Jose', 'Edison', 'Los Angeles'],
    serviceName: 'Bespoke Pakistani Tailoring, Bridal Lehengas & Groom Sherwanis — United States Diaspora',
    serviceDescription:
      'Custom Pakistani bridal lehengas, Micro-Velvet 9000 / silk velvet winter couture, unstitched designer formal tailoring, and floating-canvas groom sherwanis tailored in Model Town Lahore for US clients in New York, Houston, Dallas, Chicago, and California. Features 28-point digital measurements via app.sartor.pk, mid-production baste-fit video approvals, 2-inch seam margins, 10/30/30/30 escrow milestones in USD, and 3–5 day DHL Express transit.',
  },
  {
    id: 'https://sartor.pk/#diaspora-canada',
    countryName: 'Canada',
    countryCode: 'CA',
    languageTag: 'en-CA',
    wikiUrl: 'https://en.wikipedia.org/wiki/Canada',
    currency: 'CAD',
    transitDaysMin: 3,
    transitDaysMax: 5,
    customsNote: 'Insured 3–5 business day DHL Express air cargo to Ontario, Alberta, and British Columbia with itemized handcrafted apparel documentation.',
    cities: ['Toronto', 'Mississauga', 'Brampton', 'Calgary', 'Vancouver', 'Edmonton', 'Ottawa'],
    serviceName: 'Bespoke Pakistani Bridalwear & Custom Tailoring — Canada Diaspora',
    serviceDescription:
      'Remote bespoke Pakistani bridal lehengas, winter velvet couture, farshi ghararas, designer formal suits, and Jamawar groom sherwanis crafted by Master Tailor Abdul Ghaffar in Lahore for Canadian clients across Toronto, Mississauga, Brampton, Calgary, and Vancouver. Includes 28-point sizing on app.sartor.pk, 2-inch internal seam allowances, 10/30/30/30 milestone payments, and 3–5 day tracked DHL delivery.',
  },
  {
    id: 'https://sartor.pk/#diaspora-uae',
    countryName: 'United Arab Emirates',
    countryCode: 'AE',
    languageTag: 'en-AE',
    wikiUrl: 'https://en.wikipedia.org/wiki/United_Arab_Emirates',
    currency: 'AED',
    transitDaysMin: 2,
    transitDaysMax: 3,
    customsNote: '2–3 business day express DHL priority transit to Dubai, Abu Dhabi, and Sharjah compliant with 1,000 AED customs thresholds.',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
    serviceName: 'Bespoke Pakistani Tailoring & Luxury Couture — UAE & GCC Diaspora',
    serviceDescription:
      'Breathable 80–100 GSM pure Katan silk, high-twist crinkle chiffon, pre-pleated tissue sarees, bridal lehengas, and custom groom sherwanis tailored in Model Town Lahore for UAE residents in Dubai, Abu Dhabi, and Sharjah. Includes 28-point video fitting via app.sartor.pk, 2-inch seam allowances, 10/30/30/30 milestone verification, and 2–3 day express DHL courier delivery.',
  },
];

export function buildLahoreLocationSchema() {
  return {
    '@type': ['Place', 'LocalBusiness', 'ClothingStore'],
    '@id': 'https://sartor.pk/#lahore-location',
    name: 'SARTOR Bespoke Couture Atelier — Model Town, Lahore',
    alternateName: ['SARTOR Lahore Atelier', 'SARTOR Moon Tower Model Town'],
    description:
      'Flagship bespoke Pakistani couture, bridal lehenga, saree blouse, designer suit, and groom sherwani tailoring studio at Shop F-9, Moon Tower, Block 30-M, International Market, Model Town, Lahore, led by Master Tailor Abdul Ghaffar.',
    url: 'https://sartor.pk/',
    telephone: '+923320500904',
    email: 'contact@sartor.pk',
    priceRange: 'PKR 2,500 - PKR 1,250,000 | £22 - £4,500 | $28 - $6,200',
    currenciesAccepted: 'PKR, GBP, USD, CAD, AED',
    inLanguage: [...DIASPORA_IN_LANGUAGE],
    knowsLanguage: [...DIASPORA_IN_LANGUAGE, 'ur'],
    address: LAHORE_ATELIER_ADDRESS,
    geo: LAHORE_GEO_COORDINATES,
    hasMap: 'https://maps.app.goo.gl/7JKsRY1k9Aw4MJC68',
    containedInPlace: {
      '@type': 'City',
      name: 'Lahore',
      sameAs: 'https://en.wikipedia.org/wiki/Lahore',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Punjab',
        containedInPlace: {
          '@type': 'Country',
          name: 'Pakistan',
          sameAs: 'https://en.wikipedia.org/wiki/Pakistan',
        },
      },
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Lahore',
        sameAs: 'https://en.wikipedia.org/wiki/Lahore',
      },
      ...LAHORE_LOCAL_ZONES.map((zone) => ({
        '@type': 'Place',
        name: `${zone}, Lahore, Pakistan`,
      })),
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '11:00',
        closes: '21:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '14:00',
        closes: '20:00',
      },
    ],
    parentOrganization: { '@id': 'https://sartor.pk/#localbusiness' },
  };
}

export function buildDiasporaServiceSchemas(pageUrl: string) {
  return DIASPORA_REGIONS.map((region) => ({
    '@type': 'Service',
    '@id': region.id,
    name: region.serviceName,
    serviceType: 'Bespoke Pakistani Tailoring & Remote Bridal Couture',
    description: region.serviceDescription,
    url: pageUrl,
    inLanguage: [
      region.languageTag,
      ...DIASPORA_IN_LANGUAGE.filter((lang) => lang !== region.languageTag),
    ],
    provider: { '@id': 'https://sartor.pk/#localbusiness' },
    availableAtOrFrom: { '@id': 'https://sartor.pk/#lahore-location' },
    audience: {
      '@type': 'Audience',
      audienceType: `Pakistani and South Asian Diaspora in ${region.countryName}`,
      geographicArea: {
        '@type': 'Country',
        name: region.countryName,
        sameAs: region.wikiUrl,
      },
    },
    areaServed: [
      {
        '@type': 'Country',
        name: region.countryName,
        sameAs: region.wikiUrl,
      },
      ...region.cities.map((city) => ({
        '@type': 'City',
        name: city,
      })),
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: region.currency,
      availability: 'https://schema.org/InStock',
      url: pageUrl,
      description: region.customsNote,
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: region.countryCode,
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 7,
            maxValue: 10,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: region.transitDaysMin,
            maxValue: region.transitDaysMax,
            unitCode: 'DAY',
          },
        },
      },
    },
  }));
}

export interface BreadcrumbTrailItem {
  position: number;
  name: string;
  item: string;
  path: string;
}

export function getPrimaryBreadcrumbItems(pageUrl: string): BreadcrumbTrailItem[] {
  const cleanUrl = pageUrl.replace(/\/+$/, '');
  const baseItems: BreadcrumbTrailItem[] = [
    {
      position: 1,
      name: 'Home',
      item: 'https://sartor.pk/',
      path: '/',
    },
  ];

  if (cleanUrl === 'https://sartor.pk/services') {
    baseItems.push({
      position: 2,
      name: 'Bespoke Tailoring Services',
      item: 'https://sartor.pk/services',
      path: '/services',
    });
  } else if (cleanUrl === 'https://sartor.pk/custom-bridal') {
    baseItems.push(
      {
        position: 2,
        name: 'Bespoke Tailoring Services',
        item: 'https://sartor.pk/services',
        path: '/services',
      },
      {
        position: 3,
        name: 'Custom Bridal Couture',
        item: 'https://sartor.pk/custom-bridal',
        path: '/custom-bridal',
      }
    );
  } else if (cleanUrl === 'https://sartor.pk/blog' || cleanUrl === 'https://sartor.pk/journal') {
    baseItems.push({
      position: 2,
      name: 'Atelier Journal & Masterclasses',
      item: 'https://sartor.pk/blog',
      path: '/blog',
    });
  }

  return baseItems;
}

export function buildPrimaryBreadcrumbSchema(pageUrl: string) {
  const trailItems = getPrimaryBreadcrumbItems(pageUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    inLanguage: [...DIASPORA_IN_LANGUAGE],
    itemListElement: trailItems.map(({ position, name, item }) => ({
      '@type': 'ListItem',
      position,
      name,
      item,
    })),
  };
}

export function buildLocationAndDiasporaGraph(pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildLahoreLocationSchema(),
      ...buildDiasporaServiceSchemas(pageUrl),
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#geo-targeting`,
        url: pageUrl,
        inLanguage: [...DIASPORA_IN_LANGUAGE],
        isPartOf: { '@id': 'https://sartor.pk/#website' },
        about: { '@id': 'https://sartor.pk/#lahore-location' },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        spatialCoverage: [
          { '@type': 'City', name: 'Lahore', containedInPlace: { '@type': 'Country', name: 'Pakistan' } },
          ...DIASPORA_REGIONS.map((r) => ({
            '@type': 'Country',
            name: r.countryName,
            sameAs: r.wikiUrl,
          })),
        ],
      },
    ],
  };
}
