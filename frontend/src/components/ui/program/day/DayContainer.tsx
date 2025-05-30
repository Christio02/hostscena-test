import { useEffect, useState } from 'react'
import DayGrid from './DayGrid'
import events from '@/mockdata/events'
import BorderTitleBar from '@/components/ui/borderTitleBar/BorderTitleBar'
import { groupEventsByDate } from '@/utils/groupEventsByDate'
import DateBadge from '@/components/ui/program/dateBadge/DateBadge'
import { LiaLongArrowAltRightSolid, LiaLongArrowAltLeftSolid } from 'react-icons/lia'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'

type Props = { onSwitch: () => void }

export default function DayContainer({ onSwitch }: Props) {
  const grouped = groupEventsByDate(events)
  const dates = Object.keys(grouped).sort()

  const [hasMounted, setHasMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0))
  const handleNext = () => setActiveIndex((prev) => Math.min(prev + 1, dates.length - 1))

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    <div>
      <BorderTitleBar title="Dagsoversikt" linkText="Ukeoversikt" onClick={onSwitch} />

      {/* Desktop badges */}
      <div className="hidden tablet:flex justify-center gap-[20px] py-[20px]">
        {dates.map((date) => (
          <a key={date} href={`#${date}`}>
            <DateBadge className="text-secondary px-[20px] btn" date={date} />
          </a>
        ))}
      </div>

      {/* Mobile slider nav */}
      <div className="block tablet:hidden px-[20px]">
        <div className="flex items-center justify-center gap-[40px] border-b border-secondary pb-[20px]">
          <button onClick={handlePrev} disabled={activeIndex === 0}>
            <LiaLongArrowAltLeftSolid size={44} />
          </button>
          <p className="text-h4 text-center text-nowrap">
            {capitalizeFirstLetter(
              new Date(dates[activeIndex]).toLocaleDateString('no-NO', {
                weekday: 'long',
                day: 'numeric',
                month: 'numeric',
              }),
            )}
          </p>
          <button onClick={handleNext} disabled={activeIndex === dates.length - 1}>
            <LiaLongArrowAltRightSolid size={44} />
          </button>
        </div>
      </div>

      {/* Render days */}
      <div>
        {dates.map((date, index) => {
          const d = new Date(date)
          const formatted = `${d.toLocaleDateString('no-NO', { weekday: 'long' })} ${d.getDate()}.${
            d.getMonth() + 1
          }`.toLowerCase()
          const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1)

          return (
            <section
              key={date}
              id={date}
              className={`flex flex-col transition-all duration-300 ${
                index === activeIndex || (typeof window !== 'undefined' && window.innerWidth >= 640)
                  ? 'block'
                  : 'hidden'
              }`}
            >
              <div className="hidden tablet:block">
                <BorderTitleBar title={capitalized} borderTop={false} />
              </div>
              <DayGrid events={grouped[date]} />
            </section>
          )
        })}
      </div>
    </div>
  )
}
