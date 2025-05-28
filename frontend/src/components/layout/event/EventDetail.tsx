'use client'
import type Event from '@/interfaces/event'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    event: Event
}

export default function EventDetail({ event }: Props) {

    const { title, performer, image, date, startTime, endTime, location, link } = event
    const formattedDate = new Date(date).toLocaleDateString('no-NO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })

    return (
        <div className="bg-primary text-secondary px-[20px] tablet:px-[40px] py-[40px] max-w-[960px] mx-auto">
            <div className="relative w-full h-[300px] tablet:h-[400px] mb-[30px]">
                <Image src={image} alt={title} fill className="object-cover" priority />
            </div>

            <div className="flex justify-between items-start border-b border-secondary pb-[20px] mb-[30px]">
                <div>
                    {performer && <p className="italic mb-[4px]">DANS</p>}
                    <h1 className="text-h2 font-wittgenstein mb-[8px]">{title}</h1>
                    <p>{formattedDate} kl: {startTime} - {endTime}</p>
                    <p>{location}</p>
                </div>
                {link && (
                    <Link
                        href={link}
                        className="border border-secondary px-[16px] py-[10px] text-button hover:bg-secondary hover:text-primary"
                    >
                        Billetter →
                    </Link>
                )}
            </div>

            <div className="prose max-w-none font-source text-[1.125rem]">
                <p>Her kommer Sanity-tekst senere. Inntil videre mocker vi kun data for testing av design og routing.</p>
                <p>Etter hvert vil denne siden vise richtext-innhold fra Sanity, inkludert beskrivelse, bilder, lenker og mer.</p>
            </div>

            <div className="mt-[60px] text-right text-button">
                <Link href="/program">ALLE ARRANGEMENTER →</Link>
            </div>
        </div>
    )
}