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
import { buildLocationAndDiasporaGraph, buildPrimaryBreadcrumbSchema } from './seo/geoSchemas';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('app-navigate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('app-navigate', handleRouteChange);
    };
  }, []);

  // Synchronize Lahore Location & UK/USA/Canada/UAE Diaspora Schema across primary SPA routes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const normalized = currentPath.toLowerCase().replace(/\/+$/, '') || '/';
    const isPrimary =
      normalized === '/' ||
      normalized === '/services' ||
      normalized === '/custom-bridal' ||
      normalized === '/blog' ||
      normalized === '/journal';

    if (!isPrimary) {
      const primaryBcEl = document.getElementById('primary-breadcrumb-structured-data');
      if (primaryBcEl) primaryBcEl.remove();
      return;
    }

    const canonicalUrl = `https://sartor.pk${normalized === '/' ? '/' : normalized}`;
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonicalUrl);
    }

    const scriptId = 'location-diaspora-structured-data';
    let scriptEl = document.getElementById(scriptId);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(buildLocationAndDiasporaGraph(canonicalUrl));

    const bcScriptId = 'primary-breadcrumb-structured-data';
    let bcEl = document.getElementById(bcScriptId);
    if (!bcEl) {
      bcEl = document.createElement('script');
      bcEl.id = bcScriptId;
      bcEl.setAttribute('type', 'application/ld+json');
      document.head.appendChild(bcEl);
    }
    bcEl.textContent = JSON.stringify(buildPrimaryBreadcrumbSchema(canonicalUrl));
  }, [currentPath]);

  const renderContent = () => {
    // 1. Custom Bridal landing route
    if (currentPath === '/custom-bridal' || currentPath === '/custom-bridal/') {
      return <CustomBridalLandingPage />;
    }

    // 2. Services directory route
    if (currentPath === '/services' || currentPath === '/services/') {
      return <ServicesPageView />;
    }

    // 3. Blog & Journal Single Post route
    if (currentPath.startsWith('/blog/') || currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace(/^\/(blog|journal)\//, '').replace(/\/$/, '');
      return <BlogPageView slug={slug} />;
    }

    // 4. Blog & Journal Index route
    if (
      currentPath === '/blog' ||
      currentPath === '/blog/' ||
      currentPath === '/journal' ||
      currentPath === '/journal/'
    ) {
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
