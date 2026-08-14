import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const SafetyArchitecturePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const safetyPillars = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      tag: "CORE ALIGNMENT",
      title: "Constitutional AI Boundaries",
      description: "Models are trained against explicit constitutional directives that prevent unintended autonomous escalation, data leaks, and harmful behavior patterns.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      tag: "RUNTIME ISOLATION",
      title: "Cryptographic Sandboxing",
      description: "Agent execution occurs in hardware-isolated, non-persistent container runtimes with memory encryption and strict external RPC controls.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      tag: "STRESS TESTING",
      title: "Adversarial Red-Teaming",
      description: "Automated AI red-teaming bots continuously probe all deployment builds for prompt injection, jailbreaks, and zero-day safety exploits.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      tag: "AUDITABILITY",
      title: "Non-Interference & Audit Logs",
      description: "Immutable, cryptographic execution receipts verify model behavior in real time, ensuring strict data governance and regulatory compliance.",
    },
  ];

  const safetyLayers = [
    {
      step: "01",
      name: "Input Sanitation & Context Filtering",
      detail: "Real-time vector screening of inputs for adversarial injection, sensitive data leakage, and unauthorized policy bypass attempts.",
    },
    {
      step: "02",
      name: "Constitutional Model Inference",
      detail: "Core model execution bound by multi-stage constitutional guardrails that dynamically adjust confidence thresholds.",
    },
    {
      step: "03",
      name: "Hardware Memory Sandbox",
      detail: "Isolated virtual execution environments that restrict network sockets, disk persistence, and unverified API integrations.",
    },
    {
      step: "04",
      name: "Output Verification & Cryptographic Signing",
      detail: "Final output validation against compliance policies before streaming, accompanied by cryptographic verification metadata.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-600 selection:text-white">
      <SEO
        title="Safety Architecture | Amthromax R&D Labs"
        description="Explore the Amthromax AI Safety Architecture: constitutional alignment, cryptographic sandboxing, adversarial red-teaming, and zero-trust runtime guarantees."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-20 border-b border-gray-100">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            AMTHROMAX SAFETY & GOVERNANCE ARCHITECTURE
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-[1.08]">
            Building safe, verifiable, and constitutionally aligned AGI systems.
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-3xl">
            Our safety engineering framework combines continuous red-teaming, cryptographic sandboxing, and constitutional alignment to guarantee reliable autonomous agent operation at scale.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#pillars"
              className="px-7 py-3.5 bg-black text-white hover:bg-gray-800 font-semibold text-sm rounded-full transition-all shadow-sm cursor-pointer"
            >
              Explore Pillars
            </a>
            <Link
              to="/research/overview"
              className="px-7 py-3.5 bg-gray-100 text-gray-900 hover:bg-gray-200 font-semibold text-sm rounded-full transition-all cursor-pointer"
            >
              Back to Research Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Core Safety Pillars Section */}
      <section id="pillars" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-b border-gray-100">
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              The Four Pillars of Amthromax Safety
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#f9f9fb] border border-gray-200/80 rounded-2xl p-8 space-y-4 hover:border-gray-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-600">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Layer Safety Architecture Pipeline */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-b border-gray-100">
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block">
              Defense-in-Depth Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Multi-Layer Execution Guardrails
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Every request processed through Amthromax models passes through four strict security checkpoints before execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyLayers.map((layer) => (
              <div
                key={layer.step}
                className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-3xl font-black text-blue-600 font-mono block">
                    {layer.step}
                  </span>
                  <h4 className="text-base font-bold text-gray-900 tracking-tight leading-snug">
                    {layer.name}
                  </h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-normal pt-2 border-t border-gray-100">
                  {layer.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="rounded-3xl bg-[#0f172a] text-white p-10 sm:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold block">
              RESOURCES & RESEARCH PAPERS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Read our technical publications on AI safety & governance.
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Explore open whitepapers on constitutional alignment, red-teaming benchmarks, and zero-trust sandbox specifications.
            </p>
          </div>
          <Link
            to="/research/publications"
            className="shrink-0 px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-bold text-sm rounded-full transition-all shadow-md cursor-pointer"
          >
            Browse Publications Archive →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SafetyArchitecturePage;
