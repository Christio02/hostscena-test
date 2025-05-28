'use client'

import { ReactNode, useEffect, useState } from 'react'

interface Props {
  imageSrc: string
  button: ReactNode
}

export default function BuyFestivalPassHome({ imageSrc, button }: Props) {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
    }
  }, [])

  const backgroundClasses = isSafari ? 'bg-static' : 'parallax'

  return (
    <div
      className={`hidden tablet:flex relative items-center justify-center w-full h-[calc(100vh-80px)] ${backgroundClasses}`}
      style={{
        backgroundImage: `url(${imageSrc})`,
      }}
    >
      <div className="z-10 transition-transform duration-300 ease-in-out hover:scale-125">
        {button}
      </div>
    </div>
  )
}
