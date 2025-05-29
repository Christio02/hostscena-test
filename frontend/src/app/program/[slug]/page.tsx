import { notFound } from 'next/navigation'
import events from '@/mockdata/events'
import EventDetail from "@/components/layout/event/EventDetail"

export default async function EventPage({ params }: { params: { slug: string } }) {
    const event = events.find(e => e.slug === params.slug)

    if (!event) return notFound()

    return <EventDetail event={event} />
}