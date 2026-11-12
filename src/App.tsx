import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Layers,
  Copy,
  Check,
  Moon,
  Sun,
  X,
  ChevronRight,
  Maximize2,
  Terminal,
  Cpu,
  Globe,
  Mail,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M5.07 18.5h2.78v-8.37H5.07v8.37z" />
    </svg>
  );
}

interface ProjectImage {
  url: string;
  caption: string;
}

interface Project {
  id: string;
  number: string;
  title: string;
  context: string;
  year: string;
  category: 'ml' | 'web';
  badge: string;
  featured: boolean;
  liveUrl: string;
  domain: string;
  summary: string;
  deliverables: string[];
  architecture: string;
  stack: string[];
  images: ProjectImage[];
}

const PROFILE = {
  name: "I Dewa Nyoman Bayu Satria Wibawa",
  shortName: "Bayu Satria",
  role: "Machine Learning & Software Engineering",
  status: "Available for ML & Full Stack Engineering Roles",
  tagline:
    "Membangun model Machine Learning skala produksi, arsitektur NLP sentiment telemetry, serta web dashboard monitoring IoT secara real-time.",
  email: "idewanyomanbayusw@gmail.com",
  linkedin: "https://www.linkedin.com/in/idewanyomanbayu",
  github: "https://github.com/idewbayu14",
  avatar: "/profile/bayu.jpg"
};

const SKILL_GROUPS = [
  {
    category: "Machine Learning & Data",
    icon: Cpu,
    skills: ["Python", "PyTorch", "NLP", "Scikit-Learn", "Deep Learning", "Data Scraping", "Sentiment Analysis", "Recommender Systems"]
  },
  {
    category: "Full Stack & IoT Telemetry",
    icon: Globe,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST API", "IoT Telemetry", "Real-time Telemetry", "Responsive UI"]
  },
  {
    category: "Workflow & Cloud Platforms",
    icon: Terminal,
    skills: ["Git & GitHub", "Vercel Deployment", "Docker", "Linux Shell", "API Integration", "Core Web Vitals", "Production Monitoring"]
  }
];

