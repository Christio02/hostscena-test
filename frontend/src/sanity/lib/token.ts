import 'server-only'

export const token = process.env.SANITY_API_VIEWER_TOKEN

if (!token) {
  throw new Error('Missing SANITY_API_VIEWER_TOKEN')
}
