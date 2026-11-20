import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { sounds } from '../utils/audio';

export interface AnimatedLogoProps {
  size?: number | string;
  className?: string;
  isDark?: boolean;
  interactive?: boolean;
  autoplay?: boolean;
  strokeWidth?: number;
  onAnimationComplete?: () => void;
}

/**
 * AnimatedLogo
 * Soft, architectural SVG stroke draw-on animation powered by GSAP.
 * 
 * Aesthetic Principles:
 * - Anti-neon, anti-cyberpunk: No glow filters, no neon gradients.
 * - Precision Swiss & Apple hardware aesthetic: Soft platinum, slate zinc, and pure geometric vector paths.
 * - Hairline 2px strokes with silky, restrained easing (power2.out).
 * - Tactile interaction: Click or hover to gently replay with mechanical sound feedback.
 */
export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 36,
  className = "",
  isDark = true,
  interactive = true,
  autoplay = true,
  strokeWidth = 2,
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const frame = svg.querySelector<SVGGeometryElement>('.logo-frame');
      const guides = svg.querySelectorAll<SVGGeometryElement>('.logo-guide');
      const stems = svg.querySelectorAll<SVGGeometryElement>('.logo-stem');
      const loops = svg.querySelectorAll<SVGGeometryElement>('.logo-loop');
      const nodes = svg.querySelectorAll<SVGCircleElement>('.logo-node');

      // 1. Calculate path lengths for soft draw-on
      const allPaths = svg.querySelectorAll<SVGGeometryElement>('.draw-stroke');
      allPaths.forEach((path) => {
        const len = path.getTotalLength ? path.getTotalLength() : 280;
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 1,
        });
      });

      // 2. Initial state for minimal nodes
      if (nodes.length > 0) {
        gsap.set(nodes, { scale: 0, opacity: 0, transformOrigin: 'center center' });
      }

      // 3. Construct the soft, understated Master Timeline
      const tl = gsap.timeline({
        paused: !autoplay,
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          if (onAnimationComplete) onAnimationComplete();
        },
      });

      tlRef.current = tl;

      // Stage 1: Subtle outer squircle frame
      if (frame) {
        tl.to(frame, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        });
      }

      // Stage 2: Minimal corner drafting tick marks
      if (guides.length > 0) {
        tl.to(
          guides,
          {
            strokeDashoffset: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
          },
          '-=0.5'
        );
      }

      // Stage 3: Monogram stems (I & B verticals + subtle synapse bridge)
      if (stems.length > 0) {
        tl.to(
          stems,
          {
            strokeDashoffset: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.35'
        );
      }

      // Stage 4: Monogram loops (B arcs)
      if (loops.length > 0) {
        tl.to(
          loops,
          {
            strokeDashoffset: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.inOut',
          },
          '-=0.5'
        );
      }

      // Stage 5: Soft precision node dots settle gently (subtle, no explosive bounce)
      if (nodes.length > 0) {
        tl.to(
          nodes,
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
          },
          '-=0.35'
        );
      }

      // Verification Seek Harness support (?logo_t=seconds)
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const seekTime = urlParams.get('logo_t');
        if (seekTime !== null) {
          tl.pause();
          tl.seek(parseFloat(seekTime));
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isDark, autoplay, onAnimationComplete]);

  const handleReplay = (e?: React.MouseEvent) => {
    if (!interactive) return;
    if (e) {
      e.stopPropagation();
    }
    sounds.playClick();
    if (tlRef.current) {
      tlRef.current.restart();
    }
  };

  const numericSize = typeof size === 'number' ? size : 36;

  // Soft monochrome color palette
  const mainStroke = isDark ? "#F4F4F5" : "#18181B";       // Matte platinum / dark charcoal
  const subtleStroke = isDark ? "#71717A" : "#A1A1AA";     // Soft zinc guide lines
  const frameStroke = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)";
  const nodeFill = isDark ? "#E4E4E7" : "#27272A";

  return (
    <div
      ref={containerRef}
      onClick={interactive ? handleReplay : undefined}
      onMouseEnter={interactive ? () => sounds.playHover() : undefined}
      title={interactive ? "Klik untuk memutar ulang animasi garis logo" : undefined}
      className={`relative inline-flex items-center justify-center group/logo ${
        interactive ? "cursor-pointer select-none" : ""
      } ${className}`}
      style={{ width: numericSize, height: numericSize }}
    >
      <div
        className={`relative w-full h-full rounded-xl flex items-center justify-center transition-all duration-300 ${
          isDark
            ? "bg-zinc-900/90 border border-white/10 group-hover/logo:border-white/30 shadow-specular-dark"
            : "bg-white border border-black/10 group-hover/logo:border-black/25 shadow-xs"
        }`}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="w-full h-full p-1 relative z-10 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Squircle Blueprint Frame (Soft & Thin) */}
          <rect
            className="draw-stroke logo-frame"
            x="10"
            y="10"
            width="80"
            height="80"
            rx="20"
            stroke={frameStroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Minimal Corner Technical Guides */}
          <path
            className="draw-stroke logo-guide"
            d="M 18 30 L 18 20 L 30 20"
            stroke={subtleStroke}
            strokeWidth={strokeWidth * 0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="draw-stroke logo-guide"
            d="M 82 70 L 82 80 L 70 80"
            stroke={subtleStroke}
            strokeWidth={strokeWidth * 0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* --- MONOGRAM 'I' --- */}
          {/* Top Horizontal Serif */}
          <path
            className="draw-stroke logo-stem"
            d="M 24 26 H 40"
            stroke={mainStroke}
            strokeWidth={strokeWidth * 1.3}
            strokeLinecap="round"
          />
          {/* Vertical Architectural Stem */}
          <path
            className="draw-stroke logo-stem"
            d="M 32 26 V 74"
            stroke={mainStroke}
            strokeWidth={strokeWidth * 1.4}
            strokeLinecap="round"
          />
          {/* Bottom Horizontal Serif */}
          <path
            className="draw-stroke logo-stem"
            d="M 24 74 H 40"
            stroke={mainStroke}
            strokeWidth={strokeWidth * 1.3}
            strokeLinecap="round"
          />
          {/* Delicate Midpoint Bridge */}
          <path
            className="draw-stroke logo-stem"
            d="M 32 50 H 48"
            stroke={subtleStroke}
            strokeWidth={strokeWidth * 0.9}
            strokeLinecap="round"
          />

          {/* --- MONOGRAM 'B' --- */}
          {/* Vertical Spine */}
          <path
            className="draw-stroke logo-stem"
            d="M 48 26 V 74"
            stroke={mainStroke}
            strokeWidth={strokeWidth * 1.4}
            strokeLinecap="round"
          />
          {/* Upper Precision Arc */}
          <path
            className="draw-stroke logo-loop"
            d="M 48 26 H 63 C 71.5 26 77 31 77 38 C 77 45 71.5 50 63 50 H 48"
            stroke={mainStroke}
            strokeWidth={strokeWidth * 1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Lower Precision Arc */}
          <path
            className="draw-stroke logo-loop"
            d="M 48 50 H 65 C 74.5 50 80 55.5 80 62 C 80 68.5 74.5 74 65 74 H 48"
            stroke={mainStroke}
            strokeWidth={strokeWidth * 1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Minimal Precision Coordinate Nodes (Tiny, Soft Dots) */}
          <circle className="logo-node" cx="32" cy="26" r="2.2" fill={nodeFill} />
          <circle className="logo-node" cx="32" cy="50" r="2.2" fill={nodeFill} />
          <circle className="logo-node" cx="32" cy="74" r="2.2" fill={nodeFill} />
          <circle className="logo-node" cx="48" cy="50" r="2.2" fill={nodeFill} />
          <circle className="logo-node" cx="77" cy="38" r="2" fill={nodeFill} />
          <circle className="logo-node" cx="80" cy="62" r="2" fill={nodeFill} />
        </svg>
      </div>
    </div>
  );
};