const PROJECTS: Project[] = [
  {
    id: "brin",
    number: "01",
    title: "Autonomous Vehicle Sentiment Analysis Dashboard",
    context: "Badan Riset dan Inovasi Nasional (BRIN)",
    year: "2026",
    category: "ml",
    badge: "Machine Learning & NLP",
    featured: true,
    liveUrl: "https://brin-project-kp.vercel.app/",
    domain: "brin-project-kp.vercel.app",
    summary:
      "Platform klasifikasi teks berbasis Deep Learning yang menganalisis sentimen opini publik dari YouTube dan Reddit untuk mengevaluasi kesiapan konsumen terhadap kendaraan otonom Level 2.",
    deliverables: [
      "Melatih model deep learning Natural Language Processing untuk mengklasifikasi sentimen publik secara akurat (positif, netral, negatif).",
      "Membangun pipeline pengumpulan data otomatis dari multi-platform sosial untuk pemantauan berkelanjutan.",
      "Menyediakan REST API inferensi cepat yang terhubung langsung ke dashboard analitik riset interaktif."
    ],
    architecture:
      "Scraping data teks multi-sumber diproses melalui normalisasi dan tokenisasi teks kustom, disajikan via inference API model klasifikasi ke antarmuka telemetri React.",
    stack: ["Python", "Deep Learning", "NLP", "Web Scraping", "REST API", "React"],
    images: [
      {
        url: "/projects/brin-hero.png",
        caption: "Portal Riset & Arsitektur Klasifikasi Sentimen Kendaraan Otonom Level 2"
      },
      {
        url: "/projects/brin-analyzer.png",
        caption: "Antarmuka Sentiment Analyzer Interaktif (Single Text & Batch Analysis)"
      }
    ]
  },
  {
    id: "nutrimood",
    number: "02",
    title: "NutriMood Personalized Dietary Recommender",
    context: "Dicoding & DBS Foundation Capstone",
    year: "2025",
    category: "ml",
    badge: "Machine Learning & AI",
    featured: true,
    liveUrl: "https://nutrimoodv.vercel.app/",
    domain: "nutrimoodv.vercel.app",
    summary:
      "Aplikasi rekomendasi pola makan pintar yang memetakan kondisi psikologis emosional pengguna serta batasan kesehatan pribadi menjadi saran menu makanan harian yang presisi.",
    deliverables: [
      "Merancang algoritma rekomendasi terpersonalisasi yang mengevaluasi input mood pengguna bersama pantangan medis pengguna.",
      "Membangun pipeline end-to-end preprocessing data nutrisi dan pencocokan fitur hidangan khas nusantara.",
      "Mendeploy model terlatih sebagai cloud REST API yang terintegrasi mulus ke aplikasi web responsif."
    ],
    architecture:
      "Input mood pengguna dan batasan nutrisi diolah oleh inference service Machine Learning, disajikan secara instan via cloud web application teroptimasi.",
    stack: ["Machine Learning", "Recommender System", "Python", "Data Preprocessing", "REST API", "Web App"],
    images: [
      {
        url: "/projects/nutrimood-hero.jpg",
        caption: "Halaman Utama NutriMood — Rekomendasi Makanan Berdasarkan Analisis AI"
      },
      {
        url: "/projects/nutrimood-demo.jpg",
        caption: "Demo Analisis Mood & Kondisi Kesehatan (Energizing, Relaxing, Focusing, dll)"
      }
    ]
  },
  {
    id: "bysense",
    number: "03",
    title: "BySense Solar Panel Monitoring System",
    context: "Batari Energy R&D Engineering",
    year: "2026",
    category: "web",
    badge: "IoT & Full Stack System",
    featured: false,
    liveUrl: "https://bysense.batarienergy.com/",
    domain: "bysense.batarienergy.com",
    summary:
      "Dashboard telemetri IoT lintas platform untuk pemantauan live daya pembangkit photovoltaic (PV), prediksi radiasi matahari, dan analisis konsumsi energi di seluruh stasiun pembangkit.",
    deliverables: [
      "Mengembangkan arsitektur aplikasi web responsif dan mobile interface lengkap dengan analitik kurva daya interaktif.",
      "Mengintegrasikan aliran data radiasi matahari dan inverter API untuk mendeteksi anomali performa secara dini.",
      "Melakukan pengujian komprehensif, debugging performa, dan deployment rilis produksi."
    ],
    architecture:
      "Telemetri inverter panel surya di lokasi dan feed sensor cuaca diintegrasikan lewat modular REST APIs, dirender secara interaktif pada web dashboard dan aplikasi Android.",
    stack: ["React", "Next.js", "React Native", "REST API", "IoT Telemetry", "Data Visualization"],
    images: [
      {
        url: "/projects/bysense-map.jpg",
        caption: "Peta Interaktif Sebaran Stasiun Pembangkit Listrik Tenaga Surya se-Indonesia"
      },
      {
        url: "/projects/bysense-metrics.jpg",
        caption: "Telemetri Kurva Daya Real-Time, Produksi Harian, dan Diagram Energy Flow"
      },
      {
        url: "/projects/bysense-cloud.png",
        caption: "Dashboard Portofolio Multi-Plant Cloud Telemetry dengan Tabel Status Operasional"
      },
      {
        url: "/projects/bysense-power.png",
        caption: "Grafik Power Profile Komparatif (PV, Grid, Battery, Load Consumption & SoC)"
      }
    ]
  },
  {
    id: "cimahi",
    number: "04",
    title: "Cimahi Battery Commercial Web Platform",
    context: "Production Web Deployment",
    year: "2026",
    category: "web",
    badge: "Commercial Web Platform",
    featured: false,
    liveUrl: "https://cimahibattery.com/",
    domain: "cimahibattery.com",
    summary:
      "Platform web komersial performa tinggi untuk katalog sel baterai lithium prismatik, custom battery pack, dan material riset energi nasional dengan optimasi pencarian terstruktur.",
    deliverables: [
      "Merancang dan mendeploy web komersial modern dengan kategorisasi produk terstruktur dan fitur filtering instan.",
      "Mengoptimalkan Core Web Vitals, aksesibilitas antarmuka, dan performa indeks search engine untuk operasional industri."
    ],
    architecture:
      "Arsitektur frontend modern dengan pengindeksan katalog terstruktur, pengiriman aset terkompresi, dan custom domain production hosting.",
    stack: ["Web Development", "Responsive UI", "Frontend Architecture", "SEO Optimization", "Production Hosting"],
    images: [
      {
        url: "/projects/cimahi-hero.jpg",
        caption: "Beranda Utama PT Cimahi Battery Industry — Produsen Baterai Lithium Nasional"
      },
      {
        url: "/projects/cimahi-catalog.jpg",
        caption: "Katalog Terstruktur Material & Sel Baterai Lithium dengan Filter Kategori"
      }
    ]
  }
];

