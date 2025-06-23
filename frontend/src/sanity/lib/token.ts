export const serverToken = process.env.SANITY_API_READ_TOKEN
export const browserToken = process.env.NEXT_PUBLIC_SANITY_LIVE_TOKEN

if (!serverToken) {
  console.warn('Missing SANITY_API_READ_TOKEN. Draft mode and server-side previews might not work.')
}

if (!browserToken) {
  console.warn('Missing NEXT_PUBLIC_SANITY_LIVE_TOKEN. Client-side live updates will not work.')
}
