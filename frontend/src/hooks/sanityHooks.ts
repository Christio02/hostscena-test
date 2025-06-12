import { HomeProps } from '@/interfaces/home'
import { sanityFetch } from '@/sanity/lib/live'
import {
  CONTACT_PERSONS_QUERY,
  SINGLE_CONTACT_INFO_QUERY,
  SOCIAL_LINKS_QUERY,
} from '@/sanity/queries/contactInfo'
import { EVENT_BY_ID_QUERY, EVENT_QUERY, UPCOMING_EVENTS_QUERY } from '@/sanity/queries/event'
import {
  BACKGROUND_VIDEO_QUERY,
  HOME_HEADER_QUERY,
  IMAGE_SNAKE_QUERY,
  SINGLE_HOME_QUERY,
} from '@/sanity/queries/home'
import { SINGLE_MAP_QUERY } from '@/sanity/queries/map'
import { ALL_NEWS_QUERY, NEWS_DETAIL_QUERY, NEWS_QUERY } from '@/sanity/queries/news'
import { TICKETS_QUERY } from '@/sanity/queries/tickets'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

// News hooks
export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: () => sanityFetch({ query: NEWS_QUERY }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useNewsDetail(slug: string) {
  return useQuery({
    queryKey: ['news', slug],
    queryFn: () => sanityFetch({ query: NEWS_DETAIL_QUERY, params: { slug } }),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}

export function useAllNews() {
  return useQuery({
    queryKey: ['news', 'all'],
    queryFn: () => sanityFetch({ query: ALL_NEWS_QUERY }),
    staleTime: 5 * 60 * 1000,
  })
}

// Event hooks
export function useAllEvents() {
  return useQuery({
    queryKey: ['events', 'all'],
    queryFn: () => sanityFetch({ query: EVENT_QUERY }),
    staleTime: 5 * 60 * 1000,
  })
}

export function useEventById(id: string) {
  return useQuery({
    queryKey: ['events', 'id', id],
    queryFn: () => sanityFetch({ query: EVENT_BY_ID_QUERY, params: { id } }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useUpcomingEvents() {
  return useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: () => sanityFetch({ query: UPCOMING_EVENTS_QUERY }),
    staleTime: 2 * 60 * 1000, // 2 minutes for upcoming events
  })
}

export function useHome(): UseQueryResult<HomeProps, Error> {
  return useQuery<HomeProps, Error>({
    queryKey: ['home'],
    queryFn: async (): Promise<HomeProps> => {
      const res = await sanityFetch({
        query: SINGLE_HOME_QUERY,
      })
      return res.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useHomeHeader() {
  return useQuery({
    queryKey: ['home', 'header'],
    queryFn: () => sanityFetch({ query: HOME_HEADER_QUERY }),
    staleTime: 10 * 60 * 1000,
  })
}

export function useBackgroundVideo() {
  return useQuery({
    queryKey: ['home', 'background-video'],
    queryFn: () => sanityFetch({ query: BACKGROUND_VIDEO_QUERY }),
    staleTime: 10 * 60 * 1000,
  })
}

export function useImageSnake() {
  return useQuery({
    queryKey: ['home', 'image-snake'],
    queryFn: () => sanityFetch({ query: IMAGE_SNAKE_QUERY }),
    staleTime: 10 * 60 * 1000,
  })
}

export function useContactPersons() {
  return useQuery({
    queryKey: ['contact-persons'],
    queryFn: () => sanityFetch({ query: CONTACT_PERSONS_QUERY }),
    staleTime: 30 * 60 * 1000, // 30 minutes for contact info
  })
}

export function useSingleContactInfo() {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: () => sanityFetch({ query: SINGLE_CONTACT_INFO_QUERY }),
    staleTime: 30 * 60 * 1000,
  })
}

export function useSocialLinks() {
  return useQuery({
    queryKey: ['social-links'],
    queryFn: () => sanityFetch({ query: SOCIAL_LINKS_QUERY }),
    staleTime: 30 * 60 * 1000,
  })
}

export function useMap() {
  return useQuery({
    queryKey: ['map'],
    queryFn: () => sanityFetch({ query: SINGLE_MAP_QUERY }),
    staleTime: 30 * 60 * 1000,
  })
}

export function useTickets() {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: () => sanityFetch({ query: TICKETS_QUERY }),
    staleTime: 5 * 60 * 1000,
  })
}
