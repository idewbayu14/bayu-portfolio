import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Mail,
  Copy,
  Check,
  FileDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Cpu,
  Layers,
  Database,
  Terminal,
  Activity,
  Zap,
  BarChart2,
  Workflow,
  Sparkle,
  Shield,
  Smartphone,
  Eye,
  MapPin,
  Clock,
  Code2
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

interface ProjectImage {
  url: string;
  title: string;
  caption: string;
}

interface Project {
  id: string;
  number: string;
  title: string;
  organization: string;
  role: string;
  category: 'energy' | 'automation' | 'ml' | 'health';
  categoryLabel: string;
  impactMetric: string;
  impactLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  liveLabel?: string;
  images: ProjectImage[];
}

const PROFILE = {
  name: "I Dewa Nyoman Bayu Satria Wibawa",
  shortName: "Bayu Satria",
  role: "Machine Learning & Software Systems Engineer",
  education: "Informatics Engineering Graduate",
  institution: "Universitas Komputer Indonesia (UNIKOM)",
  certification: "BNSP Certified Associate Data Scientist (CADS)",
  valueHook: "I build machine learning models, automation scripts, and web or mobile apps that cut down repetitive manual work.",
  bio: "Informatics Engineering graduate from UNIKOM with BNSP Associate Data Scientist certification. Experienced in engineering end-to-end ML classification pipelines, IoT solar telemetry networks, and OCR automation that deliver measurable operational efficiency. Driven by practical engineering that turns complex data pipelines into production-ready software.",
  email: "idewanyomanbayusw@gmail.com",
  linkedin: "https://linkedin.com/in/idewanyomanbayusw",
  github: "https://github.com/idewbayu14",
  resumePdf: "/Bayu_Satria_Portfolio.pdf",
  avatar: "/profile/bayu.jpg",
  location: "Bandung, Indonesia (UTC+7)",
  openRoles: [
    "AI & Machine Learning Engineer",
    "Data Scientist",
    "Data Analyst",
    "Software Engineer"
  ]
};

const IMPACT_STATS = [
  {
    value: "~80%",
    label: "Logging Time Saved",
    context: "Batari Energy • BySense IoT",
    desc: "Automated periodic solar generation recording across national installations"
  },
  {
    value: "~75%",
    label: "Bookkeeping Reduced",
    context: "Zoom Petcare • Financial OCR",
    desc: "Automated grooming receipt data extraction and ledger synchronization"
  },
  {
    value: "600+",
    label: "SKUs Indexed",
    context: "Multi-Marketplace Automation",
    desc: "Batch photo indexing across Shopee, Tokopedia, and TikTok Shop"
  },
  {
    value: "94.2%",
    label: "Neural Model Accuracy",
    context: "BRIN • Autonomous Vehicles",
    desc: "In-house deep learning text classification operating with <50ms latency"
  }
];

