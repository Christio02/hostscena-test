'use client'

import type Event from '@/interfaces/event'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
  event: Event
  isLast?: boolean
}

export default function WeekCell({ event, isLast }: Props) {
  const [hover, setHover] = useState(false)

  if (!event || !event.slug || !event.slug.current) {
    return (
      <div
        className={`min-w-[256px] text-center border-t border-x border-secondary p-[10px] ${
          isLast ? 'border-b' : ''
        }`}
      >
        <div className="animate-pulse bg-gray-200 h-6 rounded mb-2"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
      </div>
    )
  }

  return (
    <Link href={`/program/${event.slug.current}`} className="block">
      <div
        className={`min-w-[256px] text-center relative overflow-hidden border-t border-x border-secondary p-[10px] cursor-pointer group ${
          isLast ? 'border-b' : ''
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-200 ${
            hover ? 'opacity-60' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${event.image.asset.url})` }}
        />

        <h3 className="relative z-10 text-calendar-title">{event.title}</h3>
        {event.performer && (
          <p className="relative z-10 text-calendar-time font-bold">{event.performer}</p>
        )}
        <p className="relative z-10 text-calendar-time">
          <span className="font-bold">{event.startTime}</span> {event.location}
        </p>
      </div>
    </Link>
  )
}
