import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

export const OverviewPage: React.FC = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: archRef, inView: archInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: metricsRef, inView: metricsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: modelsRef, inView: modelsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const architecturePillars = [
    {
      num: "01",
      title: "Cognitive Agent Orchestration",
      tag: "AGENTIC FRAMEWORK",
      desc: "Multi-agent coordination pipelines running sub-15ms reasoning loops. Ephemeral execution sandboxes ground model queries with deterministic enterprise memory.",
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      num: "02",
      title: "Zero-Trust Security Perimeter",
      tag: "QUANTUM-SAFE CRYPTO",
      desc: "Post-quantum lattice encryption utilizing CRYSTALS-Kyber algorithms. Hardware-isolated key vaults and mTLS tunnel validation prevent unauthorized payload interception.",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      num: "03",
      title: "Distributed Edge Cloud Mesh",
      tag: "HIGH THROUGHPUT",
      desc: "Active-active multi-region Kubernetes clusters with predictive load balancing. Sub-second data synchronization across AWS, GCP, and bare-metal nodes.",
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      num: "04",
      title: "Unified Telemetry & APIs",
      tag: "DEVELOPER INTEGRATION",
      desc: "Type-safe SDKs for TypeScript, Python, and Go with streaming WebSockets, automatic rate limiting, and real-time execution trace monitoring.",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  const models = [
    {
      name: "MORFIX 0.1",
      role: "Autonomous Agent Engine",
      latency: "1.4ms",
      throughput: "450 t/s",
      badge: "Production Active",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      name: "INTOX 0.2",
      role: "Low-Overhead Inference",
      latency: "0.8ms",
      throughput: "1,200 t/s",
      badge: "Production Active",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      name: "COTISES 0.5 MAX",
      role: "Deep Reasoning & Analysis",
      latency: "12.5ms",
      throughput: "180 t/s",
      badge: "Enterprise Tier",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      name: "VERKOX 0.4 INSTANT",
      role: "Edge Sandbox Execution",
      latency: "0.3ms",
      throughput: "2,400 t/s",
      badge: "Ultra Fast",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/10 select-none">
      <SEO 
        title="System Overview | Amthromax Architecture" 
        description="Comprehensive technical overview of Amthromax's enterprise AI platform, cognitive agent orchestration, and zero-trust cloud network." 
      />

      {/* Hero Banner Section */}
      <div ref={heroRef} className="relative pt-24 pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Header Label Bar */}
        <div className="relative max-w-7xl mx-auto px-6 pb-8 flex justify-between items-center text-xs text-gray-400 font-inter">
          <span className="font-semibold text-gray-400">System Overview</span>
          <a href="/contact" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-300 hover:text-white font-semibold transition-colors cursor-pointer group">
            <span>Contact Sales</span>
            <span className="text-sm font-bold leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto px-6 text-center space-y-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white font-inter leading-tight">
            Enterprise Architecture & Platform Overview
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed font-inter">
            Amthromax integrates high-throughput neural inference, autonomous multi-agent coordination, and post-quantum cryptographic security into a unified, zero-trust cloud topology.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-white text-black font-extrabold rounded-full text-xs hover:bg-gray-150 transition-all shadow-lg font-inter cursor-pointer flex items-center gap-2"
            >
              <span>Contact Sales</span>
              <span className="text-sm font-bold leading-none">↗</span>
            </a>
            <a
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-black border border-white/20 text-white font-bold rounded-full text-xs hover:bg-white/10 transition-all font-inter cursor-pointer flex items-center gap-2"
            >
              <span>Explore Developer Specs</span>
              <span className="text-sm font-bold leading-none">↗</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Live System Metrics Bar */}
      <div ref={metricsRef} className="bg-[#08080a] border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "99.999%", label: "Uptime Availability SLA" },
              { value: "< 15ms", label: "Median Inference Latency" },
              { value: "10B+", label: "Daily Token Capacity" },
              { value: "SOC2 Type II", label: "Security Certification" }
            ].map((metric, idx) => (
              <div key={idx} className="space-y-2 p-4">
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight font-inter">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider font-inter">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Four Core Architectural Pillars */}
      <div ref={archRef} className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block font-inter">
            Core Engineering Specs
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-inter">
            The Amthromax Infrastructure Stack
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-medium font-inter">
            Engineered from the ground up for mission-critical workflows requiring absolute speed, security, and continuous uptime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {architecturePillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={archInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 md:p-10 rounded-3xl bg-[#09090b] border border-white/15 space-y-6 hover:border-white/30 transition-all shadow-2xl relative overflow-hidden group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  {pillar.icon}
                </div>
                <span className="text-xs font-black text-gray-400 tracking-wider font-sans">
                  {pillar.num}
                </span>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block font-inter">
                  {pillar.tag}
                </span>
                <h3 className="text-2xl font-black text-white font-inter tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-medium font-inter">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Model Suite Overview */}
      <div ref={modelsRef} className="bg-[#050507] border-y border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block font-inter">
              Deployed Intelligence
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-inter">
              Model & Agent Suite Overview
            </h2>
            <p className="text-sm md:text-base text-gray-400 font-medium font-inter">
              Active model topologies optimized for autonomous task completion, low overhead, and deterministic execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map((model, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={modelsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-black border border-white/15 hover:border-white/30 space-y-5 transition-all shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`px-2.5 py-1 rounded-full border text-[9px] font-extrabold uppercase tracking-wider font-inter ${model.badgeColor}`}>
                      {model.badge}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  </div>

                  <h4 className="text-lg font-black text-white font-inter tracking-tight">
                    {model.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium font-inter">
                    {model.role}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-gray-400">Latency:</span>
                    <span className="font-sans font-extrabold text-white tracking-tight">{model.latency}</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-gray-400">Speed:</span>
                    <span className="font-sans font-extrabold text-white tracking-tight">{model.throughput}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Workflow Execution Steps */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block font-inter">
            Execution Lifecycle
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-inter">
            Agent Operational Lifecycle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            { step: "01", title: "Ingestion & Encryption", desc: "API payload authenticated via post-quantum keys and assigned an ephemeral execution token." },
            { step: "02", title: "Sandbox Spawning", desc: "Bare-metal runtime engine initializes an isolated memory sandbox with strict resource limits." },
            { step: "03", title: "Agentic Reasoning", desc: "Multi-model reasoning loops evaluate tasks, parse vector memory, and construct plan DAGs." },
            { step: "04", title: "Deterministic Output", desc: "Execution outputs undergo verification, telemetry logging, and real-time client streaming." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#09090b] border border-white/15 space-y-4 shadow-lg">
              <span className="text-2xl font-black text-blue-400 font-sans tracking-tight block">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-white font-inter">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-inter">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-6xl mx-auto px-6 pb-24 text-center">
        <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-r from-blue-950/40 via-black to-indigo-950/40 border border-white/20 space-y-8 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-black text-white font-inter tracking-tight">
            Ready to Build on Amthromax?
          </h2>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-medium font-inter">
            Connect with our engineering team to request early access, deploy private sandbox environments, or explore custom enterprise model fine-tuning.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white text-black font-extrabold rounded-full text-xs hover:bg-gray-150 transition-all shadow-xl font-inter cursor-pointer flex items-center gap-2"
            >
              <span>Contact Sales</span>
              <span className="text-sm font-bold leading-none">↗</span>
            </a>
            <a
              href="/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-black border border-white/20 text-white font-bold rounded-full text-xs hover:bg-white/10 transition-all font-inter cursor-pointer flex items-center gap-2"
            >
              <span>View Pricing Tiers</span>
              <span className="text-sm font-bold leading-none">↗</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OverviewPage;
