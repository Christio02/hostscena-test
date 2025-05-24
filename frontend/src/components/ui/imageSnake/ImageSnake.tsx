"use client";
import { useState, useEffect, useRef } from "react";

type Segment = {
    id: number;
    image: string;
    x: number;
    y: number;
    timestamp: number;
};

const SEGMENT_COUNT = 7;
const SEGMENT_SIZE = 175;
const STEP_SIZE = 175;
const ADD_INTERVAL = 175;
const MARGIN = 0;
const MIN_DISTANCE = SEGMENT_SIZE * 0.8;
const MAX_ATTEMPTS = 10;

const sampleImages = Array.from({ length: 18 }, (_, i) =>
    `/assets/images/snake/Hostscena-bildeslange-bilde${String(i + 1).padStart(2, "0")}.jpg`
);

const ImageSnake = () => {
    const [segments, setSegments] = useState([]);
    const containerRef = useRef(null);
    const pathTimeRef = useRef(0);
    const angleDirectionRef = useRef(Math.random() > 0.5 ? 1 : -1);
    const intervalRef = useRef(null);
    const imageIndexRef = useRef(0);

    const getNextImage = (): string => {
        const img = sampleImages[imageIndexRef.current % sampleImages.length];
        imageIndexRef.current += 1;
        return img;
    };

    const calculateNextPosition = (
        lastPosition: { x: number; y: number } | null,
        containerWidth: number,
        containerHeight: number,
        pathTime: number,
        attempt: number = 0
    ): { x: number; y: number } => {
        if (!lastPosition) {
            return {
                x: containerWidth / 2 - SEGMENT_SIZE / 2,
                y: containerHeight / 2 - SEGMENT_SIZE / 2,
            };
        }

        // Add some randomness for different attempts to avoid getting stuck
        const randomOffset = attempt * 0.5;
        const angle = pathTime * 0.1 + Math.sin(pathTime * 0.07) * 2 * angleDirectionRef.current + randomOffset;
        let nextX = lastPosition.x + Math.cos(angle) * STEP_SIZE;
        let nextY = lastPosition.y + Math.sin(angle) * STEP_SIZE;

        const hitLeft = nextX < MARGIN;
        const hitRight = nextX > containerWidth - SEGMENT_SIZE - MARGIN;
        const hitTop = nextY < MARGIN;
        const hitBottom = nextY > containerHeight - SEGMENT_SIZE - MARGIN;

        if (hitLeft || hitRight || hitTop || hitBottom) {
            nextX = Math.max(MARGIN, Math.min(containerWidth - SEGMENT_SIZE - MARGIN, nextX));
            nextY = Math.max(MARGIN, Math.min(containerHeight - SEGMENT_SIZE - MARGIN, nextY));

            angleDirectionRef.current = Math.random() > 0.5 ? 1 : -1;
            pathTimeRef.current += Math.PI / 2 + Math.random();
        }

        return { x: nextX, y: nextY };
    };

    const isTooClose = (a: { x: number; y: number }, b: { x: number; y: number }) =>
        Math.hypot(a.x - b.x, a.y - b.y) < MIN_DISTANCE;

    const findValidPosition = (
        prev: Segment[],
        containerWidth: number,
        containerHeight: number
    ): { x: number; y: number } | null => {
        const last = prev.length > 0 ? prev[0] : null;

        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            pathTimeRef.current += 0.2; // Smaller increment for more attempts
            const nextPos = calculateNextPosition(last, containerWidth, containerHeight, pathTimeRef.current, attempt);

            // Check if this position is valid (not too close to existing segments)
            if (!prev.some(p => isTooClose(p, nextPos))) {
                return nextPos;
            }
        }

        // If we can't find a valid position after max attempts,
        // force a larger jump to break free
        pathTimeRef.current += Math.PI;
        angleDirectionRef.current *= -1; // Reverse direction

        const lastPos = last || {
            x: containerWidth / 2 - SEGMENT_SIZE / 2,
            y: containerHeight / 2 - SEGMENT_SIZE / 2
        };

        // Make a larger jump to get away from crowded areas
        const escapeAngle = Math.random() * Math.PI * 2;
        const escapeDistance = STEP_SIZE * 2;

        let escapeX = lastPos.x + Math.cos(escapeAngle) * escapeDistance;
        let escapeY = lastPos.y + Math.sin(escapeAngle) * escapeDistance;

        // Keep within bounds
        escapeX = Math.max(MARGIN, Math.min(containerWidth - SEGMENT_SIZE - MARGIN, escapeX));
        escapeY = Math.max(MARGIN, Math.min(containerHeight - SEGMENT_SIZE - MARGIN, escapeY));

        return { x: escapeX, y: escapeY };
    };

    const addNewSegment = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const containerWidth = rect.width;
        const containerHeight = rect.height;

        setSegments((prev) => {
            const nextPos = findValidPosition(prev, containerWidth, containerHeight);

            if (!nextPos) {
                // This should rarely happen, but if it does, continue with current segments
                return prev;
            }

            const newSegment: Segment = {
                id: Date.now() + Math.random(),
                image: getNextImage(),
                x: nextPos.x,
                y: nextPos.y,
                timestamp: Date.now(),
            };

            const updated = [newSegment, ...prev];
            return updated.slice(0, SEGMENT_COUNT);
        });
    };

    useEffect(() => {
        addNewSegment();
        intervalRef.current = setInterval(addNewSegment, ADD_INTERVAL);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[80vh] overflow-hidden"
        >
            <div className="absolute inset-0">
                {segments.map((seg, i) => (
                    <div
                        key={seg.id}
                        className="absolute transition-opacity duration-300"
                        style={{
                            left: `${seg.x}px`,
                            top: `${seg.y}px`,
                            width: `${SEGMENT_SIZE}px`,
                            height: `${SEGMENT_SIZE}px`,
                            //opacity: 1 - (i / SEGMENT_COUNT) * 0.9,
                            zIndex: SEGMENT_COUNT - i,
                        }}
                    >
                        <img
                            src={seg.image}
                            alt={`Segment ${i}`}
                            className="w-full h-full object-cover"

                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSnake;