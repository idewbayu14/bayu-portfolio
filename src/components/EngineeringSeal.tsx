import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { sounds } from '../utils/audio';

interface EngineeringSealProps {
  size?: number;
  className?: string;
  isDark?: boolean;
}

/**
 * EngineeringSeal (Nomor 1)
 * Segel Monogram Teknik pada Kartu Foto Hero.
 * 
 * Karakter:
 * - Bentuk stempel lingkaran teknikal presisi (Swiss precision engineering seal).
 * - Cincin luar berkalibrasi mikro yang menggambar melingkar dengan GSAP.
 * - Monogram "IB" di bagian tengah yang digambar dengan garis hairline lembut.
 * - Anti-neon, murni palet monokrom platinum dan abu-abu arsitektural.
 */
export const EngineeringSeal: React.FC<EngineeringSealProps> = ({
  size = 32,
  className = "",
  isDark = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const outerRing = svg.querySelector<SVGCircleElement>('.seal-outer-ring');
      const innerRing = svg.querySelector<SVGCircleElement>('.seal-inner-ring');
      const monogramStrokes = svg.querySelectorAll<SVGGeometryElement>('.seal-stroke');
      const dots = svg.querySelectorAll<SVGCircleElement>('.seal-dot');

      // 1. Ukur dan pasang stroke awal untuk lingkaran
      [outerRing, innerRing].forEach((ring) => {
        if (ring) {
          const len = ring.getTotalLength ? ring.getTotalLength() : 250;
          gsap.set(ring, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 1,
          });
        }
      });

      // 2. Pasang stroke awal untuk monogram IB
      monogramStrokes.forEach((stroke) => {
        const len = stroke.getTotalLength ? stroke.getTotalLength() : 100;
        gsap.set(stroke, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 1,
        });
      });

      if (dots.length > 0) {
        gsap.set(dots, { scale: 0, opacity: 0, transformOrigin: 'center center' });
      }

      // 3. Master Timeline
      const tl = gsap.timeline({
        delay: 0.45,
        defaults: { ease: 'power2.out' },
      });

      tlRef.current = tl;

      // Cincin luar menggambar melingkar
      if (outerRing) {
        tl.to(outerRing, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'power2.inOut',
        });
      }

      // Cincin dalam menggambar berlawanan arah
      if (innerRing) {
        tl.to(
          innerRing,
          {
            strokeDashoffset: 0,
            duration: 0.75,
            ease: 'power2.out',
          },
          '-=0.6'
        );
      }

      // Monogram IB tengah menggambar presisi
      if (monogramStrokes.length > 0) {
        tl.to(
          monogramStrokes,
          {
            strokeDashoffset: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.45'
        );
      }

      // Titik aksen mikro muncul perlahan
      if (dots.length > 0) {
        tl.to(
          dots,
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            stagger: 0.04,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    if (tlRef.current) {
      tlRef.current.restart();
    }
  };

  const ringColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)";
  const dashColor = isDark ? "#71717A" : "#A1A1AA";
  const mainColor = isDark ? "#F4F4F5" : "#18181B";
  const dotColor = isDark ? "#E4E4E7" : "#27272A";

  return (
    <div
      ref={containerRef}
      onClick={handleReplay}
      onMouseEnter={() => sounds.playHover()}
      title="Segel Teknik IB (Klik untuk memutar ulang)"
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group/seal rounded-full transition-transform active:scale-95 ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className={`w-full h-full rounded-full flex items-center justify-center p-0.5 border transition-all duration-300 ${
          isDark
            ? "bg-zinc-950/90 border-white/10 group-hover/seal:border-white/30 shadow-specular-dark"
            : "bg-white border-black/10 group-hover/seal:border-black/25 shadow-xs"
        }`}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cincin Kalibrasi Teknis Luar (Dotted Ring) */}
          <circle
            className="seal-outer-ring"
            cx="50"
            cy="50"
            r="44"
            stroke={dashColor}
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />

          {/* Cincin Presisi Dalam */}
          <circle
            className="seal-inner-ring"
            cx="50"
            cy="50"
            r="38"
            stroke={ringColor}
            strokeWidth="1"
          />

          {/* --- MONOGRAM IB MINIMALIS DI TENGAH --- */}
          {/* Batang Huruf I */}
          <line
            className="seal-stroke"
            x1="38"
            y1="34"
            x2="38"
            y2="66"
            stroke={mainColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Serip Atas & Bawah Huruf I */}
          <line
            className="seal-stroke"
            x1="33"
            y1="34"
            x2="43"
            y2="34"
            stroke={mainColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            className="seal-stroke"
            x1="33"
            y1="66"
            x2="43"
            y2="66"
            stroke={mainColor}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Batang Huruf B */}
          <line
            className="seal-stroke"
            x1="50"
            y1="34"
            x2="50"
            y2="66"
            stroke={mainColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Lengkungan Atas Huruf B */}
          <path
            className="seal-stroke"
            d="M 50 34 H 60 C 66 34 70 37.5 70 42 C 70 46.5 66 50 60 50 H 50"
            stroke={mainColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Lengkungan Bawah Huruf B */}
          <path
            className="seal-stroke"
            d="M 50 50 H 62 C 68 50 72 54 72 58 C 72 62 68 66 62 66 H 50"
            stroke={mainColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Titik Aksen Kompas Geometris */}
          <circle className="seal-dot" cx="50" cy="12" r="1.8" fill={dotColor} />
          <circle className="seal-dot" cx="50" cy="88" r="1.8" fill={dotColor} />
          <circle className="seal-dot" cx="12" cy="50" r="1.8" fill={dotColor} />
          <circle className="seal-dot" cx="88" cy="50" r="1.8" fill={dotColor} />
        </svg>
      </div>
    </div>
  );
};
