import { sanityFetch } from '@/sanity/lib/live'
import { EVENT_QUERY } from '@/sanity/queries/event'
import ProgramClient from '../../../app/program/page'

export default async function Program() {
  const { data: events } = await sanityFetch({
    query: EVENT_QUERY,
  })

  console.log('Events from server:', events)
  console.log('Events length:', events?.length)
  return <ProgramClient events={events || []} />
}
