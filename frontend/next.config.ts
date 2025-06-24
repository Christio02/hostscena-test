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
        source: '/api/draft-mode/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            // must exactly match your Studio origin (no wildcards!)
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
      {
        // still need to let Studio iframe your pages
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://hostscena.sanity.studio",
          },
        ],
      },
    ]
  },
}

export default nextConfig
