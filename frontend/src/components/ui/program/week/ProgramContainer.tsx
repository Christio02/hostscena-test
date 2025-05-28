import ProgramColumn from "@/components/ui/program/week/ProgramColumn";
import events from '@/mockdata/events'
import type Event from '@/interfaces/event'
import BorderTitleBar from "@/components/ui/borderTitleBar/BorderTitleBar";

const groupEventsByDate = (events: Event[]) => {
    return events.reduce((acc, event) => {
        if (!acc[event.date]) acc[event.date] = []
        acc[event.date].push(event)
        return acc
    }, {} as Record<string, Event[]>)
}

export default function ProgramContainer() {
    const grouped = groupEventsByDate(events)
    const dates = Object.keys(grouped).sort()

    return (
        <>
            <BorderTitleBar title="Ukeoversikt" linkText="Dag for dag" linkUrl="/" />
            <div className="overflow-x-scroll">
        <div className="flex gap-[20px] px-[40px] w-fit">
            {dates.map((date) => (
                <ProgramColumn key={date} date={date} events={grouped[date]} />
            ))}
        </div>
            </div>
        </>
    )
}