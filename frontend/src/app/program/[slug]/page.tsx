import EventDetail from '@/components/layout/event/EventDetail'
import events from '@/mockdata/events'
import { notFound } from 'next/navigation'

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = events.find((e) => e.slug === slug)

  if (!event) return notFound()

  return <EventDetail event={event} />
}
