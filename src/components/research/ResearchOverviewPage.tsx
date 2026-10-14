import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
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

interface Publication {
  title: string;
  category: string;
  date: string;
  authors: string;
  abstract: string;
  venue: string;
  readTime: string;
  summary: string;
  findings: string[];
}

/* How a question moves through the lab, start to finish. */
const RESEARCH_PROCESS = [
  {
    step: "01",
    title: "Frame the question",
    body: "Every project starts with a question narrow enough to answer and a success criterion written before any code runs. If we cannot say what would falsify the result, it is not ready to start.",
  },
  {
    step: "02",
    title: "Build the measurement",
    body: "We build the evaluation before the system. Harnesses score intermediate reasoning steps, not just final answers, so an improvement in the number reflects an improvement in the method.",
  },
  {
    step: "03",
    title: "Run at scale",
    body: "Experiments run on versioned datasets and pinned weights across distributed clusters. Every run records its seeds, hardware and environment so the figure can be reproduced later.",
  },
  {
    step: "04",
    title: "Ship it into the platform",
    body: "Findings that survive review become product. The routing, retrieval and guardrail methods described in our papers are the ones running in Amthromax today.",
  },
];

/* The pieces of the platform our research has produced. */
const OUR_WORK = [
  {
    title: "Agent orchestration",
    body: "A scheduler that decomposes a task graph across up to 1,024 concurrent agents, holds consensus at a 3-of-5 quorum and replays any shard that fails mid-run.",
    metric: "1,024 agents per swarm",
  },
  {
    title: "Distributed inference",
    body: "Mixture-of-Experts routing with zero-copy serialisation across six regions, keeping median agreement under ten milliseconds on the Amthromax Mesh.",
    metric: "<10ms consensus",
  },
  {
    title: "Grounded retrieval",
    body: "Hybrid dense and sparse retrieval over private corpora, with provenance tracking that ties every generated claim back to the source passage it came from.",
    metric: "Citation-level provenance",
  },
  {
    title: "Evaluation harnesses",
    body: "Step-level scoring suites that measure whether a model reasoned correctly rather than guessed well, tracked continuously across thirty-four benchmark suites.",
    metric: "34 benchmark suites",
  },
  {
    title: "Safety and guardrails",
    body: "Policy enforcement that holds under production load, with adversarial red-teaming and immutable audit trails recorded for every privileged action.",
    metric: "Immutable audit trail",
  },
  {
    title: "Research infrastructure",
    body: "Content-addressed dataset versioning, experiment tracking and deterministic re-runs, so a result from last quarter can be re-executed from its manifest today.",
    metric: "Deterministic re-runs",
  },
];

/* The commitments the work is held to. */
const PRINCIPLES = [
  {
    title: "Measurable or it did not happen",
    body: "A claim without a reproducible measurement behind it does not leave the lab. We publish the harness alongside the result.",
  },
  {
    title: "Private data stays private",
    body: "Proprietary corpora stay inside the customer VPC. Research partners' data is never used to train shared models.",
  },
  {
    title: "Safety is a precondition",
    body: "Red-teaming and policy review run before a capability ships, not after an incident makes it urgent.",
  },
];

