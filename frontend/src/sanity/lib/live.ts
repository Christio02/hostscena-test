import { defineLive } from 'next-sanity'
import { client } from './client'
import { browserToken, serverToken } from './token'

export const { sanityFetch, SanityLive } = defineLive({
  client,

  browserToken: browserToken,
  serverToken: serverToken,
})
