import React from 'react';
import { sounds } from '../utils/audio';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

/**
 * 1. BySense (PT Batari Energy)
 * Uses official BySense 512x512 app icon + revolving orbital telemetry ring on hover
 */
export const BySenseLogo: React.FC<LogoProps> = ({ className = "w-12 h-12", isDark = true }) => {
  return (
    <div
      onMouseEnter={() => sounds.playHover()}
      className={`relative ${className} rounded-2xl flex items-center justify-center p-2 border backdrop-blur-xl transition-all duration-300 group/logo overflow-hidden cursor-pointer select-none ${
        isDark
          ? "bg-zinc-900/90 border-white/15 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] shadow-specular-dark"
          : "bg-white border-black/10 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] shadow-xs"
      }`}
    >
      {/* Revolving Solar Telemetry Ring on Hover */}
      <div className="absolute inset-0.5 rounded-2xl border border-amber-400/30 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Background Solar Flare Glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Official BySense Icon */}
      <img
        src="/projects/bysense-icon.png"
        alt="BySense Logo"
        className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-3 drop-shadow"
      />
    </div>
  );
};

/**
 * 2. Zoom Petcare Bandung
 * Uses official Zoom Petcare user-uploaded logo + interactive optical laser scanline sweep
 */
export const ZoomPetcareLogo: React.FC<LogoProps> = ({ className = "w-12 h-12", isDark = true }) => {
  return (
    <div
      onMouseEnter={() => sounds.playHover()}
      className={`relative ${className} rounded-2xl flex items-center justify-center p-1.5 border backdrop-blur-xl transition-all duration-300 group/logo overflow-hidden cursor-pointer select-none ${
        isDark
          ? "bg-zinc-900/90 border-white/15 hover:border-red-400/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] shadow-specular-dark"
          : "bg-white border-black/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] shadow-xs"
      }`}
    >
      {/* Optical OCR Laser Scanline sweep on hover */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent -top-2 group-hover/logo:top-full transition-all duration-700 ease-in-out opacity-0 group-hover/logo:opacity-100 z-20 pointer-events-none" />

      {/* Background Warm Amber Glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Official Zoom Petcare Emblem */}
      <img
        src="/projects/zoom-petcare-logo.jpg"
        alt="Zoom Petcare Logo"
        className="w-full h-full object-cover rounded-xl relative z-10 transition-transform duration-500 group-hover/logo:scale-105 drop-shadow"
      />
    </div>
  );
};

/**
 * 3. BRIN (Badan Riset dan Inovasi Nasional)
 * Uses official high-res BRIN emblem + radiating research radar pulse waves on hover
 */
export const BrinLogo: React.FC<LogoProps> = ({ className = "w-12 h-12", isDark = true }) => {
  return (
    <div
      onMouseEnter={() => sounds.playHover()}
      className={`relative ${className} rounded-2xl flex items-center justify-center p-2 border backdrop-blur-xl transition-all duration-300 group/logo overflow-hidden cursor-pointer select-none ${
        isDark
          ? "bg-zinc-900/90 border-white/15 hover:border-red-400/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] shadow-specular-dark"
          : "bg-white border-black/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] shadow-xs"
      }`}
    >
      {/* Concentric Radar Pulse Ring on Hover */}
      <div className="absolute inset-1 rounded-xl border border-red-500/30 opacity-0 group-hover/logo:opacity-100 group-hover/logo:scale-125 transition-all duration-700 pointer-events-none" />
      
      {/* Luminous Red Glow */}
      <div className="absolute inset-0 bg-radial from-red-500/15 via-transparent to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Official BRIN Logo */}
      <img
        src="/projects/brin-official.png"
        alt="BRIN Logo"
        className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover/logo:scale-110 drop-shadow"
      />
    </div>
  );
};

/**
 * 4. NutriMood (Personalized Nutrition Recommender)
 * Uses official user-uploaded NutriMood N-sprout logo on clean white canvas for crisp dark-mode contrast
 */
export const NutriMoodLogo: React.FC<LogoProps> = ({ className = "w-12 h-12", isDark = true }) => {
  return (
    <div
      onMouseEnter={() => sounds.playHover()}
      className={`relative ${className} rounded-2xl flex items-center justify-center p-2 border transition-all duration-300 group/logo overflow-hidden cursor-pointer select-none bg-white ${
        isDark
          ? "border-white/20 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.35)] shadow-lg shadow-black/40"
          : "border-black/10 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] shadow-xs"
      }`}
    >
      {/* Organic Emerald Pulse Ring */}
      <div className="absolute inset-0.5 rounded-2xl border border-emerald-400/30 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Background Emerald & Orange Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-orange-500/10 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Official NutriMood Logo */}
      <img
        src="/projects/nutrimood-logo.png"
        alt="NutriMood Logo"
        className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover/logo:scale-110 drop-shadow-xs"
      />
    </div>
  );
};

/**
 * 5. PT Cimahi Battery Indonesia (CBI)
 * Uses official CBI transparent PNG on clean white canvas for crystal-clear industrial branding in dark mode
 */
export const CbiLogo: React.FC<LogoProps> = ({ className = "w-14 h-12", isDark = true }) => {
  return (
    <div
      onMouseEnter={() => sounds.playHover()}
      className={`relative ${className} rounded-2xl flex items-center justify-center px-2.5 py-1.5 border transition-all duration-300 group/logo overflow-hidden cursor-pointer select-none bg-white ${
        isDark
          ? "border-white/20 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] shadow-lg shadow-black/40"
          : "border-black/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] shadow-xs"
      }`}
    >
      {/* Background Energy Glow */}
      <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Official CBI Logo */}
      <img
        src="/projects/logoCBI.png"
        alt="CBI Logo"
        className="max-w-full max-h-full object-contain relative z-10 transition-transform duration-500 group-hover/logo:scale-110 drop-shadow-xs"
      />
    </div>
  );
};