const PROJECTS: Project[] = [
  {
    id: "batari-bysense",
    number: "01",
    title: "BySense: Photovoltaic Telemetry & Solar IoT Monitoring",
    organization: "PT Batari Energy",
    role: "Full-Stack & IoT Systems Engineer",
    category: "energy",
    categoryLabel: "Industrial IoT & CleanTech",
    impactMetric: "80% Time Saved",
    impactLabel: "Manual Admin Logging Reduced",
    summary:
      "Architected the BySense web and mobile monitoring applications for both internal administrators and commercial solar clients across Indonesia.",
    challenge:
      "Commercial solar sites required manual on-site meter readings and weekly spreadsheets. Field technicians struggled to detect panel degradation or soiling without real-time irradiance benchmarks, leading to delayed maintenance and lost energy yield.",
    solution:
      "Engineered continuous 5-second telemetry ingestion connecting inverter gateways and battery storage systems to an interactive GIS map. Built an early fault detection engine comparing pyranometer solar irradiance (W/m²) directly with electrical yield (kW), plus a one-click automated PDF report generator.",
    highlights: [
      "Automated weekly, monthly, and annual solar panel logs, cutting manual admin recording time by around 80%.",
      "Built real-time early fault detection comparing live sunlight intensity against actual panel kilowatt output.",
      "Engineered a one-click automated PDF report generator that turned hours of client presentation prep into seconds.",
      "Designed the telemetry architecture to track total installed capacity, ready for Batari's upcoming proprietary hardware."
    ],
    stack: [
      "React",
      "TypeScript",
      "React Native",
      "Leaflet GIS",
      "Open-Meteo API",
      "Chart.js",
      "Tailwind CSS"
    ],
    liveUrl: "https://bysense.batarienergy.com/",
    liveLabel: "bysense.batarienergy.com",
    images: [
      {
        url: "/projects/bysense-map.jpg",
        title: "Nationwide Solar Telemetry Map",
        caption: "Centralized GIS monitoring view displaying geographical station pins, operational health indicators, and active generation outputs across Indonesia."
      },
      {
        url: "/projects/bysense-station-telemetry.jpg",
        title: "Station Telemetry Dashboard",
        caption: "High-frequency instrument view tracking 10.97 kW instantaneous solar output, 65% battery state-of-charge, building load, and daily energy total."
      },
      {
        url: "/projects/bysense-correlation.jpg",
        title: "Irradiance vs. Generation Fault Detection",
        caption: "Analytical regression model correlating pyranometer sunlight intensity (W/m²) with kilowatt output to automatically detect panel soiling and hardware clipping."
      },
      {
        url: "/projects/bysense-power.png",
        title: "Diurnal Photovoltaic Generation Curve",
        caption: "Continuous daylight generation tracking showing early-morning solar ramp-up, midday peak yield, and inverter operational thresholds."
      },
      {
        url: "/projects/bysense-cloud.png",
        title: "Meteorological Weather Synchronization",
        caption: "Real-time integration of ambient temperature and cloud cover via Open-Meteo API, preventing false maintenance dispatches during overcast weather."
      },
      {
        url: "/projects/bysense-metrics.jpg",
        title: "Operational Performance & PR Indices",
        caption: "Summary view of cumulative kilowatt-hours generated, system performance ratio (PR), grid export balance, and operational stability."
      }
    ]
  },
  {
    id: "zoom-petcare",
    number: "02",
    title: "E-Commerce Catalog Automation & Financial OCR Pipeline",
    organization: "Zoom Petcare",
    role: "Automation & Data Systems Engineer",
    category: "automation",
    categoryLabel: "Workflow Automation & OCR",
    impactMetric: "75% Bookkeeping Cut",
    impactLabel: "Over 600 SKUs Indexed",
    summary:
      "Designed high-throughput product catalog indexing scripts and an automated OCR-to-Excel bookkeeping pipeline to eliminate manual retail bottlenecks.",
    challenge:
      "Launching hundreds of inventory items across three distinct e-commerce marketplaces required days of manual photo cropping, SKU renaming, and metadata entry. Simultaneously, daily handwritten and printed grooming receipts caused extensive bookkeeping delays each week.",
    solution:
      "Developed a Python-powered image processing script to standardize and index 600+ SKU photo assets for instant multi-channel upload. Built a computer vision OCR pipeline using Tesseract and Pandas that scans physical receipts, extracts service amounts, dates, and tiers, and populates formatted Excel accounting ledgers automatically.",
    highlights: [
      "Sped up product photo indexing to launch over 600 SKUs across Shopee, Tokopedia, and TikTok Shop to drive online sales.",
      "Engineered an automated OCR-to-Excel script that cut grooming receipt bookkeeping time by roughly 75%.",
      "Eliminated repetitive manual transcription errors and established instant reconciliation for daily store revenue."
    ],
    stack: [
      "Python",
      "Tesseract OCR",
      "OpenCV",
      "Pandas",
      "OpenPyXL",
      "Excel Automation",
      "Regex"
    ],
    images: []
  },
  {
    id: "brin-autonomous",
    number: "03",
    title: "Autonomous Vehicle Sentiment Analysis Platform",
    organization: "National Research and Innovation Agency (BRIN)",
    role: "Machine Learning Engineer",
    category: "ml",
    categoryLabel: "Applied Deep Learning & NLP",
    impactMetric: "94.2% Test Accuracy",
    impactLabel: "Real-Time <50ms Classification",
    summary:
      "Engineered an automated sentiment analysis pipeline and public research portal for BRIN to evaluate public perception toward Level 2 autonomous electric vehicles in Indonesia.",
    challenge:
      "Public opinion datasets in Indonesia showed severe class imbalance: safety-critical skepticism and enthusiastic adopters represented sparse edge cases compared to neutral comments. Researchers previously performed manual batch surveys with slow turnaround times.",
    solution:
      "Curated an independent corpus of 2,000+ public discourse samples and applied ADASYN and SMOTE synthetic resampling along decision boundaries. Trained an in-house deep learning neural network on token embeddings, then containerized the pipeline into an asynchronous FastAPI service with sub-50ms inference latencies.",
    highlights: [
      "Built an automated web scraper and deep learning inference API for Level 2 autonomous vehicle sentiment analysis.",
      "Moved text classification from manual batch review to real-time tracking.",
      "Curated 2,000+ corpus samples and eliminated severe class imbalance using ADASYN & SMOTE resampling.",
      "Achieved 94.2% test accuracy and 0.93 F1-score without relying on expensive third-party commercial APIs."
    ],
    stack: [
      "Python",
      "PyTorch",
      "ADASYN / SMOTE",
      "FastAPI",
      "Next.js",
      "Tailwind CSS",
      "Vercel Edge"
    ],
    liveUrl: "https://brin-project-kp.vercel.app/",
    liveLabel: "brin-project-kp.vercel.app",
    images: [
      {
        url: "/projects/brin-hero.png",
        title: "BRIN Research Portal Interface",
        caption: "Web portal showing public discourse corpus navigation, dataset annotation distributions, and sentiment research documentation."
      },
      {
        url: "/projects/brin-analyzer.png",
        title: "Real-Time Sentiment Analyzer",
        caption: "Interactive neural inference dashboard demonstrating sentence-level classification, sentiment polarity probabilities, and confidence scoring."
      }
    ]
  },
  {
    id: "nutrimood-recommender",
    number: "04",
    title: "NutriMood: Personalized Nutrition Decision Support",
    organization: "DBS Foundation / Dicoding Capstone",
    role: "Machine Learning & Full-Stack Developer",
    category: "health",
    categoryLabel: "HealthTech & Recommenders",
    impactMetric: "1,200+ Food Items",
    impactLabel: "Used in Community Health Checks",
    summary:
      "Developed an algorithmic nutrition recommendation web app tailored to user psychological mood states and metabolic constraints, actively utilized by field healthcare workers.",
    challenge:
      "Standard nutritional apps neglect localized Indonesian diets and psychological emotional eating patterns, making them impractical for community healthcare screenings where rapid dietary guidance is required.",
    solution:
      "Constructed a multi-criteria hybrid filtering engine operating over a curated relational database of 1,200+ Indonesian culinary items. The app factors in caloric caps, macronutrient targets, and mood states to generate actionable, culturally aligned meal recommendations.",
    highlights: [
      "Developed a nutrition recommendation web app based on user mood and health conditions.",
      "Actively used by field health workers during community health checks (Posyandu / public screenings).",
      "Awarded Distinction in the DBS Foundation Coding Camp (Dicoding Indonesia).",
      "Structured 1,200+ local food nutritional profiles with complete macronutrient distributions."
    ],
    stack: [
      "Python",
      "Scikit-Learn",
      "React",
      "REST APIs",
      "Tailwind CSS",
      "Vercel"
    ],
    liveUrl: "https://nutrimood.vercel.app/",
    liveLabel: "nutrimood.vercel.app",
    images: [
      {
        url: "/projects/nutrimood-hero.jpg",
        title: "NutriMood Application Landing",
        caption: "Health profiling, wellness onboarding, and objective configuration interface optimized for mobile and desktop."
      },
      {
        url: "/projects/nutrimood-demo.jpg",
        title: "Nutritional Recommendation Evaluation",
        caption: "Interactive recommendation output presenting matched culinary selections, caloric breakdowns, and multi-criteria constraint scoring."
      }
    ]
  }
];

