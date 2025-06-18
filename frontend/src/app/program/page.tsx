import ProgramClient from '@/components/ui/program/ProgramClient'
import { sanityFetch } from '@/sanity/lib/live'
import { EVENT_QUERY } from '@/sanity/queries/event'

export default async function ProgramPage() {
  try {
    const { data: events } = await sanityFetch({
      query: EVENT_QUERY,
    })

    return <ProgramClient events={events || []} />
  } catch (error) {
    console.error('💥 Error fetching events:', error)
    return <ProgramClient events={[]} />
  }
}
