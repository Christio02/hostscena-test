import type Event from '@/interfaces/event'
import type { HomeProps } from '@/interfaces/home'
import News from '@/interfaces/news'
import { sanityFetch } from '@/sanity/lib/live'
import { SINGLE_CONTACT_INFO_QUERY } from '@/sanity/queries/contactInfo'
import { EVENT_QUERY } from '@/sanity/queries/event'
import { SINGLE_HOME_QUERY } from '@/sanity/queries/home'
import { SINGLE_MAP_QUERY } from '@/sanity/queries/map'
import { ALL_NEWS_QUERY, NEWS_QUERY } from '@/sanity/queries/news'
import { TICKETS_QUERY } from '@/sanity/queries/tickets'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

// Cached Events Query
export async function getCachedEvents(): Promise<Event[]> {
  const { isEnabled: isDraftMode } = await draftMode()

  const cachedFn = unstable_cache(
    async () => {
      try {
        const { data } = await sanityFetch({
          query: EVENT_QUERY,
        })
        return data || []
      } catch (error) {
        console.error('Error fetching events:', error)
        return []
      }
    },
    ['events', isDraftMode ? 'draft' : 'published'],
    {
      revalidate: isDraftMode ? false : 60, // No cache in draft mode
      tags: ['events', 'sanity'],
    },
  )

  return cachedFn()
}

// Cached Home Query
export async function getCachedHome(): Promise<HomeProps | null> {
  const { isEnabled: isDraftMode } = await draftMode()

  const cachedFn = unstable_cache(
    async () => {
      try {
        const { data } = await sanityFetch({ query: SINGLE_HOME_QUERY })
        return data || null
      } catch (error) {
        console.error('Error fetching home:', error)
        return null
      }
    },
    ['home', isDraftMode ? 'draft' : 'published'],
    {
      revalidate: isDraftMode ? false : 300,
      tags: ['home', 'sanity'],
    },
  )

  return cachedFn()
}

// Cached News Query
export async function getCachedNews(): Promise<News[]> {
  const { isEnabled: isDraftMode } = await draftMode()

  const cachedFn = unstable_cache(
    async () => {
      try {
        const { data } = await sanityFetch({ query: ALL_NEWS_QUERY })
        return data || []
      } catch (error) {
        console.error('Error fetching news:', error)
        return []
      }
    },
    ['news', isDraftMode ? 'draft' : 'published'],
    {
      revalidate: isDraftMode ? false : 120,
      tags: ['news', 'sanity'],
    },
  )

  return cachedFn()
}

// Cached Contact Info Query
export async function getCachedContactInfo() {
  const { isEnabled: isDraftMode } = await draftMode()

  const cachedFn = unstable_cache(
    async () => {
      try {
        const { data } = await sanityFetch({ query: SINGLE_CONTACT_INFO_QUERY })
        return data || null
      } catch (error) {
        console.error('Error fetching contact info:', error)
        return null
      }
    },
    ['contact-info', isDraftMode ? 'draft' : 'published'],
    {
      revalidate: isDraftMode ? false : 600,
      tags: ['contact', 'sanity'],
    },
  )

  return cachedFn()
}

// Cached Tickets Query
export async function getCachedTickets() {
  const { isEnabled: isDraftMode } = await draftMode()

  const cachedFn = unstable_cache(
    async () => {
      try {
        const { data } = await sanityFetch({ query: TICKETS_QUERY })
        return data || null
      } catch (error) {
        console.error('Error fetching tickets:', error)
        return null
      }
    },
    ['tickets', isDraftMode ? 'draft' : 'published'],
    {
      revalidate: isDraftMode ? false : 300,
      tags: ['tickets', 'sanity'],
    },
  )

  return cachedFn()
}

// Cached Map Query
export async function getCachedMap() {
  const { isEnabled: isDraftMode } = await draftMode()

  const cachedFn = unstable_cache(
    async () => {
      try {
        const { data } = await sanityFetch({ query: SINGLE_MAP_QUERY })
        return data || null
      } catch (error) {
        console.error('Error fetching map:', error)
        return null
      }
    },
    ['map', isDraftMode ? 'draft' : 'published'],
    {
      revalidate: isDraftMode ? false : 600,
      tags: ['map', 'sanity'],
    },
  )

  return cachedFn()
}

// Utility function to get a specific event by slug
export async function getCachedEventBySlug(slug: string): Promise<Event | null> {
  const events = await getCachedEvents()
  return events.find((event: Event) => event.slug.current === slug) || null
}

// Utility function to get a specific news item by slug
export async function getCachedNewsBySlug(slug: string): Promise<News | null> {
  const news = await getCachedNews()
  return news.find((item: News) => item.slug.current === slug) || null
}

// Generic cache function for custom queries
export function createCachedQuery<T>(query: string, key: string, revalidate: number = 60) {
  return async (): Promise<T | null> => {
    const { isEnabled: isDraftMode } = await draftMode()

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
      [key, isDraftMode ? 'draft' : 'published'],
      {
        revalidate: isDraftMode ? false : revalidate,
        tags: [key, 'sanity'],
      },
    )

    return cachedFn()
  }
}
