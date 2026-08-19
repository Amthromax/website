import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const OrarQlowPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("swarm");

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-white selection:text-black">
      <SEO
        title="OrarQlow.ai | Autonomous Agent Swarm Orchestration Engine | Amthromax"
        description="Orchestrate low-latency autonomous AI swarms at enterprise scale with OrarQlow.ai. Ultra-fast sub-15ms coordination, zero-trust security, and adaptive agent topologies."
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 sm:px-12 max-w-7xl mx-auto text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
            Deploy & Orchestrate AI Swarms<br />with Sub-15ms Latency
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            The next-generation distributed agent orchestration system designed for high-concurrency enterprise workloads.
          </p>
        </motion.div>
      </section>

      {/* Section 1: Swarm Blueprints */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
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
            <div className="w-full min-h-[500px] sm:min-h-[540px] rounded-2xl bg-black border border-white/15 group-hover:border-white/30 p-7 sm:p-9 relative overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-start space-y-5">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-25" />

              {/* Top Prompt Box */}
              <motion.div
                whileHover={{ scale: 1.015, y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-2xl text-black space-y-3.5 z-10 border border-gray-100 relative"
              >
                <p className="text-sm sm:text-base font-bold text-gray-900">
                  Orchestrate 500+ parallel autonomous agents across multi-region Kubernetes nodes
                </p>

                <div className="flex items-center gap-2.5 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 text-gray-900 text-xs font-extrabold border border-gray-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    OrarQlow Swarm Active
                  </span>
                  <span className="text-xs text-gray-500 font-medium ml-auto">
                    Latency: 12ms
                  </span>
                </div>
              </motion.div>

              {/* Workspace Sheet */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-2xl text-black space-y-4 border border-gray-100 flex-1 flex flex-col justify-between relative z-10"
              >
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2 relative">
                    <button
                      onClick={() => setActiveTab("swarm")}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-colors z-10 ${
                        activeTab === "swarm" ? "text-white" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {activeTab === "swarm" && (
                        <motion.div
                          layoutId="activeSwarmTabPill"
                          className="absolute inset-0 bg-gray-900 rounded-lg -z-10 shadow-md"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      orarqlow.swarm.ts
                    </button>

                    <button
                      onClick={() => setActiveTab("router")}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-colors z-10 ${
                        activeTab === "router" ? "text-white" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {activeTab === "router" && (
                        <motion.div
                          layoutId="activeSwarmTabPill"
                          className="absolute inset-0 bg-gray-900 rounded-lg -z-10 shadow-md"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      topology.router.rs
                    </button>
                  </div>
                </div>

                <div className="font-sans text-xs text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-1 min-h-[140px] flex flex-col justify-center">
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
                        <p className="text-purple-600 font-semibold">import <span className="text-gray-900 font-bold">&#123; SwarmCluster &#125;</span> from <span className="text-blue-600">"@amthromax/orarqlow"</span>;</p>
                        <p className="text-gray-400 italic">// Initialize low-latency agent mesh</p>
                        <p className="text-blue-600 font-semibold">export const <span className="text-amber-600 font-bold">mesh</span> = new SwarmCluster(&#123;</p>
                        <p className="pl-4 text-gray-900 font-medium">concurrency: <span className="text-amber-600 font-bold">500</span>,</p>
                        <p className="pl-4 text-gray-900 font-medium">autoHealing: <span className="text-purple-600 font-semibold">true</span>,</p>
                        <p className="pl-4 text-gray-900 font-medium">consensusProtocol: <span className="text-blue-600 font-semibold">"Raft-Instant"</span>,</p>
                        <p className="text-blue-600 font-semibold">&#125;);</p>
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
                        <p className="text-purple-600 font-semibold">pub async fn <span className="text-blue-600 font-bold">route_swarm_payload</span>(msg: &Payload) -&gt; Result&lt;()&gt; &#123;</p>
                        <p className="pl-4 text-gray-400 italic">// Rust low-overhead swarm router</p>
                        <p className="pl-4 text-gray-900 font-medium">let agent = mesh.select_idle_agent().await?;</p>
                        <p className="pl-4 text-gray-900 font-medium">agent.dispatch(msg).await?;</p>
                        <p className="pl-4 text-blue-600 font-bold">Ok(())</p>
                        <p className="text-purple-600 font-semibold">&#125;</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 font-sans pt-2 border-t border-gray-200">
                  <span>Throughput: 100,000 ops/sec</span>
                  <span>Zero packet loss</span>
                </div>
              </motion.div>
            </div>

            <div className="space-y-1.5 pt-1">
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                Adaptive Swarm Mesh
              </h3>
              <p className="text-base text-gray-400 font-normal leading-relaxed">
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
            <div className="w-full min-h-[500px] sm:min-h-[540px] rounded-2xl bg-black border border-white/15 group-hover:border-white/30 p-7 sm:p-9 relative overflow-hidden shadow-2xl transition-all duration-300 flex items-center justify-center">
              <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-25" />

              <div className="relative z-10 w-full h-full flex items-center justify-between gap-5">
                <motion.div
                  whileHover={{ scale: 1.015, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-[62%] sm:w-[65%] bg-white rounded-xl p-5 sm:p-6 shadow-2xl text-black space-y-4 z-20 border border-gray-100 flex flex-col justify-between min-h-[380px]"
                >
                  <div className="space-y-3.5">
                    <div className="bg-gray-100 p-3 rounded-lg text-xs sm:text-sm text-gray-800 font-semibold self-end ml-auto w-fit max-w-[90%] shadow-sm">
                      Monitor OrarQlow Swarm Cluster Health
                    </div>

                    <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2.5">
                      <p className="font-medium text-gray-900">
                        OrarQlow Telemetry active across 12 region clusters:
                      </p>
                      <ol className="list-decimal pl-4 space-y-1.5 text-gray-700 font-normal">
                        <li>
                          <strong className="font-bold text-gray-900">Consensus Health:</strong> 99.999% uptime verified.
                        </li>
                        <li>
                          <strong className="font-bold text-gray-900">Average Latency:</strong> 11.8ms global response.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <input
                      type="text"
                      placeholder="Query OrarQlow swarm state..."
                      readOnly
                      className="w-full text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 outline-none cursor-pointer"
                    />
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-7 h-7 rounded-md bg-gray-900 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-md"
                    >
                      ↑
                    </motion.button>
                  </div>
                </motion.div>

                <div className="w-[35%] sm:w-[32%] flex flex-col gap-4 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-lg p-3.5 shadow-md border border-gray-100 space-y-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>STATUS</span>
                    </div>
                    <p className="text-xs font-bold text-gray-800 truncate">
                      cluster_us_east.log
                    </p>
                    <h5 className="text-xs font-black text-gray-900 leading-tight">
                      Zero Friction Sync
                    </h5>
                    <div className="pt-1">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        100% Operational
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.06, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-lg p-3.5 shadow-xl border border-gray-200 space-y-2 transform translate-x-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>ORCHESTRATION</span>
                    </div>
                    <p className="text-xs font-bold text-gray-800 truncate">
                      Dynamic Consensus
                    </p>
                    <h5 className="text-xs font-black text-gray-900 leading-tight">
                      Ready to Scale
                    </h5>
                    <div className="pt-1">
                      <span className="inline-block px-3 py-1 rounded-md bg-gray-900 text-white text-[10px] font-bold">
                        Auto-scaled
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                Zero-Latency Distributed Telemetry
              </h3>
              <p className="text-base text-gray-400 font-normal leading-relaxed">
                Instant health monitoring and real-time state sync across all active agent nodes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full text-center space-y-6 max-w-4xl mx-auto py-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Accelerate your multi-agent infrastructure with OrarQlow.AI
          </h2>

          <p className="text-gray-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Experience the future of autonomous agent swarm orchestration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Try OrarQlow.AI</span>
              <span className="text-base">↗</span>
            </Link>

            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all backdrop-blur-md flex items-center gap-2"
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
