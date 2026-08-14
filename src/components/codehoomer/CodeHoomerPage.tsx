import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaDocker } from "react-icons/fa6";
import { SiGitlab, SiKubernetes } from "react-icons/si";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const CodeHoomerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("config");

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-white selection:text-black">
      <SEO
        title="CodeHoomer.ai | Autonomous AI Software Engineering Studio | Amthromax"
        description="Build, test, refactor, and deploy enterprise codebases with CodeHoomer.ai. The next-generation autonomous AI software developer for modern engineering teams."
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
            Put CodeHoomer.AI to work<br />across your codebase
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Architect, refactor, debug, and deploy enterprise software at scale—built for modern dev teams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Try CodeHoomer.AI</span>
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

      {/* Section 1: Developer Blueprints (Sharp Edge Apple Box Cards) */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
            Developer Blueprints
          </h2>
        </div>

        {/* 2 Side-by-Side Blueprint Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          
          {/* Card 1: Autonomous Engineering Studio */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col space-y-4 group cursor-pointer"
          >
            {/* Outer Container with BLACK Obsidian Background & Sharp Edge Apple Box Styling */}
            <div className="w-full min-h-[500px] sm:min-h-[540px] rounded-2xl bg-black border border-white/15 group-hover:border-white/30 p-7 sm:p-9 relative overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-start space-y-5">
              
              {/* Dot Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-25" />

              {/* Top Sharp Floating Prompt Box */}
              <motion.div 
                whileHover={{ scale: 1.015, y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-2xl text-black space-y-3.5 z-10 border border-gray-100 relative"
              >
                <p className="text-sm sm:text-base font-bold text-gray-900">
                  Refactor legacy Auth service to Rust with gRPC bindings
                </p>

                <div className="flex items-center gap-2.5 pt-1">
                  <button className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs hover:bg-gray-100 transition-colors">
                    +
                  </button>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 text-gray-900 text-xs font-extrabold border border-gray-200">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    CodeHoomer Agent v4 Active
                  </span>

                  <button className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 text-xs hover:bg-gray-100 transition-colors ml-auto">
                    •••
                  </button>
                </div>
              </motion.div>

              {/* Code Workspace Sheet (White Apple Style) */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-2xl text-black space-y-4 border border-gray-100 flex-1 flex flex-col justify-between relative z-10"
              >
                {/* Code Tabs Header with Framer Motion layoutId pill */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2 relative">
                    <button
                      onClick={() => setActiveTab("config")}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-colors z-10 ${
                        activeTab === "config" ? "text-white" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {activeTab === "config" && (
                        <motion.div
                          layoutId="activeTabPill"
                          className="absolute inset-0 bg-gray-900 rounded-lg -z-10 shadow-md"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      codehoomer.config.ts
                    </button>

                    <button
                      onClick={() => setActiveTab("agent")}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-colors z-10 ${
                        activeTab === "agent" ? "text-white" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {activeTab === "agent" && (
                        <motion.div
                          layoutId="activeTabPill"
                          className="absolute inset-0 bg-gray-900 rounded-lg -z-10 shadow-md"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      agent.runner.rs
                    </button>
                  </div>
                </div>

                {/* Code Body with AnimatePresence */}
                <div className="font-sans text-xs text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-1 min-h-[140px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {activeTab === "config" ? (
                      <motion.div
                        key="config"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1"
                      >
                        <p className="text-purple-600 font-semibold">import <span className="text-gray-900 font-bold">&#123; CodeHoomerEngine &#125;</span> from <span className="text-blue-600">"@amthromax/codehoomer"</span>;</p>
                        <p className="text-gray-400 italic">// Initialize autonomous engineering agent</p>
                        <p className="text-blue-600 font-semibold">export default <span className="text-amber-600 font-bold">CodeHoomerEngine</span>.configure(&#123;</p>
                        <p className="pl-4 text-gray-900 font-medium">mode: <span className="text-blue-600 font-semibold">"autonomous-refactor"</span>,</p>
                        <p className="pl-4 text-gray-900 font-medium">zeroTrustSecurity: <span className="text-purple-600 font-semibold">true</span>,</p>
                        <p className="pl-4 text-gray-900 font-medium">maxParallelWorkers: <span className="text-amber-600 font-bold">64</span>,</p>
                        <p className="text-blue-600 font-semibold">&#125;);</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="agent"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1"
                      >
                        <p className="text-purple-600 font-semibold">pub async fn <span className="text-blue-600 font-bold">run_auth_pipeline</span>(ctx: &Context) -&gt; Result&lt;()&gt; &#123;</p>
                        <p className="pl-4 text-gray-400 italic">// Auto-generated high-speed Rust auth handler</p>
                        <p className="pl-4 text-gray-900 font-medium">let token = ctx.verify_jwt_token().await?;</p>
                        <p className="pl-4 text-gray-900 font-medium">let session = CodeHoomer::fetch_session(&token).await?;</p>
                        <p className="pl-4 text-blue-600 font-bold">Ok(session)</p>
                        <p className="text-purple-600 font-semibold">&#125;</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-[11px] text-gray-500 font-sans pt-2 border-t border-gray-200">
                  <span>Latency: 0.4ms</span>
                  <span>Memory overhead: &lt; 2.1MB</span>
                </div>
              </motion.div>

            </div>

            {/* Title & Description below Card */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                AI Code Refactoring Engine
              </h3>
              <p className="text-base text-gray-400 font-normal leading-relaxed">
                Transform legacy monoliths into high-performance microservices automatically.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Repository Analysis & CI/CD Guardrails */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col space-y-4 group cursor-pointer"
          >
            {/* Outer Container with BLACK Obsidian Background */}
            <div className="w-full min-h-[500px] sm:min-h-[540px] rounded-2xl bg-black border border-white/15 group-hover:border-white/30 p-7 sm:p-9 relative overflow-hidden shadow-2xl transition-all duration-300 flex items-center justify-center">
              
              {/* Dynamic Glow on Hover */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />
              
              {/* Dot Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-25" />

              {/* Inner Stacked Layout */}
              <div className="relative z-10 w-full h-full flex items-center justify-between gap-5">
                
                {/* Left QA Card */}
                <motion.div 
                  whileHover={{ scale: 1.015, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-[62%] sm:w-[65%] bg-white rounded-xl p-5 sm:p-6 shadow-2xl text-black space-y-4 z-20 border border-gray-100 flex flex-col justify-between min-h-[380px]"
                >
                  <div className="space-y-3.5">
                    <div className="bg-gray-100 p-3 rounded-lg text-xs sm:text-sm text-gray-800 font-semibold self-end ml-auto w-fit max-w-[90%] shadow-sm">
                      Run zero-trust security audit on PR #1420
                    </div>

                    <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2.5">
                      <p className="font-medium text-gray-900">
                        CodeHoomer completed deep static analysis across 14,290 lines of code:
                      </p>
                      <ol className="list-decimal pl-4 space-y-1.5 text-gray-700 font-normal">
                        <li>
                          <strong className="font-bold text-gray-900">Security Audit:</strong> Zero vulnerability leaks detected.
                        </li>
                        <li>
                          <strong className="font-bold text-gray-900">Performance Index:</strong> 3.4x faster execution throughput verified.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <input
                      type="text"
                      placeholder="Ask CodeHoomer about repository status..."
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

                {/* Right Stacked Audit Cards */}
                <div className="w-[35%] sm:w-[32%] flex flex-col gap-4 relative z-10">
                  
                  {/* Card 1 */}
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-lg p-3.5 shadow-md border border-gray-100 space-y-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>AUDIT</span>
                    </div>
                    <p className="text-xs font-bold text-gray-800 truncate">
                      security_scan.log
                    </p>
                    <h5 className="text-xs font-black text-gray-900 leading-tight">
                      Zero Trust Guardrails
                    </h5>
                    <div className="pt-1">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-[10px] font-bold">
                        Verified Clean
                      </span>
                    </div>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div 
                    whileHover={{ scale: 1.06, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-lg p-3.5 shadow-xl border border-gray-200 space-y-2 transform translate-x-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>PULL REQUEST</span>
                    </div>
                    <p className="text-xs font-bold text-gray-800 truncate">
                      PR #1420 Passed
                    </p>
                    <h5 className="text-xs font-black text-gray-900 leading-tight">
                      Ready to Merge
                    </h5>
                    <div className="pt-1">
                      <span className="inline-block px-3 py-1 rounded-md bg-gray-900 text-white text-[10px] font-bold">
                        Auto-approved
                      </span>
                    </div>
                  </motion.div>

                </div>

              </div>
            </div>

            {/* Title & Description below Card */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-purple-400 transition-colors">
                Automated Code Review & Guardrails
              </h3>
              <p className="text-base text-gray-400 font-normal leading-relaxed">
                Automate pull request reviews and static analysis with zero false positives.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section 2: AI Engineering with Confidence */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-normal text-white tracking-tight">
            AI engineering built for scale
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-medium">
            Integrate CodeHoomer seamlessly into your git workflows, local IDEs, and CI/CD pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-3xl sm:text-4xl font-normal text-white tracking-tight leading-tight">
              Connect your repositories
            </h3>
            <p className="text-gray-400 text-base font-normal leading-relaxed">
              Grant CodeHoomer access to your codebases via fine-grained, zero-trust token scoping.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-gray-100 transition-all shadow-md"
              >
                Explore IDE Extensions
              </Link>
              <Link
                to="/docs"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all backdrop-blur-md flex items-center gap-1.5"
              >
                <span>Read Developer API Docs</span>
                <span>↗</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="w-full min-h-[380px] sm:min-h-[420px] rounded-2xl bg-black border border-white/15 hover:border-white/30 p-8 relative overflow-hidden shadow-2xl transition-all duration-300 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-25" />

              <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-6 w-full">
                {/* GitHub Logo */}
                <motion.div 
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white shadow-xl border border-gray-100 flex items-center justify-center shrink-0 cursor-pointer group"
                  title="GitHub Integration"
                >
                  <FaGithub className="w-7 h-7 sm:w-8 sm:h-8 text-gray-900 group-hover:scale-110 transition-transform" />
                </motion.div>

                {/* GitLab Logo */}
                <motion.div 
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white shadow-xl border border-gray-100 flex items-center justify-center shrink-0 cursor-pointer group"
                  title="GitLab CI/CD"
                >
                  <SiGitlab className="w-8 h-8 sm:w-10 sm:h-10 text-[#fc6d26] group-hover:scale-110 transition-transform" />
                </motion.div>

                {/* CodeHoomer Center Badge */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white shadow-2xl border-4 border-white/80 flex items-center justify-center shrink-0 transform scale-105 cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl font-black tracking-tighter text-black">CODE</span>
                    <span className="text-[10px] font-bold tracking-widest text-blue-600">HOOMER</span>
                  </div>
                </motion.div>

                {/* Docker Logo */}
                <motion.div 
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white shadow-xl border border-gray-100 flex items-center justify-center shrink-0 cursor-pointer group"
                  title="Docker Containers"
                >
                  <FaDocker className="w-8 h-8 sm:w-10 sm:h-10 text-[#2496ed] group-hover:scale-110 transition-transform" />
                </motion.div>

                {/* Kubernetes Logo */}
                <motion.div 
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white shadow-xl border border-gray-100 flex items-center justify-center shrink-0 cursor-pointer group"
                  title="Kubernetes Engine"
                >
                  <SiKubernetes className="w-7 h-7 sm:w-8 sm:h-8 text-[#326ce5] group-hover:scale-110 transition-transform" />
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: Pitch Banner */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full text-center space-y-6 max-w-4xl mx-auto py-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Accelerate your engineering speed with CodeHoomer.AI
          </h2>

          <p className="text-gray-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Experience the future of autonomous software engineering today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Try CodeHoomer.AI</span>
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CodeHoomerPage;
