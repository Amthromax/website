import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaMagnifyingGlass, 
  FaBolt, 
  FaCircleInfo, 
  FaUsers, 
  FaCode, 
  FaRegImage, 
  FaVideo, 
  FaMicrophone, 
  FaFileLines, 
  FaEye, 
  FaLanguage, 
  FaDatabase, 
  FaPenToSquare, 
  FaSliders, 
  FaShareNodes, 
  FaMobileScreen, 
  FaComments, 
  FaShieldHalved 
} from "react-icons/fa6";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const moreFeatures = [
  {
    icon: FaMagnifyingGlass,
    title: "Sub-15ms Swarm Latency",
    description: "Ultra-fast low-latency coordination across distributed agent nodes",
  },
  {
    icon: FaBolt,
    title: "Autonomous Swarm Mesh",
    description: "Self-healing multi-agent topology with dynamic load balancing",
  },
  {
    icon: FaCircleInfo,
    title: "Deep Reasoning & Logic",
    description: "Step-by-step verifiable consensus across parallel agent swarms",
  },
  {
    icon: FaUsers,
    title: "Multi-Agent Orchestration",
    description: "Parallel execution swarms tackling enterprise workflows simultaneously",
  },
  {
    icon: FaCode,
    title: "Code & Protocol Generation",
    description: "Automate, debug, and synthesize production code in any language",
  },
  {
    icon: FaRegImage,
    title: "Generative UI & Visuals",
    description: "Dynamic visual interface generation powered by Amthromax Imagine",
  },
  {
    icon: FaVideo,
    title: "Real-time Video Processing",
    description: "Frame-by-frame autonomous video stream analysis and synthesis",
  },
  {
    icon: FaMicrophone,
    title: "Sub-Second Voice RPC",
    description: "Natural bidirectional streaming with ultra-low latency voice agents",
  },
  {
    icon: FaFileLines,
    title: "File & Enterprise Data Analysis",
    description: "Ingest PDFs, databases, and logs for instant semantic extraction",
  },
  {
    icon: FaEye,
    title: "Multimodal Vision Engine",
    description: "Parse technical diagrams, UI mockups, and architectural blueprints",
  },
  {
    icon: FaLanguage,
    title: "30+ Global Languages",
    description: "Natively communicate and process data across 30+ enterprise languages",
  },
  {
    icon: FaDatabase,
    title: "Persistent Distributed Memory",
    description: "Long-context state retention and vector store memory across swarms",
  },
  {
    icon: FaPenToSquare,
    title: "Workflow Canvas",
    description: "Interactive visual workspace for long-form agent prompt orchestration",
  },
  {
    icon: FaSliders,
    title: "Custom Swarm Directives",
    description: "Tailor agent personalities, system prompts, and safety guardrails",
  },
  {
    icon: FaShareNodes,
    title: "Shareable Execution Traces",
    description: "Export reproducible swarm decision trees with public link sharing",
  },
  {
    icon: FaMobileScreen,
    title: "Web, Cloud & Edge Deploy",
    description: "Deploy swarms anywhere across AWS, GCP, Azure, and local edge hardware",
  },
  {
    icon: FaComments,
    title: "Event-Driven Threads",
    description: "Asynchronous event stream listeners with context-preserving execution",
  },
  {
    icon: FaShieldHalved,
    title: "SuperOrarQlow Swarm",
    description: "Enterprise priority throughput, unlimited swarm scaling, and 24/7 SLA",
  },
];

const OrarQlowPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("swarm");

  const orarqlowSchema = {
    "@type": "SoftwareApplication",
    "@id": "https://amthromax.com/orarqlow#software",
    "name": "Orarqlow AI",
    "url": "https://amthromax.com/orarqlow",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Distributed Agent Swarm Mesh / Kubernetes",
    "description":
      "Orarqlow AI is an autonomous agent swarm orchestration engine developed by Amthromax designed to deploy and orchestrate distributed multi-agent swarms with sub-15ms latency.",
    "creator": {
      "@id": "https://amthromax.com/#organization"
    },
    "publisher": {
      "@id": "https://amthromax.com/#organization"
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
      <SEO
        title="Orarqlow AI — Autonomous Agent Swarm Orchestration Engine | Amthromax"
        description="Orarqlow AI is an autonomous agent swarm orchestration engine developed by Amthromax designed to deploy and orchestrate distributed multi-agent swarms with sub-15ms latency."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
          { name: "Orarqlow AI", url: "/orarqlow" }
        ]}
        schema={orarqlowSchema}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 sm:px-12 max-w-7xl mx-auto text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">
            Deploy & Orchestrate AI Swarms<br />with Sub-15ms Latency
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Orarqlow AI is an autonomous agent swarm orchestration engine developed by Amthromax designed for high-concurrency enterprise workloads.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Try OrarQlow.AI</span>
              <span className="text-base">↗</span>
            </Link>

            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 text-gray-900 dark:text-white font-semibold text-sm transition-all border border-gray-300 dark:border-white/15 flex items-center gap-2"
            >
              <span>Contact sales</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Section 1: Swarm Blueprints */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-gray-200 dark:border-white/10">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight">
            Swarm Orchestration Blueprints
          </h2>
        </div>

        {/* 2 Side-by-Side Blueprint Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Card 1: Multi-Agent Topology */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col space-y-4 group cursor-pointer"
          >
            <div className="w-full min-h-[500px] sm:min-h-[540px] rounded-2xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 group-hover:border-gray-400 dark:group-hover:border-white/30 p-7 sm:p-9 relative overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-300 flex flex-col justify-start space-y-5">
              <div className="absolute inset-0 bg-[radial-gradient(#000000_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-10 dark:opacity-25" />

              {/* Top Prompt Box */}
              <motion.div
                whileHover={{ scale: 1.015, y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-zinc-900 rounded-xl p-5 sm:p-6 shadow-xl text-gray-900 dark:text-white space-y-3.5 z-10 border border-gray-200 dark:border-zinc-800 relative"
              >
                <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                  Orchestrate 500+ parallel autonomous agents across multi-region Kubernetes nodes
                </p>

                <div className="flex items-center gap-2.5 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 text-xs font-extrabold border border-gray-200 dark:border-zinc-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    OrarQlow Swarm Active
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-auto">
                    Latency: 12ms
                  </span>
                </div>
              </motion.div>

              {/* Workspace Sheet */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-zinc-900 rounded-xl p-5 sm:p-6 shadow-xl text-gray-900 dark:text-white space-y-4 border border-gray-200 dark:border-zinc-800 flex-1 flex flex-col justify-between relative z-10"
              >
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 pb-3">
                  <div className="flex items-center gap-2 relative">
                    <button
                      onClick={() => setActiveTab("swarm")}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-colors z-10 ${
                        activeTab === "swarm" ? "text-white dark:text-black" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {activeTab === "swarm" && (
                        <motion.div
                          layoutId="activeSwarmTabPill"
                          className="absolute inset-0 bg-gray-900 dark:bg-white rounded-lg -z-10 shadow-md"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      orarqlow.swarm.ts
                    </button>

                    <button
                      onClick={() => setActiveTab("router")}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-colors z-10 ${
                        activeTab === "router" ? "text-white dark:text-black" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {activeTab === "router" && (
                        <motion.div
                          layoutId="activeSwarmTabPill"
                          className="absolute inset-0 bg-gray-900 dark:bg-white rounded-lg -z-10 shadow-md"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      topology.router.rs
                    </button>
                  </div>
                </div>

                <div className="font-sans text-xs text-gray-800 dark:text-gray-200 leading-relaxed bg-gray-50 dark:bg-zinc-950 p-4 rounded-lg border border-gray-200 dark:border-zinc-800 space-y-1 min-h-[140px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {activeTab === "swarm" ? (
                      <motion.div
                        key="swarm"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1"
                      >
                        <p className="text-purple-600 dark:text-purple-400 font-semibold">import <span className="text-gray-900 dark:text-white font-bold">&#123; SwarmCluster &#125;</span> from <span className="text-blue-600 dark:text-blue-400">"@amthromax/orarqlow"</span>;</p>
                        <p className="text-gray-400 italic">// Initialize low-latency agent mesh</p>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">export const <span className="text-amber-600 dark:text-amber-400 font-bold">mesh</span> = new SwarmCluster(&#123;</p>
                        <p className="pl-4 text-gray-900 dark:text-gray-100 font-medium">concurrency: <span className="text-amber-600 dark:text-amber-400 font-bold">500</span>,</p>
                        <p className="pl-4 text-gray-900 dark:text-gray-100 font-medium">autoHealing: <span className="text-purple-600 dark:text-purple-400 font-semibold">true</span>,</p>
                        <p className="pl-4 text-gray-900 dark:text-gray-100 font-medium">consensusProtocol: <span className="text-blue-600 dark:text-blue-400 font-semibold">"Raft-Instant"</span>,</p>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">&#125;);</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="router"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1"
                      >
                        <p className="text-purple-600 dark:text-purple-400 font-semibold">pub async fn <span className="text-blue-600 dark:text-blue-400 font-bold">route_swarm_payload</span>(msg: &Payload) -&gt; Result&lt;()&gt; &#123;</p>
                        <p className="pl-4 text-gray-400 italic">// Rust low-overhead swarm router</p>
                        <p className="pl-4 text-gray-900 dark:text-gray-100 font-medium">let agent = mesh.select_idle_agent().await?;</p>
                        <p className="pl-4 text-gray-900 dark:text-gray-100 font-medium">agent.dispatch(msg).await?;</p>
                        <p className="pl-4 text-blue-600 dark:text-blue-400 font-bold">Ok(())</p>
                        <p className="text-purple-600 dark:text-purple-400 font-semibold">&#125;</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 font-sans pt-2 border-t border-gray-200 dark:border-zinc-800">
                  <span>Throughput: 100,000 ops/sec</span>
                  <span>Zero packet loss</span>
                </div>
              </motion.div>
            </div>

            <div className="space-y-1.5 pt-1">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Adaptive Swarm Mesh
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                Automatically scale and coordinate complex multi-agent workflows across your cloud infrastructure.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Real-time Telemetry & Health */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col space-y-4 group cursor-pointer"
          >
            <div className="w-full min-h-[500px] sm:min-h-[540px] rounded-2xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 group-hover:border-gray-400 dark:group-hover:border-white/30 p-7 sm:p-9 relative overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-300 flex items-center justify-center">
              <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
              <div className="absolute inset-0 bg-[radial-gradient(#000000_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-10 dark:opacity-25" />

              <div className="relative z-10 w-full h-full flex items-center justify-between gap-5">
                <motion.div
                  whileHover={{ scale: 1.015, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-[62%] sm:w-[65%] bg-white dark:bg-zinc-900 rounded-xl p-5 sm:p-6 shadow-xl text-gray-900 dark:text-white space-y-4 z-20 border border-gray-200 dark:border-zinc-800 flex flex-col justify-between min-h-[380px]"
                >
                  <div className="space-y-3.5">
                    <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-lg text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-semibold self-end ml-auto w-fit max-w-[90%] shadow-sm">
                      Monitor OrarQlow Swarm Cluster Health
                    </div>

                    <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2.5">
                      <p className="font-medium text-gray-900 dark:text-white">
                        OrarQlow Telemetry active across 12 region clusters:
                      </p>
                      <ol className="list-decimal pl-4 space-y-1.5 text-gray-700 dark:text-gray-300 font-normal">
                        <li>
                          <strong className="font-semibold text-gray-900 dark:text-white">Consensus Health:</strong> 99.999% uptime verified.
                        </li>
                        <li>
                          <strong className="font-semibold text-gray-900 dark:text-white">Average Latency:</strong> 11.8ms global response.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-zinc-800">
                    <input
                      type="text"
                      placeholder="Query OrarQlow swarm state..."
                      readOnly
                      className="w-full text-xs text-gray-400 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-md px-3 py-2 outline-none cursor-pointer"
                    />
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-7 h-7 rounded-md bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-semibold shrink-0 shadow-md"
                    >
                      ↑
                    </motion.button>
                  </div>
                </motion.div>

                <div className="w-[35%] sm:w-[32%] flex flex-col gap-4 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white dark:bg-zinc-900 rounded-lg p-3.5 shadow-md border border-gray-200 dark:border-zinc-800 space-y-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      <span>STATUS</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                      cluster_us_east.log
                    </p>
                    <h5 className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                      Zero Friction Sync
                    </h5>
                    <div className="pt-1">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-200 dark:border-emerald-800">
                        100% Operational
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.06, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white dark:bg-zinc-900 rounded-lg p-3.5 shadow-xl border border-gray-300 dark:border-zinc-700 space-y-2 transform translate-x-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      <span>ORCHESTRATION</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                      Dynamic Consensus
                    </p>
                    <h5 className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                      Ready to Scale
                    </h5>
                    <div className="pt-1">
                      <span className="inline-block px-3 py-1 rounded-md bg-gray-900 dark:bg-white text-white dark:text-black text-[10px] font-semibold">
                        Auto-scaled
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Zero-Latency Distributed Telemetry
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                Instant health monitoring and real-time state sync across all active agent nodes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: And much more */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight">
            And much more
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-medium">
            Everything your enterprise needs to build, scale, and orchestrate intelligent AI swarms — from local dev to global clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8 sm:gap-x-12">
          {moreFeatures.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.02 }}
              className="flex items-start gap-4 group"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pt-0.5">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-gray-200 dark:border-white/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full text-center space-y-6 max-w-4xl mx-auto py-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Accelerate your multi-agent infrastructure with OrarQlow.AI
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Experience the future of autonomous agent swarm orchestration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Try OrarQlow.AI</span>
              <span className="text-base">↗</span>
            </Link>

            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 text-gray-900 dark:text-white font-semibold text-sm transition-all border border-gray-300 dark:border-white/15 flex items-center gap-2"
            >
              <span>Contact sales</span>
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default OrarQlowPage;