const ResearchOverviewPage: React.FC = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: focusRef, inView: focusInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: papersRef, inView: papersInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [activePaper, setActivePaper] = useState<Publication | null>(null);

  /* The dialog is portalled to <body> and closes on Escape; the page behind
     it is frozen while it is open. */
  useEffect(() => {
    if (!activePaper) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePaper(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activePaper]);

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

  const publications: Publication[] = [
    {
      title: "Self-Correcting Autonomous Agent Swarms in Non-Deterministic Environments",
      category: "Agent Systems",
      date: "August 2026",
      authors: "Dr. Elena Rostova, Marcus Vance",
      abstract: "We introduce a dynamic directed acyclic graph (DAG) topology enabling LLM agents to verify intermediate states and self-heal during multi-step executions.",
      venue: "Amthromax Benchmark Index, Vol. 4",
      readTime: "14 min read",
      summary:
        "Long-running agent workflows fail in a characteristic way: an early step produces a plausible but wrong intermediate result, and every later step compounds it. This paper replaces the usual linear execution chain with a directed acyclic graph in which each node carries an explicit verification contract. When a node fails its contract, only the subgraph that depends on it is re-executed rather than the entire run.",
      findings: [
        "Shard-level replay cut end-to-end retry cost by an order of magnitude compared with full-run restarts.",
        "Verification contracts caught the majority of compounding errors at the step that introduced them, not downstream.",
        "Swarms held a 3-of-5 consensus quorum while individual agents were drained and replaced mid-run.",
        "The topology degrades gracefully: losing a region reduces throughput without invalidating in-flight results.",
      ],
    },
    {
      title: "Sub-50ms Hybrid Vector-Graph Memory for Enterprise AGI Applications",
      category: "Memory & Context",
      date: "July 2026",
      authors: "Dr. Sarah Chen, Amthromax AI Lab",
      abstract: "Demonstrating a federated memory indexing engine that combines graph database relationships with ultra-dense vector embeddings for instant retrieval.",
      venue: "Amthromax Technical Report Series",
      readTime: "11 min read",
      summary:
        "Pure vector search retrieves passages that look similar; pure graph traversal retrieves records that are formally related. Neither alone answers questions that depend on both semantics and structure. This work describes a federated index that resolves a query against a dense embedding space and a relationship graph in the same pass, then merges the two candidate sets before ranking.",
      findings: [
        "Hybrid resolution returned structurally relevant passages that dense-only retrieval ranked outside the top fifty.",
        "Index compaction reduced the stored footprint substantially while improving query throughput.",
        "Provenance is preserved end to end, so every retrieved span can be traced to its source document.",
        "The index federates across tenants without sharing embeddings between them.",
      ],
    },
    {
      title: "Zero-Trust Cryptographic Lattice Verification for Multi-Region Compute Grids",
      category: "Security & Safety",
      date: "May 2026",
      authors: "Prof. Marcus Vance",
      abstract: "A post-quantum cryptographic protocol for verifying model parameter weights and tensor operations across untrusted distributed edge nodes.",
      venue: "Amthromax Security Research",
      readTime: "16 min read",
      summary:
        "When inference is distributed across nodes you do not physically control, the open question is not whether the result arrived but whether it was computed from the weights you shipped. This paper describes a lattice-based attestation protocol that lets a coordinator verify both the parameter set and the tensor operations a remote node performed, without trusting the node itself.",
      findings: [
        "Attestation uses NIST-standard lattice primitives, so the scheme is not broken by future quantum decryption.",
        "Verification cost stays bounded as the node count grows, because proofs are checked independently.",
        "Drift between a deployed node and the release build is detected rather than silently tolerated.",
        "Private keys never leave hardware enclaves, so a compromised node cannot impersonate a healthy one.",
      ],
    },
    {
      title: "Scalable Alignment via Recursive AI Oversight and Deliberative Traces",
      category: "AI Safety",
      date: "March 2026",
      authors: "Amthromax Safety Research Division",
      abstract: "Methods for training oversight models that analyze hidden reasoning traces to ensure alignment with human constitutional principles.",
      venue: "Amthromax Safety Research",
      readTime: "18 min read",
      summary:
        "Human review does not scale to the volume of decisions an agent platform makes. This paper studies oversight models trained to read a system's deliberative trace rather than only its output, scoring whether the stated reasoning actually supports the conclusion and whether it respects a written constitution. The oversight model is itself held to review, which is where the recursion in the title comes from.",
      findings: [
        "Trace-level review caught answers that were correct for the wrong reasons, which output-only scoring accepts.",
        "Scoring the reasoning rather than the result made the signal harder to game through surface rewording.",
        "Constitutional violations were flagged before deployment in red-team evaluation rather than after incidents.",
        "Oversight remains auditable: every judgement keeps the trace and the rule it was judged against.",
      ],
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
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-white" />
            Amthromax R&D Labs
          </span>

          <h1 className="text-balance text-4xl sm:text-6xl md:text-7xl font-normal tracking-[-0.03em] leading-[1.06] text-gray-900 dark:text-white">
            Frontier research for <br className="hidden sm:block" />
            autonomous enterprise intelligence
          </h1>

          {/* Subtitle */}
          <p className="text-pretty text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-normal pt-2">
            We build foundational cognitive systems, autonomous agent swarms, and scalable safety protocols designed to solve complex human-level challenges.
          </p>

          <p className="text-pretty text-sm sm:text-base text-gray-500 dark:text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
            The lab works in the open where it can: methods that pass review are published, and the ones that survive production become the platform our customers run on.
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
          <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.02em] text-gray-900 dark:text-white leading-[1.15]">
            We advance the science of AI through research on frontier models, reasoning, multimodal systems, and safe deployment.
          </h2>
        </div>

        {/* Frontier Models Category Header */}
        <div className="text-center max-w-2xl mx-auto pt-8 space-y-3">
          <h3 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-gray-900 dark:text-white">
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
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-gray-900 dark:text-white">
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

      {/* How We Work */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-black transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                Method
              </span>
              <h2 className="text-balance text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-gray-900 dark:text-white leading-[1.15]">
                How the lab works
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Four stages, applied the same way to every project, from a two-week probe to a year-long programme.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 divide-y divide-gray-200 dark:divide-white/10 border-t border-b border-gray-200 dark:border-white/10">
            {RESEARCH_PROCESS.map((phase) => (
              <div key={phase.step} className="py-8 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6">
                <div className="sm:col-span-1 font-mono text-xs text-gray-400 dark:text-gray-600 pt-1">{phase.step}</div>
                <div className="sm:col-span-4 text-base font-medium tracking-tight text-gray-900 dark:text-white">
                  {phase.title}
                </div>
                <p className="sm:col-span-7 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{phase.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Have Built */}
      <section className="bg-[#f8f8fa] dark:bg-[#07070a] border-t border-gray-100 dark:border-white/10 py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              Our work
            </span>
            <h2 className="text-balance text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-gray-900 dark:text-white leading-[1.1]">
              What the research has produced
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Six systems that began as research questions and now run in production. Each one is documented, measured and re-runnable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
            {OUR_WORK.map((item) => (
              <div
                key={item.title}
                className="group bg-white dark:bg-black p-7 sm:p-9 flex flex-col justify-between gap-6 min-h-[260px] transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-normal tracking-[-0.01em] text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.body}</p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gray-400 dark:text-gray-600">
                  {item.metric}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-black transition-colors duration-300 space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Principles
          </span>
          <h2 className="text-balance text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-gray-900 dark:text-white leading-[1.1]">
            What we hold the work to
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="space-y-4">
              <span className="block h-px w-full bg-gray-900 dark:bg-white" />
              <span className="font-mono text-xs text-gray-400 dark:text-gray-600">0{i + 1}</span>
              <h3 className="text-xl font-normal tracking-[-0.015em] text-gray-900 dark:text-white leading-snug">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
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
              <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-gray-900 dark:text-white">
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
              <motion.button
                key={paper.title}
                type="button"
                onClick={() => setActivePaper(paper)}
                aria-label={`Read more about ${paper.title}`}
                initial={{ opacity: 0, y: 16 }}
                animate={papersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="text-left cursor-pointer bg-white dark:bg-black border border-gray-200/80 dark:border-white/10 rounded-lg p-7 sm:p-8 space-y-4 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-white/20 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-white focus-visible:ring-offset-2"
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
                <div className="pt-2 flex items-center justify-between gap-4 text-xs font-medium text-gray-400 dark:text-gray-500">
                  <span className="truncate">Authors: {paper.authors}</span>
                  <span className="shrink-0 text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Read paper &rarr;
                  </span>
                </div>
              </motion.button>
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
            <h3 className="text-2xl sm:text-4xl font-normal text-gray-900 dark:text-white tracking-[-0.02em] leading-tight">
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

      {/* Paper detail dialog */}
      {createPortal(
        <AnimatePresence>
          {activePaper && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActivePaper(null)}
              role="dialog"
              aria-modal="true"
              aria-label={activePaper.title}
              className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-8"
            >
              <motion.article
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative my-auto w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0b0b0d] border border-gray-200 dark:border-white/10 shadow-2xl p-7 sm:p-10 space-y-7"
              >
                <button
                  type="button"
                  onClick={() => setActivePaper(null)}
                  aria-label="Close"
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  &#10005;
                </button>

                <header className="space-y-4 pr-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/15 font-medium text-gray-700 dark:text-gray-200">
                      {activePaper.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">{activePaper.date}</span>
                    <span className="text-gray-300 dark:text-gray-700">&bull;</span>
                    <span className="text-gray-500 dark:text-gray-400">{activePaper.readTime}</span>
                  </div>

                  <h2 className="text-balance text-2xl sm:text-3xl font-normal tracking-[-0.02em] leading-snug text-gray-900 dark:text-white">
                    {activePaper.title}
                  </h2>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activePaper.authors} &nbsp;&bull;&nbsp; {activePaper.venue}
                  </p>
                </header>

                <div className="space-y-3 border-t border-gray-200 dark:border-white/10 pt-6">
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                    Abstract
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    {activePaper.abstract}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {activePaper.summary}
                  </p>
                </div>

                <div className="space-y-4 border-t border-gray-200 dark:border-white/10 pt-6">
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                    Key findings
                  </h3>
                  <ul className="space-y-3">
                    {activePaper.findings.map((finding) => (
                      <li key={finding} className="flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gray-900 dark:bg-white" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 dark:border-white/10 pt-6">
                  <Link
                    to="/research/publications"
                    onClick={() => setActivePaper(null)}
                    className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-sm font-medium transition-colors"
                  >
                    Browse the archive
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActivePaper(null)}
                    className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/20 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.article>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}

      <Footer />
    </div>
  );
};

export default ResearchOverviewPage;
