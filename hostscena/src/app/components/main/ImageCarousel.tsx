import React, { useEffect, useRef, useState } from "react";

const imageUrls = Array.from({ length: 18 }, (_, i) =>
    `/hostscena/Hostscena-bildeslange-bilde${String(i + 1).padStart(2, "0")}.jpg`
);

type EffectMode = "none" | "fall" | "split" | "crash";

const MarqueeImages: React.FC = () => {
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [scrollSpeed] = useState(1);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [effectMode, setEffectMode] = useState<EffectMode>("fall");

    useEffect(() => {
        let animationFrameId: number;

        const scroll = () => {
            if (topRef.current && bottomRef.current) {
                const top = topRef.current;
                const bottom = bottomRef.current;

                top.scrollLeft += scrollSpeed;
                bottom.scrollLeft -= scrollSpeed / 2;


                if (top.scrollLeft >= top.scrollWidth / 2) {
                    top.scrollLeft = 0;
                }
                if (Math.abs(bottom.scrollLeft) >= bottom.scrollWidth / 2) {
                    bottom.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);


    const getRandomTransform = () => {
        const x = Math.floor(Math.random() * 1000 - 500);
        const y = Math.floor(Math.random() * 800 - 400);
        return `translate(${x}px, ${y}px) scale(0)`;
    };

    const renderLane = (reverse = false) => (
        <div
            ref={reverse ? bottomRef : topRef}
            className="whitespace-nowrap overflow-hidden w-full flex"
            style={{direction: reverse ? "rtl" : "ltr"}}
        >
            {[...imageUrls, ...imageUrls].map((src, index) => {
                const isAffected = hoveredIndex !== null && hoveredIndex !== index;

                const isHovered = hoveredIndex === index;
                const isResetting = hoveredIndex === null;

                const containerStyle: React.CSSProperties = {
                    transition: isAffected && !isHovered
                        ? "all 2s ease-out"
                        : isResetting
                            ? "all 0.3s ease-in"
                            : "all 0.3s ease",
                };


                if (effectMode === "fall" && isAffected) {
                    containerStyle.transform = "translateY(500px)";
                    containerStyle.opacity = 0;
                } else if (effectMode === "fall") {
                    containerStyle.transform = "translateY(0)";
                    containerStyle.opacity = 1;
                }

                if (effectMode === "split" && isAffected) {
                    containerStyle.transform = getRandomTransform();
                    containerStyle.opacity = 0;
                } else if (effectMode === "split") {
                    containerStyle.transform = "translate(0, 0)";
                    containerStyle.opacity = 1;
                }


                return (
                    <div
                        key={`${reverse ? "b" : "t"}-${index}`}
                        className="w-auto h-60 flex items-center justify-center bg-white mx-2 shrink-0 relative group"
                        style={containerStyle}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <img
                            src={src}
                            alt={`Image ${index + 1}`}
                            className="h-full object-contain transition-transform duration-500 w-full"
                        />
                        <div
                            className="absolute inset-0 bg-gray-600 bg-opacity-60 opacity-0 group-hover:opacity-60 flex items-center justify-center transition-opacity duration-300">
                            <span className="text-white text-xl font-semibold opacity-100">{`Image ${index + 1}`}</span>
                        </div>
                    </div>

                );
            })}
        </div>

    );

    return (
        <>
            <div className="relative w-full h-[395px] flex flex-col justify-center gap-4 overflow-hidden">
                {renderLane(false)}
                {renderLane(true)}

                {/* Hover Effect Toggle Buttons */}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4  mt-100px">
                {["fall", "split", "none"].map((mode, i) => (
                    <button
                        key={mode}
                        onClick={() => setEffectMode(mode as EffectMode)}
                        className={`w-12 h-12 rounded-full border-2 text-xl font-bold flex items-center justify-center transition-all ${
                            effectMode === mode ? "bg-black text-white" : "bg-white text-black"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

        </>
    )
        ;
};

export default MarqueeImages;

