import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Copy,
  Check,
  FileDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  MapPin,
  Clock,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Activity,
  ShieldCheck
} from 'lucide-react';

import { sounds } from './utils/audio';
import { DataLattice3D } from './components/DataLattice3D';
import { TiltCard } from './components/TiltCard';
import { TableOfContents } from './components/TableOfContents';
import {
  BySenseLogo,
  ZoomPetcareLogo,
  BrinLogo,
  NutriMoodLogo,
  CbiLogo
} from './components/ProjectLogos';

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
  shortName: "Idew Bayu",
  role: "Machine Learning and Software Systems Engineer",
  education: "Informatics Engineering Graduate",
  institution: "Universitas Komputer Indonesia (UNIKOM)",
  certification: "BNSP Certified Associate Data Scientist (CADS)",
  valueHook: "I build machine learning models, automation scripts, and web or mobile apps that cut down repetitive manual work.",
  bio: "Informatics Engineering graduate from UNIKOM with BNSP Associate Data Scientist certification. Experienced in engineering end-to-end ML classification pipelines, IoT solar telemetry networks, and OCR automation that deliver measurable operational efficiency. Driven by practical engineering that turns complex data pipelines into reliable, production software.",
  email: "idewanyomanbayusw@gmail.com",
  linkedin: "https://linkedin.com/in/idewanyomanbayusw",
  github: "https://github.com/idewbayu14",
  resumePdf: "/CV_Idew_Bayu.pdf",
  avatar: "/profile/idew-bayu.jpg",
  location: "Bandung, Indonesia",
  openRoles: [
    "AI and Machine Learning Engineer",
    "Data Scientist",
    "Data Analyst",
    "Software Engineer"
  ]
};

const IMPACT_STATS = [
  {
    value: "~80%",
    label: "Logging Time Saved",
    context: "Batari Energy | BySense IoT",
    desc: "Automated periodic solar generation recording across national installations"
  },
  {
    value: "~75%",
    label: "Bookkeeping Reduced",
    context: "Zoom Petcare | Financial OCR",
    desc: "Automated grooming receipt data extraction and ledger synchronization"
  },
  {
    value: "600+",
    label: "SKUs Indexed",
    context: "Multi-Marketplace Catalog",
    desc: "Batch photo indexing across Shopee, Tokopedia, and TikTok Shop"
  },
  {
    value: "94.2%",
    label: "Neural Model Accuracy",
    context: "BRIN | Autonomous Vehicles",
    desc: "In-house deep learning text classification operating with under 50ms latency"
  }
];

