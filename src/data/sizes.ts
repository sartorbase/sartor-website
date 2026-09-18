import { MeasureGuideStep, PakistaniSizeMeasurement, PricingItem } from '../types';

// Visual showcase images generated to match user's custom Pakistani tailoring portfolio
import simpleSuitImg from '../assets/images/simple_suit_1789759016944.jpg';
import doubleSuitImg from '../assets/images/double_suit_1789759035888.jpg';
import sarhiSetImg from '../assets/images/sarhi_set_1789759000331.jpg';
import panneledFrockImg from '../assets/images/panneled_frock_1789758962385.jpg';
import bridalSetImg from '../assets/images/bridal_set_1789758804831.jpg';
import embroideredJacketImg from '../assets/images/embroidered_jacket_1789758981850.jpg';

export {
  simpleSuitImg,
  doubleSuitImg,
  sarhiSetImg,
  panneledFrockImg,
  bridalSetImg,
  embroideredJacketImg,
};

/**
 * Standard Pakistani Brand Size Chart (Khaadi, Sapphire, Sana Safinaz, Maria.B, Nishat Linen standard)
 * Measurements provided in Inches
 */
export const PAKISTANI_SIZES: PakistaniSizeMeasurement[] = [
  {
    sizeLabel: 'XS',
    ukUsEquivalent: 'UK 6-8 / US 2-4',
    shirtLength: 39,
    chest: 36,
    waist: 33,
    hip: 39,
    shoulder: 14.0,
    sleeveLength: 21.5,
    armhole: 8.0,
    trouserLength: 37.0,
    trouserHip: 24.0,
    trouserBottom: 6.5,
  },
  {
    sizeLabel: 'S',
    ukUsEquivalent: 'UK 8-10 / US 4-6',
    shirtLength: 40,
    chest: 38,
    waist: 35,
    hip: 42,
    shoulder: 14.5,
    sleeveLength: 22.0,
    armhole: 8.5,
    trouserLength: 38.0,
    trouserHip: 25.0,
    trouserBottom: 7.0,
  },
  {
    sizeLabel: 'M',
    ukUsEquivalent: 'UK 12-14 / US 8-10',
    shirtLength: 41,
    chest: 41,
    waist: 38,
    hip: 45,
    shoulder: 15.0,
    sleeveLength: 22.5,
    armhole: 9.0,
    trouserLength: 38.5,
    trouserHip: 26.5,
    trouserBottom: 7.5,
  },
  {
    sizeLabel: 'L',
    ukUsEquivalent: 'UK 14-16 / US 10-12',
    shirtLength: 42,
    chest: 44,
    waist: 42,
    hip: 48,
    shoulder: 15.5,
    sleeveLength: 23.0,
    armhole: 9.5,
    trouserLength: 39.0,
    trouserHip: 28.0,
    trouserBottom: 8.0,
  },
  {
    sizeLabel: 'XL',
    ukUsEquivalent: 'UK 18-20 / US 14-16',
    shirtLength: 42,
    chest: 47,
    waist: 45,
    hip: 51,
    shoulder: 16.0,
    sleeveLength: 23.5,
    armhole: 10.0,
    trouserLength: 39.5,
    trouserHip: 30.0,
    trouserBottom: 8.5,
  },
];

/**
 * Official SARTOR Bespoke Pricing List (All prices in PKR)
 */
