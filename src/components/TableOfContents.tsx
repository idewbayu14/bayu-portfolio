import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/audio';

export interface TocItem {
  id: string;
  label: string;
  shortLabel: string;
}

const TOC_ITEMS: TocItem[] = [
  { id: "overview", label: "Overview and Profile", shortLabel: "Overview" },
  { id: "impact", label: "Measurable Impact", shortLabel: "Impact Metrics" },
  { id: "batari-bysense", label: "BySense Solar IoT", shortLabel: "BySense IoT" },
  { id: "zoom-petcare", label: "Zoom Petcare OCR", shortLabel: "Zoom Petcare" },
  { id: "brin-autonomous", label: "BRIN Autonomous AI", shortLabel: "BRIN Vehicle AI" },
  { id: "nutrimood-recommender", label: "NutriMood Recommender", shortLabel: "NutriMood" },
  { id: "cimahi-battery", label: "CBI Battery Platform", shortLabel: "CBI Platform" },
  { id: "skills", label: "Engineering Stack", shortLabel: "Technical Stack" },
  { id: "credentials", label: "Education and CADS", shortLabel: "Credentials" }
];

interface TableOfContentsProps {
  isDark: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ isDark }) => {
  const [activeId, setActiveId] = useState<string>("overview");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;

      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const item = TOC_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Table of Contents"
      className="fixed left-5 xl:left-8 2xl:left-12 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-start select-none"
    >
      {/* Graduated Horizontal Bars (Poor Charlie's Almanack / Stripe Press style) */}
      <nav className="flex flex-col gap-2.5 items-start py-2">
        {TOC_ITEMS.map((item, index) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;

          // Graduated base width creating the signature architectural wedge
          const baseWidth = Math.max(22, 56 - index * 3.5);
          const barWidth = isHovered ? 64 : isActive ? 58 : baseWidth;

          return (
            <div
              key={item.id}
              className="flex items-center gap-3.5 group/item cursor-pointer py-0.5"
              onClick={(e) => handleClick(item.id, e)}
              onMouseEnter={() => {
                setHoveredId(item.id);
                sounds.playHover();
              }}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Horizontal Line Bar */}
              <div
                style={{ width: `${barWidth}px` }}
                className={`h-[2.5px] rounded-full transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? "bg-white shadow-[0_0_14px_rgba(255,255,255,0.85)] scale-y-125"
                      : "bg-zinc-950 shadow-[0_0_10px_rgba(0,0,0,0.35)] scale-y-125"
                    : isHovered
                    ? isDark
                      ? "bg-zinc-300"
                      : "bg-zinc-600"
                    : isDark
                    ? "bg-zinc-700/60 group-hover/item:bg-zinc-400"
                    : "bg-zinc-300 group-hover/item:bg-zinc-400"
                }`}
              />

              {/* Inline Label Right Next to Active / Hovered Bar (Exactly like Poor Charlie's Almanack in Image 2) */}
              <div className="flex items-center overflow-hidden">
                <span
                  className={`text-xs tracking-tight font-extrabold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? isDark
                        ? "text-white opacity-100 translate-x-0"
                        : "text-zinc-950 opacity-100 translate-x-0"
                      : isHovered
                      ? isDark
                        ? "text-zinc-300 opacity-90 translate-x-0"
                        : "text-zinc-700 opacity-90 translate-x-0"
                      : "opacity-0 -translate-x-3 pointer-events-none w-0"
                  }`}
                >
                  {item.shortLabel}
                </span>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Subtle Index Number at bottom */}
      <div className={`mt-3 pl-1 text-[10px] font-mono font-bold tracking-widest ${
        isDark ? "text-zinc-600" : "text-zinc-400"
      }`}>
        {String(TOC_ITEMS.findIndex((t) => t.id === activeId) + 1).padStart(2, "0")} / {String(TOC_ITEMS.length).padStart(2, "0")}
      </div>
    </aside>
  );
};
