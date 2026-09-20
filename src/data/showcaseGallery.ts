/**
 * =========================================================================
 * SARTOR ATELIER BESPOKE SHOWCASE & GALLERY DATA
 * =========================================================================
 *
 * HOW TO PUT YOUR OWN IMAGES IN THIS GALLERY:
 * -------------------------------------------------------------------------
 * You have 3 easy ways to put your own images into this gallery:
 *
 * METHOD 1: Local Project Files (Recommended for production)
 *   1. Save your photo into the folder: `src/assets/images/my_dress.jpg`
 *   2. Import it at the top of this file:
 *      import myDressImg from '../assets/images/my_dress.jpg';
 *   3. Assign it to `primaryImage` and/or into the `gallery` array:
 *      primaryImage: myDressImg,
 *      gallery: [
 *        { url: myDressImg, caption: 'Full front silhouette', angle: 'Full Silhouette' },
 *        ...
 *      ]
 *
 * METHOD 2: Public Folder (`/public/`)
 *   1. Put your image in the `public` folder, e.g. `public/portfolio/bridal-01.jpg`
 *   2. Use the root URL path directly as a string:
 *      primaryImage: '/portfolio/bridal-01.jpg'
 *
 * METHOD 3: Direct Web / Cloud CDN URLs (Cloudinary, AWS S3, Shopify, Google Drive)
 *   1. Upload your photo to your image host or Cloudinary CDN.
 *   2. Paste the HTTPS link directly:
 *      primaryImage: 'https://images.yourcdn.com/bridal-suit-01.jpg'
 *
 * BONUS: Live In-App Tester
 *   Click the "Photo Upload Guide & Live Preview" tab in the Service Showcase
 *   section on the website to upload or paste any image URL and test it
 *   instantly in the SARTOR Lightbox without touching code!
 * =========================================================================
 */

import {
  bridalSetImg,
  doubleSuitImg,
  embroideredJacketImg,
  panneledFrockImg,
  sarhiSetImg,
  simpleSuitImg,
} from './sizes';

export type ShowcaseCategory = 'bridal' | 'partywear' | 'casual';

export interface GalleryPhoto {
  url: string;
  caption: string;
  angle: 'Full Silhouette' | 'Embroidery Close-up' | 'Back & Flare' | 'Fabric & Detail' | 'Trial Fitting';
}

export interface BespokeSuite {
  id: string;
  title: string;
  titleUrdu: string;
  category: ShowcaseCategory;
  categoryLabel: string;
  priceDisplay: string;
  priceValue?: number;
  turnaroundTime: string;
  silhouette: string;
  fabricDetails: string;
  needleworkHighlights: string[];
  clientLocation: string;
  description: string;
  primaryImage: string;
  gallery: GalleryPhoto[];
}

/**
 * Curated high-resolution placeholders for Bridal, Party Wear, and Casual Bespoke Suites.
 * These act as fallbacks and provide multiple professional angles for each garment.
 */
