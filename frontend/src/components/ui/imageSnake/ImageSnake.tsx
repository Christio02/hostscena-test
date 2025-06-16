// ImageSnake.tsx
'use client'
import { ImageSnakeItem } from '@/interfaces/home'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type Segment = {
  id: number
  image: string
  x: number
  y: number
  timestamp: number
}

const SEGMENT_COUNT = 7
const SEGMENT_SIZE = 300
const STEP_SIZE = 200
const ADD_INTERVAL = 300
const MARGIN = -100
const MIN_DISTANCE = SEGMENT_SIZE * 0.2
const MAX_ATTEMPTS = 10

const ImageSnake = ({ images }: { images: ImageSnakeItem[] }) => {
  const [segments, setSegments] = useState<Segment[]>([])
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathTimeRef = useRef<number>(0)
  const angleDirectionRef = useRef<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const imageIndexRef = useRef(0)

  // Runs to make sure client has mounted
  useEffect(() => {
    setMounted(true)
    angleDirectionRef.current = Math.random() > 0.5 ? 1 : -1
    pathTimeRef.current = 0
  }, [])

  const sampleImages = Array.from(
    { length: 18 },
    (_, i) =>
      `/assets/images/snake/Hostscena-bildeslange-bilde${String(i + 1).padStart(2, '0')}.jpg`,
  )
  const getNextImage = useCallback((): string => {
    if (!sampleImages.length) return ''
    const img = sampleImages[imageIndexRef.current % sampleImages.length]
    imageIndexRef.current += 1
    return img
  }, [])

  const calculateNextPosition = (
    lastPosition: { x: number; y: number } | null,
    containerWidth: number,
    containerHeight: number,
    pathTime: number,
    attempt: number = 0,
  ): { x: number; y: number } => {
    if (!lastPosition) {
      return {
        x: containerWidth / 2 - SEGMENT_SIZE / 2,
        y: containerHeight / 2 - SEGMENT_SIZE / 2,
      }
    }

    const randomOffset = attempt * 0.5
    const angle =
      pathTime * 0.1 + Math.sin(pathTime * 0.07) * 2 * angleDirectionRef.current + randomOffset
    let nextX = lastPosition.x + Math.cos(angle) * STEP_SIZE
    let nextY = lastPosition.y + Math.sin(angle) * STEP_SIZE

    const hitLeft = nextX < MARGIN
    const hitRight = nextX > containerWidth - SEGMENT_SIZE - MARGIN
    const hitTop = nextY < MARGIN
    const hitBottom = nextY > containerHeight - SEGMENT_SIZE - MARGIN

    if (hitLeft || hitRight || hitTop || hitBottom) {
      nextX = Math.max(MARGIN, Math.min(containerWidth - SEGMENT_SIZE - MARGIN, nextX))
      nextY = Math.max(MARGIN, Math.min(containerHeight - SEGMENT_SIZE - MARGIN, nextY))

      angleDirectionRef.current = Math.random() > 0.5 ? 1 : -1
      pathTimeRef.current += Math.PI / 2 + Math.random()
    }

    return { x: nextX, y: nextY }
  }

  const isTooClose = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y) < MIN_DISTANCE

  const addNewSegment = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const containerWidth = rect.width
    const containerHeight = rect.height

    const findValidPosition = (prev: Segment[]): { x: number; y: number } => {
      const last = prev.length > 0 ? prev[0] : null

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        pathTimeRef.current += 0.2
        const nextPos = calculateNextPosition(
          last,
          containerWidth,
          containerHeight,
          pathTimeRef.current,
          attempt,
        )
        if (!prev.some((p) => isTooClose(p, nextPos))) return nextPos
      }

      pathTimeRef.current += Math.PI
      angleDirectionRef.current *= -1

      const lastPos = last ?? {
        x: containerWidth / 2 - SEGMENT_SIZE / 2,
        y: containerHeight / 2 - SEGMENT_SIZE / 2,
      }

      const escapeAngle = Math.random() * Math.PI * 2
      const escapeDistance = STEP_SIZE * 2
      const escapeX = Math.max(
        MARGIN,
        Math.min(containerWidth - SEGMENT_SIZE, lastPos.x + Math.cos(escapeAngle) * escapeDistance),
      )
      const escapeY = Math.max(
        MARGIN,
        Math.min(
          containerHeight - SEGMENT_SIZE,
          lastPos.y + Math.sin(escapeAngle) * escapeDistance,
        ),
      )
      return { x: escapeX, y: escapeY }
    }

    setSegments((prev) => {
      const nextPos = findValidPosition(prev)
      const newSegment: Segment = {
        id: Date.now() + Math.random(),
        image: getNextImage(),
        x: nextPos.x,
        y: nextPos.y,
        timestamp: Date.now(),
      }

      return [newSegment, ...prev].slice(0, SEGMENT_COUNT)
    })
  }, [getNextImage])

  useEffect(() => {
    if (!mounted) return
    addNewSegment()
    intervalRef.current = setInterval(addNewSegment, ADD_INTERVAL)
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [addNewSegment, mounted])

  // Only render the snake after mount (client-side)
  if (!mounted) {
    return (
      <div ref={containerRef} className="relative w-full h-[calc(100vh-268px)] overflow-hidden" />
    )
  }

  return (
    <div ref={containerRef} className="relative w-full h-[calc(100vh-268px)] overflow-hidden">
      <div className="absolute inset-0">
        {segments.map((seg, i) => (
          <div
            key={seg.id}
            className="absolute"
            style={{
              left: `${seg.x}px`,
              top: `${seg.y}px`,
              width: `${SEGMENT_SIZE}px`,
              height: `${SEGMENT_SIZE}px`,
              zIndex: SEGMENT_COUNT - i,
            }}
          >
            <Image
              src={seg.image}
              width={SEGMENT_SIZE}
              height={SEGMENT_SIZE}
              alt={`Segment ${i}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageSnake
