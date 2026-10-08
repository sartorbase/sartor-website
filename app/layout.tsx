import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0c0a09',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sartor.pk'),
  title: {
    default: "SARTOR Bespoke Women's Tailoring & Luxury Couture Lahore",
    template: "%s | SARTOR Atelier Lahore",
  },
  description: "Premier bespoke Pakistani women's tailoring atelier in Moon Tower, Model Town, Lahore. 100% Guaranteed Custom Fit via Guided Video Calls. Handcrafted bridal lehengas, 16-kali kalidars, sarees, and luxury pret. Insured DHL Express Shipping to USA, UK, Canada & UAE (3–5 Days).",
  applicationName: "SARTOR Bespoke Atelier",
  authors: [{ name: "Abdul Ghaffar, Master Tailor" }],
  generator: "Next.js",
  keywords: [
    "pakistani tailor",
    "bespoke tailors lahore",
    "tailor model town",
    "lehenga tailoring near me",
    "saree tailor near me",
    "custom bridal lehenga",
    "zardozi hand embroidery",
    "diaspora pakistani tailoring",
    "pakistani couture uk usa",
  ],
  creator: "SARTOR Bespoke Atelier",
  publisher: "SARTOR",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: 'https://www.sartor.pk',
  },
  openGraph: {
    title: "SARTOR Bespoke Women's Tailoring & Luxury Couture Lahore",
    description: "Premier bespoke tailoring atelier in Model Town, Lahore. 100% Guaranteed Custom Fit via Guided Video Calls. Insured DHL Express Shipping to USA, UK, Canada & UAE (3–5 Days).",
    url: 'https://www.sartor.pk',
    siteName: 'SARTOR Bespoke Atelier Lahore',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: 'https://www.sartor.pk/images/how-to-choose-a-good-tailor-in-lahore.jpg',
        width: 1200,
        height: 630,
        alt: "SARTOR Bespoke Women's Tailoring Atelier Lahore",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SARTOR Bespoke Women's Tailoring & Luxury Couture Lahore",
    description: "Premier bespoke tailoring atelier in Lahore. 100% Guaranteed Custom Fit via Guided Video Calls with Insured DHL Express (3–5 Days).",
    images: ['https://www.sartor.pk/images/how-to-choose-a-good-tailor-in-lahore.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SARTOR Bespoke Tailoring Atelier',
  image: 'https://www.sartor.pk/images/how-to-choose-a-good-tailor-in-lahore.jpg',
  '@id': 'https://www.sartor.pk/#organization',
  url: 'https://www.sartor.pk',
  telephone: '+923352209991',
  priceRange: '$$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Moon Tower, Model Town',
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    postalCode: '54700',
    addressCountry: 'PK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.4828,
    longitude: 74.3184,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '20:00',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'Pakistan' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  sameAs: [
    'https://maps.app.goo.gl/7JKsRY1k9Aw4MJC68',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-stone-950 text-stone-100 antialiased selection:bg-amber-800 selection:text-white min-h-screen flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
