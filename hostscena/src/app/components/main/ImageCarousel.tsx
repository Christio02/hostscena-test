import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import InteractiveTiltCard from "@/app/components/main/InteractiveTiltCard";


const imageUrls = Array.from({ length: 18 }, (_, i) =>
    `/hostscena/Hostscena-bildeslange-bilde${String(i + 1).padStart(2, "0")}.jpg`
);

type EffectMode = "none" | "fall" | "split" | "crash";

const MarqueeImages: React.FC = () => {
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [scrollSpeed] = useState(1);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [effectMode] = useState<EffectMode>("none");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);



    useEffect(() => {
        let animationFrameId: number;

        const scroll = () => {
            if (topRef.current && bottomRef.current) {
                const top = topRef.current;
                const bottom = bottomRef.current;

                top.scrollLeft += scrollSpeed / 2;
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
    }, [scrollSpeed]);

    const getRandomTransform = () => {
        const x = Math.floor(Math.random() * 1000 - 500);
        const y = Math.floor(Math.random() * 800 - 400);
        return `translate(${x}px, ${y}px) scale(0)`;
    };

    const renderLane = (reverse = false) => (
        <div
            ref={reverse ? bottomRef : topRef}
            className="whitespace-nowrap overflow-hidden w-full flex"
            style={{ direction: reverse ? "rtl" : "ltr" }}
        >
            {[...imageUrls, ...imageUrls].map((src, index) => {
                const isAffected = hoveredIndex !== null && hoveredIndex !== index;
                const isHovered = hoveredIndex === index;
                const isResetting = hoveredIndex === null;

                const containerStyle: React.CSSProperties = {
                    transition: isAffected && !isHovered
                        ? "all 3s ease-out"
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
                        className="w-auto h-60 flex items-center justify-center bg-white mx-2 shrink-0 relative group cursor-pointer"
                        style={containerStyle}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setSelectedImage(src)}
                    >
                        <img
                            src={src}
                            alt={`Image ${index + 1}`}
                            className="h-full object-contain transition-transform duration-500 w-full"
                        />
                        <div className="absolute inset-0 bg-gray-600 bg-opacity-60 opacity-0 group-hover:opacity-60 flex items-center justify-center transition-opacity duration-300">
                            <span className="text-white text-xl font-semibold">{`Image ${index + 1}`}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <>
            {/* Marquee */}
            <div className="relative w-full h-[395px] flex flex-col justify-center gap-4 overflow-hidden">
                {renderLane(false)}
                {renderLane(true)}
            </div>


            {/* Image Overlay with Drag Rotation */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                    style={{ perspective: 1200 }}
                >
                    {/* 3D Tilt Container */}
                    <InteractiveTiltCard>
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-6 max-w-full max-h-full overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-2 right-2 text-gray-700 hover:text-black text-2xl font-bold z-10"
                                onClick={() => setSelectedImage(null)}
                            >
                                &times;
                            </button>
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                            />
                        </motion.div>
                    </InteractiveTiltCard>
                </div>
            )}


        </>
    );
};

export default MarqueeImages;
