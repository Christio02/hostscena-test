import DayCard from './DayCard'
import type Event from '@/interfaces/event'

interface Props {
  events: Event[]
}

export default function DayGrid({ events }: Props) {
  const sorted = [...events].sort((a, b) => a.startTime.localeCompare(b.startTime))

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-[20px] px-[20px] py-[10px]">
      {sorted.map((event) => (
        <DayCard key={event.slug} event={event} />
      ))}
    </div>
  )
}
