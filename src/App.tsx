import { useState, useEffect } from 'react';

interface Project {
  id: string;
  number: string;
  title: string;
  context: string;
  year: string;
  category: string;
  badge: string;
  featured: boolean;
  liveUrl: string;
  domain: string;
  summary: string;
  deliverables: string[];
  architecture: string;
  stack: string[];
}

const PROFILE = {
  name: "I Dewa Nyoman Bayu Satria Wibawa",
  shortName: "Bayu Satria",
  role: "Machine Learning & Software Engineering Portfolio",
  tagline:
    "Building production Machine Learning models, Natural Language Processing pipelines, and real time web monitoring applications.",
  email: "idewanyomanbayusw@gmail.com",
  linkedin: "https://www.linkedin.com/in/idewanyomanbayu",
  github: "https://github.com/idewbayu14"
};

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
      "Deep learning text classification platform analyzing public opinion from YouTube and Reddit to evaluate consumer readiness for Level 2 autonomous vehicles.",
    deliverables: [
      "Trained deep learning Natural Language Processing models to classify unstructured public discussions into positive, negative, and neutral sentiment categories.",
      "Built automated social media data collection and exploratory data analysis pipelines for continuous opinion tracking.",
      "Deployed a real time inference API connected directly to an interactive research dashboard."
    ],
    architecture:
      "Multi source text scraping from YouTube and Reddit processed through custom tokenization and normalization pipelines, served via a Deep Learning classification API to a live React telemetry interface.",
    stack: ["Python", "Deep Learning", "NLP", "Web Scraping", "REST API", "React"]
  },
  {
    id: "nutrimood",
    number: "02",
    title: "NutriMood Personalized Food Recommendation System",
    context: "Dicoding & DBS Foundation Capstone",
    year: "2025",
    category: "ml",
    badge: "Machine Learning & AI",
    featured: true,
    liveUrl: "https://nutrimoodv.vercel.app/",
    domain: "nutrimoodv.vercel.app",
    summary:
      "Intelligent dietary recommendation web application that maps user emotional states and personal health constraints to tailored daily meal suggestions.",
    deliverables: [
      "Engineered a personalized recommendation model that evaluates user mood inputs alongside dietary and medical restrictions.",
      "Constructed end to end data preprocessing and nutritional feature matching pipelines.",
      "Packaged and deployed the trained model as a cloud REST API integrated into a responsive web interface."
    ],
    architecture:
      "User mood and health constraint inputs processed through a feature matching engine and Machine Learning inference service, delivered in real time through a cloud hosted web application.",
    stack: ["Machine Learning", "Recommender System", "Python", "Data Preprocessing", "REST API", "Web App"]
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
      "Cross platform IoT telemetry dashboard monitoring live photovoltaic power generation, solar radiation forecasts, and energy consumption across installations.",
    deliverables: [
      "Developed the full stack web application and mobile interface from the ground up with interactive power analytics.",
      "Integrated solar irradiance streams and inverter APIs to forecast energy yield and detect performance anomalies.",
      "Completed mobile application testing, debugging, and production release to the Google Play Store."
    ],
    architecture:
      "On site solar inverter telemetry and weather radiation feeds aggregated via modular REST APIs, rendered on a responsive web dashboard and Android mobile application.",
    stack: ["React", "Next.js", "React Native", "REST API", "IoT Telemetry", "Data Visualization"]
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
      "High performance commercial web platform designed for structured automotive and industrial battery catalog browsing and direct customer conversion.",
    deliverables: [
      "Designed and deployed a responsive commercial website featuring structured product categorization and fast search filtering.",
      "Optimized core web vitals, mobile responsiveness, and search engine visibility for retail operations."
    ],
    architecture:
      "Modern responsive frontend architecture with structured catalog indexing, optimized asset delivery, and custom domain production hosting.",
    stack: ["Web Development", "Responsive UI", "Frontend Architecture", "SEO Optimization", "Production Hosting"]
  }
];

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeFilter, setActiveFilter] = useState<"all" | "ml" | "web">("all");
  const [activeModal, setActiveModal] = useState<Project | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isDark = theme === "dark";

  const visibleProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((item) => item.category === activeFilter);

  const handleCopy = (text: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const glassCard = isDark
    ? "bg-white/[0.055] backdrop-blur-2xl backdrop-saturate-150 border border-white/[0.14] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_24px_60px_rgba(0,0,0,0.5)]"
    : "bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_20px_50px_rgba(15,23,42,0.05)]";

  const glassHover = isDark
    ? "hover:bg-white/[0.08] hover:border-white/[0.24] transition-all duration-500"
    : "hover:bg-white/80 hover:border-white hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_28px_65px_rgba(15,23,42,0.08)] transition-all duration-500";

  const glassButton = isDark
    ? "bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.16] text-neutral-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
    : "bg-white/75 hover:bg-white border border-white/95 text-neutral-900 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.04)]";

  const headingColor = isDark ? "text-white" : "text-neutral-900";
  const bodyColor = isDark ? "text-neutral-300" : "text-neutral-600";
  const mutedColor = isDark ? "text-neutral-400" : "text-neutral-500";

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-700 ${
        isDark ? "bg-[#09090B] text-neutral-100 dark" : "bg-[#F2F2F7] text-neutral-900"
      }`}
    >
      {/* Ambient Liquid Refraction Spheres */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className={`orb-a absolute -top-28 left-[10%] w-[36rem] h-[36rem] rounded-full blur-[120px] ${
            isDark
              ? "bg-gradient-to-br from-neutral-500/20 via-slate-400/10 to-transparent"
              : "bg-gradient-to-br from-white via-slate-200/90 to-neutral-300/60"
          }`}
        />
        <div
          className={`orb-b absolute top-[35%] -right-24 w-[38rem] h-[38rem] rounded-full blur-[130px] ${
            isDark
              ? "bg-gradient-to-tl from-zinc-500/15 via-neutral-600/10 to-transparent"
              : "bg-gradient-to-tl from-white via-zinc-200/85 to-slate-300/50"
          }`}
        />
      </div>

      {/* Floating Apple Liquid Glass Capsule Header */}
      <header className="sticky top-5 z-40 px-4 sm:px-6">
        <div
          className={`max-w-5xl mx-auto rounded-full px-3 sm:px-5 py-2.5 flex items-center justify-between transition-all duration-500 ${
            isDark
              ? "bg-neutral-900/65 backdrop-blur-2xl backdrop-saturate-150 border border-white/[0.16] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_16px_40px_rgba(0,0,0,0.6)]"
              : "bg-white/65 backdrop-blur-2xl backdrop-saturate-150 border border-white/90 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_12px_35px_rgba(0,0,0,0.06)]"
          }`}
        >
          <div className="flex items-center gap-2.5 pl-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isDark ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-neutral-900"
              }`}
            />
            <span className={`font-extrabold text-sm tracking-tight ${headingColor}`}>
              {PROFILE.shortName}
            </span>
          </div>

          {/* Segmented Category Filter inside Navbar on Desktop */}
          <div
            className={`hidden md:inline-flex p-1 rounded-full ${
              isDark ? "bg-white/[0.06]" : "bg-black/[0.04]"
            }`}
          >
            {[
              { id: "all", label: "All Works (4)" },
              { id: "ml", label: "Machine Learning (2)" },
              { id: "web", label: "Web & IoT Systems (2)" }
            ].map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as "all" | "ml" | "web")}
                  className={`px-3.5 py-1 rounded-full text-xs font-extrabold transition-all duration-300 ${
                    active
                      ? isDark
                        ? "bg-white text-neutral-950 shadow-xs"
                        : "bg-white text-neutral-950 shadow-xs"
                      : isDark
                      ? "text-neutral-400 hover:text-white"
                      : "text-neutral-600 hover:text-neutral-950"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${glassButton}`}
            >
              {isDark ? "Light Glass" : "Dark Glass"}
            </button>
            <a
              href={`mailto:${PROFILE.email}`}
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                isDark
                  ? "bg-white text-neutral-950 hover:bg-neutral-200"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
            >
              <span>Contact</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Showcase Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-8">
        {/* Minimalist Intro Hero Panel */}
        <section className={`rounded-[34px] p-7 sm:p-11 relative overflow-hidden ${glassCard}`}>
          <div
            className={`pointer-events-none absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent ${
              isDark ? "via-white/40" : "via-white"
            } to-transparent`}
          />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Selected Works & Live Deployments</span>
            </div>

            <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${headingColor}`}>
              {PROFILE.name}
            </h1>

            <p className={`text-base sm:text-lg font-medium leading-relaxed ${bodyColor}`}>
              {PROFILE.tagline}
            </p>
          </div>

          <div className="mt-7 pt-6 border-t border-neutral-500/15 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${glassButton}`}
              >
                LinkedIn Profile ↗
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${glassButton}`}
              >
                GitHub ↗
              </a>
              <button
                onClick={() => handleCopy(PROFILE.email, "email")}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${glassButton}`}
              >
                {copiedId === "email" ? "Email Copied" : PROFILE.email}
              </button>
            </div>

            {/* Mobile Filter Switcher */}
            <div
              className={`flex md:hidden p-1 rounded-full ${
                isDark ? "bg-white/[0.06]" : "bg-black/[0.05]"
              }`}
            >
              {[
                { id: "all", label: "All (4)" },
                { id: "ml", label: "ML & AI (2)" },
                { id: "web", label: "Web & IoT (2)" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as "all" | "ml" | "web")}
                  className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all ${
                    activeFilter === tab.id
                      ? "bg-white text-neutral-950 shadow-xs"
                      : mutedColor
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Live Projects Bento Showcase Grid */}
        <section className="grid md:grid-cols-2 gap-6">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className={`rounded-[32px] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden ${glassCard} ${glassHover}`}
            >
              <div>
                {/* Top Pill & Index */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                        project.featured
                          ? isDark
                            ? "bg-white text-neutral-950"
                            : "bg-neutral-900 text-white"
                          : isDark
                          ? "bg-white/[0.1] text-neutral-200 border border-white/15"
                          : "bg-black/[0.06] text-neutral-800"
                      }`}
                    >
                      {project.badge}
                    </span>
                    <span className={`text-xs font-bold ${mutedColor}`}>
                      {project.year}
                    </span>
                  </div>

                  <span className={`text-xs font-black tracking-widest ${mutedColor}`}>
                    {project.number}
                  </span>
                </div>

                {/* Project Context & Title */}
                <div className="space-y-1.5 mb-4">
                  <div className={`text-xs font-extrabold uppercase tracking-wider ${mutedColor}`}>
                    {project.context}
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-black tracking-tight leading-snug ${headingColor}`}>
                    {project.title}
                  </h2>
                </div>

                {/* Project Summary */}
                <p className={`text-sm font-medium leading-relaxed mb-6 ${bodyColor}`}>
                  {project.summary}
                </p>

                {/* Key Deliverables */}
                <ul className={`space-y-2.5 text-xs sm:text-sm font-medium mb-7 ${bodyColor}`}>
                  {project.deliverables.map((item, i) => (
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

              {/* Bottom Tech Pills & Live Action Buttons */}
              <div className="pt-5 border-t border-neutral-500/15 space-y-5">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        isDark
                          ? "bg-white/[0.06] text-neutral-300 border border-white/[0.1]"
                          : "bg-white/80 text-neutral-700 border border-white shadow-2xs"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold tracking-tight transition-all ${
                      isDark
                        ? "bg-white text-neutral-950 hover:bg-neutral-200"
                        : "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Open {project.domain}</span>
                    <span>↗</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModal(project)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${glassButton}`}
                    >
                      Architecture
                    </button>
                    <button
                      onClick={() => handleCopy(project.liveUrl, project.id)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${glassButton}`}
                    >
                      {copiedId === project.id ? "Copied" : "Copy Link"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Minimal Footer */}
        <footer className={`rounded-[28px] px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold ${glassCard}`}>
          <span className={mutedColor}>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className={`hover:underline underline-offset-4 ${headingColor}`}
            >
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline underline-offset-4 ${headingColor}`}
            >
              LinkedIn ↗
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline underline-offset-4 ${headingColor}`}
            >
              GitHub ↗
            </a>
          </div>
        </footer>
      </main>

      {/* Liquid Glass Technical Architecture Modal */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`max-w-lg w-full rounded-[32px] p-7 sm:p-8 space-y-5 transition-all ${
              isDark
                ? "bg-neutral-900/85 backdrop-blur-3xl border border-white/20 text-neutral-100 shadow-2xl"
                : "bg-white/85 backdrop-blur-3xl border border-white text-neutral-900 shadow-2xl"
            }`}
          >
            <div className="flex items-start justify-between gap-4 border-b border-neutral-500/15 pb-4">
              <div>
                <div className={`text-xs font-extrabold uppercase tracking-wider ${mutedColor}`}>
                  {activeModal.context} ({activeModal.year})
                </div>
                <h3 className={`text-xl font-black tracking-tight mt-1 ${headingColor}`}>
                  {activeModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold ${glassButton}`}
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <div className={`text-xs font-extrabold uppercase tracking-wider mb-1.5 ${mutedColor}`}>
                  System Architecture Flow
                </div>
                <p
                  className={`p-4 rounded-2xl font-bold leading-relaxed ${
                    isDark ? "bg-white/[0.06] text-neutral-200" : "bg-black/[0.04] text-neutral-800"
                  }`}
                >
                  {activeModal.architecture}
                </p>
              </div>

              <div>
                <div className={`text-xs font-extrabold uppercase tracking-wider mb-2 ${mutedColor}`}>
                  Engineering Deliverables
                </div>
                <ul className={`space-y-2 font-medium ${bodyColor}`}>
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

            <div className="pt-4 border-t border-neutral-500/15 flex items-center justify-between gap-3">
              <a
                href={activeModal.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold tracking-tight ${
                  isDark
                    ? "bg-white text-neutral-950 hover:bg-neutral-200"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                Launch {activeModal.domain} ↗
              </a>
              <button
                onClick={() => handleCopy(activeModal.liveUrl, "modal")}
                className={`px-4 py-2.5 rounded-full text-xs font-bold ${glassButton}`}
              >
                {copiedId === "modal" ? "Copied Link" : "Copy URL"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

