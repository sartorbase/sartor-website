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
import { BlogPageView } from './components/pages/BlogPageView';
import { CustomBridalLandingPage } from './components/pages/CustomBridalLandingPage';
import { ServicesPageView } from './components/pages/ServicesPageView';

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

        {/* 6. Digital Measurement Profile Lead Magnet Banner */}
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
