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
    title: 'Crimson Velvet Bridal Lehenga Set',
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
    category: 'partywear',
    categoryLabel: 'Party Wear & Festive',
    priceDisplay: 'PKR 14,000+',
    priceValue: 14000,
    turnaroundTime: '10 - 14 Days',
    silhouette: 'Sweeping 16-kali flared floor-length anarkali with tailored churidar',
    fabricDetails: '80 GSM Pure Rawa Silk with Organza Dupatta',
    needleworkHighlights: ['Fine resham floral bootis', 'Gotta patti border', 'Concealed micro-piping'],
    clientLocation: 'Model Town, Lahore',
    description: 'Flawlessly drafted kalidar with individual panel grainline alignment preventing seam skew after dry cleaning.',
    primaryImage: panneledFrockImg,
    gallery: [
      { url: panneledFrockImg, caption: 'Full panel flare and sweeping hemline', angle: 'Full Silhouette' },
    ],
  },
  {
    id: 'champagne-saree-set',
    title: 'Champagne Tissue Saree & Blouse',
    titleUrdu: 'شیمپین ٹشو ساڑھی بمعہ بلاؤز',
    category: 'partywear',
    categoryLabel: 'Party Wear & Festive',
    priceDisplay: 'PKR 9,500',
    priceValue: 9500,
    turnaroundTime: '7 - 10 Days',
    silhouette: 'Sculpted sweetheart neckline blouse with pre-pleated drape and matched petticoat',
    fabricDetails: 'French Metallic Tissue with Pure Silk Blouse',
    needleworkHighlights: ['Hand-rolled fall & pico', 'Molded cup integration', 'Concealed side zipper'],
    clientLocation: 'Gulberg III, Lahore',
    description: 'Precision couture blouse fit with high-comfort underarm clearance and structural boning.',
    primaryImage: sarhiSetImg,
    gallery: [
      { url: sarhiSetImg, caption: 'Saree drape and fitted contour blouse', angle: 'Full Silhouette' },
    ],
  },
  {
    id: 'luxury-lawn-pret',
    title: 'Designer 3-Piece Lawn Suit',
    titleUrdu: 'ڈیزائنر لان سوٹ بمعہ آرگنزا پیچ',
    category: 'casual',
    categoryLabel: 'Casual Bespoke',
    priceDisplay: 'PKR 2,500',
    priceValue: 2500,
    turnaroundTime: '4 - 6 Days',
    silhouette: 'Straight cut kurti with custom gala slit and tailored cigarette pants',
    fabricDetails: 'Premium Summer Lawn with Chiffon Dupatta',
    needleworkHighlights: ['Smooth organza border applique', 'Reinforced side slit apex', '2-inch seam allowance'],
    clientLocation: 'Johar Town, Lahore',
    description: 'Pre-shrunk lawn tailored with 2-inch internal seam margins for future alteration flexibility.',
    primaryImage: simpleSuitImg,
    gallery: [
      { url: simpleSuitImg, caption: 'Straight silhouette with crisp tailored pants', angle: 'Full Silhouette' },
    ],
  },
];
