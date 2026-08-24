import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectBullet {
  title: string;
  desc: string;
}

interface Project {
  id: number;
  logoText: string;
  title: string;
  centerTitle?: string;
  subtitle: string;
  date: string;
  category: "AI & Intelligence" | "Infrastructure" | "Security & Ledger";
  modalHeading: string;
  modalIntro: string;
  modalPoints: ProjectBullet[];
  image?: string;
  icon?: React.ReactNode;
  bgStyle: {
    base: string;
    layer1: string;
    layer2: string;
    layer3: string;
  };
}

const UpcomingProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      logoText: "Agentic AI",
      title: "Autonomous Workflow Swarms",
      centerTitle: "Autonomous\nWorkflow Swarms",
      subtitle: "Executing multi-step enterprise business operations using self-correcting agent chains.",
      date: "Jul 28, 2026",
      category: "AI & Intelligence",
      modalHeading: "Executing multi-step enterprise business operations with self-correcting agent chains",
      modalIntro: "Enterprise workflow automation powered by self-healing, multi-agent intelligence swarms that dynamically adapt to real-time execution anomalies.",
      modalPoints: [
        { title: "Prevent", desc: "Strict boundary checking prevents unauthorized agent state mutations and data exfiltration across connected business systems." },
        { title: "Protect", desc: "Continuous execution monitoring halts runaway loops and automatically rolls back unverified database transactions." },
        { title: "Scale", desc: "Distributed task queues process over 50,000 parallel execution steps per second with guaranteed order delivery." }
      ],
      image: "/images/project_teal_mesh.jpg",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M10.5 8.5L7.5 15.5" />
          <path d="M13.5 8.5L16.5 15.5" />
          <path d="M9 18h6" />
        </svg>
      ),
      bgStyle: {
        base: "bg-gradient-to-tr from-[#38bdf8] via-[#60a5fa] to-[#bfdbfe]",
        layer1: "absolute -top-12 -left-12 w-4/5 h-4/5 bg-[#93c5fd] rounded-full blur-3xl opacity-80 group-hover:scale-125 transition-transform duration-700",
        layer2: "absolute -bottom-10 -right-10 w-3/4 h-3/4 bg-[#2563eb] rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700",
        layer3: "absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-[#e0f2fe] rounded-full blur-xl opacity-90 group-hover:rotate-45 transition-transform duration-1000",
      },
    },
    {
      id: 2,
      logoText: "Risk Matrix",
      title: "Institutional Trade Engine",
      centerTitle: "Institutional\nTrade Engine",
      subtitle: "Ultra-low latency portfolio analytics, predictive hedging, and real-time ledger settlement.",
      date: "Jul 18, 2026",
      category: "Security & Ledger",
      modalHeading: "Ultra-low latency portfolio analytics & cryptographic trade settlement",
      modalIntro: "Institutional-grade financial execution pipeline combining predictive market hedging algorithms with zero-knowledge cryptographic ledger verification.",
      modalPoints: [
        { title: "Verify", desc: "Zero-knowledge proofs validate trade compliance and collateral margin ratios before transaction submission." },
        { title: "Shield", desc: "Hardware isolation modules protect proprietary trading algorithms and private order book depth." },
        { title: "Optimize", desc: "Sub-millisecond order routing minimizes market slippage and maximizes execution liquidity." }
      ],
      image: "/images/project_hot_pink_mesh.jpg",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
      bgStyle: {
        base: "bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#93c5fd]",
        layer1: "absolute top-0 right-0 w-4/5 h-4/5 bg-[#38bdf8] rounded-full blur-3xl opacity-85 group-hover:scale-125 transition-transform duration-700",
        layer2: "absolute -bottom-12 -left-12 w-3/4 h-3/4 bg-[#1e3a8a] rounded-full blur-2xl opacity-80 group-hover:scale-110 transition-transform duration-700",
        layer3: "absolute top-1/2 left-1/3 w-2/3 h-1/2 bg-[#60a5fa] rounded-full blur-2xl opacity-70",
      },
    },
    {
      id: 3,
      logoText: "Agent Studio",
      title: "Amthromax Agent Orchestrator",
      centerTitle: "Amthromax\nAgent Orchestrator",
      subtitle: "Unified control plane to design, monitor, and scale enterprise-grade AI agents.",
      date: "Jul 05, 2026",
      category: "AI & Intelligence",
      modalHeading: "Unified control plane to design, monitor, and scale enterprise AI agents",
      modalIntro: "A central governance portal enabling enterprise teams to visual-code, audit, and deploy custom intelligent agent networks with full RBAC policies.",
      modalPoints: [
        { title: "Govern", desc: "Granular role-based access control (RBAC) ensures developers and agents operate strictly within permitted API scopes." },
        { title: "Audit", desc: "Real-time prompt and response tracing records every step of agent decision-making for regulatory compliance." },
        { title: "Deploy", desc: "One-click deployment converts visual agent topologies into production serverless containers instantly." }
      ],
      image: "/images/project_green_scale_mesh.jpg",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
          <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
        </svg>
      ),
      bgStyle: {
        base: "bg-gradient-to-tr from-[#10b981] via-[#34d399] to-[#a3e635]",
        layer1: "absolute -top-12 -right-12 w-4/5 h-4/5 bg-[#bef264] rounded-full blur-3xl opacity-85 group-hover:scale-125 transition-transform duration-700",
        layer2: "absolute -bottom-10 -left-10 w-3/4 h-3/4 bg-[#047857] rounded-full blur-2xl opacity-70 group-hover:scale-110 transition-transform duration-700",
        layer3: "absolute top-1/4 left-1/3 w-1/2 h-1/2 bg-[#ecfccb] rounded-full blur-xl opacity-90",
      },
    },
    {
      id: 4,
      logoText: "Cognitive AI",
      title: "Adaptive Knowledge Engine",
      centerTitle: "Adaptive\nKnowledge Engine",
      subtitle: "Transforming unstructured multi-modal enterprise data into dynamic semantic knowledge bases.",
      date: "Jun 28, 2026",
      category: "AI & Intelligence",
      modalHeading: "Transforming unstructured multi-modal data into dynamic semantic knowledge bases",
      modalIntro: "Neural data ingested across PDFs, databases, and media feeds is automatically indexed into high-dimensional vector representations for sub-5ms lookup.",
      modalPoints: [
        { title: "Index", desc: "Automated schema extraction converts raw documents, videos, and logs into structured vector embeddings." },
        { title: "Search", desc: "Sub-5ms semantic vector retrieval delivers precise contextual answers across multi-terabyte knowledge stores." },
        { title: "Refine", desc: "Continuous feedback loops continuously refine embedding accuracy based on user query satisfaction." }
      ],
      image: "/images/project_purple_gradient_mesh.jpg",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a9 9 0 019 9c0 3.1-1.5 5.8-3.8 7.5L16 21h-8l-1.2-2.5C4.5 16.8 3 14.1 3 11a9 9 0 019-9z" />
          <path d="M9 10h6" />
          <path d="M12 7v6" />
        </svg>
      ),
      bgStyle: {
        base: "bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-[#f472b6]",
        layer1: "absolute -top-10 -left-10 w-4/5 h-4/5 bg-[#e879f9] rounded-full blur-3xl opacity-80 group-hover:scale-125 transition-transform duration-700",
        layer2: "absolute -bottom-10 -right-10 w-3/4 h-3/4 bg-[#581c87] rounded-full blur-2xl opacity-80 group-hover:scale-110 transition-transform duration-700",
        layer3: "absolute top-1/3 right-1/4 w-1/2 h-1/2 bg-[#fbcfe8] rounded-full blur-xl opacity-85",
      },
    },
    {
      id: 5,
      logoText: "Apex AI",
      title: "Apex Financial Engine",
      centerTitle: "Apex\nFinancial Engine",
      subtitle: "Generative intelligence engine for institutional wealth allocation and predictive risk modeling.",
      date: "Jun 18, 2026",
      category: "AI & Intelligence",
      modalHeading: "Generative intelligence engine for institutional wealth & predictive risk modeling",
      modalIntro: "Real-time market simulation engine using agentic Monte Carlo techniques to model portfolio drawdowns, macro shifts, and yield optimization.",
      modalPoints: [
        { title: "Simulate", desc: "Run over 1,000,000 stress scenarios per minute across global equity, bond, and derivative markets." },
        { title: "Protect", desc: "Automated hedging triggers mitigate downside tail risk during sudden market volatility spikes." },
        { title: "Report", desc: "Automated executive summary generation produces regulatory-ready compliance briefings instantly." }
      ],
      image: "/images/project_dark_purple_mesh.jpg",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
          <path d="M11 3v18" />
          <path d="M2 9h20" />
        </svg>
      ),
      bgStyle: {
        base: "bg-gradient-to-tr from-[#ea580c] via-[#f59e0b] to-[#fde047]",
        layer1: "absolute -top-12 -left-12 w-4/5 h-4/5 bg-[#fef08a] rounded-full blur-3xl opacity-90 group-hover:scale-125 transition-transform duration-700",
        layer2: "absolute -bottom-10 -right-10 w-3/4 h-3/4 bg-[#c2410c] rounded-full blur-2xl opacity-75 group-hover:scale-110 transition-transform duration-700",
        layer3: "absolute top-1/4 right-1/3 w-1/2 h-1/2 bg-[#f43f5e] rounded-full blur-xl opacity-75",
      },
    },
    {
      id: 6,
      logoText: "Neural Grid",
      title: "Hyper-Scale Data Mesh",
      centerTitle: "Hyper-Scale\nData Mesh",
      subtitle: "Scaling high-fidelity real-time data ingestion and stream processing for enterprise analytics.",
      date: "Jun 05, 2026",
      category: "Infrastructure",
      modalHeading: "Scaling high-fidelity real-time data ingestion & stream processing for enterprise analytics",
      modalIntro: "Low-latency streaming grid connecting distributed data centers with zero-copy memory buffers and automatic failover clustering.",
      modalPoints: [
        { title: "Stream", desc: "Zero-copy Kafka pipeline architecture processes multi-gigabit data feeds with sub-millisecond overhead." },
        { title: "Balance", desc: "Dynamic regional load balancing shifts telemetry traffic away from congested network hubs automatically." },
        { title: "Isolate", desc: "Encrypted memory enclaves prevent cross-tenant data bleeding across shared cloud instances." }
      ],
      image: "/images/project_teal_mesh.jpg",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      bgStyle: {
        base: "bg-gradient-to-br from-[#0284c7] via-[#06b6d4] to-[#67e8f9]",
        layer1: "absolute -top-10 -right-10 w-4/5 h-4/5 bg-[#a5f3fc] rounded-full blur-3xl opacity-85 group-hover:scale-125 transition-transform duration-700",
        layer2: "absolute -bottom-12 -left-12 w-3/4 h-3/4 bg-[#0f172a] rounded-full blur-2xl opacity-70 group-hover:scale-110 transition-transform duration-700",
        layer3: "absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-[#38bdf8] rounded-full blur-xl opacity-80",
      },
    },
  ];

  return (
    <section className="w-full bg-white dark:bg-black py-24 border-t border-gray-200/80 dark:border-white/10 transition-colors duration-300 font-sans relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Header Block */}
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-3xl leading-tight">
            Next-Gen Platforms & Core Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            A first look into our active engineering pipeline. Deploying autonomous reasoning, hyper-scale data grids, and zero-trust architectures for global enterprise platforms.
          </p>
        </div>

        {/* Big Boxes 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col space-y-4 group cursor-pointer"
            >
              {/* Premium Big Box with Pure CSS Silk Gradient Mesh or Image */}
              <div
                className={`w-full aspect-square rounded-[24px] relative overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1 ${project.bgStyle.base}`}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                ) : (
                  <>
                    {/* Layered Gradient Mesh Blurs */}
                    <div className={project.bgStyle.layer1} />
                    <div className={project.bgStyle.layer2} />
                    <div className={project.bgStyle.layer3} />
                  </>
                )}

                {/* Center Overlay Content (Icon + Text) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 pointer-events-none">
                  {project.icon && (
                    <div className="mb-3 group-hover:scale-110 transition-transform duration-500">
                      {project.icon}
                    </div>
                  )}

                  <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)] whitespace-pre-line group-hover:scale-105 transition-transform duration-500">
                    {project.centerTitle || project.title}
                  </h3>
                </div>

                {/* Ambient Contrast Overlay */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-500 z-10 pointer-events-none" />
              </div>

              {/* Typography below box (Matching reference look) */}
              <div className="space-y-1.5 pt-1">
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  {project.subtitle}
                </p>
                <span className="block text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-1">
                  {project.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Dark Detail Modal matching Image 1 */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6 sm:p-10 text-white overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            {/* Top Right Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(null);
              }}
              className="fixed top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer z-50"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full my-auto py-8 space-y-6 text-left relative"
            >
              {/* Category Icon */}
              {selectedProject.icon && (
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-2">
                  {selectedProject.icon}
                </div>
              )}

              {/* Subtitle / Category Label */}
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest block">
                {selectedProject.category}
              </span>

              {/* Headline / Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug">
                {selectedProject.modalHeading}
              </h2>

              {/* Main Description */}
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                {selectedProject.modalIntro}
              </p>

              {/* Bulleted Highlights */}
              <ul className="space-y-4 pt-2 text-sm sm:text-base text-white/90">
                {selectedProject.modalPoints.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-white/60 text-lg leading-none mt-0.5">•</span>
                    <div className="leading-relaxed">
                      <span className="font-bold italic text-white mr-1.5">{bullet.title}:</span>
                      <span className="text-white/80">{bullet.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UpcomingProjectsSection;
