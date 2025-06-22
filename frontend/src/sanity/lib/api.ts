function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage)
  return v
}

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing env var: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing env var: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

/**
 * see https://www.sanity.io/docs/api-versioning
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-03'

export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
// token.ts
export const serverToken = process.env.SANITY_API_READ_TOKEN! // only on the server
export const browserToken = process.env.NEXT_PUBLIC_SANITY_LIVE_TOKEN! // in the client
