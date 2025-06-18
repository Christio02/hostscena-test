import type Event from '@/interfaces/event'
import type { HomeProps } from '@/interfaces/home'
import News from '@/interfaces/news'
import { sanityFetch } from '@/sanity/lib/live'
import { SINGLE_CONTACT_INFO_QUERY } from '@/sanity/queries/contactInfo'
import { EVENT_QUERY } from '@/sanity/queries/event'
import { SINGLE_HOME_QUERY } from '@/sanity/queries/home'
import { SINGLE_MAP_QUERY } from '@/sanity/queries/map'
import { ALL_NEWS_QUERY } from '@/sanity/queries/news'
import { TICKETS_QUERY } from '@/sanity/queries/tickets'
import { revalidateTag, unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

// caching

/**
 * Generic cache function for Sanity queries
 * @param query - GROQ query string
 * @param key - Unique cache key
 * @param revalidate - Cache duration in seconds
 * @param tags - Additional cache tags for invalidation
 */
export async function createSanityCache<T>(
  query: string,
  key: string,
  revalidate: number = 60,
  tags: string[] = [],
): Promise<T | null> {
  const { isEnabled: isDraftMode } = await draftMode()

  // bypass caching
  if (isDraftMode) {
    try {
      const { data } = await sanityFetch({ query })
      return data || null
    } catch (error) {
      console.error(`Error fetching ${key} in draft mode:`, error)
      return null
    }
  }

  const cachedFn = unstable_cache(
    async () => {
      try {
        const { data } = await sanityFetch({ query })
        return data || null
      } catch (error) {
        console.error(`Error fetching ${key}:`, error)
        return null
      }
    },
    [key],
    {
      revalidate,
      tags: [key, 'sanity', ...tags],
    },
  )

  return cachedFn()
}

export async function invalidateSanityCache(tags: string | string[]) {
  const tagsArray = Array.isArray(tags) ? tags : [tags]
  tagsArray.forEach((tag) => revalidateTag(tag))
}

export async function invalidateAllSanityCache() {
  revalidateTag('sanity')
}

export async function getCachedEvents(): Promise<Event[]> {
  const result = await createSanityCache<Event[]>(EVENT_QUERY, 'events', 60, ['events'])
  return result || []
}

export async function getCachedHome(): Promise<HomeProps | null> {
  return createSanityCache<HomeProps>(SINGLE_HOME_QUERY, 'home', 300, ['home'])
}

export async function getCachedNews(): Promise<News[]> {
  const result = await createSanityCache<News[]>(ALL_NEWS_QUERY, 'news', 120, ['news'])
  return result || []
}

export async function getCachedContactInfo() {
  return createSanityCache(SINGLE_CONTACT_INFO_QUERY, 'contact-info', 600, ['contact'])
}

export async function getCachedTickets() {
  return createSanityCache(TICKETS_QUERY, 'tickets', 300, ['tickets'])
}

export async function getCachedMap() {
  return createSanityCache(SINGLE_MAP_QUERY, 'map', 600, ['map'])
}

export async function getCachedEventBySlug(slug: string): Promise<Event | null> {
  const events = await getCachedEvents()
  return events.find((event: Event) => event.slug.current === slug) || null
}

export async function getCachedNewsBySlug(slug: string): Promise<News | null> {
  const news = await getCachedNews()
  return news.find((item: News) => item.slug.current === slug) || null
}

export function createCachedQuery<T>(query: string, key: string, revalidate: number = 60) {
  return async (): Promise<T | null> => {
    return createSanityCache<T>(query, key, revalidate)
  }
}