// Interactive Spotlight Project Card
function ProjectCard({
  project,
  isDark,
  onOpenModal,
  onCopy,
  copiedId
}: {
  project: Project;
  isDark: boolean;
  onOpenModal: (project: Project, imageIndex?: number) => void;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const currentImage = project.images[activeImgIdx] || project.images[0];

  const cardBg = isDark
    ? "bg-neutral-900/60 border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
    : "bg-white/75 border border-white/90 shadow-[0_15px_40px_rgba(15,23,42,0.06)]";

  const buttonStyle = isDark
    ? "bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.16] text-neutral-100"
    : "bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 text-neutral-800";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${cardBg}`}
    >
      {/* Spotlight Proximity Specular Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${
            isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
          }, transparent 65%)`
        }}
      />

      <div className="relative z-10">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                project.featured
                  ? isDark
                    ? "bg-white text-neutral-950 font-black shadow-xs"
                    : "bg-neutral-900 text-white font-black shadow-xs"
                  : isDark
                  ? "bg-white/[0.1] text-neutral-200 border border-white/15"
                  : "bg-black/[0.06] text-neutral-800"
              }`}
            >
              {project.badge}
            </span>
            <span className={`text-xs font-bold ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
              {project.year}
            </span>
          </div>

          <span className={`text-xs font-black tracking-widest ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
            {project.number}
          </span>
        </div>

        {/* Project Context & Title */}
        <div className="space-y-1.5 mb-5">
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
            {project.context}
          </p>
          <h3 className={`text-xl sm:text-2xl font-black tracking-tight leading-snug ${isDark ? "text-white" : "text-neutral-900"}`}>
            {project.title}
          </h3>
        </div>

        {/* Browser Mockup Window with Screenshot Gallery */}
        <div className="relative mb-6 rounded-2xl overflow-hidden border border-neutral-500/20 group/preview shadow-md">
          {/* Browser Header Bar */}
          <div
            className={`px-4 py-2 flex items-center justify-between text-xs border-b border-neutral-500/15 ${
              isDark ? "bg-neutral-950/70" : "bg-neutral-100/90"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div
              className={`px-3 py-0.5 rounded-md text-[11px] font-mono tracking-tight max-w-[200px] truncate ${
                isDark ? "bg-white/[0.06] text-neutral-300" : "bg-white text-neutral-600 shadow-2xs"
              }`}
            >
              {project.domain}
            </div>

            <button
              onClick={() => onOpenModal(project, activeImgIdx)}
              title="Perbesar Preview"
              className="p-1 rounded hover:bg-neutral-500/20 text-neutral-400 hover:text-white transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Screenshot Display */}
          <div
            onClick={() => onOpenModal(project, activeImgIdx)}
            className="relative cursor-pointer aspect-[16/9] overflow-hidden bg-neutral-950/20"
          >
            <motion.img
              key={currentImage.url}
              src={currentImage.url}
              alt={currentImage.caption}
              initial={{ opacity: 0.8, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-[1.03]"
            />

            {/* Hover Expand Overlay */}
            <div className="absolute inset-0 bg-neutral-950/35 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/90 text-neutral-950 shadow-lg flex items-center gap-1.5">
                <Maximize2 className="w-3 h-3" />
                <span>Lihat Detail Preview</span>
              </span>
            </div>
          </div>

          {/* Multi-Screenshot Selector Dots / Bar */}
          {project.images.length > 1 && (
            <div
              className={`px-3 py-2 flex items-center justify-between text-[11px] font-medium border-t border-neutral-500/15 ${
                isDark ? "bg-neutral-950/80 text-neutral-300" : "bg-white/95 text-neutral-700"
              }`}
            >
              <span className="text-[11px] text-neutral-400 truncate max-w-[70%]">
                {currentImage.caption}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIdx(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeImgIdx === idx
                        ? isDark
                          ? "w-6 bg-white"
                          : "w-6 bg-neutral-900"
                        : "w-2 bg-neutral-500/30 hover:bg-neutral-500/60"
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Summary */}
        <p className={`text-sm font-medium leading-relaxed mb-6 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
          {project.summary}
        </p>

        {/* Key Deliverables Highlights */}
        <ul className={`space-y-2.5 text-xs sm:text-sm font-medium mb-7 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
          {project.deliverables.slice(0, 2).map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                  isDark ? "bg-neutral-400" : "bg-neutral-700"
                }`}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer: Tech Tags & Action CTAs */}
      <div className="relative z-10 pt-5 border-t border-neutral-500/15 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                isDark
                  ? "bg-white/[0.06] text-neutral-300 border border-white/[0.1]"
                  : "bg-white/85 text-neutral-700 border border-neutral-200/80 shadow-2xs"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black tracking-tight transition-all active:scale-[0.97] ${
              isDark
                ? "bg-white text-neutral-950 hover:bg-neutral-200"
                : "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kunjungi Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onOpenModal(project, activeImgIdx)}
              className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-[0.97] ${buttonStyle}`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Arsitektur</span>
            </button>
            <button
              onClick={() => onCopy(project.liveUrl, project.id)}
              className={`p-2 rounded-full text-xs font-bold transition-all active:scale-[0.97] ${buttonStyle}`}
              title="Salin Link"
            >
              {copiedId === project.id ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeFilter, setActiveFilter] = useState<'all' | 'ml' | 'web'>('all');
  const [activeModal, setActiveModal] = useState<Project | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isDark = theme === 'dark';

  const visibleProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((item) => item.category === activeFilter);

  const handleCopy = (text: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleOpenModal = (project: Project, imageIndex: number = 0) => {
    setActiveModal(project);
    setModalImgIdx(imageIndex);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const glassPill = isDark
    ? "bg-neutral-900/70 border border-white/[0.14] text-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
    : "bg-white/75 border border-white/90 text-neutral-900 shadow-[0_10px_25px_rgba(15,23,42,0.05)]";

  const buttonStyle = isDark
    ? "bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.16] text-neutral-100"
    : "bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-900 shadow-2xs";

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 font-sans ${
        isDark ? "bg-[#0A0A0C] text-neutral-100" : "bg-[#F3F4F6] text-neutral-900"
      }`}
    >
      {/* Ambient Moving Liquid Spheres */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className={`orb-a absolute -top-24 left-[15%] w-[38rem] h-[38rem] rounded-full blur-[140px] opacity-70 ${
            isDark
              ? "bg-gradient-to-br from-indigo-500/20 via-sky-500/10 to-transparent"
              : "bg-gradient-to-br from-sky-200/80 via-blue-100/60 to-transparent"
          }`}
        />
        <div
          className={`orb-b absolute top-[40%] -right-20 w-[40rem] h-[40rem] rounded-full blur-[150px] opacity-65 ${
            isDark
              ? "bg-gradient-to-tl from-emerald-500/15 via-teal-500/10 to-transparent"
              : "bg-gradient-to-tl from-emerald-200/70 via-teal-100/50 to-transparent"
          }`}
        />
      </div>

      {/* Floating Header Capsule */}
      <header className="sticky top-4 z-40 px-4 sm:px-6">
        <div
          className={`max-w-5xl mx-auto rounded-full px-3 sm:px-5 py-2.5 flex items-center justify-between backdrop-blur-2xl transition-all duration-300 ${glassPill}`}
        >
          {/* Brand & Available Indicator */}
          <div className="flex items-center gap-2.5 pl-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
            <span className="font-extrabold text-sm tracking-tight">
              {PROFILE.shortName}
            </span>
          </div>

          {/* Segmented Category Filter with Motion Sliding Indicator */}
          <div
            className={`hidden md:inline-flex p-1 rounded-full relative ${
              isDark ? "bg-white/[0.06]" : "bg-black/[0.05]"
            }`}
          >
            {[
              { id: 'all', label: 'All Projects (4)' },
              { id: 'ml', label: 'Machine Learning (2)' },
              { id: 'web', label: 'Web & IoT Systems (2)' }
            ].map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as 'all' | 'ml' | 'web')}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-extrabold transition-colors z-10 ${
                    active
                      ? isDark
                        ? "text-neutral-950 font-black"
                        : "text-neutral-950 font-black"
                      : isDark
                      ? "text-neutral-400 hover:text-white"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 rounded-full bg-white shadow-xs z-[-1]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-full transition-all active:scale-[0.95] ${buttonStyle}`}
              title={isDark ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>
            <a
              href={`mailto:${PROFILE.email}`}
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black transition-all active:scale-[0.95] ${
                isDark
                  ? "bg-white text-neutral-950 hover:bg-neutral-200"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
            >
              <span>Hubungi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-7 pb-20 space-y-10">
        {/* Creative Hero Banner with Real Photo & Verified Credentials */}
        <section
          className={`rounded-[36px] p-7 sm:p-11 relative overflow-hidden backdrop-blur-2xl transition-all duration-300 ${glassPill}`}
        >
          {/* Subtle top edge glow line */}
          <div
            className={`pointer-events-none absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent ${
              isDark ? "via-white/40" : "via-neutral-900/20"
            } to-transparent`}
          />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{PROFILE.status}</span>
              </div>

              <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] ${isDark ? "text-white" : "text-neutral-950"}`}>
                {PROFILE.name}
              </h1>

              <p className={`text-base sm:text-lg font-medium leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                {PROFILE.tagline}
              </p>

              {/* Social CTA Action Links */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black transition-all active:scale-[0.97] ${buttonStyle}`}
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black transition-all active:scale-[0.97] ${buttonStyle}`}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleCopy(PROFILE.email, 'email')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black transition-all active:scale-[0.97] ${buttonStyle}`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{copiedId === 'email' ? 'Email Berhasil Disalin!' : PROFILE.email}</span>
                </button>
              </div>
            </div>

            {/* Profile Avatar Card with Glowing Rim */}
            <div className="shrink-0 relative group">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-emerald-400 via-sky-400 to-indigo-500 shadow-xl">
                <img
                  src={PROFILE.avatar}
                  alt={PROFILE.name}
                  className="w-full h-full object-cover rounded-[22px] bg-neutral-900"
                />
              </div>
              <div
                className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
                  isDark ? "bg-white text-neutral-950" : "bg-neutral-900 text-white"
                }`}
              >
                Engineer
              </div>
            </div>
          </div>

          {/* Mobile Category Switcher */}
          <div className="mt-8 pt-5 border-t border-neutral-500/15 flex md:hidden">
            <div
              className={`w-full grid grid-cols-3 p-1 rounded-2xl ${
                isDark ? "bg-white/[0.06]" : "bg-black/[0.05]"
              }`}
            >
              {[
                { id: 'all', label: 'All' },
                { id: 'ml', label: 'ML & AI' },
                { id: 'web', label: 'Web & IoT' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as 'all' | 'ml' | 'web')}
                  className={`py-2 rounded-xl text-xs font-extrabold transition-all text-center ${
                    activeFilter === tab.id
                      ? "bg-white text-neutral-950 shadow-xs"
                      : isDark
                      ? "text-neutral-400"
                      : "text-neutral-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Live Projects Grid Showcase with Visual Previews */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
                Karya & Deployment Langsung
              </h2>
              <p className={`text-xs sm:text-sm font-medium mt-0.5 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                Setiap project dilengkapi live screenshot dan tautan sistem produksi yang aktif.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isDark={isDark}
                  onOpenModal={handleOpenModal}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Technical Competencies Bento Grid */}
        <section
          className={`rounded-[32px] p-7 sm:p-9 backdrop-blur-2xl transition-all duration-300 ${glassPill}`}
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-500">
              <Zap className="w-3.5 h-3.5" />
              <span>Keahlian & Ekosistem Teknologi</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight mt-1 ${isDark ? "text-white" : "text-neutral-900"}`}>
              Stack & Infrastruktur Rekayasa
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {SKILL_GROUPS.map((group, idx) => {
              const Icon = group.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-5 border transition-all ${
                    isDark
                      ? "bg-white/[0.04] border-white/10 hover:border-white/20"
                      : "bg-white/80 border-neutral-200/80 hover:border-neutral-300 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className={`p-2 rounded-xl ${isDark ? "bg-white/10 text-white" : "bg-neutral-100 text-neutral-900"}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <h3 className={`text-sm font-extrabold tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
                      {group.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                          isDark
                            ? "bg-white/[0.06] text-neutral-300 border border-white/10"
                            : "bg-neutral-100 text-neutral-700 border border-neutral-200"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Minimal Footer */}
        <footer
          className={`rounded-[28px] px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold backdrop-blur-2xl ${glassPill}`}
        >
          <span className={isDark ? "text-neutral-400" : "text-neutral-500"}>
            © {new Date().getFullYear()} {PROFILE.name}. Semua hak dilindungi.
          </span>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={`mailto:${PROFILE.email}`}
              className={`hover:underline underline-offset-4 ${isDark ? "text-white" : "text-neutral-900"}`}
            >
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline underline-offset-4 ${isDark ? "text-white" : "text-neutral-900"}`}
            >
              LinkedIn ↗
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline underline-offset-4 ${isDark ? "text-white" : "text-neutral-900"}`}
            >
              GitHub ↗
            </a>
          </div>
        </footer>
      </main>

      {/* Full-Screen Interactive Lightbox & Architecture Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-3xl w-full my-auto rounded-[32px] p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto ${
                isDark
                  ? "bg-neutral-900/95 border border-white/20 text-neutral-100 shadow-2xl"
                  : "bg-white/95 border border-neutral-200 text-neutral-900 shadow-2xl"
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-neutral-500/15 pb-4">
                <div>
                  <div className={`text-xs font-extrabold uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    {activeModal.context} ({activeModal.year})
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-black tracking-tight mt-1 ${isDark ? "text-white" : "text-neutral-900"}`}>
                    {activeModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className={`p-2 rounded-full transition-all active:scale-[0.95] ${buttonStyle}`}
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Image Preview with Switch Tabs */}
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-neutral-500/20 shadow-lg bg-neutral-950 aspect-[16/9] relative">
                  <motion.img
                    key={activeModal.images[modalImgIdx]?.url}
                    src={activeModal.images[modalImgIdx]?.url}
                    alt={activeModal.images[modalImgIdx]?.caption}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent p-4">
                    <p className="text-xs sm:text-sm font-bold text-white">
                      {activeModal.images[modalImgIdx]?.caption}
                    </p>
                  </div>
                </div>

                {/* Thumbnail switcher if multiple images */}
                {activeModal.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {activeModal.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setModalImgIdx(i)}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all shrink-0 w-24 h-14 ${
                          modalImgIdx === i
                            ? "border-emerald-500 scale-105 shadow-md"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Architecture & Engineering Details */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <div className={`text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    <Layers className="w-3.5 h-3.5 text-emerald-500" />
                    <span>System Architecture Flow</span>
                  </div>
                  <p
                    className={`p-4 rounded-2xl font-bold leading-relaxed ${
                      isDark ? "bg-white/[0.06] text-neutral-200" : "bg-neutral-100 text-neutral-800"
                    }`}
                  >
                    {activeModal.architecture}
                  </p>
                </div>

                <div>
                  <div className={`text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Deliverables Rekayasa & Implementasi</span>
                  </div>
                  <ul className={`space-y-2.5 font-medium ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                    {activeModal.deliverables.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                            isDark ? "bg-neutral-400" : "bg-neutral-700"
                          }`}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Action CTA */}
              <div className="pt-4 border-t border-neutral-500/15 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={activeModal.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black tracking-tight ${
                    isDark
                      ? "bg-white text-neutral-950 hover:bg-neutral-200"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  <span>Buka {activeModal.domain}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => handleCopy(activeModal.liveUrl, 'modal')}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all ${buttonStyle}`}
                >
                  {copiedId === 'modal' ? 'Link Berhasil Disalin!' : 'Salin URL Proyek'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