export const PRICING_LIST: PricingItem[] = [
  {
    id: 'simple-suit',
    title: 'Simple Suit',
    titleUrdu: 'سمپل سوٹ (قمیض شلوار / کُرتی)',
    pricePKR: 2500,
    priceDisplay: 'PKR 2,500',
    tag: 'Everyday Luxury',
    description: 'Precision stitched 2-piece / 3-piece ladies suit with clean tailoring, designer collar/neckline, custom darts, and straight cigarette or tulip trouser/shalwar.',
    features: [
      'Neckline & gala piping / button work',
      'Straight or cigarette trouser / shalwar',
      'Overlock & high-strength stitching',
      'Turnaround: 3-5 business days',
    ],
    imageUrl: simpleSuitImg,
  },
  {
    id: 'double-suit',
    title: 'Double Suit',
    titleUrdu: 'ڈبل سوٹ (اوپن جیکٹ / ڈبل لیئر)',
    pricePKR: 4000,
    priceDisplay: 'PKR 4,000',
    tag: 'Formal Pret',
    description: 'Sophisticated layered ensemble featuring inner slip/kurti and structured outer coat/gown, designer cuffs, custom piping, and luxury tailored palazzo or trouser.',
    features: [
      'Structured longline coat or open gown layer',
      'Matching inner slip / chemise',
      'Tailored wide-leg palazzo or trouser',
      'Hand-finished lapel & edge trim',
    ],
    imageUrl: doubleSuitImg,
  },
  {
    id: 'sarhi-set',
    title: 'Sarhi Set',
    titleUrdu: 'ساڑھی سیٹ (بلاؤز + فال + پیٹیکوٹ)',
    pricePKR: 7000,
    priceDisplay: 'PKR 7,000',
    tag: 'Festive Drapery',
    description: 'Complete couture saree stitching including bespoke padded blouse tailored to contour, seamless fall & pico, pleat alignment, and matching structured petticoat.',
    features: [
      'Padded custom-fit designer blouse',
      'Professional fall & delicate pico finish',
      'Pre-pleated pallu option for effortless draping',
      'Matched satin or cotton petticoat',
    ],
    imageUrl: sarhiSetImg,
  },
  {
    id: 'panneled-frock',
    title: 'Panneled Frock Set',
    titleUrdu: 'پینلڈ فراک / کلی دار انارکلی سیٹ',
    pricePKR: 7000,
    priceDisplay: 'PKR 7,000',
    tag: 'Flowing Kalidar',
    description: 'Multi-panel kalidar flared frock / peshwas / anarkali with sweeping hemline circumference, inner lining, custom border attachment, and churidar or trouser.',
    features: [
      'Multi-kali voluminous flared flare',
      'Pure silk / lawn lining tailored inside',
      'Hemline border & gotta / lace application',
      'Coordinated churidar or tailored trouser',
    ],
    imageUrl: panneledFrockImg,
  },
  {
    id: 'bridal-set',
    title: 'Bridal Set',
    titleUrdu: 'برائیڈل سیٹ (لہنگا چولی / میکسی سیٹ)',
    pricePKR: 10000,
    priceDisplay: 'PKR 10,000',
    tag: 'Master Couture',
    description: 'Regal bridal stitching for Barat, Walima, or Mehndi. Includes heavy lehenga with can-can layering, padded choli/corset blouse, and double-dupatta framing with border setting.',
    features: [
      'Heavy flare lehenga with integrated can-can',
      'Padded sculpted choli or bridal gown maxi',
      'Dual dupatta setting, border & kiran application',
      'Dedicated master cutter with trial fitting',
    ],
    imageUrl: bridalSetImg,
  },
  {
    id: 'custom-designs',
    title: 'Consult for Custom Designs',
    titleUrdu: 'کسٹم ڈیزائن کنسلٹیشن',
    pricePKR: 'Consult',
    priceDisplay: 'Consultation / Custom Quote',
    tag: 'Signature Atelier',
    description: 'Bring any picture, celebrity outfit inspiration, or sketch. We handcraft bespoke western suits, luxury couture jackets, fusion ensembles, and custom silhouettes.',
    features: [
      'Share your photo / sketch directly on WhatsApp',
      'Design consultation with master stylist',
      'Choice of hand or machine embroidery',
      'Complete fabric sourcing & accessories matching',
    ],
    imageUrl: embroideredJacketImg,
  },
];

/**
 * Signature SARTOR Atelier Services in Lahore
 */
