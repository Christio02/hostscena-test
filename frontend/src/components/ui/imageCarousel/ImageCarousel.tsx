'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import Image from 'next/image'
import Link from 'next/link'

const IMAGE_HEIGHT = 200 // fixed row height in px
const GAP = 10 // space between images in px

const sampleImages = Array.from(
    { length: 18 },
    (_, i) => `/assets/images/snake/Hostscena-bildeslange-bilde${String(i + 1).padStart(2, '0')}.jpg`,
)


interface Props {
    images?: string[]
}

export default function ImageCarousel({ images = sampleImages }: Props) {
    const half = Math.ceil(images.length / 2)
    const topRow = images.slice(0, half)
    const bottomRow = images.slice(half)

    return (
        <div className="flex tablet:hidden flex-col gap-[10px] pt-[20px]">
            {[topRow, bottomRow].map((row, idx) => (
                <Swiper
                    key={idx}
                    modules={[Autoplay]}
                    freeMode={true}
                    spaceBetween={GAP}
                    slidesPerView={'auto'}
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={8000}
                    className="w-full"
                >
                    {row.map((src, i) => (
                        <SwiperSlide
                            key={i}
                            className="!w-auto"
                            style={{ height: `${IMAGE_HEIGHT}px` }}
                        >
                            <Link href={src}>
                                <div className="relative h-full" style={{ aspectRatio: 'auto' }}>
                                    <Image
                                        src={src}
                                        alt="carousel image"
                                        height={IMAGE_HEIGHT}
                                        width={0}
                                        className="h-full w-auto object-cover"
                                        unoptimized
                                    />
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ))}
        </div>
    )
}
