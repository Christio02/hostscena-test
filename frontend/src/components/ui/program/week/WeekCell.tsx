'use client'

import { useState } from 'react'
import type Event from '@/interfaces/event'
import Link from 'next/link'

interface Props {
  event: Event
  isLast?: boolean
}

export default function WeekCell({ event, isLast }: Props) {
  const [hover, setHover] = useState(false)

  return (
      <Link href={`/program/${event.slug}`} className="block">
        <div
            className={`min-w-[256px] text-center relative overflow-hidden border-t border-x border-secondary p-[10px] cursor-pointer group ${
                isLast ? 'border-b' : ''
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
          {hover && (
              <div className="absolute inset-0">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute inset-0 bg-black opacity-50" />
              </div>
          )}

          <h3 className={`relative z-10 text-calendar-title  ${hover ? 'text-white' : ''}`}>{event.title}</h3>
          {event.performer && (
              <p className={`relative z-10 text-calendar-time font-bold ${hover ? 'text-white' : ''}`}>{event.performer}</p>
          )}
          <p className={`relative z-10 text-calendar-time  ${hover ? 'text-white' : ''}`}>
            <span className="font-bold">{event.startTime}</span> {event.location}
          </p>
        </div>
      </Link>
  )
}