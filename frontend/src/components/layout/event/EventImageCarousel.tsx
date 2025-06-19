'use client'
import type { SanityImage } from '@/interfaces/sanityImage'
import { EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'
import Modal from 'react-modal'
const IMAGE_HEIGHT = 200
const GAP = 10

interface Props {
  images: SanityImage[]
}

export default function EventImageCarousel({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: images.length >= 4,
      dragFree: true,
      containScroll: 'trimSnaps',
    },
    images.length >= 4
      ? [Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]
      : [],
  )

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalSrc, setModalSrc] = useState<string | null>(null)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.plugins().autoplay?.stop()
      emblaApi.scrollPrev()
      setTimeout(() => {
        emblaApi.plugins().autoplay?.play()
      }, 5000)
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.plugins().autoplay?.stop()
      emblaApi.scrollNext()
      setTimeout(() => {
        emblaApi.plugins().autoplay?.play()
      }, 5000)
    }
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  const openImage = (src: string) => {
    setModalSrc(src)
    setModalIsOpen(true)
  }

  const closeModal = () => setModalIsOpen(false)

  const showAsGrid = images.length < 4

  useEffect(() => {
    const node = document.getElementById('__next')
    if (typeof window !== 'undefined' && node) {
      Modal.setAppElement(node)
    }
  }, [])

  const getContainerClass = () => {
    return 'flex flex-col gap-[10px] pt-[20px] z-0 relative'
  }

  if (!images || images.length === 0) return null

  return (
    <>
      <div className={getContainerClass()}>
        {showAsGrid ? (
          // Grid layout for less than 4 images
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {images.map((img) => (
              <button
                key={img.asset._id}
                onClick={() => openImage(img.asset.url)}
                className="p-0 border-none m-0"
              >
                <div className="relative" style={{ height: `${IMAGE_HEIGHT}px`, width: 'auto' }}>
                  <Image
                    src={img.asset.url}
                    alt={img.asset.altText ?? 'Bilde'}
                    height={IMAGE_HEIGHT}
                    width={0}
                    className="h-full w-auto object-contain"
                    unoptimized
                  />
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Carousel layout for 4+ images
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex" style={{ gap: `${GAP}px` }}>
                {images.map((img) => (
                  <div
                    key={img.asset._id}
                    className="flex-none"
                    style={{ height: `${IMAGE_HEIGHT}px`, width: 'auto' }}
                  >
                    <button
                      onClick={() => openImage(img.asset.url)}
                      className="p-0 border-none m-0 h-full"
                    >
                      <div className="relative h-full">
                        <Image
                          src={img.asset.url}
                          alt={img.asset.altText ?? 'Bilde'}
                          height={IMAGE_HEIGHT}
                          width={0}
                          className="h-full w-auto object-contain"
                          unoptimized
                        />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 z-10 ${
                prevBtnDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous image"
            >
              <GrLinkPrevious className="w-5 h-5 text-gray-700" />
            </button>

            <button
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 z-10 ${
                nextBtnDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next image"
            >
              <GrLinkNext className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Bilde"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
        className="relative outline-none max-w-[90vw] max-h-[90vh]"
      >
        {modalSrc && (
          <Image
            src={modalSrc}
            alt="Forstørret bilde"
            width={800}
            height={800}
            className="object-contain max-h-[80vh]"
          />
        )}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-4xl text-secondary bg-primary rounded-full"
        >
          <IoMdClose />
        </button>
      </Modal>
    </>
  )
}
