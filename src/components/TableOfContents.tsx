import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, X, ArrowUpRight } from 'lucide-react';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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

  // Lock background scrolling when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  const handleClick = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    sounds.playClick();
    setIsDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeIndex = TOC_ITEMS.findIndex((t) => t.id === activeId);
  const activeItem = TOC_ITEMS[activeIndex] || TOC_ITEMS[0];

  return (
    <>
      {/* 1. DESKTOP LEFT RAIL (Poor Charlie's Almanack / Stripe Press style) */}
      <aside
        aria-label="Table of Contents"
        className="fixed left-5 xl:left-8 2xl:left-12 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-start select-none"
      >
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
                  className={`h-[2.5px] rounded-full transition-all duration-300 ${isActive
                    ? isDark
                      ? "bg-white shadow-[0_0_14px_rgba(255,255,255,0.85)] scale-y-125"
                      : "bg-zinc-950 shadow-[0_0_10px_rgba(0,0,0,0.35)] scale-y-125"
                    : isHovered
                      ? isDark
                        ? "bg-white shadow-[0_0_14px_rgba(255,255,255,0.85)] scale-y-125"
                        : "bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)] scale-y-125"
                      : isDark
                        ? "bg-zinc-700/60 group-hover/item:bg-zinc-400"
                        : "bg-zinc-400/80 group-hover/item:bg-zinc-800"
                    }`}
                />

                {/* Inline Label Right Next to Active / Hovered Bar */}
                <div className="flex items-center overflow-hidden">
                  <span
                    className={`text-xs tracking-tight font-extrabold transition-all duration-300 whitespace-nowrap ${isActive
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
        <div className={`mt-3 pl-1 text-[10px] font-mono font-bold tracking-widest ${isDark ? "text-zinc-600" : "text-zinc-500"
          }`}>
          {String(activeIndex + 1).padStart(2, "0")} / {String(TOC_ITEMS.length).padStart(2, "0")}
        </div>
      </aside>

      {/* 2. MOBILE & TABLET FLOATING CHAPTER CAPSULE (Screens < 1280px) */}
      <div className="xl:hidden fixed bottom-[4.25rem] left-1/2 -translate-x-1/2 z-40 select-none">
        <button
          onClick={() => {
            sounds.playClick();
            setIsDrawerOpen(true);
          }}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-full backdrop-blur-2xl border shadow-xl flex items-center gap-2.5 text-xs transition-all duration-200 active:scale-95 ${isDark
            ? "bg-zinc-900/95 border-white/15 text-zinc-100 shadow-2xl shadow-black/80 hover:bg-zinc-800"
            : "bg-white/95 border-zinc-300 text-zinc-900 shadow-xl shadow-zinc-400/30 hover:bg-zinc-50"
            }`}
          aria-label="Open Table of Contents"
        >
          {/* Mini Graduated Wedge Icon */}
          <div className="flex flex-col gap-[2.5px] items-start shrink-0">
            <span className={`h-[2px] w-3.5 rounded-full ${isDark ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" : "bg-black"}`} />
            <span className={`h-[2px] w-2.5 rounded-full ${isDark ? "bg-zinc-500" : "bg-zinc-400"}`} />
            <span className={`h-[2px] w-1.5 rounded-full ${isDark ? "bg-zinc-600" : "bg-zinc-400"}`} />
          </div>

          {/* Active Counter */}
          <span className={`font-mono font-extrabold text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
            {String(activeIndex + 1).padStart(2, "0")}/{String(TOC_ITEMS.length).padStart(2, "0")}
          </span>

          <span className="w-px h-3 bg-zinc-700/40" />

          {/* Active Section Label */}
          <span className="font-extrabold tracking-tight max-w-[130px] sm:max-w-[180px] truncate">
            {activeItem.shortLabel}
          </span>

          <ChevronUp className={`w-3.5 h-3.5 ${isDark ? "text-zinc-400" : "text-zinc-500"}`} />
        </button>
      </div>

      {/* 3. MOBILE & TABLET SLIDE-UP BOTTOM SHEET DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="xl:hidden fixed inset-0 z-50 flex flex-col justify-end">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                sounds.playClick();
                setIsDrawerOpen(false);
              }}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className={`relative z-10 w-full max-h-[82vh] rounded-t-3xl border-t shadow-2xl flex flex-col overflow-hidden ${isDark
                ? "bg-[#0A0A0C] border-white/15 text-white"
                : "bg-white border-zinc-200 text-zinc-900"
                }`}
            >
              {/* Top Grab Handle */}
              <div className="pt-3 pb-1 flex justify-center">
                <div className={`w-10 h-1 rounded-full ${isDark ? "bg-zinc-700" : "bg-zinc-300"}`} />
              </div>

              {/* Drawer Header */}
              <div className={`px-5 py-3 border-b flex items-center justify-between ${isDark ? "border-white/10" : "border-zinc-200"
                }`}>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest font-extrabold text-zinc-500">
                      Table of Contents
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${isDark ? "bg-zinc-800 text-zinc-300" : "bg-zinc-100 text-zinc-700"
                      }`}>
                      {String(activeIndex + 1).padStart(2, "0")} of {String(TOC_ITEMS.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold tracking-tight">
                    Portfolio Navigation
                  </h3>
                </div>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setIsDrawerOpen(false);
                  }}
                  className={`min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-xl transition-colors ${isDark
                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    : "text-zinc-500 hover:text-black hover:bg-zinc-100"
                    }`}
                  aria-label="Close Table of Contents"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Poor Charlie's Almanack List in Full Glory */}
              <div className="overflow-y-auto max-h-[calc(82vh-100px)] px-4 py-3 space-y-1.5 pb-8">
                {TOC_ITEMS.map((item, index) => {
                  const isActive = activeId === item.id;
                  const baseWidth = Math.max(16, 44 - index * 3);

                  return (
                    <button
                      key={item.id}
                      onClick={(e) => handleClick(item.id, e)}
                      className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left transition-all duration-200 active:scale-[0.99] ${isActive
                        ? isDark
                          ? "bg-zinc-900 border border-white/20 shadow-lg shadow-white/5"
                          : "bg-zinc-100 border border-zinc-300 shadow-sm"
                        : isDark
                          ? "hover:bg-zinc-900/60 border border-transparent"
                          : "hover:bg-zinc-50 border border-transparent"
                        }`}
                    >
                      {/* Left: Graduated Line + Number + Label */}
                      <div className="flex items-center gap-3.5 min-w-0 pr-3">
                        {/* Signature Graduated Line */}
                        <div
                          style={{ width: `${baseWidth}px` }}
                          className={`h-[3px] rounded-full shrink-0 transition-all ${isActive
                            ? isDark
                              ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-y-125"
                              : "bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)] scale-y-125"
                            : isDark
                              ? "bg-zinc-700"
                              : "bg-zinc-300"
                            }`}
                        />

                        {/* Two-digit number */}
                        <span className={`text-xs font-mono font-bold shrink-0 ${isActive
                          ? isDark ? "text-white" : "text-black"
                          : "text-zinc-500"
                          }`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Section Full Label */}
                        <span className={`text-sm font-bold tracking-tight truncate ${isActive
                          ? isDark ? "text-white" : "text-zinc-950"
                          : isDark ? "text-zinc-300" : "text-zinc-700"
                          }`}>
                          {item.label}
                        </span>
                      </div>

                      {/* Right: Active Indicator or Arrow */}
                      {isActive ? (
                        <span className="shrink-0 flex items-center gap-1.5 text-xs font-extrabold text-emerald-500">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="hidden xs:inline">Active</span>
                        </span>
                      ) : (
                        <ArrowUpRight className={`w-4 h-4 shrink-0 transition-opacity ${isDark ? "text-zinc-600" : "text-zinc-400"
                          }`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
