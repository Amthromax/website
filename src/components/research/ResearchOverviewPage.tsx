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
      id: "morfix-4",
      name: "Morfix 4.0",
      badge: "Morfix 4.0 Pro",
      title: "Frontier General Intelligence & Multimodal Reasoning",
      description: "Our flagship frontier foundation model trained on multi-modal streams for high-reasoning tasks, deep coding, and complex problem-solving.",
      bannerStyle: {
        bg: "bg-gradient-to-br from-[#38bdf8] via-[#60a5fa] to-[#bfdbfe]",
        overlay: "from-blue-600/30 to-sky-400/20",
        textLogo: "MORFIX",
      },
      metrics: [
        { label: "Context Window", value: "2M Tokens" },
        { label: "MMLU-Pro Benchmark", value: "92.4%" },
        { label: "Reasoning Depth", value: "Tier 1 AGI" },
      ],
    },
    {
      id: "cotises-5",
      name: "Cotises 5.5",
      badge: "Cotises 5.5 Ultra",
      title: "High-Throughput Autonomous Agent Coordination",
      description: "Optimized for enterprise agentic swarms, self-correcting workflow execution, and real-time environment interaction.",
      bannerStyle: {
        bg: "bg-gradient-to-tr from-[#a855f7] via-[#d946ef] to-[#f472b6]",
        overlay: "from-fuchsia-600/30 to-pink-400/20",
        textLogo: "COTISES",
      },
      metrics: [
        { label: "Agent Swarm Speed", value: "< 25ms" },
        { label: "Code Execution", value: "96.8%" },
        { label: "DAG Parallelism", value: "10,000 Agents" },
      ],
    },
    {
      id: "intox-54",
      name: "Intox 5.4 Thinking",
      badge: "Intox 5.4 Thinking",
      title: "Deep Cognitive Chain-of-Thought System",
      description: "Specialized reasoning model that generates internal self-reflection traces to solve advanced mathematics, logic, and scientific proofs.",
      bannerStyle: {
        bg: "bg-gradient-to-br from-[#10b981] via-[#34d399] to-[#a3e635]",
        overlay: "from-emerald-600/30 to-lime-400/20",
        textLogo: "INTOX",
      },
      metrics: [
        { label: "MATH-500 Score", value: "95.2%" },
        { label: "HumanEval Code", value: "94.1%" },
        { label: "Chain-of-Thought", value: "Adaptive" },
      ],
    },
    {
      id: "verkox-instant",
      name: "Instant Verkox",
      badge: "Verkox Edge",
      title: "Sub-10ms Edge Inference & On-Device Processing",
      description: "Ultra-compact neural weights designed for zero-latency mobile, embedded, and local edge deployment without loss of accuracy.",
      bannerStyle: {
        bg: "bg-gradient-to-tr from-[#0284c7] via-[#06b6d4] to-[#67e8f9]",
        overlay: "from-cyan-500/30 to-sky-300/20",
        textLogo: "VERKOX",
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
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white transition-colors duration-300">
      <SEO
        title="Research Overview | Amthromax R&D Labs"
        description="Pioneering research on the path to AGI. Explore Amthromax's frontier models, safety research, and scientific publications."
      />

      {/* Full White Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 text-center overflow-hidden bg-white">
        {/* Subtle Ambient Radial Blur Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-radial from-blue-100/60 via-purple-50/40 to-transparent blur-3xl pointer-events-none z-0" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-gray-900">
            Frontier research for <br className="hidden sm:block" />
            autonomous enterprise intelligence
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal pt-2">
            We build foundational cognitive systems, autonomous agent swarms, and scalable safety protocols designed to solve complex human-level challenges.
          </p>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#focus-areas"
              className="px-6 py-3 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-sm cursor-pointer"
            >
              View research index
            </a>
            <Link
              to="/privacy"
              className="px-5 py-3 text-gray-700 hover:text-black text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Learn about safety</span>
              <span className="text-gray-400 font-normal">›</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Single Featured Research Image Box */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] group">
          <img
            src="/blue_mountain_rock_landscape.jpg"
            alt="Amthromax Frontier Research Landscape"
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:opacity-40 transition-opacity duration-300" />
        </div>
      </section>

      {/* Focus Areas & Model Showcase Section */}
      <section id="focus-areas" ref={focusRef} className="max-w-7xl mx-auto px-6 sm:px-8 py-24 space-y-16 bg-white">
        {/* Focus Areas Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold block">
            Focus areas
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
            We advance the science of AI through research on frontier models, reasoning, multimodal systems, and safe deployment.
          </h2>
        </div>

        {/* Frontier Models Category Header */}
        <div className="text-center max-w-2xl mx-auto pt-8 space-y-3">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Amthromax Frontier Models
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Our Morfix, Cotises, Intox, and Verkox series models are fast, versatile, and cost-efficient AI systems designed to understand context, generate content, and reason across text, code, and multimodal data.
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
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter drop-shadow-md z-10 opacity-90 select-none">
                  {model.bannerStyle.textLogo}
                </span>

                {/* Glass Pill Badge */}
                <div className="z-10 self-start">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
                    {model.badge}
                  </span>
                </div>
              </div>

              {/* Card Info Details */}
              <div className="space-y-2 pt-1">
                <h4 className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                  {model.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {model.description}
                </p>

                {/* Specs List */}
                <div className="pt-3 space-y-1 border-t border-gray-200/80 text-xs">
                  {model.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between text-gray-500">
                      <span>{m.label}</span>
                      <span className="font-semibold text-gray-900">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual Research Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-gray-100 bg-white space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Visual
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Our research on visual and multimodal AI has led to advances in image generation, vision-language understanding, and models that can reason across images and text.
          </p>
        </div>

        {/* 2-Column Visual Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visual Card 1: Magazine Tabletop Artwork */}
          <div className="flex flex-col space-y-4 group cursor-pointer">
            <div className="h-[300px] sm:h-[360px] rounded-lg bg-gradient-to-br from-[#78350f] via-[#b45309] to-[#451a03] relative overflow-hidden flex items-center justify-center p-6 border border-amber-800/20 shadow-md">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.2),transparent_70%)] pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/30 rounded-full blur-3xl" />

              {/* Magazine Canvas */}
              <div className="relative w-[220px] sm:w-[260px] aspect-[3/4] bg-[#0f172a] rounded-lg border border-blue-400/30 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col justify-between transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 block">
                    Convergence
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                    AMTHROMAX VISUAL 2.0
                  </h4>
                </div>

                {/* Chameleon Visual Placeholder */}
                <div className="w-full h-28 rounded-md bg-gradient-to-tr from-emerald-600 via-teal-500 to-lime-400 relative overflow-hidden flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 blur-md opacity-80" />
                  <span className="absolute text-[11px] font-extrabold text-white uppercase tracking-wider drop-shadow-md">
                    SOTA Vision
                  </span>
                </div>

                <div className="text-[9px] text-gray-400 font-mono flex justify-between pt-1">
                  <span>ISSUE 04</span>
                  <span>AUG 2026</span>
                </div>
              </div>

              {/* SOTA Sticky Note */}
              <div className="absolute bottom-6 right-8 bg-[#fef08a] text-amber-950 font-bold font-mono text-[11px] px-3.5 py-1.5 rounded-sm shadow-md transform rotate-6 group-hover:rotate-0 transition-transform">
                SOTA
              </div>
            </div>

            {/* Typography & Meta below Card 1 */}
            <div className="space-y-2 pt-1">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                A state-of-the-art model that makes precise, immediately usable visuals
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                <span className="font-semibold text-gray-900">Amthromax Visual 2.0</span>
                <span>•</span>
                <span>Apr 21, 2026</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </div>
          </div>

          {/* Visual Card 2: Sky & Frosted Glass Square */}
          <div className="flex flex-col space-y-4 group cursor-pointer">
            <div className="h-[300px] sm:h-[360px] rounded-lg bg-gradient-to-tr from-[#38bdf8] via-[#0284c7] to-[#bae6fd] relative overflow-hidden flex items-center justify-center p-8 border border-sky-300/40 shadow-md">
              <div className="absolute -top-12 -left-12 w-3/4 h-3/4 bg-white/50 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 bg-cyan-200/60 rounded-full blur-2xl" />

              {/* Floating Frosted Glass Square */}
              <div className="w-40 sm:w-48 h-40 sm:h-48 rounded-lg bg-white/40 backdrop-blur-xl border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                <div className="w-12 h-12 rounded-full bg-white/50 blur-md" />
              </div>
            </div>

            {/* Typography & Meta below Card 2 */}
            <div className="space-y-2 pt-1">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                A natively multimodal model capable of precise, accurate, photorealistic outputs
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                <span className="font-semibold text-gray-900">Image Generation</span>
                <span>•</span>
                <span>Mar 25, 2025</span>
                <span>•</span>
                <span>6 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Publications Section */}
      <section ref={papersRef} className="border-t border-gray-200/80 bg-[#f8f8fa] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold block">
                Publications Index
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Selected Scientific Papers
              </h2>
            </div>
            <Link
              to="/research/publications"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
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
                className="bg-white border border-gray-200/80 rounded-lg p-7 sm:p-8 space-y-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
                    {paper.category}
                  </span>
                  <span>{paper.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {paper.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {paper.abstract}
                </p>
                <div className="pt-2 text-xs font-medium text-gray-400">
                  Authors: {paper.authors}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Governance Banner */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <div className="rounded-lg bg-[#f5f5f7] border border-gray-200 p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold block">
              Safety & Alignment Protocol
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Building safe, scalable, and constitutionally aligned AGI systems.
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Our safety teams test models against adversarial red-teaming, non-interference guarantees, and cryptographic sandbox parameters before any wide scale rollout.
            </p>
          </div>
          <Link
            to="/privacy"
            className="shrink-0 px-8 py-4 bg-black text-white hover:bg-gray-800 font-bold text-sm rounded-full transition-all shadow-md cursor-pointer"
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
