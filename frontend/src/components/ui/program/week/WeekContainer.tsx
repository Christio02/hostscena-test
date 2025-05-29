import WeekColumn from "@/components/ui/program/week/WeekColumn";
import events from '@/mockdata/events'
import BorderTitleBar from "@/components/ui/borderTitleBar/BorderTitleBar";
import {groupEventsByDate} from "@/utils/groupEventsByDate";

interface Props {
    hasLink?: boolean
}

export default function WeekContainer({ hasLink = true }: Props) {
    const grouped = groupEventsByDate(events)
    const dates = Object.keys(grouped).sort()

    return (
        <>
            {hasLink ? (
                <BorderTitleBar title="Ukeoversikt" linkText="Dag for dag" linkUrl="/" />
            ) : (
                <BorderTitleBar title="Ukeoversikt" />
            )}
            <div className="overflow-x-scroll flex justify-center w-full">
        <div className="flex gap-[20px] px-[40px] w-fit">
            {dates.map((date) => (
                <WeekColumn key={date} date={date} events={grouped[date]} />
            ))}
        </div>
            </div>
        </>
    )
}