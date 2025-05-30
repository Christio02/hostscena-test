'use client'
import type News from '@/interfaces/news'
import Image from 'next/image'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'
import BorderTitleBar from '@/components/ui/borderTitleBar/BorderTitleBar'
import { PortableText } from '@portabletext/react'

interface Props {
  news: News
}

export default function NewsDetail({ news }: Props) {
  const { title, tag, person, image, date, time, content } = news
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
              Publisert: {formattedDate} kl. {time}
            </p>
            {person && <p className="text-caption">Av: {person}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full pt-[20px] px-[20px]">
          <div className="max-w-[650px] space-y-[40px]">
            <PortableText
                value={content}
                components={{
                    block: {
                        normal: ({ children }) => <p className="mb-4">{children}</p>,
                    },
                }}
            />
        </div>
      </div>

      <BorderTitleBar linkText="Alle nyheter" linkUrl="/nyheter" />
    </>
  )
}
