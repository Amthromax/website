import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

interface ModelCard {
  id: string;
  name: string;
  badge: string;
  title: string;
  description: string;
  bannerStyle: {
    bg: string;
    overlay: string;
    textLogo: string;
  };
  metrics: { label: string; value: string }[];
}

const ResearchOverviewPage: React.FC = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: focusRef, inView: focusInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: papersRef, inView: papersInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const models: ModelCard[] = [
    {
      id: "simifig-4",
      name: "Simifig 4.0",
      badge: "Simifig 4.0 Pro",
      title: "Frontier General Intelligence & Multimodal Reasoning",
      description: "Our flagship frontier foundation model trained on multi-modal streams for high-reasoning tasks, deep coding, and complex problem-solving.",
      bannerStyle: {
        bg: "bg-gradient-to-br from-[#374151] via-[#4b5563] to-[#9ca3af]",
        overlay: "from-gray-900/40 to-slate-700/20",
        textLogo: "SIMIFIG",
      },
      metrics: [
        { label: "Context Window", value: "2M Tokens" },
        { label: "MMLU-Pro Benchmark", value: "92.4%" },
        { label: "Reasoning Depth", value: "Tier 1 AGI" },
      ],
    },
    {
      id: "ligivor-5",
      name: "Ligivor 5.5",
      badge: "Ligivor 5.5 Ultra",
      title: "High-Throughput Autonomous Agent Coordination",
      description: "Optimized for enterprise agentic swarms, self-correcting workflow execution, and real-time environment interaction.",
      bannerStyle: {
        bg: "bg-gradient-to-tr from-[#d4b996] via-[#e6d0b3] to-[#f4e7d7]",
        overlay: "from-[#8c6d46]/30 to-[#b89b72]/20",
        textLogo: "LIGIVOR",
      },
      metrics: [
        { label: "Agent Swarm Speed", value: "< 25ms" },
        { label: "Code Execution", value: "96.8%" },
        { label: "DAG Parallelism", value: "10,000 Agents" },
      ],
    },
    {
      id: "favlon-54",
      name: "Favlon 5.4 Thinking",
      badge: "Favlon 5.4 Thinking",
      title: "Deep Cognitive Chain-of-Thought System",
      description: "Specialized reasoning model that generates internal self-reflection traces to solve advanced mathematics, logic, and scientific proofs.",
      bannerStyle: {
        bg: "bg-gradient-to-br from-[#1e293b] via-[#475569] to-[#94a3b8]",
        overlay: "from-slate-900/50 to-slate-600/20",
        textLogo: "FAVLON",
      },
      metrics: [
        { label: "MATH-500 Score", value: "95.2%" },
        { label: "HumanEval Code", value: "94.1%" },
        { label: "Chain-of-Thought", value: "Adaptive" },
      ],
    },
    {
      id: "roqlow-instant",
      name: "Roqlow Instant",
      badge: "Roqlow Edge",
      title: "Sub-10ms Edge Inference & On-Device Processing",
      description: "Ultra-compact neural weights designed for zero-latency mobile, embedded, and local edge deployment without loss of accuracy.",
      bannerStyle: {
        bg: "bg-gradient-to-tr from-[#c2a27d] via-[#dfc4a5] to-[#f7ebd9]",
        overlay: "from-[#7a5e3d]/30 to-[#a88a65]/20",
        textLogo: "ROQLOW",
      },
      metrics: [
        { label: "Edge Latency", value: "8.4ms" },
        { label: "Memory Footprint", value: "1.8 GB" },
        { label: "Local Safety Engine", value: "Hardware Level" },
      ],
    },
  ];

  const publications = [
    {
      title: "Self-Correcting Autonomous Agent Swarms in Non-Deterministic Environments",
      category: "Agent Systems",
      date: "August 2026",
      authors: "Dr. Elena Rostova, Marcus Vance",
      abstract: "We introduce a dynamic directed acyclic graph (DAG) topology enabling LLM agents to verify intermediate states and self-heal during multi-step executions.",
    },
    {
      title: "Sub-50ms Hybrid Vector-Graph Memory for Enterprise AGI Applications",
      category: "Memory & Context",
      date: "July 2026",
      authors: "Dr. Sarah Chen, Amthromax AI Lab",
      abstract: "Demonstrating a federated memory indexing engine that combines graph database relationships with ultra-dense vector embeddings for instant retrieval.",
    },
    {
      title: "Zero-Trust Cryptographic Lattice Verification for Multi-Region Compute Grids",
      category: "Security & Safety",
      date: "May 2026",
      authors: "Prof. Marcus Vance",
      abstract: "A post-quantum cryptographic protocol for verifying model parameter weights and tensor operations across untrusted distributed edge nodes.",
    },
    {
      title: "Scalable Alignment via Recursive AI Oversight and Deliberative Traces",
      category: "AI Safety",
      date: "March 2026",
      authors: "Amthromax Safety Research Division",
      abstract: "Methods for training oversight models that analyze hidden reasoning traces to ensure alignment with human constitutional principles.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300 antialiased">
      <SEO
        title="Research Overview | Amthromax R&D Labs"
        description="Pioneering research on the path to AGI. Explore Amthromax's frontier models, safety research, and scientific publications."
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 text-center overflow-hidden bg-white dark:bg-black transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.08] text-gray-900 dark:text-white">
            Frontier research for <br className="hidden sm:block" />
            autonomous enterprise intelligence
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-normal pt-2">
            We build foundational cognitive systems, autonomous agent swarms, and scalable safety protocols designed to solve complex human-level challenges.
          </p>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#focus-areas"
              className="px-6 py-3 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-sm font-semibold rounded-full transition-all duration-200 shadow-sm cursor-pointer"
            >
              View research index
            </a>
            <Link
              to="/research/safety"
              className="px-5 py-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Learn about safety</span>
              <span className="text-gray-400 dark:text-gray-500 font-normal">›</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Single Featured Research Image Box */}
      <section className="max-w-7xl mx-auto px-6 py-8 bg-white dark:bg-black transition-colors duration-300">
        <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/10 shadow-sm aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] group">
          <img
            src="/blue_mountain_rock_landscape.jpg"
            alt="Amthromax Frontier Research Landscape"
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:opacity-40 transition-opacity duration-300" />
        </div>
      </section>

      {/* Focus Areas & Model Showcase Section */}
      <section id="focus-areas" ref={focusRef} className="max-w-7xl mx-auto px-6 sm:px-8 py-24 space-y-16 bg-white dark:bg-black transition-colors duration-300">
        {/* Focus Areas Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
            We advance the science of AI through research on frontier models, reasoning, multimodal systems, and safe deployment.
          </h2>
        </div>

        {/* Frontier Models Category Header */}
        <div className="text-center max-w-2xl mx-auto pt-8 space-y-3">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Amthromax Frontier Models
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
            Our Simifig, Ligivor, Favlon, and Roqlow series models are fast, versatile, and cost-efficient AI systems designed to understand context, generate content, and reason across text, code, and multimodal data.
          </p>
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 24 }}
              animate={focusInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col space-y-4 group cursor-pointer"
            >
              {/* Card Banner Box with Sharp rounded-lg Edges */}
              <div
                className={`w-full aspect-[4/3] rounded-lg relative overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1.5 p-6 flex flex-col justify-between ${model.bannerStyle.bg}`}
              >
                {/* Layered Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${model.bannerStyle.overlay} z-0`} />

                {/* Big Typography Overlay */}
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter drop-shadow-md z-10 opacity-90 select-none">
                  {model.bannerStyle.textLogo}
                </span>

                {/* Badge Text */}
                <div className="z-10 self-start">
                  <span className="text-xs font-semibold text-white tracking-wide opacity-90 drop-shadow-sm">
                    {model.badge}
                  </span>
                </div>
              </div>

              {/* Card Info Details */}
              <div className="space-y-2 pt-1">
                <h4 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {model.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  {model.description}
                </p>

                {/* Specs List */}
                <div className="pt-3 space-y-1 border-t border-gray-200/80 dark:border-white/10 text-xs">
                  {model.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                      <span>{m.label}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual Research Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-black space-y-12 transition-colors duration-300">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Visual
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
            Our research on visual and multimodal AI has led to advances in image generation, vision-language understanding, and models that can reason across images and text.
          </p>
        </div>

        {/* 2-Column Visual Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visual Card 1: Animated GIF */}
          <div className="flex flex-col space-y-4 group cursor-pointer">
            <div className="h-[300px] sm:h-[360px] rounded-2xl overflow-hidden relative border border-gray-200/80 dark:border-white/10 shadow-md">
              <img
                src="/images/vide/395478589f3a71c9af6361acf5a7f237.gif"
                alt="Amthromax Visual 2.0 SOTA Model"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Typography & Meta below Card 1 */}
            <div className="space-y-2 pt-1">
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                A state-of-the-art model that makes precise, immediately usable visuals
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
                <span className="font-semibold text-gray-900 dark:text-white">Amthromax Visual 2.0</span>
                <span>•</span>
                <span>Apr 21, 2026</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </div>
          </div>

          {/* Visual Card 2: Animated GIF */}
          <div className="flex flex-col space-y-4 group cursor-pointer">
            <div className="h-[300px] sm:h-[360px] rounded-2xl overflow-hidden relative border border-gray-200/80 dark:border-white/10 shadow-md">
              <img
                src="/images/vide/6243253f180a27fe8e5cc682634a0e32.gif"
                alt="Natively Multimodal Model"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Typography & Meta below Card 2 */}
            <div className="space-y-2 pt-1">
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                A natively multimodal model capable of precise, accurate, photorealistic outputs
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
                <span className="font-semibold text-gray-900 dark:text-white">Image Generation</span>
                <span>•</span>
                <span>Mar 25, 2025</span>
                <span>•</span>
                <span>6 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investor & Partner Endorsements Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-black transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Coral Red */}
          <div className="h-[420px] sm:h-[460px] rounded-[28px] bg-gradient-to-br from-[#e05244] via-[#ea5845] to-[#c83b2d] relative overflow-hidden p-8 sm:p-10 flex flex-col justify-between shadow-lg group cursor-pointer border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Top Icon */}
            <div className="z-10 flex items-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 2L4.5 13.5H9V21h6v-7.5h4.5L12 2z" />
              </svg>
            </div>

            {/* Bottom Content Area */}
            <div className="z-10 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-black/40 border border-white/40 flex items-center justify-center text-[10px] font-bold text-white shadow-sm overflow-hidden">
                  <span className="bg-gradient-to-tr from-amber-400 to-rose-400 w-full h-full flex items-center justify-center text-white">
                    JZ
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white/90">
                  Jessie Zhang
                </span>
              </div>

              <p className="text-lg sm:text-xl font-medium tracking-tight text-white leading-snug">
                “We are building the interface between humans and autonomous AI systems at planetary scale.”
              </p>

              <p className="text-xs text-white/70 font-normal leading-relaxed">
                Led investments in Figma, Notion, and other frontier tech market leaders
              </p>
            </div>
          </div>

          {/* Card 2: Accel (Forest / Emerald Green) */}
          <div className="h-[420px] sm:h-[460px] rounded-[28px] bg-gradient-to-br from-[#2d5a44] via-[#3a6b52] to-[#1f4231] relative overflow-hidden p-8 sm:p-10 flex flex-col justify-between shadow-lg group cursor-pointer border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            <div className="z-10 flex items-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>

            <div className="z-10 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-black/40 border border-white/40 flex items-center justify-center text-[10px] font-bold text-white shadow-sm overflow-hidden">
                  <span className="bg-gradient-to-tr from-emerald-400 to-teal-600 w-full h-full flex items-center justify-center text-white">
                    IZ
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white/90">
                  Ivan Zhou
                </span>
              </div>

              <p className="text-lg sm:text-xl font-medium tracking-tight text-white leading-snug">
                “The next generation of enterprise teams will need messaging designed around humans and agents.”
              </p>

              <p className="text-xs text-white/70 font-normal leading-relaxed">
                Led Slack's seed & series A when they were still a gaming company
              </p>
            </div>
          </div>

          {/* Card 3: Emergence (Warm Taupe / Muted Olive) */}
          <div className="h-[420px] sm:h-[460px] rounded-[28px] bg-gradient-to-br from-[#6b6758] via-[#7d7867] to-[#545144] relative overflow-hidden p-8 sm:p-10 flex flex-col justify-between shadow-lg group cursor-pointer border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            <div className="z-10 flex items-center">
              <div className="w-12 h-12 rounded-xl border-2 border-white flex items-center justify-center font-black text-sm text-white tracking-tighter shadow-sm">
                |E|
              </div>
            </div>

            <div className="z-10 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-black/40 border border-white/40 flex items-center justify-center text-[10px] font-bold text-white shadow-sm overflow-hidden">
                  <span className="bg-gradient-to-tr from-stone-400 to-amber-600 w-full h-full flex items-center justify-center text-white">
                    SS
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white/90">
                  Santi Subotovsky
                </span>
              </div>

              <p className="text-lg sm:text-xl font-medium tracking-tight text-white leading-snug">
                “We believe the next era of enterprise productivity requires a dedicated platform for real human–AI collaboration.”
              </p>

              <p className="text-xs text-white/70 font-normal leading-relaxed">
                Seeded Zoom, Veeva Systems, & other landmark enterprise SaaS plays
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Publications Section */}
      <section ref={papersRef} className="border-t border-gray-200/80 dark:border-white/10 bg-[#f8f8fa] dark:bg-black py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-white/10 pb-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 font-semibold block">
                Publications Index
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Selected Scientific Papers
              </h2>
            </div>
            <Link
              to="/research/publications"
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span>View full archive (140+ papers)</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((paper, idx) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 16 }}
                animate={papersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white dark:bg-black border border-gray-200/80 dark:border-white/10 rounded-lg p-7 sm:p-8 space-y-4 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-white/20 transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-semibold">
                    {paper.category}
                  </span>
                  <span>{paper.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {paper.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {paper.abstract}
                </p>
                <div className="pt-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                  Authors: {paper.authors}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Governance Banner */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white dark:bg-black transition-colors duration-300">
        <div className="rounded-lg bg-[#f5f5f7] dark:bg-black border border-gray-200 dark:border-white/10 p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-semibold block">
              Safety & Alignment Protocol
            </span>
            <h3 className="text-2xl sm:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight leading-tight">
              Building safe, scalable, and constitutionally aligned AGI systems.
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              Our safety teams test models against adversarial red-teaming, non-interference guarantees, and cryptographic sandbox parameters before any wide scale rollout.
            </p>
          </div>
          <Link
            to="/research/safety"
            className="shrink-0 px-8 py-4 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-semibold text-sm rounded-full transition-all shadow-md cursor-pointer"
          >
            Explore Safety Architecture
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResearchOverviewPage;
