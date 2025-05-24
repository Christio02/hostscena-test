// WaveSnake.tsx
import React, { useEffect, useRef, useState } from "react";

type Segment = {
    imageIndex: number;
    x: number;
    y: number;
    waveType: "normal" | "opposite";
};

const imageUrls = Array.from({ length: 18 }, (_, i) => `/hostscena/Hostscena-bildeslange-bilde${String(i + 1).padStart(2, "0")}.jpg`);

const IMAGE_SPAWN_INTERVAL = 80;
const SCROLL_SPEED = 1.5;
const WAVE_FREQUENCY = 0.008;
const WAVE_AMPLITUDE = 120;

const WaveSnake: React.FC = () => {
    const [segments, setSegments] = useState<Segment[]>([]);
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [paused, setPaused] = useState(false);
    const currentImageIndex = useRef(0);
    const frameCounter = useRef(0);
    const requestRef = useRef<number>();
    const wavePhase = useRef(0);

    useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const centerY = dimensions.height / 2;

        const update = () => {
            if (!paused) {
                frameCounter.current++;
                wavePhase.current += WAVE_FREQUENCY;
                const x = dimensions.width - 5;

                if (frameCounter.current % IMAGE_SPAWN_INTERVAL === 0) {
                    const indexA = currentImageIndex.current % imageUrls.length;
                    const indexB = (currentImageIndex.current + 1) % imageUrls.length;
                    currentImageIndex.current += 2;

                    const yA = centerY + Math.sin(wavePhase.current) * WAVE_AMPLITUDE;
                    const yB = centerY - Math.sin(wavePhase.current) * WAVE_AMPLITUDE;

                    setSegments(prev => [...prev,
                        { imageIndex: indexA, x, y: yA, waveType: "normal" },
                        { imageIndex: indexB, x, y: yB, waveType: "opposite" }]);
                }

                setSegments(prev =>
                    prev.map(seg => ({ ...seg, x: seg.x - SCROLL_SPEED })).filter(seg => seg.x > -300)
                );
            }

            requestRef.current = requestAnimationFrame(update);
        };

        requestRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [dimensions, paused]);

    return (
        <div className="relative w-full h-150 bg-white overflow-hidden mt-[-50px]">
            {segments.map((seg, i) => (
                <div key={i} className="absolute z-10" style={{ left: seg.x, top: seg.y, transform: "translate(-50%, -50%)" }}
                     onMouseEnter={() => setPaused(true)}
                     onMouseLeave={() => setPaused(false)}>
                    <div className="relative">
                        <img src={imageUrls[seg.imageIndex]} alt={`Image ${i}`} className="max-w-[200px] max-h-[230px] object-contain" />
                        <div className="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-40 transition duration-200 pointer-events-none hover:pointer-events-auto" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WaveSnake;