export const BESPOKE_SUITES: BespokeSuite[] = [
  // -------------------------------------------------------------
  // 1. BRIDAL BESPOKE SUITES
  // -------------------------------------------------------------
  {
    id: 'bridal-couture-lehenga',
    title: 'Royal Bridal Lehenga & Gown Set',
    titleUrdu: 'شاہی عروسی لہنگا و گاؤن سیٹ',
    category: 'bridal',
    categoryLabel: 'Bridal Bespoke',
    priceDisplay: 'PKR 10,000',
    priceValue: 10000,
    turnaroundTime: '10 - 14 Days',
    silhouette: 'Heavy flared lehenga with built-in multi-layer can-can, padded choli & dual-dupatta draping',
    fabricDetails: 'Pure Banarsi Silk, Scarlet Raw Silk & Embellished Organza',
    needleworkHighlights: [
      'Authentic zardozi, hand tilla & micro-dabka needlework',
      'Dual dupatta framing with kiran border application',
      'Dedicated master cutter with personalized trial fitting',
      'Heavy structural flare with reinforced French seams',
    ],
    clientLocation: 'DHA Phase 5, Lahore',
    description:
      'A regal bridal ensemble tailored for a Barat ceremony. Crafted with multi-layered architectural can-can, hand-finished piping, and structured padded bustier choli.',
    primaryImage: bridalSetImg,
    gallery: [
      {
        url: bridalSetImg,
        caption: 'Front view of architectural flared lehenga with matching velvet choli',
        angle: 'Full Silhouette',
      },
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=80',
        caption: 'Handcrafted zardozi, antique tilla wire, and micro-dabka needlework detail',
        angle: 'Embroidery Close-up',
      },
      {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=80',
        caption: 'Padded bustier choli back contouring with secure inner hook loops',
        angle: 'Back & Flare',
      },
      {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1400&q=80',
        caption: 'Tissue dupatta with delicate kiran border application and scalloped edging',
        angle: 'Fabric & Detail',
      },
    ],
  },
  {
    id: 'bespoke-sarhi-blouse',
    title: 'Handcrafted Pleated Sarhi & Padded Blouse',
    titleUrdu: 'ہاتھ کی بنی ساڑھی اور بلاؤز',
    category: 'bridal',
    categoryLabel: 'Bridal Bespoke',
    priceDisplay: 'PKR 7,000',
    priceValue: 7000,
    turnaroundTime: '6 - 8 Days',
    silhouette: 'Graceful pleated pallu fall with anti-slip waist binding, padded blouse & matching petticoat',
    fabricDetails: 'Pure Georgette Chiffon & Embroidered Raw Silk',
    needleworkHighlights: [
      'Padded bustier blouse with teardrop back & invisible zipper',
      'Weighted satin fall application for flawless pleat drape',
      'Embellished armhole and neckline border stitching',
      'Includes custom-tailored drawstring satin petticoat',
    ],
    clientLocation: 'Cantt / Lahore Garrison',
    description:
      'Engineered for seamless bridal and ceremonial elegance. The pallu pleats sit naturally without shifting, while the sculpted blouse offers comfortable contouring for hours of wear.',
    primaryImage: sarhiSetImg,
    gallery: [
      {
        url: sarhiSetImg,
        caption: 'Pleated saree drape with pre-settled pallu and matching tailored petticoat',
        angle: 'Full Silhouette',
      },
      {
        url: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1400&q=80',
        caption: 'Pure zari weave border, neat satin fall, and piko lock stitching',
        angle: 'Fabric & Detail',
      },
      {
        url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1400&q=80',
        caption: 'Sweetheart padded blouse with anti-slip shoulder loops and French inner seams',
        angle: 'Embroidery Close-up',
      },
    ],
  },
  {
    id: 'walima-pastel-gown',
    title: 'Walima Pastel Tissue Gown & Tulle Veil',
    titleUrdu: 'ولیمہ پیسٹل ٹشو گاؤن مع ڈوپٹہ',
    category: 'bridal',
    categoryLabel: 'Bridal Bespoke',
    priceDisplay: 'PKR 9,500',
    priceValue: 9500,
    turnaroundTime: '8 - 12 Days',
    silhouette: 'Sweeping A-line reception gown with floor trail, sculpted corset bodice & pearl-encrusted veil',
    fabricDetails: 'Champagne Shimmer Tissue, Net Underlay & Butter Crepe Inner',
    needleworkHighlights: [
      'Delicate silver resham, cut-dana and micro-pearl embroidery',
      'Concealed structured boning bodice for regal posture',
      'Scalloped veil edge with hand-embroidered pearl fringe',
      'Includes complimentary final in-studio fitting trial',
    ],
    clientLocation: 'Gulberg II, Lahore',
    description:
      'A contemporary pastel bridal reception gown designed for graceful ballroom movement, combining subtle shimmer tissue with intricate silver embellishment.',
    primaryImage: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1400&q=80',
        caption: 'Floor-sweeping champagne tissue gown with sculpted bodice',
        angle: 'Full Silhouette',
      },
      {
        url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1400&q=80',
        caption: 'Micro-pearl and silver crystal resham handwork along the neckline',
        angle: 'Embroidery Close-up',
      },
    ],
  },

  // -------------------------------------------------------------
  // 2. PARTY WEAR & FESTIVE BESPOKE SUITES
  // -------------------------------------------------------------
  {
    id: 'panneled-kalidar-frock',
    title: '16-Kali Kalidar Panneled Frock',
    titleUrdu: '۱۶ کلی گھیر دار پینل فراک',
    category: 'partywear',
    categoryLabel: 'Party Wear & Festive',
    priceDisplay: 'PKR 7,000',
    priceValue: 7000,
    turnaroundTime: '5 - 7 Days',
    silhouette: '16 symmetrical geometric kalis with voluminous flare, sculpted bodice & churidar',
    fabricDetails: 'Pure Chiffon, Cotton Silk Inner & Organza Dupatta',
    needleworkHighlights: [
      'Precision laser lace setting & hemline scalloping',
      'Even kalidar flare distribution with zero seam puckering',
      'Handcrafted neckline cord piping with potli loop finish',
      'Complimentary press & tissue-lined hanger dispatch',
    ],
    clientLocation: 'Model Town, Lahore',
    description:
      'Designed with 16 precisely measured panels that create dramatic swirl and volume without bulkiness around the waistline. Tailored to perfection for festive occasions.',
    primaryImage: panneledFrockImg,
    gallery: [
      {
        url: panneledFrockImg,
        caption: '16-kali kalidar silhouette with balanced floor-length flare and churidar',
        angle: 'Full Silhouette',
      },
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80',
        caption: 'Laser lace insertion, antique gota patti, and fine scalloped border',
        angle: 'Embroidery Close-up',
      },
      {
        url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1400&q=80',
        caption: 'Neckline piping with handcrafted cloth potli loops and organza cuffs',
        angle: 'Fabric & Detail',
      },
    ],
  },
  {
    id: 'structured-double-suit',
    title: 'Structured Layered Double Suit',
    titleUrdu: 'ڈبل سوٹ مع کڑھائی دار اوورلے',
    category: 'partywear',
    categoryLabel: 'Party Wear & Festive',
    priceDisplay: 'PKR 4,000',
    priceValue: 4000,
    turnaroundTime: '4 - 6 Days',
    silhouette: 'Floor-length sheer organza coat over tailored slip kurti with matching cigarette pants',
    fabricDetails: 'Embroidered Organza Overcoat with Pure Viscose Silk Inner',
    needleworkHighlights: [
      'Double-stitched concealed slip lining for comfortable fit',
      'Fine resham thread embroidery along collars and front slit',
      'Tapered trouser finish with custom-fit ankle opening',
      'Hand-attached fabric buttons and delicate sleeve borders',
    ],
    clientLocation: 'Gulberg III, Lahore',
    description:
      'Two-tier modern Pakistani silhouette featuring an embellished translucent coat draped over an opaque inner slip, calibrated for evening dinners and gatherings.',
    primaryImage: doubleSuitImg,
    gallery: [
      {
        url: doubleSuitImg,
        caption: 'Structured sheer organza jacket over tonal silk slip and cigarette pants',
        angle: 'Full Silhouette',
      },
      {
        url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1400&q=80',
        caption: 'Resham embroidery along the collar, front slit, and cuff hems',
        angle: 'Embroidery Close-up',
      },
    ],
  },
  {
    id: 'haute-couture-jacket',
    title: 'Haute Couture Embroidered Velvet Jacket',
    titleUrdu: 'کسٹم کڑھائی والی دستکاری جیکٹ',
    category: 'partywear',
    categoryLabel: 'Party Wear & Festive',
    priceDisplay: 'Consult / Custom',
    turnaroundTime: '7 - 10 Days',
    silhouette: 'Sculpted formal blazer with structured shoulder pads, lapels & fusion tailored trousers',
    fabricDetails: 'Deep Ruby Micro-Velvet with Pure Silk Satin Lining',
    needleworkHighlights: [
      'Traditional heavy zardozi, metallic tilla & bullion wire work',
      'Bespoke welt pockets and fabric-wrapped buttons',
      'Interior silk lining with invisible hand-basting',
      'Custom sizing tailored from client inspiration photos',
    ],
    clientLocation: 'Moon Tower Atelier, Model Town',
    description:
      'A fusion of Eastern karigari and sharp Western silhouette. Crafted for formal galas and winter receptions, featuring intricate metallic hand needlework on the lapels.',
    primaryImage: embroideredJacketImg,
    gallery: [
      {
        url: embroideredJacketImg,
        caption: 'Tailored velvet blazer with structured shoulders and bespoke welt pockets',
        angle: 'Full Silhouette',
      },
      {
        url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=80',
        caption: 'Intricate metallic bullion wire work on notched lapels and cuffs',
        angle: 'Embroidery Close-up',
      },
    ],
  },

  // -------------------------------------------------------------
  // 3. CASUAL BESPOKE SUITES
  // -------------------------------------------------------------
  {
    id: 'luxury-pret-simple-suit',
    title: 'Luxury Pret Simple Kurti & Trouser',
    titleUrdu: 'کلاسک سادہ قمیض و شلوار',
    category: 'casual',
    categoryLabel: 'Casual Bespoke',
    priceDisplay: 'PKR 2,500',
    priceValue: 2500,
    turnaroundTime: '3 - 4 Days',
    silhouette: 'Crisp straight-cut A-line kurti with side slits and straight cigarette pants',
    fabricDetails: 'Designer Digital Printed Lawn & Jacquard Cotton',
    needleworkHighlights: [
      'Zero-pucker round neckline with clean facing finish',
      'Precision side chalk (slit) stitching with reinforcement',
      'Tailored sleeve cuff hem with subtle contrast piping',
      'Full overlock interior seams to prevent fraying',
    ],
    clientLocation: 'Johar Town, Lahore',
    description:
      'Everyday sophistication stitched to brand standards (Sapphire, Khaadi, Maria.B). Perfect for daily wear, work, and university with durable reinforced stitching.',
    primaryImage: simpleSuitImg,
    gallery: [
      {
        url: simpleSuitImg,
        caption: 'Straight-cut digital lawn kurti with tailored cigarette pants',
        angle: 'Full Silhouette',
      },
      {
        url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1400&q=80',
        caption: 'Zero-pucker neckline facing and reinforced chalk slit detail',
        angle: 'Fabric & Detail',
      },
    ],
  },
  {
    id: 'linen-pocket-suit',
    title: 'Pure Linen Solid Kurti with Functional Pockets',
    titleUrdu: 'خالص لنن قمیض مع جیبیں و ٹراؤزر',
    category: 'casual',
    categoryLabel: 'Casual Bespoke',
    priceDisplay: 'PKR 2,500',
    priceValue: 2500,
    turnaroundTime: '3 - 5 Days',
    silhouette: 'Relaxed A-line tunic with deep concealed trouser pockets & Mandarin collar',
    fabricDetails: '100% Pre-Shrunk Breathable Irish Linen',
    needleworkHighlights: [
      'Deep functional side pockets tailored to prevent bulging',
      'Ergonomic crotch rise for comfortable all-day movement',
      'Reinforced button placket with wooden mother-of-pearl buttons',
      'Pre-shrunk fabric preparation to guarantee zero post-wash shrinkage',
    ],
    clientLocation: 'DHA Phase 6, Lahore',
    description:
      'Tailored for working women and architects requiring comfortable daily wear with practical deep pockets and breathable natural linen fabric.',
    primaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80',
        caption: 'Pure linen tunic silhouette with clean Mandarin band collar',
        angle: 'Full Silhouette',
      },
      {
        url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=80',
        caption: 'Deep concealed side pocket and reinforced split side hem',
        angle: 'Fabric & Detail',
      },
    ],
  },
  {
    id: 'cotton-jacquard-suit',
    title: 'Embroidered Cotton Jacquard 2-Piece Suit',
    titleUrdu: 'کاٹن جیکارڈ کڑھائی والا سوٹ',
    category: 'casual',
    categoryLabel: 'Casual Bespoke',
    priceDisplay: 'PKR 3,000',
    priceValue: 3000,
    turnaroundTime: '4 - 5 Days',
    silhouette: 'Straight kurti with contrast organza sleeve border & straight-cut tulip shalwar',
    fabricDetails: 'Self-Weave Cotton Jacquard with Soft Voile Lining',
    needleworkHighlights: [
      'Subtle tone-on-tone neckline thread embroidery',
      'Organza hem insertion with delicate French ladder lace',
      'Comfortable elasticated waistband with drawstring backup',
      'Hand-pressed and hanger delivered in protective zip cover',
    ],
    clientLocation: 'Wapda Town, Lahore',
    description:
      'A refined summer staple featuring self-textured jacquard weave paired with tonal embroidery on the sleeve hems and neckline.',
    primaryImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80',
        caption: 'Self-weave jacquard kurti with contrast organza sleeve trim',
        angle: 'Full Silhouette',
      },
      {
        url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=80',
        caption: 'Tonal thread embroidery and ladder lace hem detail',
        angle: 'Embroidery Close-up',
      },
    ],
  },
];

/**
 * Utility to fetch or provide high-resolution placeholder sets for any category
 */
export function getCategoryPlaceholders(category: ShowcaseCategory): string[] {
  const matchingSuites = BESPOKE_SUITES.filter((s) => s.category === category);
  const images: string[] = [];
  matchingSuites.forEach((s) => {
    images.push(s.primaryImage);
    s.gallery.forEach((g) => {
      if (!images.includes(g.url)) {
        images.push(g.url);
      }
    });
  });
  return images;
}
