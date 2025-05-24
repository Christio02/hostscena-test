import React, { useEffect, useRef, useState } from "react";

type Position = { x: number; y: number };
type SnakeSegment = { imageIndex: number; waveOffset: number };

const imageUrls = Array.from({ length: 18 }, (_, i) => `/hostscena/Hostscena-bildeslange-bilde${String(i + 1).padStart(2, "0")}.jpg`);
const MAX_VISIBLE = 12;
const IMAGE_CHANGE_INTERVAL = 36;

const StationaryWaveSnake: React.FC = () => {
    const [segments, setSegments] = useState<SnakeSegment[]>(
        Array.from({ length: MAX_VISIBLE }, (_, i) => ({ imageIndex: i, waveOffset: i * 0.5 }))
    );
    const [positions, setPositions] = useState<Position[]>([]);
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [speedMultiplier, setSpeedMultiplier] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const [isReversed, setIsReversed] = useState(false);
    const phaseRef = useRef(0);
    const frameCounter = useRef(0);
    const currentImageIndex = useRef(MAX_VISIBLE);
    const requestRef = useRef<number>();

    useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const spacing = dimensions.width / (MAX_VISIBLE + 1);
        const centerY = dimensions.height / 2;

        const update = () => {
            frameCounter.current++;
            if (!isPaused) {
                phaseRef.current += 0.05 * speedMultiplier * (isReversed ? -1 : 1);
            }

            const newPositions = segments.map((segment, i) => {
                const x = spacing * (i + 1);
                const wave = Math.sin(phaseRef.current + segment.waveOffset);
                const y = centerY + wave * 100;
                return { x, y };
            });

            setPositions(newPositions);

            if (!isPaused && frameCounter.current % IMAGE_CHANGE_INTERVAL === 0) {
                const nextImage = currentImageIndex.current % imageUrls.length;
                currentImageIndex.current += 1;
                const newSegment: SnakeSegment = { imageIndex: nextImage, waveOffset: 0 };
                const updated = [newSegment, ...segments.slice(0, MAX_VISIBLE - 1)].map((seg, i) => ({
                    ...seg,
                    waveOffset: i * 0.5,
                }));
                setSegments(updated);
            }

            requestRef.current = requestAnimationFrame(update);
        };

        requestRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [dimensions, segments, speedMultiplier, isPaused, isReversed]);

    return (
        <div className="relative w-full h-100 bg-white overflow-hidden">
            {positions.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">Loading wave...</div>
            ) : (
                positions.map((pos, i) => {
                    const imageUrl = imageUrls[segments[i]?.imageIndex % imageUrls.length];
                    return (
                        <img key={i} src={imageUrl} alt={`Image ${i}`} className="max-w-[250px] max-h-[250px] absolute object-contain transition-all duration-300 ease-in-out"
                             style={{ left: pos.x, top: pos.y, zIndex: i, transform: "translate(-50%, -170%)" }} />
                    );
                })
            )}
            {/* Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                {[{ label: 'Slow', value: 0.25 }, { label: 'Medium', value: 0.5 }, { label: 'Fast', value: 2 }].map(({ label, value }) => (
                    <button key={label} onClick={() => setSpeedMultiplier(value)}
                            className={`w-10 h-10 rounded-full border-2 ${speedMultiplier === value ? 'bg-black text-white' : 'bg-white text-black'} border-black font-bold text-xs flex items-center justify-center transition-colors duration-200`}
                            title={label}>
                        {label[0]}
                    </button>
                ))}
                <button onClick={() => setIsPaused(!isPaused)}
                        className={`w-10 h-10 rounded-full border-2 ${isPaused ? 'bg-black text-white' : 'bg-white text-black'} border-black font-bold text-xs flex items-center justify-center transition-colors duration-200`}
                        title="Pause">❚❚</button>
                <button onClick={() => setIsReversed(!isReversed)}
                        className={`w-10 h-10 rounded-full border-2 ${isReversed ? 'bg-black text-white' : 'bg-white text-black'} border-black font-bold text-xs flex items-center justify-center transition-colors duration-200`}
                        title="Reverse">↺</button>
            </div>
        </div>
    );
};

export default StationaryWaveSnake;
