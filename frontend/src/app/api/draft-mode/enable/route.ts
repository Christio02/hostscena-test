import { client } from '@/sanity/lib/client'
import { serverToken } from '@/sanity/lib/token'
import { defineEnableDraftMode } from 'next-sanity/draft-mode'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: serverToken }),
})
