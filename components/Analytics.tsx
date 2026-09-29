'use client';

/**
 * ==============================================================================
 * SARTOR ATELIER - ASYNCHRONOUS ANALYTICS HEAD INJECTION COMPONENT
 * Implements Google Ads, Google Analytics 4, and Meta (Facebook) Pixel
 * Optimized for Next.js App Router & Vercel Core Web Vitals
 * ==============================================================================
 */

import React from 'react';
import Script from 'next/script';
import { TRACKING_CONFIG } from '../lib/analytics';

export function AnalyticsScripts(): React.ReactElement {
  const { GA4_MEASUREMENT_ID, GOOGLE_ADS_ID, META_PIXEL_ID } = TRACKING_CONFIG;

  const isMetaPixelConfigured = META_PIXEL_ID && !META_PIXEL_ID.includes('YOUR_META');
  const isGoogleAdsConfigured = GOOGLE_ADS_ID && !GOOGLE_ADS_ID.includes('AW-XXXX');
  const isGA4Configured = GA4_MEASUREMENT_ID && !GA4_MEASUREMENT_ID.includes('G-XXXX');

  // Primary Google tag ID for the main script source
  const primaryGtagId = isGoogleAdsConfigured
    ? GOOGLE_ADS_ID
    : isGA4Configured
    ? GA4_MEASUREMENT_ID
    : 'AW-XXXXXXXXX';

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* 1. GOOGLE TAG (gtag.js) - Google Ads & Google Analytics 4           */}
      {/* Loaded with strategy="afterInteractive" to protect Core Web Vitals */}
      {/* ------------------------------------------------------------------ */}
      <Script
        id="google-gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryGtagId}`}
      />
      <Script id="google-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());

          ${isGoogleAdsConfigured ? `gtag('config', '${GOOGLE_ADS_ID}');` : `// gtag('config', 'AW-XXXXXXXXX');`}
          ${isGA4Configured ? `gtag('config', '${GA4_MEASUREMENT_ID}', { send_page_view: true });` : `// gtag('config', 'G-XXXXXXXXXX');`}
        `}
      </Script>

      {/* ------------------------------------------------------------------ */}
      {/* 2. META (FACEBOOK) PIXEL                                          */}
      {/* Asynchronously boots fbq without blocking thread execution        */}
      {/* ------------------------------------------------------------------ */}
      <Script id="meta-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          ${
            isMetaPixelConfigured
              ? `fbq('init', '${META_PIXEL_ID}'); fbq('track', 'PageView');`
              : `// fbq('init', 'YOUR_META_PIXEL_ID'); // fbq('track', 'PageView');`
          }
        `}
      </Script>

      {/* Meta Pixel NoScript Fallback for Non-JS Crawlers */}
      {isMetaPixelConfigured && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  );
}

export default AnalyticsScripts;
