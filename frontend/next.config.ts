import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              // Allow your app & sanity CDN
              "default-src 'self' https://cdn.sanity.io",
              // CRITICAL: Allow inline scripts for Next.js and Sanity
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io",
              // Allow WebSocket connections to Sanity
              "connect-src 'self' https://*.api.sanity.io wss://*.api.sanity.io https://jbwzfx7e.api.sanity.io wss://jbwzfx7e.api.sanity.io",
              // Allow fonts & styles
              "font-src 'self' https://fonts.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Allow images from Sanity CDN
              "img-src 'self' data: https://cdn.sanity.io",
              // Frame ancestors for Studio iframe
              "frame-ancestors 'self' https://hostscena.sanity.studio",
              // Allow object and embed if needed
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/api/draft-mode/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://hostscena.sanity.studio',
          },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}

export default nextConfig
