import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface DraftingRuleLineProps {
  className?: string;
  isDark?: boolean;
}

/**
 * DraftingRuleLine (Nomor 2)
 * Garis aksen cetak biru arsitektural di bawah headline Hero.
 * 
 * Karakter:
 * - Anti-neon, murni estetika teknikal presisi (Swiss design / architectural drafting).
 * - Garis hairline 1px yang meluncur menggambar dari kiri ke kanan menggunakan GSAP.
 * - Dilengkapi mistar koordinat mikro, aksen sudut, dan penanda pusat geometris.
 */
export const DraftingRuleLine: React.FC<DraftingRuleLineProps> = ({
  className = "",
  isDark = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const mainLine = svg.querySelector<SVGLineElement>('.drafting-main-line');
      const ticks = svg.querySelectorAll<SVGLineElement>('.drafting-tick');
      const centerMark = svg.querySelector<SVGPolygonElement>('.drafting-center');
      const labels = svg.querySelectorAll<SVGTextElement>('.drafting-label');

      // 1. Prepare main stroke
      if (mainLine) {
        const len = mainLine.getTotalLength ? mainLine.getTotalLength() : 600;
        gsap.set(mainLine, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 1,
        });
      }

      // 2. Prepare ticks and center mark
      if (ticks.length > 0) {
        gsap.set(ticks, { scaleY: 0, transformOrigin: 'center center', opacity: 0 });
      }
      if (centerMark) {
        gsap.set(centerMark, { scale: 0, transformOrigin: 'center center', opacity: 0 });
      }
      if (labels.length > 0) {
        gsap.set(labels, { opacity: 0 });
      }

      // 3. GSAP Timeline with silky power2.out easing
      const tl = gsap.timeline({
        delay: 0.35,
        defaults: { ease: 'power2.out' },
      });

      // Meluncurkan garis utama dari kiri ke kanan
      if (mainLine) {
        tl.to(mainLine, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: 'power3.out',
        });
      }

      // Titik tengah muncul lembut
      if (centerMark) {
        tl.to(
          centerMark,
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(2)',
          },
          '-=0.6'
        );
      }

      // Garis-garis mistar vertikal muncul berurutan (stagger)
      if (ticks.length > 0) {
        tl.to(
          ticks,
          {
            scaleY: 1,
            opacity: 0.8,
            duration: 0.35,
            stagger: 0.02,
            ease: 'power2.out',
          },
          '-=0.5'
        );
      }

      // Label teks teknikal mikro memudar masuk
      if (labels.length > 0) {
        tl.to(
          labels,
          {
            opacity: 0.7,
            duration: 0.5,
            stagger: 0.1,
            ease: 'sine.out',
          },
          '-=0.3'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);

  const lineColor = isDark ? "#3F3F46" : "#D4D4D8";      // zinc-700 / zinc-300
  const tickColor = isDark ? "#52525B" : "#A1A1AA";      // zinc-600 / zinc-400
  const centerColor = isDark ? "#E4E4E7" : "#27272A";    // zinc-200 / zinc-800
  const textColor = isDark ? "#71717A" : "#71717A";      // zinc-500

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl py-1 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 600 18"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Garis Horizontal Utama */}
        <line
          className="drafting-main-line"
          x1="0"
          y1="9"
          x2="600"
          y2="9"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Penanda Ujung Kiri & Kanan */}
        <line className="drafting-tick" x1="0" y1="3" x2="0" y2="15" stroke={tickColor} strokeWidth="1.5" />
        <line className="drafting-tick" x1="600" y1="3" x2="600" y2="15" stroke={tickColor} strokeWidth="1.5" />

        {/* Mistar Interval Mikro (Ruler Subdivisions) */}
        <line className="drafting-tick" x1="60" y1="6" x2="60" y2="12" stroke={tickColor} strokeWidth="1" />
        <line className="drafting-tick" x1="120" y1="7" x2="120" y2="11" stroke={tickColor} strokeWidth="1" />
        <line className="drafting-tick" x1="180" y1="6" x2="180" y2="12" stroke={tickColor} strokeWidth="1" />
        <line className="drafting-tick" x1="240" y1="7" x2="240" y2="11" stroke={tickColor} strokeWidth="1" />
        <line className="drafting-tick" x1="360" y1="7" x2="360" y2="11" stroke={tickColor} strokeWidth="1" />
        <line className="drafting-tick" x1="420" y1="6" x2="420" y2="12" stroke={tickColor} strokeWidth="1" />
        <line className="drafting-tick" x1="480" y1="7" x2="480" y2="11" stroke={tickColor} strokeWidth="1" />
        <line className="drafting-tick" x1="540" y1="6" x2="540" y2="12" stroke={tickColor} strokeWidth="1" />

        {/* Penanda Titik Tengah Geometris (Precision Diamond Datum) */}
        <polygon
          className="drafting-center"
          points="300,5 304,9 300,13 296,9"
          fill={centerColor}
        />

        {/* Teks Mikro Koordinat Arsitektur */}
        <text
          className="drafting-label text-[7px] font-mono tracking-widest uppercase"
          x="12"
          y="6.5"
          fill={textColor}
          fontSize="6.5"
          fontFamily="ui-monospace, monospace"
        >
          SYS.ML // 01
        </text>
        <text
          className="drafting-label text-[7px] font-mono tracking-widest uppercase"
          x="530"
          y="6.5"
          fill={textColor}
          fontSize="6.5"
          fontFamily="ui-monospace, monospace"
        >
          CADS.2026
        </text>
      </svg>
    </div>
  );
};
