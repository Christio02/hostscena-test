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
            // the order here doesn’t matter—just make sure you cover everything:
            value: [
              // allow your app & sanity CDN
              "default-src 'self' https://cdn.sanity.io",
              // allow the Sanity Content-Lake & socket
              "connect-src 'self' https://jbwzfx7e.api.sanity.io wss://jbwzfx7e.api.sanity.io",
              // allow fonts & styles if you need them
              "font-src 'self' https://fonts.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // frame-ancestors lets Studio iframe you
              "frame-ancestors 'self' https://hostscena.sanity.studio",
            ].join('; '),
          },
        ],
      },
      {
        // still need CORS on your draft-mode route
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
