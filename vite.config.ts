import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'logo.webp',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-maskable-512x512.png',
        'digital-measurements-guide.webp',
      ],
      manifest: {
        id: '/',
        name: 'SARTOR Bespoke Atelier Lahore',
        short_name: 'SARTOR',
        description: 'Bespoke Pakistani women’s tailoring atelier in Moon Tower, Model Town, Lahore. Offline biometric measurement guide & fitting profiles.',
        theme_color: '#0c0a09',
        background_color: '#0c0a09',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        categories: ['lifestyle', 'shopping'],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        globIgnores: ['**/*-640w.webp', '**/*-1080w.webp'],
        runtimeCaching: [
          {
            // Cache measurement guide images and service showcases offline
            urlPattern: ({ url }) =>
              /\.(?:png|jpg|jpeg|svg|webp|avif)$/i.test(url.pathname) ||
              url.pathname === '/_next/image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'sartor-images-cache',
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Navigation fallback for offline support
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'sartor-pages-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  define: {
    'process.env.__NEXT_IMAGE_OPTS': JSON.stringify({
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [32, 48, 64, 96, 128, 256, 384],
      path: '/_next/image',
      loader: 'default',
      dangerouslyAllowSVG: false,
      unoptimized: false,
      qualities: [75, 80, 85, 90],
      localPatterns: [
        { pathname: '/images/**' },
        { pathname: '/**' },
      ],
      remotePatterns: [
        { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
        { protocol: 'https', hostname: 'www.sartor.pk', pathname: '/**' },
        { protocol: 'https', hostname: 'sartor.pk', pathname: '/**' },
      ],
    }),
    'process.env.NEXT_RUNTIME': JSON.stringify(''),
    'process.env.NEXT_DEPLOYMENT_ID': JSON.stringify(''),
    'process.env.NEXT_SUPPORTS_IMMUTABLE_ASSETS': JSON.stringify(''),
    'process.platform': JSON.stringify('browser'),
  },
  optimizeDeps: {
    include: ['next/image'],
    rolldownOptions: {
      transform: {
        define: {
          'process.env.__NEXT_IMAGE_OPTS': JSON.stringify({
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
            imageSizes: [32, 48, 64, 96, 128, 256, 384],
            path: '/_next/image',
            loader: 'default',
            dangerouslyAllowSVG: false,
            unoptimized: false,
            qualities: [75, 80, 85, 90],
            localPatterns: [
              { pathname: '/images/**' },
              { pathname: '/**' },
            ],
            remotePatterns: [
              { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
              { protocol: 'https', hostname: 'www.sartor.pk', pathname: '/**' },
              { protocol: 'https', hostname: 'sartor.pk', pathname: '/**' },
            ],
          }),
          'process.env.NEXT_RUNTIME': JSON.stringify(''),
          'process.env.NEXT_DEPLOYMENT_ID': JSON.stringify(''),
          'process.env.NEXT_SUPPORTS_IMMUTABLE_ASSETS': JSON.stringify(''),
          'process.platform': JSON.stringify('browser'),
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
    hmr: false,
    ws: false,
  },
  preview: {
    port: 3000,
    host: true,
  },
});
