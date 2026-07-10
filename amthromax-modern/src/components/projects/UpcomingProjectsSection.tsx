import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  logoText: string;
  title: string;
  subtitle: string;
  date: string;
  category: "AI & Intelligence" | "Infrastructure" | "Security & Ledger";
  gradientClass: string;
}

const UpcomingProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", "AI & Intelligence", "Infrastructure", "Security & Ledger"];

  const projects: Project[] = [
    {
      id: 1,
      logoText: "AI Automation",
      title: "AI Automation Projects",
      subtitle: "Automating complex business workflows and transaction networks using generative AI agent systems.",
      date: "Jul 7, 2026",
      category: "AI & Intelligence",
      gradientClass: "bg-gradient-to-br from-green-800/40 via-emerald-950/60 to-stone-900/40 border-emerald-500/10",
    },
    {
      id: 2,
      logoText: "Trading Portfolio",
      title: "Trading Portfolio Engine",
      subtitle: "An AI-driven platform for real-time asset optimization, risk analysis, and automated trade execution.",
      date: "Jul 7, 2026",
      category: "Security & Ledger",
      gradientClass: "bg-gradient-to-br from-gray-700/40 via-zinc-800/60 to-slate-900/40 border-zinc-500/10",
    },
    {
      id: 3,
      logoText: "AI Agency",
      title: "AI Agency Platform",
      subtitle: "A unified execution environment to design, deploy, and scale autonomous AI agent systems for global enterprises.",
      date: "Jun 23, 2026",
      category: "AI & Intelligence",
      gradientClass: "bg-gradient-to-br from-blue-900/40 via-indigo-950/60 to-slate-900/40 border-blue-500/10",
    },
    {
      id: 4,
      logoText: "Preply",
      title: "Cognitive Tutor Network",
      subtitle: "Combines adaptive AI and human mentoring to personalize skill acquisition.",
      date: "Jun 12, 2026",
      category: "AI & Intelligence",
      gradientClass: "bg-gradient-to-br from-rose-800/30 via-pink-950/60 to-stone-900/40 border-pink-500/10",
    },
    {
      id: 5,
      logoText: "BBVA",
      title: "Apex Wealth Intelligence",
      subtitle: "Puts generative intelligence at the core of asset allocation and predictive banking.",
      date: "Jun 11, 2026",
      category: "AI & Intelligence",
      gradientClass: "bg-gradient-to-br from-cyan-900/40 via-blue-950/60 to-slate-900/40 border-cyan-500/10",
    },
    {
      id: 6,
      logoText: "LSEG",
      title: "Neural Data Grid",
      subtitle: "Scaling high-fidelity real-time data ingestion for enterprise analytics.",
      date: "Jun 10, 2026",
      category: "Infrastructure",
      gradientClass: "bg-gradient-to-br from-indigo-900/40 via-purple-950/60 to-slate-900/40 border-purple-500/10",
    },
    {
      id: 7,
      logoText: "Nextdoor",
      title: "Civic Spaces Platform",
      subtitle: "Helping developers build hyper-local secure community infrastructure.",
      date: "Jun 9, 2026",
      category: "Infrastructure",
      gradientClass: "bg-gradient-to-br from-emerald-800/30 via-teal-950/60 to-stone-900/40 border-emerald-500/10",
    },
    {
      id: 8,
      logoText: "Notion",
      title: "Canvas Workspace Core",
      subtitle: "Unifying document editing, vector databases, and interactive agents in a single layout.",
      date: "Jun 9, 2026",
      category: "AI & Intelligence",
      gradientClass: "bg-gradient-to-br from-amber-800/30 via-orange-950/60 to-zinc-900/40 border-orange-500/10",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    return activeFilter === "All" || project.category === activeFilter;
  });

  return (
    <section className="w-full bg-white dark:bg-gray-950 py-24 border-t border-gray-100 dark:border-gray-900 transition-colors duration-300 font-sans">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header Block */}
        <div className="space-y-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Pipeline & Innovation
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white max-w-2xl leading-tight">
            Upcoming Software Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-xl">
            Sneak peek into our development pipeline. We are putting artificial general intelligence and core architectural patterns to work across next-generation platforms.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-gray-100 dark:border-gray-900 pb-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-gray-700 dark:text-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with AnimatePresence */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-4 group"
              >
                {/* Styled Textured Card */}
                <div
                  className={`w-full aspect-square rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden border shadow-sm transition-all duration-300 group-hover:shadow-md ${project.gradientClass}`}
                >
                  {/* Subtle Background Pattern Overlays */}
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/20 z-0 pointer-events-none" />
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  {/* Logo Center Text */}
                  <span className="text-xl md:text-2xl font-black tracking-tight text-white/90 drop-shadow-sm select-none z-10 font-sans">
                    {project.logoText}
                  </span>
                </div>

                {/* Info Text below */}
                <div className="space-y-1">
                  <h4 className="text-base font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed min-h-[40px]">
                    {project.subtitle}
                  </p>
                  <span className="block text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-1">
                    {project.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-sm">No upcoming projects match your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingProjectsSection;
