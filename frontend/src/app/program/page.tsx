import ProgramClient from '@/components/ui/program/ProgramClient'
import { getCachedEvents } from '@/lib/sanity-cache'

export default async function ProgramPage() {
  const events = await getCachedEvents()
  return <ProgramClient events={events} />
}
