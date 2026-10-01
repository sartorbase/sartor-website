import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/templates/MainLayout';
import { HeroSection } from './components/organisms/HeroSection';
import { SpecializationBanner } from './components/organisms/SpecializationBanner';
import { ServiceShowcase } from './components/organisms/ServiceShowcase';
import { AboutTailoringSection } from './components/organisms/AboutTailoringSection';
import { LocationMapSection } from './components/organisms/LocationMapSection';
import { BlogPageView } from './components/pages/BlogPageView';
import { CustomBridalLandingPage } from './components/pages/CustomBridalLandingPage';

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

    // 2. Blog Single Post route
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
      return <BlogPageView slug={slug} />;
    }

    // 3. Blog Index route
    if (currentPath === '/blog' || currentPath === '/blog/') {
      return <BlogPageView />;
    }

    // 4. Default: Homepage
    return (
      <>
        {/* 1. Decluttered Hero Section with 1 WhatsApp Button */}
        <HeroSection />

        {/* 2. Tailoring Discipline & Quality Banner */}
        <SpecializationBanner />

        {/* 3. Masterpiece Portfolio Showcase */}
        <ServiceShowcase />

        {/* 4. Master Cutter Abdul Ghaffar & Size Chart */}
        <AboutTailoringSection />

        {/* 5. Moon Tower Studio Location & Doorstep Pickup Coverage */}
        <LocationMapSection />
      </>
    );
  };

  return <MainLayout>{renderContent()}</MainLayout>;
}

export default App;
