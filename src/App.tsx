/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HeroSection } from './components/organisms/HeroSection';
import { SpecializationBanner } from './components/organisms/SpecializationBanner';
import { AboutTailoringSection } from './components/organisms/AboutTailoringSection';
import { LocationMapSection } from './components/organisms/LocationMapSection';
import { ServiceShowcase } from './components/organisms/ServiceShowcase';
import { SizeChartGuide } from './components/organisms/SizeChartGuide';
import { TestimonialsSection } from './components/organisms/TestimonialsSection';
import { MainLayout } from './components/templates/MainLayout';
import CustomBridalLandingPage from '../app/custom-bridal/page';
import { BlogPageView } from './components/pages/BlogPageView';
import { navigateTo } from './utils/navigation';

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    // 1. Check for legacy hash URLs and seamlessly migrate them to canonical pathnames
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        const legacySlug = hash.replace('#blog/', '').trim();
        if (legacySlug) {
          window.history.replaceState(null, '', `/blog/${legacySlug}`);
          setCurrentPath(`/blog/${legacySlug}`);
        }
      } else if (hash === '#blog') {
        window.history.replaceState(null, '', '/blog');
        setCurrentPath('/blog');
      } else if (hash === '#custom-bridal') {
        window.history.replaceState(null, '', '/custom-bridal');
        setCurrentPath('/custom-bridal');
      }
    }

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

  const pathname = currentPath.toLowerCase();
  const isCustomBridalRoute = pathname === '/custom-bridal' || pathname.startsWith('/custom-bridal/');
  const isBlogRoute = pathname === '/blog' || pathname.startsWith('/blog/');

  let activeBlogSlug: string | null = null;
  if (pathname.startsWith('/blog/')) {
    activeBlogSlug = pathname.replace('/blog/', '').split('/')[0].split('?')[0].split('#')[0];
  }

  if (isBlogRoute) {
    return (
      <div className="relative">
        <BlogPageView
          initialSlug={activeBlogSlug}
          onNavigateHome={() => navigateTo('/')}
          onNavigateCustomBridal={() => navigateTo('/custom-bridal')}
        />
        <Analytics />
        <SpeedInsights />
      </div>
    );
  }

  if (isCustomBridalRoute) {
    return (
      <div className="relative">
        <div className="bg-stone-900 border-b border-stone-800 px-4 py-2 text-xs flex items-center justify-between z-50 sticky top-0">
          <span className="text-amber-400 font-mono font-bold">
            ⚡ SARTOR Overseas Bridal Route (/custom-bridal)
          </span>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            className="text-stone-300 hover:text-white underline underline-offset-4 cursor-pointer"
          >
            ← Back to Main Studio Home
          </a>
        </div>
        <CustomBridalLandingPage />
        <Analytics />
        <SpeedInsights />
      </div>
    );
  }

  return (
    <MainLayout>
      {/* 1. Hero Experience: Women's Atelier, Services, Transparent Rates (PKR) & Outfit Photos */}
      <HeroSection />

      {/* 2. Specialization Section: Exclusively Crafting Bespoke Women's Fashion & Online Tailoring */}
      <SpecializationBanner />

      {/* 3. About Our Tailoring Services: Local SEO keywords, Lahore tailoring, nationwide delivery */}
      <AboutTailoringSection />

      {/* 3. ServiceShowcase: Animated cycling gallery of finished tailoring results */}
      <ServiceShowcase />

      {/* 4. Client Testimonials: Authentic social proof from women clients across Lahore */}
      <TestimonialsSection />

      {/* 5. Pakistani Brand Size Chart (Khaadi, Sapphire, Sana Safinaz, Maria.B Standard) */}
      <SizeChartGuide />

      {/* 6. Moon Tower Studio Location, Google Maps & Directions */}
      <LocationMapSection />

      {/* Vercel Web Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </MainLayout>
  );
}
