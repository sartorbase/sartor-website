import {
  bridalSetImg,
  doubleSuitImg,
  customDesignsImg,
  panneledFrockImg,
  kalidar16Img,
  champagneTissueSareeImg,
  sarhiSetImg,
  simpleSuitImg,
} from './sizes';

export type ShowcaseCategory = 'bridal' | 'festive' | 'saree' | 'formal' | 'casual' | 'partywear';

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
  priceValue: number;
  turnaroundTime: string;
  silhouette: string;
  fabricDetails: string;
  needleworkHighlights: string[];
  clientLocation: string;
  description: string;
  primaryImage: string;
  gallery: GalleryPhoto[];
}

export const BESPOKE_SUITES: BespokeSuite[] = [
  {
    id: 'crimson-bridal-lehenga',
    title: 'Bridal Set / Crimson Velvet Bridal Lehenga',
    titleUrdu: 'شاہی سرخ مخمل برائیڈل لہنگا',
    category: 'bridal',
    categoryLabel: 'Bridal Bespoke',
    priceDisplay: 'PKR 45,000+',
    priceValue: 45000,
    turnaroundTime: '21 - 30 Days',
    silhouette: 'Voluminous flared lehenga with structured can-can and sculpted padded choli',
    fabricDetails: 'Pure Micro Velvet with Katan Silk lining',
    needleworkHighlights: ['Pure gold zardozi', 'Dull matte kora dabka', 'French knots & naqshi wire'],
    clientLocation: 'DHA Phase 5, Lahore',
    description: 'Bespoke Barat ensemble tailored with 3-tier canvas waistband and graduated hemline rise for effortless walking.',
    primaryImage: bridalSetImg,
    gallery: [
      { url: bridalSetImg, caption: 'Full royal silhouette on atelier mannequin', angle: 'Full Silhouette' },
    ],
  },
  {
    id: 'emerald-festive-kalidar',
    title: '16-Kali Pure Raw Silk Kalidar',
    titleUrdu: 'سولہ کلی را سلک انارکلی فراک',
    category: 'festive',
    categoryLabel: 'Party Wear & Festive',
    priceDisplay: 'PKR 14,000+',
    priceValue: 14000,
    turnaroundTime: '10 - 14 Days',
    silhouette: 'Sweeping 16-kali flared floor-length anarkali with tailored churidar',
    fabricDetails: '80 GSM Pure Raw Silk with Organza Dupatta',
    needleworkHighlights: ['Fine resham floral bootis', 'Gotta patti border', 'Concealed micro-piping'],
    clientLocation: 'Model Town, Lahore',
    description: 'Flawlessly drafted kalidar with individual panel grainline alignment preventing seam skew after dry cleaning.',
    primaryImage: kalidar16Img,
    gallery: [
      { url: kalidar16Img, caption: 'Full panel flare and sweeping hemline', angle: 'Full Silhouette' },
    ],
  },
  {
    id: 'champagne-saree-set',
    title: 'Champagne Tissue Saree & Blouse',
    titleUrdu: 'شیمپین ٹشو ساڑھی بمعہ بلاؤز',
    category: 'saree',
    categoryLabel: 'Festive Drapery',
    priceDisplay: 'PKR 9,500',
    priceValue: 9500,
    turnaroundTime: '7 - 10 Days',
    silhouette: 'Sculpted sweetheart neckline blouse with pre-pleated drape and matched petticoat',
    fabricDetails: 'French Metallic Tissue with Pure Silk Blouse',
    needleworkHighlights: ['Hand-rolled fall & pico', 'Molded cup integration', 'Concealed side zipper'],
    clientLocation: 'Gulberg III, Lahore',
    description: 'Precision couture blouse fit with high-comfort underarm clearance and structural boning.',
    primaryImage: champagneTissueSareeImg,
    gallery: [
      { url: champagneTissueSareeImg, caption: 'Saree drape and fitted contour blouse', angle: 'Full Silhouette' },
    ],
  },
  {
    id: 'panneled-frock-kalidar',
    title: 'Panneled Frock Set / Kalidar',
    titleUrdu: 'پینلڈ فراک / کلی دار انارکلی سیٹ',
    category: 'festive',
    categoryLabel: 'Party Wear & Festive',
    priceDisplay: 'PKR 7,000',
    priceValue: 7000,
    turnaroundTime: '7 - 10 Days',
    silhouette: 'Multi-kali voluminous flared frock with coordinated churidar pants',
    fabricDetails: 'Fine Chiffon & Silk blend with pure lawn lining',
    needleworkHighlights: ['Gotta border attachment', 'Scalloped hemline finish', 'Reinforced bodice seams'],
    clientLocation: 'Cantt, Lahore',
    description: 'Flowy multi-panel kalidar pishwas anarkali with sweeping hemline circumference and inner lining.',
    primaryImage: panneledFrockImg,
    gallery: [
      { url: panneledFrockImg, caption: 'Flowy multi-panel kalidar silhouette with full flare', angle: 'Full Silhouette' },
    ],
  },
  {
    id: 'sarhi-set',
    title: 'Sarhi Set',
    titleUrdu: 'ساڑھی سیٹ (بلاؤز + فال + پیٹیکوٹ)',
    category: 'saree',
    categoryLabel: 'Festive Drapery',
    priceDisplay: 'PKR 7,000',
    priceValue: 7000,
    turnaroundTime: '5 - 7 Days',
    silhouette: 'Contour-fitted blouse with reinforced bra-strap holders and neat pallu pleats',
    fabricDetails: 'Pure Georgette & Organza with Cotton Fall',
    needleworkHighlights: ['Pre-pleated pallu option', 'Delicate pico edge', 'Micro-piping border'],
    clientLocation: 'Johar Town, Lahore',
    description: 'Authentic Sarhi with tailored padded blouse, pre-washed cotton fall, and neat pleat alignment.',
    primaryImage: sarhiSetImg,
    gallery: [
      { url: sarhiSetImg, caption: 'Authentic saree with tailored contour blouse and pallu drape', angle: 'Full Silhouette' },
    ],
  },
  {
    id: 'double-suit',
    title: 'Double Suit',
    titleUrdu: 'ڈبل سوٹ (اوپن جیکٹ / ڈبل لیئر)',
    category: 'formal',
    categoryLabel: 'Formal Pret',
    priceDisplay: 'PKR 4,000',
    priceValue: 4000,
    turnaroundTime: '5 - 7 Days',
    silhouette: 'Structured longline open jacket or outer gown with matching inner slip and straight palazzo',
    fabricDetails: 'Raw Silk Outer with Pure Cotton Malmal Slip',
    needleworkHighlights: ['Hand-finished lapel', 'Concealed hooks', 'Precision piping'],
    clientLocation: 'DHA Phase 6, Lahore',
    description: 'Layered gown and structured open jacket suit with tailored palazzo pants and custom piping.',
    primaryImage: doubleSuitImg,
    gallery: [
      { url: doubleSuitImg, caption: 'Layered ensemble with open jacket and inner slip', angle: 'Full Silhouette' },
    ],
  },
  {
    id: 'luxury-lawn-pret',
    title: 'Simple Suit',
    titleUrdu: 'سمپل سوٹ (قمیض شلوار / کُرتی)',
    category: 'casual',
    categoryLabel: 'Everyday Luxury',
    priceDisplay: 'PKR 2,500',
    priceValue: 2500,
    turnaroundTime: '4 - 6 Days',
    silhouette: 'Straight cut kurti with custom gala slit and tailored cigarette pants',
    fabricDetails: 'Premium Summer Lawn with Chiffon Dupatta',
    needleworkHighlights: ['Smooth organza border applique', 'Reinforced side slit apex', '2-inch seam allowance'],
    clientLocation: 'Johar Town, Lahore',
    description: 'Clean 2-piece / 3-piece casual or formal lawn kurti suit with tailored pants and pre-shrunk fabric.',
    primaryImage: simpleSuitImg,
    gallery: [
      { url: simpleSuitImg, caption: 'Straight silhouette with crisp tailored pants', angle: 'Full Silhouette' },
    ],
  },
  {
    id: 'custom-designs-craft',
    title: 'Custom Design & Replicas',
    titleUrdu: 'کسٹم ڈیزائین و فینسی ایمبرائیڈری',
    category: 'bridal',
    categoryLabel: 'Master Adda Craft',
    priceDisplay: 'Custom Quote',
    priceValue: 0,
    turnaroundTime: '14 - 21 Days',
    silhouette: 'Custom silhouette drafted from client moodboard or celebrity reference photo',
    fabricDetails: 'Handpicked Silk, Velvet, Organza & Net bases',
    needleworkHighlights: ['Pure Zardozi on Adda frame', 'Dabka, Tilla & Marori', 'Semi-precious stone embellishment'],
    clientLocation: 'Faisal Town, Lahore',
    description: 'Authentic Adda work embroidery craft by generational Lahore master ustads for bespoke replicas and originals.',
    primaryImage: customDesignsImg,
    gallery: [
      { url: customDesignsImg, caption: 'Traditional wooden Adda embroidery frame with master karigars', angle: 'Embroidery Close-up' },
    ],
  },
];
