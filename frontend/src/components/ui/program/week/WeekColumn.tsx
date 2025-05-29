import WeekCell from './WeekCell'
import type Event from '@/interfaces/event'

interface Props {
    date: string
    events: Event[]
}



export default function WeekColumn({ date, events }: Props) {
    const formattedDate = new Date(date)
    const weekday = formattedDate.toLocaleDateString('no-NO', { weekday: 'short' }).toUpperCase()
    const day = formattedDate.getDate().toString().padStart(2, '0')
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0')

    return (
        <div className="flex flex-col w-full gap-[20px] py-[20px]">
            <div className="min-w-[256px] bg-secondary text-primary text-center text-[1.5rem] font-wittgenstein py-[10px] uppercase">
                {`${weekday} ${day}.${month}`}
            </div>
            <div>
                {events
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((event, index) => (
                        <WeekCell
                            key={index}
                            event={event}
                            isLast={index === events.length - 1}
                        />
                    ))}
            </div>
        </div>
    )
}