const SKILL_GROUPS = [
  {
    title: "Machine Learning & Data Intelligence",
    description: "Model development, algorithmic resampling, and statistical analysis",
    tools: [
      "Python",
      "TensorFlow",
      "Scikit-Learn",
      "PyTorch",
      "Tesseract OCR",
      "Pandas",
      "NumPy",
      "SQL",
      "ADASYN / SMOTE",
      "NLP Classification"
    ]
  },
  {
    title: "Full-Stack & Mobile Development",
    description: "Interactive client applications, responsive frontends, and cross-platform apps",
    tools: [
      "React",
      "React Native (Android)",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "REST APIs",
      "Tailwind CSS",
      "Leaflet GIS",
      "HTML5 / CSS3"
    ]
  },
  {
    title: "Data Pipelines, Cloud & Automation",
    description: "Automated report engines, web scraping, and production edge deployment",
    tools: [
      "Web Scraping (Selenium / BS4)",
      "Automated PDF Generators",
      "Git & GitHub",
      "Vercel Edge Network",
      "Docker Containers",
      "Open-Meteo REST API",
      "Linux / Shell Automation"
    ]
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<{
    project: Project;
    index: number;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateWIBTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setCurrentTime(now.toLocaleTimeString("en-GB", options));
    };
    updateWIBTime();
    const interval = setInterval(updateWIBTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#070A0F] text-[#F8FAFC] selection:bg-amber-500/20 selection:text-amber-300 relative pb-28">
      {/* Background Subtle Ambient Grid */}
      <div className="fixed inset-0 pointer-events-none grid-pattern opacity-60 z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/5 via-sky-500/5 to-transparent blur-3xl pointer-events-none z-0" />

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#070A0F]/85 border-b border-[#1E2738]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-md bg-[#0F141E] border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-amber-300 transition-colors">
                {PROFILE.shortName}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                CADS • ML & Systems
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a
              href="#projects"
              className="hover:text-amber-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#impact"
              className="hover:text-amber-400 transition-colors"
            >
              Impact
            </a>
            <a
              href="#skills"
              className="hover:text-amber-400 transition-colors"
            >
              Skills & Stack
            </a>
            <a href="#about" className="hover:text-amber-400 transition-colors">
              About
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href={PROFILE.resumePdf}
              download="Bayu_Satria_Portfolio.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#0F141E] hover:bg-[#151C2A] text-slate-200 hover:text-white border border-[#1E2738] hover:border-slate-600 transition-all shadow-sm"
            >
              <FileDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Dossier PDF</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-sm active:scale-95"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5 text-slate-950" />
                  <span>Get in Touch</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-16 sm:space-y-24">
        {/* HERO SECTION */}
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              {/* Credentials / Status Tag */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-md bg-[#0F141E] border border-[#1E2738] text-xs text-slate-300">
                <span className="font-semibold text-amber-400">
                  BNSP CADS Certified
                </span>
                <span className="text-slate-600">•</span>
                <span>Informatics Engineering (UNIKOM)</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Full-Time Roles
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {PROFILE.name}
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-slate-300">
                  {PROFILE.role}
                </p>
              </div>

              {/* The Core Value Proposition Hook */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-medium leading-relaxed border-l-2 border-amber-500/80 pl-4 py-0.5">
                "{PROFILE.valueHook}"
              </p>

              {/* Bio summary */}
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Graduated with an Informatics Engineering degree from Universitas
                Komputer Indonesia. Proven track record building real-time IoT
                telemetry dashboards at Batari Energy, automated computer vision
                OCR pipelines at Zoom Petcare, and deep learning sentiment
                inference APIs at BRIN.
              </p>

              {/* Target Roles Pill List */}
              <div className="pt-1">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-2 font-mono">
                  Target Roles
                </span>
                <div className="flex flex-wrap gap-2">
                  {PROFILE.openRoles.map((role) => (
                    <span
                      key={role}
                      className="px-2.5 py-1 text-xs rounded bg-[#0F141E] text-slate-300 border border-[#1E2738]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#projects"
                  className="px-5 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center gap-2 active:scale-95"
                >
                  <span>Explore Featured Systems</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={PROFILE.resumePdf}
                  download="Bayu_Satria_Portfolio.pdf"
                  className="px-4 py-2.5 rounded-md bg-[#0F141E] hover:bg-[#151C2A] text-slate-200 border border-[#1E2738] hover:border-slate-600 font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <FileDown className="w-4 h-4 text-amber-400" />
                  <span>Download Dossier PDF</span>
                </a>

                <div className="flex items-center gap-2 pl-2">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-md bg-[#0F141E] border border-[#1E2738] hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-md bg-[#0F141E] border border-[#1E2738] hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Studio Portrait in Industrial Frame */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="w-64 sm:w-72 rounded-xl bg-[#0F141E] p-2 border border-[#1E2738] shadow-2xl relative overflow-hidden">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden bg-slate-950 relative">
                    <img
                      src={PROFILE.avatar}
                      alt={PROFILE.name}
                      className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-3 text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {PROFILE.shortName}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        BNSP CADS
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {PROFILE.institution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: QUANTITATIVE IMPACT METRICS */}
        <section id="impact" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E2738] pb-3">
            <div>
              <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                Measurable Value
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Engineering Impact at a Glance
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Production Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {IMPACT_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-[#0C1017] border border-[#1E2738] p-4 sm:p-5 hover:border-slate-600 transition-all relative overflow-hidden group"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight mb-1 font-mono">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white mb-1.5">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 leading-snug">
                  {stat.desc}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  {stat.context}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: FEATURED CASE STUDIES */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1E2738] pb-4">
            <div>
              <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                Production Case Studies
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                What I Have Built & Improved
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-[#0F141E] p-1 rounded-lg border border-[#1E2738]">
              {[
                { id: "all", label: "All Systems (4)" },
                { id: "energy", label: "IoT & Energy" },
                { id: "automation", label: "Automation & OCR" },
                { id: "ml", label: "Applied NLP & DL" },
                { id: "health", label: "Health Recommender" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeCategory === tab.id
                      ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* PROJECT LIST */}
          <div className="space-y-12">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-xl bg-[#0C1017] border border-[#1E2738] p-6 sm:p-8 hover:border-slate-700 transition-all space-y-6"
              >
                {/* Project Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-[#1E2738] pb-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        PROJECT {project.number}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {project.organization}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">
                        {project.role}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>

                  {/* Impact Metric & External Link */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-3 py-1.5 rounded-md bg-[#0F141E] border border-amber-500/30 text-right">
                      <span className="block text-xs font-mono text-amber-400 font-bold">
                        {project.impactMetric}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        {project.impactLabel}
                      </span>
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-sm active:scale-95"
                      >
                        <span>Visit Live Platform</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                  <div className="rounded-lg bg-[#0F141E] p-4 border border-[#1E2738]/80 space-y-1.5">
                    <span className="text-xs font-mono text-amber-400 uppercase font-semibold">
                      The Challenge / Problem
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[13px]">
                      {project.challenge}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#0F141E] p-4 border border-[#1E2738]/80 space-y-1.5">
                    <span className="text-xs font-mono text-sky-400 uppercase font-semibold">
                      The Engineering Solution
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[13px]">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* What Was Built & Key Improvements */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Key Deliverables & Concrete Results
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {project.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-snug"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Screenshots Gallery (If Present) */}
                {project.images.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        System Telemetry & Interface Previews ({project.images.length})
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Click to view high-res capture
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                      {project.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          onClick={() =>
                            setSelectedImage({
                              project,
                              index: imgIdx
                            })
                          }
                          className="group relative rounded-lg overflow-hidden border border-[#1E2738] bg-[#0F141E] cursor-pointer hover:border-amber-400/50 transition-all"
                        >
                          <div className="aspect-[16/10] overflow-hidden bg-slate-950">
                            <img
                              src={img.url}
                              alt={img.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-2 text-left">
                            <div className="text-[11px] font-semibold text-slate-200 group-hover:text-amber-300 transition-colors truncate">
                              {img.title}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#1E2738]/60">
                  <span className="text-[11px] font-mono text-slate-400 mr-2">
                    Stack:
                  </span>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#0F141E] text-slate-300 border border-[#1E2738]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION: SKILLS & TECHNICAL COMPETENCIES */}
        <section id="skills" className="space-y-6">
          <div className="border-b border-[#1E2738] pb-3">
            <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
              Tooling & Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Core Technical Competencies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#0C1017] border border-[#1E2738] p-6 space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{group.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {group.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-xs rounded-md bg-[#0F141E] text-slate-300 border border-[#1E2738] hover:border-amber-400/40 transition-colors font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: EDUCATION & CERTIFICATION */}
        <section id="about" className="space-y-6">
          <div className="border-b border-[#1E2738] pb-3">
            <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
              Background & Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Education & Professional Certification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education Card */}
            <div className="rounded-xl bg-[#0C1017] border border-[#1E2738] p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                  Higher Education
                </span>
                <span className="text-xs font-mono text-amber-400">
                  Graduate
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Bachelor of Computer Science (S.Kom)
              </h3>
              <p className="text-sm font-semibold text-slate-300">
                Informatics Engineering • Universitas Komputer Indonesia (UNIKOM)
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Focused on machine learning, deep learning text classification,
                data structures, algorithms, and distributed software engineering.
              </p>
            </div>

            {/* Certification Card */}
            <div className="rounded-xl bg-[#0C1017] border border-[#1E2738] p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                  National Certification
                </span>
                <span className="text-xs font-mono text-amber-400">
                  BNSP CADS
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Certified Associate Data Scientist (CADS)
              </h3>
              <p className="text-sm font-semibold text-slate-300">
                Badan Nasional Sertifikasi Profesi (BNSP)
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Formally assessed and certified in core data science competencies:
                data collection, statistical preprocessing, exploratory data
                analysis, predictive modeling, and model evaluation.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: GET IN TOUCH / FOOTER */}
        <section id="contact" className="rounded-2xl bg-[#0C1017] border border-[#1E2738] p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Let's Build Something Together
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Open to Engineering Opportunities
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Available for full-time roles in AI, Machine Learning, Data Science,
              Data Analysis, and Software Engineering. Let's discuss how my
              systems background can add value to your team.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCopyEmail}
              className="px-5 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-amber-500/20"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Email Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy idewanyomanbayusw@gmail.com</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PROFILE.email}`}
              className="px-4 py-2.5 rounded-md bg-[#0F141E] hover:bg-[#151C2A] text-slate-200 border border-[#1E2738] hover:border-slate-500 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Send Direct Email</span>
            </a>

            <a
              href={PROFILE.resumePdf}
              download="Bayu_Satria_Portfolio.pdf"
              className="px-4 py-2.5 rounded-md bg-[#0F141E] hover:bg-[#151C2A] text-slate-200 border border-[#1E2738] hover:border-slate-500 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <FileDown className="w-4 h-4 text-amber-400" />
              <span>Download Dossier PDF</span>
            </a>
          </div>

          <div className="pt-8 border-t border-[#1E2738] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} {PROFILE.name}</span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Bandung, West Java, Indonesia</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>WIB (UTC+7): {currentTime || "13:45:00"}</span>
              </span>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING ACTION BOTTOM DOCK */}
      <aside aria-label="Quick Action Dock" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-full bg-[#0F141E]/90 backdrop-blur-md border border-[#1E2738] shadow-2xl flex items-center gap-2 sm:gap-3 text-xs">
        <span className="text-[11px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 hidden sm:inline">
          FAST ACCESS
        </span>

        <a
          href="https://bysense.batarienergy.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#151C2A] hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
        >
          <span>BySense</span>
          <ArrowUpRight className="w-3 h-3 text-amber-400" />
        </a>

        <a
          href="https://brin-project-kp.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#151C2A] hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
        >
          <span>BRIN</span>
          <ArrowUpRight className="w-3 h-3 text-amber-400" />
        </a>

        <a
          href="https://nutrimood.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#151C2A] hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
        >
          <span>NutriMood</span>
          <ArrowUpRight className="w-3 h-3 text-amber-400" />
        </a>

        <div className="w-px h-4 bg-slate-700 mx-0.5" />

        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all"
        >
          {copiedEmail ? <Check className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
          <span>{copiedEmail ? "Copied" : "Email"}</span>
        </button>

        <a
          href={PROFILE.resumePdf}
          download="Bayu_Satria_Portfolio.pdf"
          className="p-1.5 rounded-full bg-[#151C2A] hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
          title="Download PDF Dossier"
        >
          <FileDown className="w-3.5 h-3.5 text-amber-400" />
        </a>
      </aside>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full bg-[#0C1017] rounded-xl border border-[#1E2738] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1E2738] bg-[#0F141E]">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-xs text-amber-400 font-bold">
                    {selectedImage.project.number}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-sm font-bold text-white truncate">
                    {selectedImage.project.images[selectedImage.index].title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">
                    {selectedImage.index + 1} /{" "}
                    {selectedImage.project.images.length}
                  </span>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Area */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[350px] max-h-[65vh]">
                <img
                  src={selectedImage.project.images[selectedImage.index].url}
                  alt={selectedImage.project.images[selectedImage.index].title}
                  className="max-h-full max-w-full object-contain"
                />

                {/* Left/Right Navigation Arrows */}
                {selectedImage.project.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage({
                          ...selectedImage,
                          index:
                            (selectedImage.index -
                              1 +
                              selectedImage.project.images.length) %
                            selectedImage.project.images.length
                        });
                      }}
                      className="absolute left-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-slate-700 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage({
                          ...selectedImage,
                          index:
                            (selectedImage.index + 1) %
                            selectedImage.project.images.length
                        });
                      }}
                      className="absolute right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-slate-700 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Caption Footer */}
              <div className="p-4 bg-[#0F141E] border-t border-[#1E2738] text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white mr-1">
                  Figure Details:
                </span>
                {selectedImage.project.images[selectedImage.index].caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
