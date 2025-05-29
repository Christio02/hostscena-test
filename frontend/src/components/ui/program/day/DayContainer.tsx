import DayGrid from './DayGrid'
import events from '@/mockdata/events'
import BorderTitleBar from '@/components/ui/borderTitleBar/BorderTitleBar'
import { groupEventsByDate } from '@/utils/groupEventsByDate'
import DateBadge from '@/components/ui/program/dateBadge/DateBadge'

type Props = { onSwitch: () => void }

export default function DayContainer({ onSwitch }: Props) {
  const grouped = groupEventsByDate(events)
  const dates = Object.keys(grouped).sort()

  return (
    <div>
      <BorderTitleBar title="Dagsoversikt" linkText="Ukeoversikt" onClick={onSwitch} />

      {/* Navigation Badges */}
      <div className="flex justify-center gap-[20px] py-[20px]">
        {dates.map((date) => (
          <a key={date} href={`#${date}`}>
            <DateBadge className="text-secondary px-[20px] btn" date={date} />
          </a>
        ))}
      </div>

      {dates.map((date) => {
        const d = new Date(date)
        const formatted =
          `${d.toLocaleDateString('no-NO', { weekday: 'long' })} ${d.getDate()}.${d.getMonth() + 1}`.toLowerCase()
        const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1)

        return (
          <section key={date} id={date} className="flex flex-col  ">
            <BorderTitleBar title={capitalized} />
            <DayGrid events={grouped[date]} />
          </section>
        )
      })}
    </div>
  )
}
