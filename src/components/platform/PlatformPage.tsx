import React from "react";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

const PlatformPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO 
        title="Amthromax Platform | The Agentic Execution Layer" 
        description="Explore the architecture behind Amthromax: low-latency orchestration, semantic caching, and federated databases designed for agentic workflows." 
      />

      {/* Hero Header */}
      <div className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-zinc-950/40 to-black z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            AMTHROMAX CORE PLATFORM
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            The Agent Execution Engine
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A single, highly optimized orchestration layer engineered for real-time model dispatch, semantic caching, and secure tool execution.
          </p>
        </div>
      </div>

      {/* Platform Architecture Sections */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {/* Core Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Model Dispatcher",
              desc: "Dynamically routes prompts and sub-tasks to the most efficient LLM or local model based on latency, cost, and safety guardrails. Pre-warmed sockets reduce handshake delays to zero."
            },
            {
              num: "02",
              title: "Semantic Caching",
              desc: "Groups queries by semantic meaning. Delivers cached answers to recurrent agent reasoning loops in under 15ms, reducing upstream API token consumption by up to 60%."
            },
            {
              num: "03",
              title: "Secure Sandbox",
              desc: "Automatically isolates all dynamic tools (SQL queries, bash scripts, API calls) in ephemeral, read-only virtual micro-containers that self-destruct upon task completion."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] rounded-3xl space-y-4 hover:shadow-md transition-all duration-300">
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{item.num} / Engine</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Feature Detail Showcase */}
        <div className="grid md:grid-cols-2 gap-12 items-center pt-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              Built for Scale & Continuous Autonomy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              Modern automation systems fail when they rely on single prompts. Amthromax Platform maintains long-term state across complex agentic chains. Our hybrid key-value and vector memory system lets agents preserve user history and context over days, weeks, or months of background operations.
            </p>
            <div className="space-y-3 pt-2 text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-emerald-500 text-base">✓</span>
                <span>Active load balancing across multiple server clusters</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-500 text-base">✓</span>
                <span>Immutable cryptographic trace logging for auditing</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-500 text-base">✓</span>
                <span>Bidirectional WebSockets for real-time progress indicators</span>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-[32px] bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-white/[0.04] aspect-[4/3] relative">
            <img 
              src="/images/man_at_desk.jpg" 
              alt="Engineering Platform Metrics" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlatformPage;
