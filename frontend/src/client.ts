import { createClient } from '@sanity/client'

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || '2025-06-02',
  useCdn: process.env.SANITY_USE_CDN === 'true',
}

export const sanityClient = createClient(sanityConfig)
