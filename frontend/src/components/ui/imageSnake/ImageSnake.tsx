"use client";

import { useState, useEffect, useRef } from "react";

// --- Type definitions ---
type Segment = {
    id: number;
    image: string;
    x: number;
    y: number;
    timestamp: number;
};

const SEGMENT_COUNT = 7;
const SEGMENT_SIZE = 150;
const STEP_SIZE = 100;
const ADD_INTERVAL = 100;
const MARGIN = SEGMENT_SIZE;

const sampleImages = Array.from({ length: 18 }, (_, i) =>
    `/assets/images/snake/Hostscena-bildeslange-bilde${String(i + 1).padStart(2, "0")}.jpg`
);

const ImageSnake = () => {
    const [segments, setSegments] = useState<Segment[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const pathTimeRef = useRef<number>(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const getNextImage = (): string => sampleImages[Math.floor(Math.random() * sampleImages.length)];

    const calculateNextPosition = (
        lastPosition: { x: number; y: number } | null,
        containerWidth: number,
        containerHeight: number,
        pathTime: number
    ): { x: number; y: number } => {
        if (!lastPosition) {
            return {
                x: containerWidth / 2 - SEGMENT_SIZE / 2,
                y: containerHeight / 2 - SEGMENT_SIZE / 2,
            };
        }

        const angle = pathTime * 0.1 + Math.sin(pathTime * 0.05) * 2;
        let nextX = lastPosition.x + Math.cos(angle) * STEP_SIZE;
        let nextY = lastPosition.y + Math.sin(angle) * STEP_SIZE;

        const hitLeft = nextX < 0;
        const hitRight = nextX > containerWidth - SEGMENT_SIZE;
        const hitTop = nextY < 0;
        const hitBottom = nextY > containerHeight - SEGMENT_SIZE;

        if (hitLeft || hitRight || hitTop || hitBottom) {
            nextX = Math.max(MARGIN, Math.min(containerWidth - SEGMENT_SIZE - MARGIN, nextX));
            nextY = Math.max(MARGIN, Math.min(containerHeight - SEGMENT_SIZE - MARGIN, nextY));

            const inCorner = (hitLeft || hitRight) && (hitTop || hitBottom);
            pathTimeRef.current += inCorner ? Math.PI : (Math.PI / 2) * (Math.random() > 0.5 ? 1 : -1);
        }

        return { x: nextX, y: nextY };
    };

    const addNewSegment = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const containerWidth = rect.width;
        const containerHeight = rect.height;

        setSegments((prev) => {
            const last = prev.length > 0 ? prev[0] : null;
            pathTimeRef.current += 1;
            const nextPos = calculateNextPosition(last, containerWidth, containerHeight, pathTimeRef.current);

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
        return () => intervalRef.current && clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="w-full h-screen overflow-hidden relative">
            <div ref={containerRef} className="absolute inset-0">
                {segments.map((seg, i) => (
                    <div
                        key={seg.id}
                        className="absolute"
                        style={{
                            left: seg.x,
                            top: seg.y,
                            zIndex: SEGMENT_COUNT - i,
                            width: SEGMENT_SIZE,
                            height: SEGMENT_SIZE,
                        }}
                    >
                        <img
                            src={seg.image}
                            alt="segment"
                            className="w-full h-full object-cover"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSnake;
