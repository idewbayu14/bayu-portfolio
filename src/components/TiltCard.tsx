import React, { useRef, useState, useCallback } from 'react';
import { sounds } from '../utils/audio';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  isDark?: boolean;
  enableGlare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 7,
  isDark = true,
  enableGlare = true
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`);

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    setGlarePos({ x: percentX, y: percentY, opacity: isDark ? 0.18 : 0.12 });
  }, [maxTilt, isDark]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    sounds.playCardFriction();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: "preserve-3d",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Crystalline Specular Glare Reflection */}
      {enableGlare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-20 overflow-hidden"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, ${
              isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.45)'
            }, transparent 80%)`
          }}
        />
      )}
    </div>
  );
};
