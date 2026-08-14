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
        bg: "bg-gradient-to-br from-[#374151] via-[#4b5563] to-[#9ca3af]",
        overlay: "from-gray-900/40 to-slate-700/20",
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
        bg: "bg-gradient-to-tr from-[#d4b996] via-[#e6d0b3] to-[#f4e7d7]",
        overlay: "from-[#8c6d46]/30 to-[#b89b72]/20",
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
        bg: "bg-gradient-to-br from-[#1e293b] via-[#475569] to-[#94a3b8]",
        overlay: "from-slate-900/50 to-slate-600/20",
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
        bg: "bg-gradient-to-tr from-[#c2a27d] via-[#dfc4a5] to-[#f7ebd9]",
        overlay: "from-[#7a5e3d]/30 to-[#a88a65]/20",
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

                {/* Badge Text */}
                <div className="z-10 self-start">
                  <span className="text-xs font-bold text-white tracking-wide opacity-90 drop-shadow-sm">
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

        {/* Learn About Safety Link */}
        <div className="flex justify-center pt-4">
          <a
            href="#safety"
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base inline-flex items-center gap-1.5 transition-colors group cursor-pointer"
          >
            <span>Learn about safety</span>
            <span className="group-hover:translate-x-1 transition-transform">›</span>
          </a>
        </div>

        {/* Safety Section Block */}
        <div id="safety" className="bg-black text-white rounded-[32px] p-8 sm:p-16 space-y-24 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent pointer-events-none" />

          {/* Section 1: Safety at Every Step */}
          <div className="space-y-12 relative z-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400 font-bold block">
                Safety
              </span>
              <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Safety at every step
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal pt-1">
                We believe in AI's potential to make life better for everyone, which means making it safe for everyone
              </p>
            </div>

            {/* 3 Step Cards Grid: Teach, Test, Share */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Card 1: Teach */}
              <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-[340px] sm:h-[360px] relative group hover:border-white/20 transition-all shadow-xl">
                <span className="text-sm font-bold text-white tracking-wide">
                  Teach
                </span>
                
                {/* Visual Graphics: White circle + Gray circle with Green Checkmark */}
                <div className="flex items-center justify-center my-auto relative">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white shadow-2xl" />
                    <div className="w-16 h-16 rounded-full bg-[#2a2a2a] relative border border-white/10 shadow-xl">
                      <div className="absolute -bottom-1 -right-1 bg-[#22c55e] text-black w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shadow-lg">
                        ✓
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Test */}
              <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-[340px] sm:h-[360px] relative group hover:border-white/20 transition-all shadow-xl">
                <span className="text-sm font-bold text-white tracking-wide">
                  Test
                </span>

                {/* Visual Graphics: Message Bubble Box with Green Checkmark */}
                <div className="flex items-center justify-center my-auto">
                  <div className="w-52 bg-[#1a1a1a] rounded-xl p-4 space-y-2.5 border border-white/10 relative shadow-2xl">
                    <div className="absolute -top-2.5 -left-2.5 bg-[#22c55e] text-black w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shadow-lg">
                      ✓
                    </div>
                    <div className="h-2.5 bg-white/20 rounded-full w-full" />
                    <div className="h-2.5 bg-white/20 rounded-full w-3/4" />
                    <div className="h-2.5 bg-white/20 rounded-full w-5/6" />
                  </div>
                </div>
              </div>

              {/* Card 3: Share */}
              <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-[340px] sm:h-[360px] relative group hover:border-white/20 transition-all shadow-xl">
                <span className="text-sm font-bold text-white tracking-wide">
                  Share
                </span>

                {/* Visual Graphics: 2x2 User Avatars with Green Checkmark */}
                <div className="flex items-center justify-center my-auto">
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-12 flex flex-col items-center justify-end space-y-1">
                          <div className="w-5 h-5 rounded-full bg-white/80" />
                          <div className="w-9 h-4 bg-white/80 rounded-t-full" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#22c55e] text-black w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shadow-lg">
                      ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Safety Doesn't Stop Cyclic Diagram */}
          <div className="space-y-16 pt-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Safety doesn’t stop
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal">
                Building safe AI isn’t one and done. Every day is a chance to make things better. And every step helps anticipate, evaluate, and prevent risk.
              </p>
            </div>

            {/* 3-Loop Cyclic Diagram Container */}
            <div className="py-10 max-w-5xl mx-auto relative flex flex-col items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full max-w-4xl relative">

                {/* TEACH Loop (Top Left) */}
                <div className="relative flex items-center justify-center h-80">
                  {/* Dashed Orbit Circle */}
                  <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-emerald-500/50 flex items-center justify-center pointer-events-none animate-[spin_60s_linear_infinite]" />
                  
                  {/* Center Node */}
                  <div className="w-32 h-32 rounded-full bg-[#161616] border border-white/20 shadow-2xl flex items-center justify-center text-sm font-black tracking-widest text-white z-10">
                    TEACH
                  </div>

                  {/* Orbiting Nodes */}
                  <span className="absolute top-2 bg-[#1c1c1c] border border-white/20 text-[10px] sm:text-xs font-bold text-gray-300 uppercase px-3 py-1 rounded-md shadow-md z-20">
                    FILTER DATA
                  </span>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1c1c1c] border border-white/20 text-[10px] sm:text-xs font-bold text-gray-300 uppercase px-3 py-1 rounded-md shadow-md z-20">
                    HUMAN VALUES
                  </span>
                  <span className="absolute bottom-2 bg-[#1c1c1c] border border-white/20 text-[10px] sm:text-xs font-bold text-gray-300 uppercase px-3 py-1 rounded-md shadow-md z-20">
                    AMTHROMAX POLICIES
                  </span>
                </div>

                {/* TEST Loop (Top Right) */}
                <div className="relative flex items-center justify-center h-80">
                  {/* Dashed Orbit Circle */}
                  <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-emerald-500/50 flex items-center justify-center pointer-events-none animate-[spin_60s_linear_infinite]" />
                  
                  {/* Center Node */}
                  <div className="w-32 h-32 rounded-full bg-[#161616] border border-white/20 shadow-2xl flex items-center justify-center text-sm font-black tracking-widest text-white z-10">
                    TEST
                  </div>

                  {/* Orbiting Nodes */}
                  <span className="absolute top-2 bg-[#1c1c1c] border border-white/20 text-[10px] sm:text-xs font-bold text-gray-300 uppercase px-3 py-1 rounded-md shadow-md z-20">
                    RED TEAMING
                  </span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#1c1c1c] border border-white/20 text-[10px] sm:text-xs font-bold text-gray-300 uppercase px-3 py-1 rounded-md shadow-md z-20">
                    PREPAREDNESS EVALS
                  </span>
                  <span className="absolute bottom-2 bg-[#1c1c1c] border border-white/20 text-[10px] sm:text-xs font-bold text-gray-300 uppercase px-3 py-1 rounded-md shadow-md z-20">
                    SYSTEM CARDS
                  </span>
                </div>
              </div>

              {/* SHARE Loop (Bottom Center) */}
              <div className="relative flex items-center justify-center h-80 mt-4 md:-mt-8">
                {/* Dashed Orbit Circle */}
                <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-emerald-500/50 flex items-center justify-center pointer-events-none animate-[spin_60s_linear_infinite]" />
                
                {/* Center Node */}
                <div className="w-32 h-32 rounded-full bg-[#161616] border border-white/20 shadow-2xl flex items-center justify-center text-sm font-black tracking-widest text-white z-10">
                  SHARE
                </div>

                {/* Orbiting Nodes */}
                <span className="absolute top-2 bg-[#1c1c1c] border border-white/20 text-[10px] sm:text-xs font-bold text-gray-300 uppercase px-3 py-1 rounded-md shadow-md z-20">
                  SAFETY COMMITTEES
                </span>
                <span className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1c1c1c] border border-white/20 text-[10px] sm:text-xs font-bold text-gray-300 uppercase px-3 py-1 rounded-md shadow-md z-20">
                  FEEDBACK
                </span>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#1c1c1c] border border-white/20 text-[10px] sm:text-xs font-bold text-gray-300 uppercase px-3 py-1 rounded-md shadow-md z-20">
                  ALPHA / BETA
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Go Deeper On Safety Hub Container */}
          <div className="pt-6 z-10 relative">
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-10 sm:p-14 text-center max-w-3xl mx-auto space-y-6 shadow-2xl">
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Go deeper on safety
              </h3>
              <div>
                <a
                  href="/legal/privacy"
                  className="bg-[#242424] hover:bg-[#333333] border border-white/20 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105"
                >
                  <span>Explore the deployment safety hub</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
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

        {/* 2-Column Visual Cards Showcase with Dynamic Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visual Card 1: Magazine Tabletop Artwork with Levitation Animation */}
          <div className="flex flex-col space-y-4 group cursor-pointer">
            <div className="h-[300px] sm:h-[360px] rounded-2xl bg-gradient-to-br from-[#78350f] via-[#b45309] to-[#451a03] relative overflow-hidden flex items-center justify-center p-6 border border-amber-800/20 shadow-md">
              {/* Animated Glowing Rays Background */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.3),transparent_70%)] pointer-events-none"
              />
              <motion.div
                animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-44 h-44 bg-amber-400/30 rounded-full blur-3xl"
              />

              {/* Levitating Magazine Canvas */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-3, -1, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[220px] sm:w-[260px] aspect-[3/4] bg-[#0f172a] rounded-xl border border-blue-400/30 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between group-hover:scale-105 transition-transform duration-500"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 block">
                    Convergence
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                    AMTHROMAX VISUAL 2.0
                  </h4>
                </div>

                {/* Animated Pulsing SOTA Vision Inner Box */}
                <div className="w-full h-28 rounded-lg bg-gradient-to-tr from-emerald-600 via-teal-500 to-lime-400 relative overflow-hidden flex items-center justify-center border border-white/20 shadow-inner">
                  <motion.div
                    animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-300 via-emerald-400 to-cyan-400 blur-lg"
                  />
                  <span className="absolute text-[11px] font-black text-white uppercase tracking-wider drop-shadow-lg">
                    SOTA Vision
                  </span>
                </div>

                <div className="text-[9px] text-gray-400 font-mono flex justify-between pt-1">
                  <span>ISSUE 04</span>
                  <span>AUG 2026</span>
                </div>
              </motion.div>

              {/* Floating SOTA Sticky Note */}
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [6, 2, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 right-8 bg-[#fef08a] text-amber-950 font-bold font-mono text-[11px] px-3.5 py-1.5 rounded-sm shadow-md"
              >
                SOTA
              </motion.div>
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

          {/* Visual Card 2: Sky & Animated Floating Frosted Glass Prism */}
          <div className="flex flex-col space-y-4 group cursor-pointer">
            <div className="h-[300px] sm:h-[360px] rounded-2xl bg-gradient-to-tr from-[#38bdf8] via-[#0284c7] to-[#bae6fd] relative overflow-hidden flex items-center justify-center p-8 border border-sky-300/40 shadow-md">
              <motion.div
                animate={{ scale: [1, 1.25, 1], x: [-10, 15, -10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -left-12 w-3/4 h-3/4 bg-white/50 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ scale: [1.2, 1, 1.2], y: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-10 w-2/3 h-2/3 bg-cyan-200/60 rounded-full blur-2xl"
              />

              {/* Floating Animated Frosted Glass Square */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-44 sm:w-52 h-44 sm:h-52 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
              >
                {/* Iridescent Energy Orb inside Glass Square */}
                <motion.div
                  animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-200 via-white to-cyan-300 blur-md opacity-90 shadow-lg"
                />
                <motion.div
                  animate={{ scale: [1.2, 0.9, 1.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-8 h-8 rounded-full bg-white blur-sm shadow-md"
                />
              </motion.div>
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

      {/* Investor & Partner Endorsements Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-gray-100 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Coral Red */}
          <div className="h-[420px] sm:h-[460px] rounded-[28px] bg-gradient-to-br from-[#e05244] via-[#ea5845] to-[#c83b2d] relative overflow-hidden p-8 sm:p-10 flex flex-col justify-between shadow-lg group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Top Logo / Spacer */}
            <div className="z-10">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif">
                Sequoia
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="z-10 space-y-4">
              {/* Author Row */}
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

              {/* Quote */}
              <p className="text-lg sm:text-xl font-medium tracking-tight text-white leading-snug">
                “We are building the interface between humans and autonomous AI systems at planetary scale.”
              </p>

              {/* Subtext */}
              <p className="text-xs text-white/70 font-normal leading-relaxed">
                Led investments in Figma, Notion, and other frontier tech market leaders
              </p>
            </div>
          </div>

          {/* Card 2: Accel (Forest / Emerald Green) */}
          <div className="h-[420px] sm:h-[460px] rounded-[28px] bg-gradient-to-br from-[#2d5a44] via-[#3a6b52] to-[#1f4231] relative overflow-hidden p-8 sm:p-10 flex flex-col justify-between shadow-lg group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Top Logo */}
            <div className="z-10">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif italic">
                Accel
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="z-10 space-y-4">
              {/* Author Row */}
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

              {/* Quote */}
              <p className="text-lg sm:text-xl font-medium tracking-tight text-white leading-snug">
                “The next generation of enterprise teams will need messaging designed around humans and agents.”
              </p>

              {/* Subtext */}
              <p className="text-xs text-white/70 font-normal leading-relaxed">
                Led Slack's seed & series A when they were still a gaming company
              </p>
            </div>
          </div>

          {/* Card 3: Emergence (Warm Taupe / Muted Olive) */}
          <div className="h-[420px] sm:h-[460px] rounded-[28px] bg-gradient-to-br from-[#6b6758] via-[#7d7867] to-[#545144] relative overflow-hidden p-8 sm:p-10 flex flex-col justify-between shadow-lg group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Top Logo */}
            <div className="z-10 flex items-center gap-2">
              <div className="flex items-center justify-center font-bold text-white border-2 border-white px-1 py-0.5 text-xs tracking-tighter">
                |E|
              </div>
              <span className="text-sm sm:text-base font-extrabold tracking-widest text-white uppercase">
                EMERGENCE
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="z-10 space-y-4">
              {/* Author Row */}
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

              {/* Quote */}
              <p className="text-lg sm:text-xl font-medium tracking-tight text-white leading-snug">
                “We believe the next era of enterprise productivity requires a dedicated platform for real human–AI collaboration.”
              </p>

              {/* Subtext */}
              <p className="text-xs text-white/70 font-normal leading-relaxed">
                Seeded Zoom, Veeva Systems, & other landmark enterprise SaaS plays
              </p>
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
