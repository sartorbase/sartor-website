import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { MainLayout } from './components/templates/MainLayout';
import { HeroSection } from './components/organisms/HeroSection';
import { SpecializationBanner } from './components/organisms/SpecializationBanner';
import { AboutTailoringSection } from './components/organisms/AboutTailoringSection';
import { LocationMapSection } from './components/organisms/LocationMapSection';
import { SareeDrapingGuideSection } from './components/organisms/SareeDrapingGuideSection';
import { MeasurementLeadMagnet } from './components/organisms/MeasurementLeadMagnet';
import { BridalFaqSection } from './components/organisms/BridalFaqSection';
import { TestimonialsSection } from './components/organisms/TestimonialsSection';
import { BlogPageView } from './components/pages/BlogPageView';
import { CustomBridalLandingPage } from './components/pages/CustomBridalLandingPage';
import { ServicesPageView } from './components/pages/ServicesPageView';
import { extractBlogSlug, normalizeRoutePath } from './utils/navigation';
import {
  buildLocationAndDiasporaGraph,
  buildPrimaryBreadcrumbSchema,
  PRIMARY_ROUTE_SEO,
} from './seo/geoSchemas';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizeRoutePath(window.location.pathname);
    }
    return '/';
  });

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(normalizeRoutePath(window.location.pathname));
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('app-navigate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('app-navigate', handleRouteChange);
    };
  }, []);

  // Synchronize Lahore Location, Diaspora Schema, BreadcrumbList & Primary Head Meta across SPA routes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const raw = currentPath.toLowerCase().split('?')[0].split('#')[0];
    const normalized = raw.length > 1 ? raw.replace(/\/+$/, '') : raw || '/';
    const routeKey = normalized === '/journal' ? '/blog' : normalized;
    const isPrimary =
      routeKey === '/' ||
      routeKey === '/services' ||
      routeKey === '/custom-bridal' ||
      routeKey === '/blog';

    if (!isPrimary) {
      const primaryBcEl = document.getElementById('primary-breadcrumb-structured-data');
      if (primaryBcEl) primaryBcEl.remove();
      return;
    }

    const meta = PRIMARY_ROUTE_SEO[routeKey];
    document.title = meta.title;

    const setMetaTag = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMetaTag('name', 'description', meta.description);
    setMetaTag('property', 'og:type', meta.ogType);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:image', meta.ogImage);
    setMetaTag('property', 'og:image:alt', meta.ogImageAlt);
    setMetaTag('property', 'og:url', meta.canonicalUrl);
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', meta.ogImage);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', meta.canonicalUrl);
    }

    const scriptId = 'location-diaspora-structured-data';
    let scriptEl = document.getElementById(scriptId);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(buildLocationAndDiasporaGraph(meta.canonicalUrl));

    const bcScriptId = 'primary-breadcrumb-structured-data';
    let bcEl = document.getElementById(bcScriptId);
    if (!bcEl) {
      bcEl = document.createElement('script');
      bcEl.id = bcScriptId;
      bcEl.setAttribute('type', 'application/ld+json');
      document.head.appendChild(bcEl);
    }
    bcEl.textContent = JSON.stringify(buildPrimaryBreadcrumbSchema(meta.canonicalUrl));
  }, [currentPath]);

  const renderContent = () => {
    const cleanPath = normalizeRoutePath(currentPath);

    // 1. Custom Bridal landing route
    if (cleanPath === '/custom-bridal') {
      return <CustomBridalLandingPage />;
    }

    // 2. Services directory route
    if (cleanPath === '/services') {
      return <ServicesPageView />;
    }

    // 3. Blog & Journal Single Post route
    const blogSlug = extractBlogSlug(cleanPath);
    if (blogSlug) {
      return <BlogPageView slug={blogSlug} />;
    }

    // 4. Blog & Journal Index route
    if (cleanPath === '/blog' || cleanPath === '/journal') {
      return <BlogPageView />;
    }

    // 4. Default: Homepage
    return (
      <>
        {/* 1. Decluttered Hero Section with 1 WhatsApp Button */}
        <HeroSection />

        {/* 2. Tailoring Discipline & Quality Banner */}
        <SpecializationBanner />

        {/* 3. Master Cutter Abdul Ghaffar & Size Chart */}
        <AboutTailoringSection />

        {/* 4. Saree Draping & Blouse Architecture Guide */}
        <SareeDrapingGuideSection />

        {/* 5. Moon Tower Studio Location & Doorstep Pickup Coverage */}
        <LocationMapSection />

        {/* 6. Lahore Atelier Client Reviews & LocalBusiness ReviewSchema */}
        <TestimonialsSection />

        {/* 7. Programmatic Bridal Tailoring FAQs & FAQPage Grounding */}
        <BridalFaqSection />

        {/* 8. Digital Measurement Profile Lead Magnet Banner */}
        <MeasurementLeadMagnet sourceContext="homepage" />
      </>
    );
  };

  return (
    <>
      <MainLayout>{renderContent()}</MainLayout>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
