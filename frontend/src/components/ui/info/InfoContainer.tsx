import InfoItem from '@/components/ui/info/InfoItem'
import ContactBox from "@/components/ui/contact/ContactBox";

export default function InfoContainer() {
    const items = [
        { title: 'Ankomst', content: <p>Informasjon om ankomst.</p> },
        { title: 'Kart', content: <p>Her er kartet over området.</p> },
        { title: 'Lokaler', content: <p>Beskrivelse av lokalene.</p> },
        { title: 'Kontakt', content: <ContactBox /> },
        { title: 'Om Høstscena', content: <p>Festivalbeskrivelse her.</p> },
    ]

    return (
        <div className="px-[20px] py-[20px]">
            {items.map((item, i) => (
                <InfoItem
                    key={item.title}
                    title={item.title}
                    content={item.content}
                    isLast={i === items.length - 1}
                />
            ))}
        </div>
    )
}