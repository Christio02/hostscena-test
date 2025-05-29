import DayGrid from './DayGrid'
import events from '@/mockdata/events'
import BorderTitleBar from "@/components/ui/borderTitleBar/BorderTitleBar";
import {groupEventsByDate} from "@/utils/groupEventsByDate";

export default function DayContainer() {
    const grouped = groupEventsByDate(events)
    const dates = Object.keys(grouped).sort()

    return (
        <div className="">
            {dates.map((date) => {
                const d = new Date(date)
                const formatted = `${d.toLocaleDateString('no-NO', { weekday: 'long' })} ${d.getDate()}.${(d.getMonth() + 1)}`.toLowerCase()
                const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1)

                return (
                    <div key={date} className="flex flex-col">
                        <BorderTitleBar title={capitalized} />
                        <DayGrid events={grouped[date]} />
                    </div>
                )
            })}
        </div>
    )
}