export const BESPOKE_SERVICES = [
  {
    id: 'hand-embroidery',
    title: 'Hand Embroidery',
    titleUrdu: 'دستی کڑھائی (ہینڈ ایمبرائیڈری)',
    badge: 'Artisanal Karigari',
    description: 'Traditional Pakistani zardozi, tilla, dabka, resham silk threadwork, sequins, and cut-dana crafted by generational master karigars.',
  },
  {
    id: 'machine-embroidery',
    title: 'Machine Embroidery',
    titleUrdu: 'مشین و کمپیوٹرائزڈ کڑھائی',
    badge: 'Precision Craft',
    description: 'High-density multi-head computerized and machine embroidery for intricate lawn borders, schiffli eyelets, monograms, and neckline motifs.',
  },
  {
    id: 'fabric-sourcing',
    title: 'Fabric & Material Sourcing',
    titleUrdu: 'کپڑا اور مٹیریل کی فراہمی',
    badge: 'Direct Mill Access',
    description: 'We source premium unstitched fabrics, pure raw silk, organza, chiffon, imported velvet, lining, and designer trims on your behalf in Lahore.',
  },
  {
    id: 'pick-and-drop',
    title: 'Pick & Drop in Lahore',
    titleUrdu: 'لاہور میں پک اینڈ ڈراپ سروس',
    badge: 'Doorstep Convenience',
    description: 'Convenient doorstep service across Lahore: we pick up your unstitched fabric or sample sample garment and deliver your finished stitched attire.',
  },
];

export const PAKISTANI_MEASURING_STEPS: MeasureGuideStep[] = [
  {
    id: 'shirt-length',
    name: 'Shirt Length (قمیض لمبائی)',
    urduName: 'قمیض کی لمبائی',
    instruction: 'Measure from the top shoulder seam next to the collar straight down to your desired knee or calf hemline.',
    tip: 'Standard Pakistani pret length is between 38" to 42" inches depending on your height.',
    iconName: 'ArrowDown',
  },
  {
    id: 'chest',
    name: 'Chest / Bust (چھاتی کی پیمائش)',
    urduName: 'چھاتی / بسٹ',
    instruction: 'Measure around the fullest part of your bust horizontally, keeping the tape straight and snug across your back.',
    tip: 'Keep tape comfortable so breathing is easy.',
    iconName: 'Maximize2',
  },
  {
    id: 'waist',
    name: 'Waist (کمر کی پیمائش)',
    urduName: 'کمر',
    instruction: 'Measure around the narrowest part of your waistline above the navel.',
    tip: 'For A-line and relaxed kurtis, waist fit has a comfortable ease of 2 inches.',
    iconName: 'Disc',
  },
  {
    id: 'hip',
    name: 'Hips / Daman (کولہے اور دامن)',
    urduName: 'کولہے / دامن',
    instruction: 'Measure around the widest part of your hips, ensuring the tape measure is level all around.',
    tip: 'Shirt hip measurement determines the side chalk (slit) opening drape.',
    iconName: 'Disc',
  },
  {
    id: 'shoulder',
    name: 'Shoulder / Teera (تیرا)',
    urduName: 'تیرا',
    instruction: 'Measure across the back from the edge of one shoulder bone across to the edge of the other.',
    tip: 'Crucial for a crisp neckline that does not slip backwards.',
    iconName: 'MoveHorizontal',
  },
  {
    id: 'sleeve',
    name: 'Sleeve Length (بازو لمبائی)',
    urduName: 'بازو',
    instruction: 'Measure from shoulder joint down the arm to your wrist bone.',
    tip: 'Full sleeves typically measure 21.5" to 23" inches.',
    iconName: 'Ruler',
  },
  {
    id: 'trouser-length',
    name: 'Trouser Length (شلوار / پینٹ لمبائی)',
    urduName: 'ٹراؤزر لمبائی',
    instruction: 'Measure from your waistline where you tie your trouser down to your ankle bone.',
    tip: 'For cigarette pants, measure slightly above ankle; for palazzos or flairs, measure to floor.',
    iconName: 'TrendingDown',
  },
  {
    id: 'trouser-bottom',
    name: 'Trouser Bottom / Pauncha (پانچہ)',
    urduName: 'پانچہ',
    instruction: 'Desired opening width at the bottom of the trouser leg.',
    tip: 'Standard cigarette pant is 6.5" to 7", straight pant 7.5" to 8", bell bottom 10"+.',
    iconName: 'Maximize2',
  },
];
