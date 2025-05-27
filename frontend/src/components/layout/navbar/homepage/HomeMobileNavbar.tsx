'use client'

import { useEffect, useRef, useState } from 'react'
import { navLinks } from '@/constants/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/navbar/Navbar'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomeMobileNavbar() {
  const [showNavbar, setShowNavbar] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        const scrolledEnough = window.scrollY > 100
        setShowNavbar(!isVisible && scrolledEnough)
      },
      {
        threshold: 0,
      },
    )

    const ref = triggerRef.current
    if (ref) observer.observe(ref)
    return () => {
      if (ref) observer.unobserve(ref)
    }
  }, [])

  return (
    <>
      {/* Original menu (trigger) */}
      <div className="tablet:hidden block px-[20px] py-[20px]" ref={triggerRef}>
        <div className="flex flex-col items-center gap-[10px] border-y border-secondary py-[20px] px-[20px]">
          {navLinks
            .filter((link) => link.label.toLowerCase() !== 'hjem')
            .map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="w-full text-center border-[1px] border-secondary text-button hover:bg-secondary hover:text-primary"
              >
                {label}
              </Link>
            ))}
        </div>
      </div>

      {/* Sticky animated navbar shown only after scroll */}
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            className="tablet:hidden"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
            }}
          >
            <Navbar fixed={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
