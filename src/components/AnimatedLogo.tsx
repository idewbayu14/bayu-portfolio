import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { sounds } from '../utils/audio';

export interface AnimatedLogoProps {
  size?: number | string;
  className?: string;
  isDark?: boolean;
  interactive?: boolean;
  autoplay?: boolean;
  showBadgeText?: boolean;
  onAnimationComplete?: () => void;
}

/**
 * AnimatedLogo
 * GSAP-powered SVG stroke draw-on animation.
 * Features:
 * - Dynamic SVG stroke-dashoffset self-drawing timeline on mount
 * - Neural network & circuit-inspired 'IB' monogram (Idew Bayu)
 * - Interconnected data synapses and glowing pulsing nodes
 * - Theme-reactive linear gradients and specular lighting
 * - Click & hover replay interactions with tactile haptic audio feedback
 */
export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 36,
  className = "",
  isDark = true,
  interactive = true,
  autoplay = true,
  showBadgeText = false,
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
      const techAccents = svg.querySelectorAll<SVGGeometryElement>('.logo-accent');
      const monogramStems = svg.querySelectorAll<SVGGeometryElement>('.logo-stem');
      const monogramLoops = svg.querySelectorAll<SVGGeometryElement>('.logo-loop');
      const nodes = svg.querySelectorAll<SVGCircleElement>('.logo-node');
      const pulseRing = svg.querySelector<SVGCircleElement>('.logo-pulse-ring');
      const ambientGlow = svg.querySelector<SVGRectElement>('.logo-ambient-glow');

      // 1. Measure and configure exact stroke lengths for deterministic draw-on
      const allPaths = svg.querySelectorAll<SVGGeometryElement>('.draw-stroke');
      allPaths.forEach((path) => {
        const len = path.getTotalLength ? path.getTotalLength() : 300;
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 1,
        });
      });

      // 2. Initial state for nodes and fills
      if (nodes.length > 0) {
        gsap.set(nodes, { scale: 0, opacity: 0, transformOrigin: 'center center' });
      }
      if (pulseRing) {
        gsap.set(pulseRing, { scale: 0.5, opacity: 0, transformOrigin: 'center center' });
      }
      if (ambientGlow) {
        gsap.set(ambientGlow, { opacity: 0 });
      }

      // 3. Construct the Master GreenSock Timeline
      const tl = gsap.timeline({
        paused: !autoplay,
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          if (onAnimationComplete) onAnimationComplete();
        },
      });

      tlRef.current = tl;

      // Stage 1: Draw outer squircle frame
      if (frame) {
        tl.to(frame, {
          strokeDashoffset: 0,
          duration: 0.75,
          ease: 'power3.inOut',
        });
      }

      // Stage 2: Draw corner circuit accents
      if (techAccents.length > 0) {
        tl.to(
          techAccents,
          {
            strokeDashoffset: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.45'
        );
      }

      // Stage 3: Draw 'I' & 'B' vertical stems and neural synapse bridge
      if (monogramStems.length > 0) {
        tl.to(
          monogramStems,
          {
            strokeDashoffset: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.35'
        );
      }

      // Stage 4: Draw 'B' upper and lower geometric loops
      if (monogramLoops.length > 0) {
        tl.to(
          monogramLoops,
          {
            strokeDashoffset: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: 'power2.inOut',
          },
          '-=0.55'
        );
      }

      // Stage 5: Pop in neural circuit nodes with spring bounce
      if (nodes.length > 0) {
        tl.to(
          nodes,
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: 'back.out(2.5)',
          },
          '-=0.3'
        );
      }

      // Stage 6: Energy pulse ring & ambient glow
      if (ambientGlow) {
        tl.to(
          ambientGlow,
          {
            opacity: isDark ? 0.35 : 0.15,
            duration: 0.6,
            ease: 'sine.out',
          },
          '-=0.2'
        );
      }

      if (pulseRing) {
        tl.fromTo(
          pulseRing,
          { scale: 0.8, opacity: 0.8 },
          {
            scale: 2.2,
            opacity: 0,
            duration: 0.7,
            ease: 'power1.out',
          },
          '-=0.4'
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

  return (
    <div
      ref={containerRef}
      onClick={interactive ? handleReplay : undefined}
      onMouseEnter={interactive ? () => sounds.playHover() : undefined}
      title={interactive ? "Klik untuk memutar ulang animasi logo GSAP" : undefined}
      className={`relative inline-flex items-center gap-2 group/logo ${
        interactive ? "cursor-pointer select-none" : ""
      } ${className}`}
      style={{ width: showBadgeText ? 'auto' : numericSize, height: numericSize }}
    >
      <div
        className={`relative rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 ${
          isDark
            ? "bg-zinc-950/80 border border-white/10 group-hover/logo:border-emerald-500/40 group-hover/logo:shadow-[0_0_20px_rgba(16,185,129,0.25)] shadow-specular-dark"
            : "bg-white/95 border border-black/10 group-hover/logo:border-emerald-600/40 group-hover/logo:shadow-[0_0_16px_rgba(16,185,129,0.2)] shadow-xs"
        }`}
        style={{ width: numericSize, height: numericSize }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="w-full h-full p-0.5 relative z-10 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Neural Gradient: Emerald to Cyan to Sapphire */}
            <linearGradient id="ib-cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            {/* Specular White-to-Emerald Stroke Gradient */}
            <linearGradient id="ib-frame-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#ffffff" : "#10B981"} stopOpacity={isDark ? 0.9 : 0.8} />
              <stop offset="40%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Subtle Core Glow Filter */}
            <filter id="ib-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ambient Inner Backdrop Glow */}
          <rect
            className="logo-ambient-glow"
            x="10"
            y="10"
            width="80"
            height="80"
            rx="20"
            fill="url(#ib-cyber-grad)"
            opacity="0"
          />

          {/* Outer Squircle Architectural Frame */}
          <rect
            className="draw-stroke logo-frame"
            x="8"
            y="8"
            width="84"
            height="84"
            rx="22"
            stroke="url(#ib-frame-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Corner Cybernetic Traces */}
          <path
            className="draw-stroke logo-accent"
            d="M 18 34 L 18 20 L 34 20"
            stroke={isDark ? "#06B6D4" : "#0D9488"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="draw-stroke logo-accent"
            d="M 82 66 L 82 80 L 66 80"
            stroke={isDark ? "#10B981" : "#059669"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* --- MONOGRAM 'I' --- */}
          {/* Top Horizontal Cap */}
          <path
            className="draw-stroke logo-stem"
            d="M 22 25 H 42"
            stroke="url(#ib-cyber-grad)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Vertical Neural Stem */}
          <path
            className="draw-stroke logo-stem"
            d="M 32 25 V 75"
            stroke="url(#ib-cyber-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Bottom Horizontal Cap */}
          <path
            className="draw-stroke logo-stem"
            d="M 22 75 H 42"
            stroke="url(#ib-cyber-grad)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Synapse Data Bridge connecting 'I' to 'B' */}
          <path
            className="draw-stroke logo-stem"
            d="M 32 50 H 48"
            stroke={isDark ? "#38BDF8" : "#0284C7"}
            strokeWidth="3"
            strokeDasharray="2 2"
            strokeLinecap="round"
          />

          {/* --- MONOGRAM 'B' --- */}
          {/* Vertical Backbone */}
          <path
            className="draw-stroke logo-stem"
            d="M 48 25 V 75"
            stroke="url(#ib-cyber-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Upper Precision Arc */}
          <path
            className="draw-stroke logo-loop"
            d="M 48 25 H 64 C 73.5 25 79.5 30.5 79.5 37.5 C 79.5 44.5 73.5 50 64 50 H 48"
            stroke="url(#ib-cyber-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Lower Precision Arc */}
          <path
            className="draw-stroke logo-loop"
            d="M 48 50 H 66 C 76.5 50 82.5 55.5 82.5 62.5 C 82.5 69.5 76.5 75 66 75 H 48"
            stroke="url(#ib-cyber-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* --- NEURAL CIRCUIT NODES --- */}
          {/* Top 'I' Node */}
          <circle className="logo-node" cx="32" cy="25" r="3" fill="#10B981" />
          {/* Mid Bridge Node */}
          <circle className="logo-node" cx="32" cy="50" r="3.2" fill="#06B6D4" />
          {/* Bottom 'I' Node */}
          <circle className="logo-node" cx="32" cy="75" r="3" fill="#3B82F6" />
          {/* Backbone Center Node */}
          <circle className="logo-node" cx="48" cy="50" r="3" fill="#38BDF8" />
          {/* Upper 'B' Apex Node */}
          <circle className="logo-node" cx="79.5" cy="37.5" r="3" fill="#10B981" />
          {/* Lower 'B' Apex Node */}
          <circle className="logo-node" cx="82.5" cy="62.5" r="3.2" fill="#06B6D4" />

          {/* Radiant Synapse Pulse Ring */}
          <circle
            className="logo-pulse-ring"
            cx="32"
            cy="50"
            r="8"
            stroke="#10B981"
            strokeWidth="1.5"
            fill="none"
            opacity="0"
          />
        </svg>
      </div>

      {showBadgeText && (
        <div className="flex flex-col text-left">
          <span className={`font-extrabold text-xs sm:text-sm tracking-tight transition-colors ${
            isDark ? "text-white group-hover/logo:text-emerald-400" : "text-zinc-900 group-hover/logo:text-emerald-700"
          }`}>
            Idew Bayu
          </span>
          <span className={`text-[10px] sm:text-[11px] font-medium leading-tight ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}>
            CADS | ML and Systems
          </span>
        </div>
      )}
    </div>
  );
};
