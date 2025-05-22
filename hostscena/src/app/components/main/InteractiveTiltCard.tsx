import React, { useState, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const InteractiveTiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const rotateY = useMotionValue(0);
    const rotateX = useMotionValue(0);

    const [isDragging, setIsDragging] = useState(false);
    const lastPosition = useRef<{ x: number; y: number; time: number } | null>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        lastPosition.current = {
            x: e.clientX,
            y: e.clientY,
            time: performance.now(),
        };
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        setIsDragging(false);

        if (!lastPosition.current) return;

        const dx = e.clientX - lastPosition.current.x;
        const dy = e.clientY - lastPosition.current.y;
        const dt = (performance.now() - lastPosition.current.time) / 1000;

        const velocityX = dy / dt;
        const velocityY = dx / dt;
        
        animate(rotateX, rotateX.get() + velocityX * 0.2, {
            type: "inertia",
            velocity: velocityX,
            damping: 20,
            stiffness: 100,
        });

        animate(rotateY, rotateY.get() + velocityY * 0.2, {
            type: "inertia",
            velocity: velocityY,
            damping: 20,
            stiffness: 100,
        });

        lastPosition.current = null;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateYVal = ((offsetX - centerX) / centerX) * 180;
        const rotateXVal = ((centerY - offsetY) / centerY) * 180;

        rotateY.set(rotateYVal);
        rotateX.set(rotateXVal);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp({ clientX: 0, clientY: 0 } as never); 
        }
    };

    return (
        <motion.div
            className="relative max-w-3xl w-[90%] max-h-[90%] flex items-center justify-center"
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
                cursor: isDragging ? "grabbing" : "grab",
                perspective: 1200,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </motion.div>
    );
};

export default InteractiveTiltCard;
