import InfoItem from '@/components/ui/info/InfoItem'

export default function InfoContainer() {
    const items = ['Ankomst', 'Kart', 'Lokaler', 'Kontakt', 'Om Høstscena']

    return (
        <div className="px-[20px] py-[20px]">
            {items.map((title, i) => (
                <InfoItem key={title} title={title} isLast={i === items.length - 1} />
            ))}
        </div>
    )
}