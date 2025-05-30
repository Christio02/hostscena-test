'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DayContainer from '@/components/ui/program/day/DayContainer'
import WeekContainer from '@/components/ui/program/week/WeekContainer'
import BlackTitleBar from '@/components/ui/blackTitleBar/BlackTitleBar'

export default function Program() {
  const [mode, setMode] = useState<'day' | 'week'>('day')
  const [direction, setDirection] = useState(1)

  const switchToDay = () => {
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
            <DayContainer onSwitch={switchToWeek} />
          ) : (
            <WeekContainer onSwitch={switchToDay} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
