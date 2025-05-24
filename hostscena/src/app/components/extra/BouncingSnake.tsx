// BouncingSnake.tsx
import React, { useEffect, useRef, useState } from "react";

const imageUrls = Array.from({ length: 18 }, (_, i) =>
    `/hostscena/Hostscena-bildeslange-bilde${String(i + 1).padStart(2, "0")}.jpg`
);

const NUM_SEGMENTS = 18;
const SEGMENT_SPACING = 60;

const BouncingSnake: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const segmentRefs = useRef<HTMLImageElement[]>([]);
    const [headImageIndex, setHeadImageIndex] = useState(0);
    const [positions, setPositions] = useState<{ x: number; y: number }[]>(
        Array.from({ length: NUM_SEGMENTS }, () => ({ x: 100, y: 100 }))
    );

    const angle = useRef(Math.atan2(2, 3));
    const baseSpeed = useRef(Math.sqrt(3 * 2 + 2 * 2));
    const curvature = 0.06;
    const positionHistory = useRef<{ x: number; y: number }[]>(
        Array(NUM_SEGMENTS * SEGMENT_SPACING).fill({ x: 100, y: 100 })
    );

    const [isPaused, setIsPaused] = useState(false);
    const [speedMultiplier, setSpeedMultiplier] = useState(1);
    const [isReversed, setIsReversed] = useState(false);
    const [hovered, setHovered] = useState(false);

    const requestRef = useRef<number>();

    useEffect(() => {
        const update = () => {
            if (!containerRef.current || isPaused) {
                requestRef.current = requestAnimationFrame(update);
                return;
            }

            const container = containerRef.current.getBoundingClientRect();
            const imageWidth = 120;
            const imageHeight = 120;

            const currentHead = positionHistory.current[0];
            angle.current += (Math.random() - 0.5) * curvature;

            const speed = baseSpeed.current * (isReversed ? -speedMultiplier : speedMultiplier);
            const vx = Math.cos(angle.current) * speed;
            const vy = Math.sin(angle.current) * speed;

            let newX = currentHead.x + vx;
            let newY = currentHead.y + vy;
            let bounced = false;

            if (newX <= 0 || newX + imageWidth >= container.width) {
                angle.current = Math.PI - angle.current;
                bounced = true;
            }

            if (newY <= 0 || newY + imageHeight >= container.height) {
                angle.current = -angle.current;
                bounced = true;
            }

            const newHead = {
                x: currentHead.x + Math.cos(angle.current) * speed,
                y: currentHead.y + Math.sin(angle.current) * speed,
            };

            positionHistory.current.unshift(newHead);
            positionHistory.current.pop();

            const newPositions = Array.from({ length: NUM_SEGMENTS }, (_, i) =>
                positionHistory.current[i * SEGMENT_SPACING] || newHead
            );
            setPositions(newPositions);

            if (bounced) {
                setHeadImageIndex((prev) => (prev + 1) % imageUrls.length);
            }

            requestRef.current = requestAnimationFrame(update);
        };

        requestRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [isPaused, speedMultiplier, isReversed]);

    const handleHeadHover = (hovering: boolean) => {
        setHovered(hovering);
        setIsPaused(hovering);
    };

    return (
        <div ref={containerRef} className="relative w-full h-[400px] overflow-hidden rounded-lg">
            {positions.map((pos, i) => {
                const imageIndex = (headImageIndex + i) % imageUrls.length;
                const isHead = i === 0;

                return (
                    <div
                        key={`${i}-${imageIndex}`}
                        className="absolute"
                        style={{
                            transform: `translate(${pos.x}px, ${pos.y}px)`,
                            zIndex: NUM_SEGMENTS - i,
                        }}
                        onMouseEnter={() => isHead && handleHeadHover(true)}
                        onMouseLeave={() => isHead && handleHeadHover(false)}
                    >
                        <img
                            ref={(el) => {
                                if (el) segmentRefs.current[i] = el;
                            }}
                            src={imageUrls[imageIndex]}
                            alt={`Tittel til bilde og link ${i}`}
                            className="max-w-[350px] max-h-[350px] object-contain transition-opacity duration-300"
                        />
                        {isHead && hovered && (
                            <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-20 flex items-center justify-center text-white text-sm font-bold rounded">
                                Tittel til bilde og link
                            </div>
                        )}
                    </div>
                );
            })}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-[9999]">
                {[
                    { label: "S", value: 0.5 },
                    { label: "M", value: 1 },
                    { label: "F", value: 2 },
                ].map(({ label, value }) => (
                    <button
                        key={label}
                        onClick={() => setSpeedMultiplier(value)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-colors duration-200 ${
                            speedMultiplier === value ? "bg-black text-white" : "bg-white text-black"
                        }`}
                        title={`Speed: ${value}`}
                    >
                        {label}
                    </button>
                ))}
                <button
                    onClick={() => setIsPaused((prev) => !prev)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                        isPaused ? "bg-black text-white" : "bg-white text-black"
                    }`}
                    title="Pause"
                >
                    ❚❚
                </button>
                <button
                    onClick={() => setIsReversed((prev) => !prev)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                        isReversed ? "bg-black text-white" : "bg-white text-black"
                    }`}
                    title="Reverse"
                >
                    ↺
                </button>
            </div>
        </div>
    );
};

export default BouncingSnake;
