'use client'
import BlackTitleBar from '@/components/ui/blackTitleBar/BlackTitleBar'
import DayContainer from '@/components/ui/program/day/DayContainer'
import WeekContainer from '@/components/ui/program/week/WeekContainer'
import Event from '@/interfaces/event'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface ProgramProps {
  events: Event[]
}
export default function ProgramClient({ events }: ProgramProps) {
  const [mode, setMode] = useState<'day' | 'week'>('day')
  const [direction, setDirection] = useState(1)
  // Add debugging
  console.log('Events in client:', events)
  console.log('Events length in client:', events?.length)

  const switchToDay = async () => {
    setDirection(-1)
    setMode('day')
  }

  const switchToWeek = () => {
    setDirection(1)
    setMode('week')
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 600 : -600,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -600 : 600,
      opacity: 0,
    }),
  }

  if (!events || events.length < 1) {
    return (
      <div className="relative w-full h-[calc(100vh-268px)] overflow-hidden flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-lg font-source text-gray-500">Ingen arrangmenter i program</p>
          <p className="text-sm font-source text-gray-400 mt-2">
            Legg til nye arrangmenter i sanity studio!
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="relative w-full">
      <BlackTitleBar title="Program" />
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={mode}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          {mode === 'day' ? (
            <DayContainer onSwitch={switchToWeek} events={events} />
          ) : (
            <WeekContainer onSwitch={switchToDay} events={events} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
