'use client'
import type Event from '@/interfaces/event'
import Image from 'next/image'
import Link from 'next/link'
import { HiArrowLongRight } from 'react-icons/hi2'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'
import BorderTitleBar from '@/components/ui/borderTitleBar/BorderTitleBar'
import { PortableText } from '@portabletext/react'

interface Props {
  event: Event
}

export default function EventDetail({ event }: Props) {
  const { title, tag, image, date, startTime, endTime, location, link, content } = event
  const formattedDate = capitalizeFirstLetter(
    new Date(date).toLocaleDateString('no-NO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }),
  )

  return (
    <>
      <div className="relative w-full h-[300px] mobile:h-[400px] tablet:h-[500px]">
        <Image src={image} alt={title} fill className="object-cover" priority />
      </div>

      <div className="px-[20px]">
        <div className="flex justify-between items-center py-[20px] border-b border-secondary">
          <div>
            {tag && <p className="text-tag italic">{tag.toUpperCase()}</p>}
            <h1 className="text-h4 phone:text-h3">{title}</h1>
            <p className="text-caption">
              {formattedDate} kl. {startTime} - {endTime}
            </p>
            <p className="text-caption">{location}</p>
          </div>
          {link && (
            <Link
              href={link}
              className="hidden tablet:flex items-center gap-1 px-[20px] py-[10px] text-button btn"
            >
              Billetter
              <HiArrowLongRight size={30} />
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full pt-[40px] pb-[20px] px-[20px]">
        <div className="max-w-[650px] space-y-[40px]">
            <PortableText
                value={content}
                components={{
                    block: {
                        normal: ({ children }) => <p>{children}</p>,
                    },
                }}
            />
        </div>
      </div>

      <BorderTitleBar linkText="Alle arrangementer" linkUrl="/program" />
    </>
  )
}
