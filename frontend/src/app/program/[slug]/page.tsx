import EventDetail from '@/components/layout/event/EventDetail'
import Event from '@/interfaces/event'
import { sanityFetch } from '@/sanity/lib/live'
import { EVENT_QUERY } from '@/sanity/queries/event'
import { notFound } from 'next/navigation'

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: events } = await sanityFetch({
    query: EVENT_QUERY,
  })
  const event = events.find((e: Event) => e.slug === slug)

  if (!event) return notFound()

  return <EventDetail event={event} />
}
