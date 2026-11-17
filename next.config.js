/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,

  // Canonicalization & 301 Permanent Redirects
  async redirects() {
    return [
      // 1. Apex to www Canonicalization (https://sartor.pk -> https://www.sartor.pk)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'sartor.pk',
          },
        ],
        destination: 'https://www.sartor.pk/:path*',
        permanent: true,
      },
      // 2. HTTP to HTTPS Redirection (Protocol Canonicalization via Edge Header)
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.sartor.pk/:path*',
        permanent: true,
      },
      // 3. Trailing Slash Normalization (Remove trailing slashes except for root)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },

  // Security and SEO Header Configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Link',
            value: '<https://yrbsfbkjokmsdfppukeh.supabase.co>; rel=preconnect; crossorigin, <https://vitals.vercel-insights.com>; rel=preconnect; crossorigin',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    // Permit static /images/** and public/** assets with or without query strings in Next.js 15/16
    localPatterns: [
      {
        pathname: '/images/**',
      },
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.sartor.pk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sartor.pk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
