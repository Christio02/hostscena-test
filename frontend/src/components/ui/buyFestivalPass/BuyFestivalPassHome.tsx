"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  imageSrc: string
  button: React.ReactNode
}

export default function BuyFestivalPassHome({ imageSrc, button }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const button = buttonRef.current
    if (!section || !button) return

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: 'top-=80 top',
      end: '+=100%',
      pin: true,
      scrub: true,
      anticipatePin: 1,
    })

    // Animate button with normal scroll + scale up
    gsap.fromTo(
        button,
        { y: '50vh', scale: 0.75 },
        {
          y: '0vh',
          scale: 1.25,
          scrollTrigger: {
            trigger: section,
            start: 'top-=80 top',
              end: 'bottom end',
            scrub: true,
          },
        }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
      <section ref={sectionRef} className="hidden tablet:block relative w-full h-[calc(100vh-79px)] overflow-hidden">
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </div>
        <div
            ref={buttonRef}
            className="absolute inset-0 flex items-center justify-center will-change-transform"
        >
          {button}
        </div>
      </section>
  )
}