const PROJECTS: Project[] = [
  {
    id: "batari-bysense",
    number: "01",
    title: "BySense: Photovoltaic Telemetry and Solar IoT Monitoring",
    organization: "PT Batari Energy",
    role: "Full-Stack and IoT Systems Engineer",
    category: "energy",
    categoryLabel: "Industrial CleanTech Telemetry",
    impactMetric: "80% Time Saved",
    impactLabel: "Manual Admin Logging Reduced",
    summary:
      "Architected the BySense web and mobile monitoring applications for both internal administrators and commercial solar clients across Indonesia.",
    challenge:
      "Commercial solar installations required manual on-site meter readings and weekly spreadsheet entry. Field operators lacked real-time sunlight irradiance benchmarks to verify panel performance, leading to delayed maintenance and undetected energy yield drops.",
    solution:
      "Engineered high-frequency 5-second telemetry ingestion connecting inverter gateways and battery storage systems to an interactive GIS map. Built an early fault detection engine comparing pyranometer solar irradiance (W/m²) directly with electrical yield (kW), coupled with a one-click automated PDF reporting engine.",
    highlights: [
      "Automated weekly, monthly, and annual solar panel logs, cutting manual admin recording time by around 80%.",
      "Built real-time early fault detection by comparing live sunlight intensity against actual panel kilowatt output.",
      "Engineered a one-click automated PDF report generator that turned hours of client presentation prep into seconds.",
      "Designed the telemetry architecture to track total installed capacity and prepare for Batari's upcoming proprietary hardware."
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
        caption: "Continuous daylight generation tracking showing early morning solar ramp-up, midday peak yield, and inverter operational thresholds."
      },
      {
        url: "/projects/bysense-cloud.png",
        title: "Meteorological Weather Synchronization",
        caption: "Real-time integration of ambient temperature and cloud cover via Open-Meteo API, preventing false maintenance alerts during overcast weather."
      },
      {
        url: "/projects/bysense-metrics.jpg",
        title: "Operational Performance and PR Indices",
        caption: "Summary view of cumulative kilowatt-hours generated, system performance ratio (PR), grid export balance, and operational stability."
      }
    ]
  },
  {
    id: "zoom-petcare",
    number: "02",
    title: "E-Commerce Catalog Automation and Financial OCR Pipeline",
    organization: "Zoom Petcare",
    role: "Automation and Data Systems Engineer",
    category: "automation",
    categoryLabel: "Computer Vision and Retail OCR",
    impactMetric: "75% Bookkeeping Cut",
    impactLabel: "Over 600 SKUs Indexed",
    summary:
      "Designed high-throughput product catalog indexing scripts and an automated computer vision receipt processing pipeline to eliminate manual retail bottlenecks and accelerate online store expansion.",
    challenge:
      "Launching hundreds of inventory items across three distinct e-commerce marketplaces required days of manual image cropping, SKU renaming, and metadata entry. Simultaneously, daily handwritten and printed grooming receipts caused extensive bookkeeping delays each week.",
    solution:
      "Developed a Python-powered image processing script to standardize and index 600+ SKU photo assets for instant multi-channel upload. Built a computer vision OCR pipeline using Tesseract and Pandas that scans physical receipts, extracts service amounts, dates, and tiers, and populates formatted Excel accounting ledgers automatically.",
    highlights: [
      "Sped up product photo indexing to launch over 600 SKUs across Shopee, Tokopedia, and TikTok Shop to drive online sales.",
      "Engineered an automated OCR to Excel script that cut grooming receipt bookkeeping time by roughly 75%.",
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
    categoryLabel: "Deep Learning NLP Inference",
    impactMetric: "94.2% Test Accuracy",
    impactLabel: "92.1% F1-Score with Bi-LSTM",
    summary:
      "Architected an end-to-end NLP sentiment inference pipeline and research web platform for the National Research and Innovation Agency (BRIN) to evaluate public perception toward Level 2 autonomous electric vehicles in Indonesia.",
    challenge:
      "Public discourse scraped across Reddit and YouTube contained severe class imbalance across 16,994 raw comments with subtle contextual nuances, sarcasm, and domain-specific terminology that baseline RNNs failed to capture accurately.",
    solution:
      "Implemented multi-platform data mining (PRAW for Reddit and YouTube Data API v3), yielding 7,206 filtered training comments with maxlen=100. Applied hybrid sentiment labeling (VADER, TextBlob, keyword matching) and trained a Bidirectional LSTM (Bi-LSTM) network initialized with 100-dimensional GloVe embeddings and class-weighted loss, outperforming Simple RNN, LSTM, and GRU baselines.",
    highlights: [
      "Engineered automated data collection scraping 16,994 comments across Reddit (3,994 via PRAW) and YouTube (13,000 via Data API v3).",
      "Curated 7,206 training comments with hybrid sentiment labeling combining VADER, TextBlob, and domain-specific keyword rules.",
      "Benchmarked Simple RNN, LSTM, GRU, and Bidirectional LSTM (Bi-LSTM) architectures using 100D GloVe word embeddings.",
      "Achieved 94.2% peak test accuracy and 92.1% balanced F1-score with real-time inference latency under 50ms."
    ],
    stack: [
      "Python",
      "PyTorch",
      "Bi-LSTM",
      "100D GloVe",
      "PRAW API",
      "YouTube Data API v3",
      "VADER / TextBlob",
      "FastAPI",
      "Next.js",
      "Tailwind CSS"
    ],
    liveUrl: "https://brin-project-kp.vercel.app/",
    liveLabel: "brin-project-kp.vercel.app",
    images: [
      {
        url: "/projects/brin-model-performance.png",
        title: "Bi-LSTM Model Benchmark and Evaluation",
        caption: "Performance metrics showing Bidirectional LSTM achieving peak 94.2% test accuracy and 92.1% balanced F1-score with 100D GloVe embeddings."
      },
      {
        url: "/projects/brin-data-collection.png",
        title: "Multi-Platform Data Mining (16,994 Comments)",
        caption: "Automated web scraping pipeline across Reddit (PRAW API, 23.5%) and YouTube (Data API v3, 76.5%) targeting autonomous vehicle discourse."
      },
      {
        url: "/projects/brin-methodology.png",
        title: "NLP Preprocessing and RNN Architecture Benchmark",
        caption: "Text cleaning, tokenization, and comparative evaluation of Simple RNN, LSTM, GRU, and Bi-LSTM models using hybrid sentiment labeling."
      },
      {
        url: "/projects/brin-sentiment-distribution.png",
        title: "Class Imbalance Mitigation and Sentiment Distribution",
        caption: "Distribution of 7,206 curated training comments (56.56% positive, 27.38% negative, 16.06% neutral) with class-weighted loss optimization."
      },
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
    organization: "DBS Foundation and Dicoding Capstone",
    role: "Machine Learning and Full-Stack Developer",
    category: "health",
    categoryLabel: "Algorithmic Health Decision Support",
    impactMetric: "1,289 Food Profiles",
    impactLabel: "Personalized Nutrition Recommender",
    summary:
      "Developed an algorithmic nutrition recommendation web app tailored to user psychological mood states and metabolic constraints, actively utilized by field healthcare workers.",
    challenge:
      "Standard nutritional applications overlook localized Indonesian diets and psychological emotional eating patterns, making them impractical for community healthcare screenings where rapid dietary guidance is required.",
    solution:
      "Constructed a multi-criteria hybrid filtering engine operating over a curated relational database of 1,289 authentic Indonesian culinary items. The app factors in caloric caps, macronutrient targets, and psychological mood states to generate actionable, culturally aligned meal recommendations.",
    highlights: [
      "Engineered a 3-step recommendation workflow mapping mood states (energizing, relaxing, focusing, neutral) to tailored Indonesian meals.",
      "Structured 1,289 authentic Indonesian food profiles with complete macronutrient distributions and recipes.",
      "Integrated health constraint filters supporting clinical conditions including diabetes, hypertension, and custom dietary needs.",
      "Awarded Distinction in the DBS Foundation Coding Camp (Dicoding Indonesia) and used in community health screenings."
    ],
    stack: [
      "Python",
      "Scikit-Learn",
      "React",
      "REST APIs",
      "Tailwind CSS",
      "Vercel"
    ],
    liveUrl: "https://nutrimoodv.vercel.app/",
    liveLabel: "nutrimoodv.vercel.app",
    images: [
      {
        url: "/projects/nutrimood-workflow.jpg",
        title: "Algorithmic 3-Step Recommendation Workflow",
        caption: "Workflow illustrating mood selection, machine learning feature extraction, and personalized curation of 5 Indonesian dishes tailored to health profiles."
      },
      {
        url: "/projects/nutrimood-features.png",
        title: "NutriMood Core Platform Architecture",
        caption: "Six modular capabilities including AI mood prediction, 1,289 authentic food profiles, temporal nutrition analytics, and clinical dietary constraint filters."
      },
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
  },
  {
    id: "cimahi-battery",
    number: "05",
    title: "Cimahi Battery: Industrial Commercial Web Platform",
    organization: "PT Cimahi Battery Indonesia (CBI)",
    role: "Frontend and Web Systems Engineer",
    category: "automation",
    categoryLabel: "Industrial Energy Storage Platform",
    impactMetric: "100+ Cell SKUs",
    impactLabel: "Parametric Filtering Engine",
    summary:
      "Architected the enterprise web platform for PT Cimahi Battery Indonesia, an industrial manufacturer of lithium iron phosphate (LiFePO4) battery packs. Implemented a parametric specification filter enabling commercial engineers to query prismatic cells by voltage, capacity, and discharge rates.",
    challenge:
      "Industrial energy clients required detailed technical cell datasheets, cycle life graphs, and custom battery pack sizing for commercial solar and EV applications, but previous product catalogs were distributed via static disconnected PDFs.",
    solution:
      "Engineered a high-performance parametric web platform featuring dynamic search filtering across 100+ industrial battery SKUs, automated specification comparisons, and responsive inquiries for commercial energy storage integration.",
    highlights: [
      "Engineered the enterprise web platform for PT Cimahi Battery Indonesia with structured parametric product filtering.",
      "Streamlined commercial battery specification discovery across voltage, capacity, cycle life, and discharge rates.",
      "Integrated responsive technical request pipelines to accelerate industrial B2B client inquiries."
    ],
    stack: [
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Parametric Query Engine",
      "Responsive UI",
      "Vercel"
    ],
    liveUrl: "https://cimahibattery.com/",
    liveLabel: "cimahibattery.com",
    images: [
      {
        url: "/projects/cimahi-hero.jpg",
        title: "Cimahi Battery Platform Landing",
        caption: "Official corporate portal highlighting commercial energy storage systems, battery chemistry, and engineering certifications."
      },
      {
        url: "/projects/cimahi-catalog.jpg",
        title: "Prismatic Cell Directory and Specification Filter",
        caption: "Interactive catalog enabling parametric technical filtering by voltage, capacity, cycle life, and industrial form factor."
      }
    ]
  }
];

const SKILL_GROUPS = [
  {
    title: "Machine Learning and Data Intelligence",
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
    title: "Full-Stack and Mobile Development",
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
    title: "Data Pipelines, Cloud and Automation",
    description: "Automated report engines, web scraping, and production edge deployment",
    tools: [
      "Web Scraping (Selenium / BS4)",
      "Automated PDF Generators",
      "Git and GitHub",
      "Vercel Edge Network",
      "Docker Containers",
      "Open-Meteo REST API",
      "Linux / Shell Automation"
    ]
  }
];

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return true; // Apple Dark Minimalist Default
    }
    return true;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sounds.enabled);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<{
    project: Project;
    index: number;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      sounds.playScrollTick();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    sounds.playClick();
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleToggleTheme = () => {
    sounds.playChime(isDark ? 880 : 540, isDark ? 660 : 780);
    setIsDark(!isDark);
  };

  const handleToggleSound = () => {
    const next = sounds.toggle();
    setSoundEnabled(next);
  };

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 relative pb-32 ${
      isDark
        ? "bg-[#060608] text-[#F5F5F7] selection:bg-white/20 selection:text-white"
        : "bg-[#F5F5F7] text-[#1D1D1F] selection:bg-black/10 selection:text-black"
    }`}>
      {/* Background Subtle Ambient Grid */}
      <div className={`fixed inset-0 pointer-events-none opacity-50 z-0 ${
        isDark ? "grid-pattern-dark" : "grid-pattern-light"
      }`} />
      
      {/* Apple-style Crystalline Ambient Glow */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] blur-[120px] pointer-events-none z-0 ${
        isDark
          ? "bg-gradient-to-b from-white/[0.06] via-zinc-800/[0.03] to-transparent"
          : "bg-gradient-to-b from-white/90 via-slate-200/40 to-transparent"
      }`} />

      {/* TOP NAVIGATION BAR (Apple Frosted Glass) */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-200 ${
        isDark
          ? "bg-[#060608]/80 border-white/[0.08]"
          : "bg-[#F5F5F7]/85 border-black/[0.08] shadow-xs"
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="#"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center gap-3 group focus:outline-none rounded-lg p-1"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs tracking-tight transition-all duration-300 ${
              isDark
                ? "bg-zinc-900 border border-white/15 text-white group-hover:border-white/40 shadow-specular-dark"
                : "bg-white border border-black/10 text-zinc-900 group-hover:border-black/30 shadow-xs"
            }`}>
              IB
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-sm tracking-tight transition-colors ${
                isDark ? "text-white group-hover:text-zinc-200" : "text-zinc-900 group-hover:text-black"
              }`}>
                {PROFILE.shortName}
              </span>
              <span className={`text-[11px] ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}>
                CADS | ML and Systems
              </span>
            </div>
          </a>

          {/* Navigation Links - Hidden on desktop (xl+) to prevent double navbar with left TOC */}
          <nav className={`hidden md:flex xl:hidden items-center gap-7 text-xs uppercase tracking-wider font-bold ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}>
            <a
              href="#overview"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className="hover:text-white transition-colors"
            >
              About Me
            </a>
            <a
              href="#impact"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className="hover:text-white transition-colors"
            >
              Impact
            </a>
            <a
              href="#projects"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className="hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className="hover:text-white transition-colors"
            >
              Skills
            </a>
            <a
              href="#credentials"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className="hover:text-white transition-colors"
            >
              Credentials
            </a>
          </nav>

          {/* Action Controls: Sound Toggle, Theme Switcher, PDF, Contact */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Audio Feedback Toggle with Equalizer Visualizer */}
            <button
              onClick={handleToggleSound}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 ${
                isDark
                  ? "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-white/10 shadow-specular-dark"
                  : "bg-white hover:bg-zinc-100 text-zinc-700 border border-black/10 shadow-xs"
              }`}
              title={soundEnabled ? "Mute Interaction Sound" : "Enable Interaction Sound"}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="hidden lg:flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-bounce" />
                    <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  </span>
                </>
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={handleToggleTheme}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isDark
                  ? "bg-zinc-900/90 hover:bg-zinc-800 text-amber-400 border border-white/10 shadow-specular-dark"
                  : "bg-white hover:bg-zinc-100 text-zinc-800 border border-black/10 shadow-xs"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href={PROFILE.resumePdf}
              download="CV_Idew_Bayu.pdf"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 ${
                isDark
                  ? "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-white/10 shadow-specular-dark"
                  : "bg-white hover:bg-zinc-100 text-zinc-800 border border-black/10 shadow-xs"
              }`}
            >
              <FileDown className="w-3.5 h-3.5 text-zinc-400" />
              <span>Download CV</span>
            </a>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => sounds.playHover()}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 ${
                isDark
                  ? "bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/5"
                  : "bg-zinc-900 hover:bg-black text-white shadow-sm"
              }`}
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5" />
                  <span>Get in Touch</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* LEFT SIDE TABLE OF CONTENTS (Poor Charlie's Almanack / Stripe Press style) */}
      <TableOfContents isDark={isDark} />

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 space-y-20 sm:space-y-28">
        
        {/* HERO SECTION WITH 3D DATA LATTICE (Konsep 1) */}
        <section id="overview" className="relative scroll-mt-28">
          {/* Konsep 1: 3D Interactive Data Lattice Canvas Floating Behind Hero */}
          <div className="absolute top-0 right-0 w-[360px] h-[340px] sm:w-[500px] sm:h-[460px] lg:w-[620px] lg:h-[500px] pointer-events-none -z-10 opacity-70">
            <DataLattice3D isDark={isDark} className="w-full h-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className={`inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs border backdrop-blur-md transition-colors ${
                isDark
                  ? "bg-zinc-900/80 border-white/10 text-zinc-300 shadow-specular-dark"
                  : "bg-white/90 border-black/10 text-zinc-700 shadow-xs"
              }`}>
                <span className="flex items-center gap-1.5 font-bold text-zinc-100 dark:text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  BNSP CADS Certified
                </span>
                <span className="text-zinc-500">|</span>
                <span>Informatics Engineering (UNIKOM)</span>
                <span className="text-zinc-500">|</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Full-Time Roles
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}>
                  {PROFILE.name}
                </h1>
                <p className={`text-base sm:text-xl font-bold tracking-tight ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}>
                  {PROFILE.role}
                </p>
              </div>

              {/* The Core Value Proposition Hook */}
              <p className={`text-base sm:text-lg font-medium leading-relaxed border-l-2 pl-4 py-0.5 ${
                isDark
                  ? "text-zinc-200 border-zinc-500"
                  : "text-zinc-800 border-zinc-400"
              }`}>
                "{PROFILE.valueHook}"
              </p>

              {/* Bio summary */}
              <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}>
                Graduated with an Informatics Engineering degree from Universitas
                Komputer Indonesia. Proven track record building real-time IoT
                telemetry dashboards at Batari Energy, automated computer vision
                OCR pipelines at Zoom Petcare, and deep learning sentiment
                inference APIs at BRIN.
              </p>

              {/* Target Roles Pill List */}
              <div className="pt-1">
                <span className={`text-xs uppercase tracking-wider font-extrabold block mb-2.5 ${
                  isDark ? "text-zinc-500" : "text-zinc-400"
                }`}>
                  Target Roles
                </span>
                <div className="flex flex-wrap gap-2">
                  {PROFILE.openRoles.map((role) => (
                    <span
                      key={role}
                      onMouseEnter={() => sounds.playHover()}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                        isDark
                          ? "bg-zinc-900/80 text-zinc-300 border-white/10 hover:border-zinc-500 shadow-specular-dark"
                          : "bg-white text-zinc-700 border-black/10 hover:border-zinc-400 shadow-2xs"
                      }`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  onClick={() => sounds.playClick()}
                  onMouseEnter={() => sounds.playHover()}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 active:scale-95 ${
                    isDark
                      ? "bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/5"
                      : "bg-zinc-900 hover:bg-black text-white shadow-sm"
                  }`}
                >
                  <span>Explore Featured Systems</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={PROFILE.resumePdf}
                  download="CV_Idew_Bayu.pdf"
                  onClick={() => sounds.playClick()}
                  onMouseEnter={() => sounds.playHover()}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 border ${
                    isDark
                      ? "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border-white/10 hover:border-zinc-500 shadow-specular-dark"
                      : "bg-white hover:bg-zinc-100 text-zinc-800 border-black/10 hover:border-zinc-400 shadow-2xs"
                  }`}
                >
                  <FileDown className="w-4 h-4 text-zinc-400" />
                  <span>Download CV</span>
                </a>

                <div className="flex items-center gap-2 pl-1">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    onMouseEnter={() => sounds.playHover()}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isDark
                        ? "bg-zinc-900/90 border-white/10 hover:border-zinc-400 text-zinc-400 hover:text-white shadow-specular-dark"
                        : "bg-white border-black/10 hover:border-zinc-400 text-zinc-600 hover:text-black shadow-2xs"
                    }`}
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    onMouseEnter={() => sounds.playHover()}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isDark
                        ? "bg-zinc-900/90 border-white/10 hover:border-zinc-400 text-zinc-400 hover:text-white shadow-specular-dark"
                        : "bg-white border-black/10 hover:border-zinc-400 text-zinc-600 hover:text-black shadow-2xs"
                    }`}
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Konsep 2 (3D Perspective Tilt Card with Specular Glare) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <TiltCard
                isDark={isDark}
                maxTilt={9}
                className="w-64 sm:w-72"
              >
                <div className={`rounded-2xl p-2.5 border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                  isDark
                    ? "bg-zinc-900/80 border-white/15 shadow-black/80 shadow-specular-dark"
                    : "bg-white border-black/10 shadow-zinc-300/50"
                }`}>
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 relative group">
                    <img
                      src={PROFILE.avatar}
                      alt={PROFILE.name}
                      className="w-full h-full object-cover object-center contrast-[1.03] group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Crystalline Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>
                  <div className="p-3 text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${
                        isDark ? "text-white" : "text-zinc-900"
                      }`}>
                        {PROFILE.shortName}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isDark
                          ? "text-zinc-200 bg-zinc-800 border-white/15"
                          : "text-zinc-800 bg-zinc-100 border-black/10"
                      }`}>
                        BNSP CADS
                      </span>
                    </div>
                    <p className={`text-[11px] truncate ${
                      isDark ? "text-zinc-400" : "text-zinc-500"
                    }`}>
                      {PROFILE.institution}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* SECTION: QUANTITATIVE IMPACT METRICS WITH 3D PERSPECTIVE TILT */}
        <section id="impact" className="space-y-5 scroll-mt-28">
          <div className={`flex items-center justify-between border-b pb-3 ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}>
            <div>
              <span className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest block">
                Quantifiable Impact
              </span>
              <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                isDark ? "text-white" : "text-zinc-900"
              }`}>
                Engineering Impact at a Glance
              </h2>
            </div>
            <div className={`text-xs flex items-center gap-1.5 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}>
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Production Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {IMPACT_STATS.map((stat, idx) => (
              <TiltCard
                key={idx}
                isDark={isDark}
                maxTilt={6}
                className="h-full"
              >
                <div className={`h-full rounded-2xl p-5 border backdrop-blur-md transition-all duration-300 relative overflow-hidden group ${
                  isDark
                    ? "bg-zinc-900/70 border-white/10 hover:border-white/25 shadow-specular-dark"
                    : "bg-white border-black/10 hover:border-black/25 shadow-xs"
                }`}>
                  <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 transition-colors ${
                    isDark ? "text-white group-hover:text-zinc-200" : "text-zinc-900"
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-bold mb-1.5 ${
                    isDark ? "text-zinc-200" : "text-zinc-800"
                  }`}>
                    {stat.label}
                  </div>
                  <div className={`text-xs font-semibold mb-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}>
                    {stat.context}
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}>
                    {stat.desc}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* SECTION: FEATURED ENGINEERING PROJECTS */}
        <section id="projects" className="space-y-6 scroll-mt-28">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}>
            <div>
              <span className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest block">
                Selected Work
              </span>
              <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                isDark ? "text-white" : "text-zinc-900"
              }`}>
                Featured Systems and Case Studies
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className={`inline-flex p-1 rounded-xl border backdrop-blur-md self-start sm:self-auto ${
              isDark
                ? "bg-zinc-900/90 border-white/10 shadow-specular-dark"
                : "bg-zinc-100 border-black/10"
            }`}>
              {[
                { id: "all", label: "All Projects" },
                { id: "energy", label: "CleanTech" },
                { id: "automation", label: "Automation" },
                { id: "ml", label: "Machine Learning" },
                { id: "health", label: "HealthTech" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveCategory(tab.id);
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-200 ${
                    activeCategory === tab.id
                      ? isDark
                        ? "bg-white text-black shadow-sm"
                        : "bg-white text-zinc-900 shadow-xs"
                      : isDark
                      ? "text-zinc-400 hover:text-white"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* PROJECT LIST: 3D TILT CARDS + DYNAMIC PROJECT LOGOS */}
          <div className="space-y-12">
            {filteredProjects.map((project) => (
              <div key={project.id} id={project.id} className="scroll-mt-24">
                <TiltCard
                  isDark={isDark}
                  maxTilt={4}
                  className="w-full"
                >
                <article
                  className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 space-y-7 ${
                    isDark
                      ? "bg-zinc-900/80 border-white/10 hover:border-white/20 shadow-specular-dark"
                      : "bg-white border-black/10 hover:border-black/20 shadow-sm"
                  }`}
                >
                  {/* Project Header Row with Custom Animated Logo */}
                  <div className={`flex flex-col lg:flex-row lg:items-start justify-between gap-5 border-b pb-6 ${
                    isDark ? "border-white/[0.08]" : "border-black/[0.06]"
                  }`}>
                    <div className="flex items-start gap-4">
                      {/* Project Logo Component with Micro-Animation */}
                      <div className="shrink-0 mt-0.5">
                        {project.id === "batari-bysense" && (
                          <BySenseLogo isDark={isDark} className="w-12 h-12" />
                        )}
                        {project.id === "zoom-petcare" && (
                          <ZoomPetcareLogo isDark={isDark} className="w-12 h-12" />
                        )}
                        {project.id === "brin-autonomous" && (
                          <BrinLogo isDark={isDark} className="w-12 h-12" />
                        )}
                        {project.id === "nutrimood-recommender" && (
                          <NutriMoodLogo isDark={isDark} className="w-12 h-12" />
                        )}
                        {project.id === "cimahi-battery" && (
                          <CbiLogo isDark={isDark} className="w-14 h-12" />
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            isDark
                              ? "bg-zinc-800 text-zinc-300 border-white/10"
                              : "bg-zinc-100 text-zinc-700 border-black/10"
                          }`}>
                            {project.number}
                          </span>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                            isDark
                              ? "text-zinc-300 bg-zinc-800/60 border-white/10"
                              : "text-zinc-700 bg-zinc-50 border-black/10"
                          }`}>
                            {project.categoryLabel}
                          </span>
                          <span className={`text-xs ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>•</span>
                          <span className={`text-xs font-medium ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                            {project.organization}
                          </span>
                        </div>

                        <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                          isDark ? "text-white" : "text-zinc-900"
                        }`}>
                          {project.title}
                        </h3>

                        <p className={`text-xs font-bold uppercase tracking-wider ${
                          isDark ? "text-zinc-400" : "text-zinc-500"
                        }`}>
                          Role: {project.role}
                        </p>
                      </div>
                    </div>

                    {/* Impact Metric Badge & Direct Link */}
                    <div className="flex flex-wrap lg:flex-col lg:items-end gap-2.5">
                      <div className={`px-3 py-1.5 rounded-xl border text-left lg:text-right ${
                        isDark
                          ? "bg-zinc-800/90 border-white/10 text-white shadow-specular-dark"
                          : "bg-zinc-100 border-black/10 text-zinc-900 shadow-2xs"
                      }`}>
                        <div className="text-sm font-extrabold tracking-tight">
                          {project.impactMetric}
                        </div>
                        <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                          {project.impactLabel}
                        </div>
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sounds.playClick()}
                          onMouseEnter={() => sounds.playHover()}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 ${
                            isDark
                              ? "bg-white hover:bg-zinc-200 text-black shadow-md shadow-white/5"
                              : "bg-zinc-900 hover:bg-black text-white shadow-xs"
                          }`}
                        >
                          <span>Visit Live Platform</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Narrative Flow */}
                  <div className="space-y-4">
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      isDark ? "text-zinc-200" : "text-zinc-800"
                    }`}>
                      {project.summary}
                    </p>

                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs sm:text-sm leading-relaxed p-4 rounded-xl border ${
                      isDark
                        ? "bg-zinc-950/50 border-white/5 text-zinc-300"
                        : "bg-zinc-50 border-black/5 text-zinc-700"
                    }`}>
                      <div>
                        <span className={`font-bold block mb-1 text-xs uppercase tracking-wider ${
                          isDark ? "text-zinc-400" : "text-zinc-500"
                        }`}>
                          Context and Challenge
                        </span>
                        <p>{project.challenge}</p>
                      </div>
                      <div>
                        <span className={`font-bold block mb-1 text-xs uppercase tracking-wider ${
                          isDark ? "text-zinc-400" : "text-zinc-500"
                        }`}>
                          Engineered Solution
                        </span>
                        <p>{project.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Highlights Bulleted Narrative */}
                  <div className="space-y-2">
                    <span className={`text-xs uppercase tracking-wider font-extrabold block ${
                      isDark ? "text-zinc-400" : "text-zinc-500"
                    }`}>
                      Key Deliverables and Outcomes
                    </span>
                    <ul className="space-y-2">
                      {project.highlights.map((h, i) => (
                        <li
                          key={i}
                          className={`text-xs sm:text-sm flex items-start gap-2.5 ${
                            isDark ? "text-zinc-300" : "text-zinc-700"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                            isDark ? "bg-zinc-400" : "bg-zinc-500"
                          }`} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image Gallery Showcase */}
                  {project.images.length > 0 && (
                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs uppercase tracking-wider font-extrabold ${
                          isDark ? "text-zinc-400" : "text-zinc-500"
                        }`}>
                          Production Interface Snapshots ({project.images.length})
                        </span>
                        <span className={`text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                          Click snapshot to expand full resolution
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {project.images.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              sounds.playChime(600, 840);
                              setSelectedImage({ project, index: idx });
                            }}
                            onMouseEnter={() => sounds.playHover()}
                            className={`group/thumb cursor-pointer rounded-xl border overflow-hidden transition-all duration-300 relative ${
                              isDark
                                ? "bg-zinc-950 border-white/10 hover:border-white/30"
                                : "bg-zinc-100 border-black/10 hover:border-black/30"
                            }`}
                          >
                            <div className="aspect-[16/10] overflow-hidden bg-black relative">
                              <img
                                src={img.url}
                                alt={img.title}
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="px-3 py-1 rounded-full bg-white/90 text-black text-xs font-bold flex items-center gap-1.5 shadow-md">
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Inspect</span>
                                </div>
                              </div>
                            </div>
                            <div className="p-2.5 text-left">
                              <p className={`text-xs font-bold truncate ${
                                isDark ? "text-zinc-200" : "text-zinc-800"
                              }`}>
                                {img.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className={`pt-4 border-t flex flex-wrap items-center gap-1.5 ${
                    isDark ? "border-white/[0.08]" : "border-black/[0.06]"
                  }`}>
                    <span className={`text-xs font-bold mr-2 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                      Stack:
                    </span>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        onMouseEnter={() => sounds.playHover()}
                        className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border transition-colors ${
                          isDark
                            ? "bg-zinc-950/60 text-zinc-300 border-white/5 hover:border-white/20"
                            : "bg-zinc-100 text-zinc-700 border-black/5 hover:border-black/20"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: SKILLS AND TOOLING */}
      <section id="skills" className="space-y-6 scroll-mt-28">
          <div className={`border-b pb-3 ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}>
            <span className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest block">
              Core Capabilities
            </span>
            <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-zinc-900"
            }`}>
              Technical Tooling and Engineering Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SKILL_GROUPS.map((group, idx) => (
              <TiltCard
                key={idx}
                isDark={isDark}
                maxTilt={5}
                className="h-full"
              >
                <div className={`h-full rounded-2xl p-6 border backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
                  isDark
                    ? "bg-zinc-900/70 border-white/10 hover:border-white/20 shadow-specular-dark"
                    : "bg-white border-black/10 hover:border-black/20 shadow-xs"
                }`}>
                  <div className="space-y-2">
                    <h3 className={`text-base font-extrabold ${
                      isDark ? "text-white" : "text-zinc-900"
                    }`}>
                      {group.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }`}>
                      {group.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-5">
                    {group.tools.map((tool) => (
                      <span
                        key={tool}
                        onMouseEnter={() => sounds.playHover()}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                          isDark
                            ? "bg-zinc-950/70 text-zinc-300 border-white/5 hover:border-zinc-500"
                            : "bg-zinc-100 text-zinc-700 border-black/5 hover:border-zinc-400"
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* SECTION: EDUCATION AND CERTIFICATIONS */}
        <section id="credentials" className="space-y-6 scroll-mt-28">
          <div className={`border-b pb-3 ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}>
            <span className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest block">
              Qualifications
            </span>
            <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-zinc-900"
            }`}>
              Education and Certified Credentials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Degree */}
            <TiltCard isDark={isDark} maxTilt={5}>
              <div className={`rounded-2xl p-6 border backdrop-blur-md space-y-3 ${
                isDark
                  ? "bg-zinc-900/70 border-white/10 shadow-specular-dark"
                  : "bg-white border-black/10 shadow-xs"
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}>
                    Academic Degree
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                    isDark ? "text-zinc-300 border-white/10" : "text-zinc-700 border-black/10"
                  }`}>
                    Graduated
                  </span>
                </div>
                <h3 className={`text-lg font-bold ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}>
                  Bachelor of Computer Science (S.Kom)
                </h3>
                <p className={`text-sm ${
                  isDark ? "text-zinc-300" : "text-zinc-700"
                }`}>
                  Universitas Komputer Indonesia (UNIKOM) | Informatics Engineering
                </p>
                <p className={`text-xs leading-relaxed ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}>
                  Specialized in software systems engineering, data pipelines, and
                  machine learning architectures.
                </p>
              </div>
            </TiltCard>

            {/* Certification (CADS) */}
            <TiltCard isDark={isDark} maxTilt={5}>
              <div className={`rounded-2xl p-6 border backdrop-blur-md space-y-3 ${
                isDark
                  ? "bg-zinc-900/70 border-white/10 shadow-specular-dark"
                  : "bg-white border-black/10 shadow-xs"
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}>
                    National Certification
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    Verified CADS
                  </span>
                </div>
                <h3 className={`text-lg font-bold ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}>
                  Certified Associate Data Scientist (CADS)
                </h3>
                <p className={`text-sm ${
                  isDark ? "text-zinc-300" : "text-zinc-700"
                }`}>
                  Badan Nasional Sertifikasi Profesi (BNSP)
                </p>
                <p className={`text-xs leading-relaxed ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}>
                  Officially assessed and verified in data preprocessing, statistical
                  modeling, predictive pipelines, and production machine learning.
                </p>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* FOOTER */}
        <section className={`pt-12 border-t text-xs ${
          isDark ? "border-white/[0.08] text-zinc-500" : "border-black/[0.08] text-zinc-500"
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className={`font-bold ${isDark ? "text-zinc-300" : "text-zinc-800"}`}>
                {PROFILE.name}
              </span>
              <span>•</span>
              <span>{PROFILE.location}</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>WIB (UTC+7): {currentTime || "14:00:00"}</span>
              </span>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                onMouseEnter={() => sounds.playHover()}
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                onMouseEnter={() => sounds.playHover()}
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING ACTION BOTTOM DOCK (Apple Dynamic Island Style) */}
      <aside aria-label="Quick Action Dock" className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3.5 py-2 rounded-full backdrop-blur-2xl border shadow-2xl flex items-center gap-2 sm:gap-3 text-xs transition-colors duration-200 ${
        isDark
          ? "bg-zinc-900/90 border-white/15 text-zinc-200 shadow-black/80 shadow-specular-dark"
          : "bg-[#18181B]/95 border-white/15 text-zinc-200 shadow-2xl shadow-zinc-950/30"
      }`}>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full hidden sm:inline text-zinc-300 bg-zinc-800 border border-white/10">
          FAST ACCESS
        </span>

        <a
          href="https://bysense.batarienergy.com/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sounds.playClick()}
          onMouseEnter={() => sounds.playHover()}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white"
        >
          <span>BySense</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400" />
        </a>

        <a
          href="https://brin-project-kp.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sounds.playClick()}
          onMouseEnter={() => sounds.playHover()}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white"
        >
          <span>BRIN</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400" />
        </a>

        <a
          href="https://nutrimoodv.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sounds.playClick()}
          onMouseEnter={() => sounds.playHover()}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white"
        >
          <span>NutriMood</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400" />
        </a>

        <a
          href="https://cimahibattery.com/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sounds.playClick()}
          onMouseEnter={() => sounds.playHover()}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white"
        >
          <span>CBI</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400" />
        </a>

        <div className="w-px h-4 mx-0.5 bg-zinc-700" />

        <button
          onClick={handleCopyEmail}
          onMouseEnter={() => sounds.playHover()}
          className="flex items-center gap-1 px-3 py-1 rounded-full font-bold transition-all active:scale-95 bg-white hover:bg-zinc-200 text-black shadow-xs"
        >
          {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Mail className="w-3 h-3" />}
          <span>{copiedEmail ? "Copied" : "Email"}</span>
        </button>

        <a
          href={PROFILE.resumePdf}
          download="CV_Idew_Bayu.pdf"
          onClick={() => sounds.playClick()}
          onMouseEnter={() => sounds.playHover()}
          className="p-1.5 rounded-full transition-colors bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white"
          title="Download CV (PDF)"
        >
          <FileDown className="w-3.5 h-3.5 text-zinc-400" />
        </a>

        <button
          onClick={handleToggleSound}
          className="p-1.5 rounded-full transition-colors bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white"
          title={soundEnabled ? "Mute Interaction Sound" : "Enable Interaction Sound"}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
          )}
        </button>
      </aside>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => {
              sounds.playClick();
              setSelectedImage(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className={`relative max-w-5xl w-full rounded-2xl border overflow-hidden shadow-2xl flex flex-col max-h-[90vh] ${
                isDark
                  ? "bg-zinc-900 border-white/15 shadow-specular-dark"
                  : "bg-white border-black/10"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className={`flex items-center justify-between px-5 py-3.5 border-b ${
                isDark
                  ? "bg-zinc-950 border-white/10"
                  : "bg-zinc-50 border-black/10"
              }`}>
                <div className="flex items-center gap-2 truncate">
                  <span className={`text-xs font-bold ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                    {selectedImage.project.number}
                  </span>
                  <span className="text-zinc-500">|</span>
                  <span className={`text-sm font-bold truncate ${
                    isDark ? "text-white" : "text-zinc-900"
                  }`}>
                    {selectedImage.project.images[selectedImage.index].title}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}>
                    {selectedImage.index + 1} /{" "}
                    {selectedImage.project.images.length}
                  </span>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setSelectedImage(null);
                    }}
                    onMouseEnter={() => sounds.playHover()}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isDark
                        ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        : "text-zinc-500 hover:text-black hover:bg-zinc-200"
                    }`}
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
                        sounds.playClick();
                        setSelectedImage({
                          ...selectedImage,
                          index:
                            (selectedImage.index -
                              1 +
                              selectedImage.project.images.length) %
                            selectedImage.project.images.length
                        });
                      }}
                      onMouseEnter={() => sounds.playHover()}
                      className="absolute left-3 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-700 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                        setSelectedImage({
                          ...selectedImage,
                          index:
                            (selectedImage.index + 1) %
                            selectedImage.project.images.length
                        });
                      }}
                      onMouseEnter={() => sounds.playHover()}
                      className="absolute right-3 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-700 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Caption Footer */}
              <div className={`p-4 border-t text-xs leading-relaxed ${
                isDark
                  ? "bg-zinc-950 border-white/10 text-zinc-300"
                  : "bg-zinc-50 border-black/10 text-zinc-700"
              }`}>
                <span className={`font-bold mr-1 ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}>
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
