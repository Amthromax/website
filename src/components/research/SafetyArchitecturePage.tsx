import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../layout/SEO";

const SafetyArchitecturePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for expanded protection cards
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const protectionItems = [
    {
      id: 1,
      title: "Child safety",
      subtitle: "Preventing child exploitation & harm",
      description:
        "We build proactive detection models, robust content filters, and partner with national safety organizations to prevent child sexual abuse material (CSAM) and unsafe interactions.",
      icon: (
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Private information",
      subtitle: "Protecting personally identifiable data",
      description:
        "Our data scrubbing pipelines remove PII from training sets. Real-time inference filters block unauthorized access to private, financial, and medical records.",
      icon: (
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Deep fakes",
      subtitle: "Improving transparency in AI content",
      description:
        "We implement C2PA cryptographic provenance watermarks, synthetic media detection APIs, and strict verification protocols to prevent non-consensual impersonation.",
      icon: (
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Bias",
      subtitle: "Rigorously evaluating content to avoid reinforcing biases or stereotypes",
      description:
        "We benchmark model outputs against diverse global evaluation datasets, applying debiasing techniques and constitutional principles across all modalities.",
      icon: (
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 6l9-4 9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V6z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Elections",
      subtitle: "Partnering with governments to combat disinformation globally",
      description:
        "During democratic elections, we enforce heightened anti-disinformation guardrails, restrict political campaigning generation, and provide real-time threat intelligence.",
      icon: (
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-emerald-500 selection:text-black">
      <SEO
        title="Safety | Amthromax R&D Labs"
        description="Safety at every step: Explore Amthromax AI safety architecture, continuous red-teaming, constitutional alignment, and risk evaluation protocols."
      />

      {/* SECTION 1: Safety at Every Step */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-20 text-center space-y-16">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold block">
            Safety
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08]">
            Safety at every step
          </h1>
          <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto">
            We believe in AI's potential to make life better for everyone, which means making it safe for everyone
          </p>
        </div>

        {/* 3 Step Visual Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {/* Card 1: Teach */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-[#121215] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xl group cursor-pointer"
          >
            <span className="text-base font-bold text-white tracking-wide">Teach</span>

            {/* Inner Visual Box */}
            <div className="h-64 sm:h-72 rounded-2xl bg-[#1c1c20] relative overflow-hidden flex items-center justify-center p-6 border border-white/[0.05]">
              <div className="flex items-center gap-6 relative">
                {/* White Circle */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                />

                {/* Gray Circle with Green Checkmark */}
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#6b7280]/60" />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-[#22c55e] flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-5 h-5 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Test */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-[#121215] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xl group cursor-pointer"
          >
            <span className="text-base font-bold text-white tracking-wide">Test</span>

            {/* Inner Visual Box */}
            <div className="h-64 sm:h-72 rounded-2xl bg-[#1c1c20] relative overflow-hidden flex items-center justify-center p-6 border border-white/[0.05]">
              <div className="w-full max-w-[210px] bg-[#2a2a30] rounded-xl p-4 space-y-2.5 relative shadow-xl border border-white/10">
                {/* Green Checkmark Badge at top-left */}
                <div className="w-6 h-6 rounded-md bg-[#22c55e] flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {/* Content Placeholders */}
                <div className="w-full h-2.5 bg-gray-400/30 rounded-full" />
                <div className="w-4/5 h-2.5 bg-gray-400/20 rounded-full" />
                <div className="w-2/3 h-2.5 bg-gray-400/20 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Share */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-[#121215] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xl group cursor-pointer"
          >
            <span className="text-base font-bold text-white tracking-wide">Share</span>

            {/* Inner Visual Box */}
            <div className="h-64 sm:h-72 rounded-2xl bg-[#1c1c20] relative overflow-hidden flex items-center justify-center p-6 border border-white/[0.05]">
              <div className="grid grid-cols-2 gap-4 relative">
                {[1, 2, 3, 4].map((user) => (
                  <div key={user} className="flex flex-col items-center space-y-1">
                    <div className="w-10 h-10 rounded-full bg-[#d1d5db]" />
                    <div className="w-12 h-5 rounded-t-full bg-[#9ca3af]/60" />
                  </div>
                ))}

                {/* Green Checkmark Badge at bottom-right */}
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-[#22c55e] flex items-center justify-center shadow-lg">
                  <svg className="w-4.5 h-4.5 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Safety doesn't stop (Tri-Orb Lifecycle Diagram) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-white/10 space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Safety doesn't stop
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Building safe AI isn't one and done. Every day is a chance to make things better. And every step helps anticipate, evaluate, and prevent risk.
          </p>
        </div>

        {/* Animated Interactive Tri-Orb Ecosystem */}
        <div className="relative max-w-4xl mx-auto py-12 flex items-center justify-center min-h-[580px]">
          {/* Orbital Container Grid */}
          <div className="relative w-full max-w-[720px] aspect-square sm:aspect-[4/3] flex items-center justify-center">
            {/* Top Left Orb: TEACH */}
            <div className="absolute top-4 left-6 sm:left-12 flex flex-col items-center">
              <div className="relative w-44 sm:w-52 h-44 sm:h-52 rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center p-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-emerald-500/80 pointer-events-none"
                />
                <div className="w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-[#1c1c20] border border-white/10 flex items-center justify-center shadow-2xl">
                  <span className="text-sm sm:text-base font-black tracking-widest text-white uppercase">
                    TEACH
                  </span>
                </div>

                {/* Orbiting Pills */}
                <div className="absolute -top-3 px-3 py-1 bg-[#121215] border border-white/20 rounded-md text-[9px] font-mono font-bold tracking-wider text-gray-300 uppercase shadow-md">
                  FILTER DATA
                </div>
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#121215] border border-white/20 rounded-md text-[9px] font-mono font-bold tracking-wider text-gray-300 uppercase shadow-md">
                  HUMAN VALUES
                </div>
                <div className="absolute -bottom-3 px-3 py-1 bg-[#121215] border border-white/20 rounded-md text-[9px] font-mono font-bold tracking-wider text-gray-300 uppercase shadow-md">
                  OPENAI POLICIES
                </div>
              </div>
            </div>

            {/* Top Right Orb: TEST */}
            <div className="absolute top-4 right-6 sm:right-12 flex flex-col items-center">
              <div className="relative w-44 sm:w-52 h-44 sm:h-52 rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center p-4">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-emerald-500/80 pointer-events-none"
                />
                <div className="w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-[#1c1c20] border border-white/10 flex items-center justify-center shadow-2xl">
                  <span className="text-sm sm:text-base font-black tracking-widest text-white uppercase">
                    TEST
                  </span>
                </div>

                {/* Orbiting Pills */}
                <div className="absolute -top-3 px-3 py-1 bg-[#121215] border border-white/20 rounded-md text-[9px] font-mono font-bold tracking-wider text-gray-300 uppercase shadow-md">
                  RED TEAMING
                </div>
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#121215] border border-white/20 rounded-md text-[9px] font-mono font-bold tracking-wider text-gray-300 uppercase shadow-md">
                  PREPAREDNESS EVALS
                </div>
                <div className="absolute -bottom-3 px-3 py-1 bg-[#121215] border border-white/20 rounded-md text-[9px] font-mono font-bold tracking-wider text-gray-300 uppercase shadow-md">
                  SYSTEM CARDS
                </div>
              </div>
            </div>

            {/* Bottom Center Orb: SHARE */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="relative w-44 sm:w-52 h-44 sm:h-52 rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center p-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-b-2 border-emerald-500/80 pointer-events-none"
                />
                <div className="w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-[#1c1c20] border border-white/10 flex items-center justify-center shadow-2xl">
                  <span className="text-sm sm:text-base font-black tracking-widest text-white uppercase">
                    SHARE
                  </span>
                </div>

                {/* Orbiting Pills */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#121215] border border-white/20 rounded-md text-[9px] font-mono font-bold tracking-wider text-gray-300 uppercase shadow-md">
                  FEEDBACK
                </div>
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#121215] border border-white/20 rounded-md text-[9px] font-mono font-bold tracking-wider text-gray-300 uppercase shadow-md">
                  ALPHA / BETA
                </div>
              </div>
            </div>

            {/* Central Hub Node: SAFETY COMMITTEES */}
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="px-4 py-2 bg-[#1c1c20] border border-white/30 rounded-lg text-[10px] font-mono font-black tracking-wider text-white uppercase shadow-2xl flex items-center gap-2">
                <span>SAFETY COMMITTEES</span>
                <span className="text-emerald-400">⇄</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Protecting people where it matters most */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-white/10 space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Protecting people where it matters most
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed">
            We work with industry leaders and policymakers to reduce harm and protect people across critical areas.
          </p>
        </div>

        {/* Grid of Protection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {protectionItems.slice(0, 3).map((item) => (
            <motion.div
              key={item.id}
              onClick={() => toggleCard(item.id)}
              whileHover={{ scale: 1.01 }}
              className="bg-[#0e0e11] border border-white/10 rounded-2xl p-7 sm:p-8 flex flex-col justify-between min-h-[220px] shadow-lg cursor-pointer hover:border-white/20 transition-all relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#1c1c20] flex items-center justify-center border border-white/10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>

                {item.subtitle && (
                  <p className="text-xs text-gray-400 font-medium">{item.subtitle}</p>
                )}

                <AnimatePresence>
                  {expandedCard === item.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-white/10"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 flex justify-start">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#1c1c20] hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all"
                >
                  {expandedCard === item.id ? "−" : "+"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom 2 Wide Protection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {protectionItems.slice(3, 5).map((item) => (
            <motion.div
              key={item.id}
              onClick={() => toggleCard(item.id)}
              whileHover={{ scale: 1.01 }}
              className="bg-[#0e0e11] border border-white/10 rounded-2xl p-7 sm:p-8 flex flex-col justify-between min-h-[220px] shadow-lg cursor-pointer hover:border-white/20 transition-all relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#1c1c20] flex items-center justify-center border border-white/10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>

                {item.subtitle && (
                  <p className="text-xs text-gray-400 font-medium">{item.subtitle}</p>
                )}

                <AnimatePresence>
                  {expandedCard === item.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-white/10"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 flex justify-start">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#1c1c20] hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all"
                >
                  {expandedCard === item.id ? "−" : "+"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Go deeper on safety */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="rounded-3xl bg-[#1c1c20] border border-white/10 p-12 sm:p-20 text-center space-y-8 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Go deeper on safety
          </h2>
          <div className="flex justify-center pt-2">
            <Link
              to="/research/publications"
              className="px-8 py-4 bg-[#2a2a30] hover:bg-[#383842] text-white font-semibold text-sm rounded-full transition-all border border-white/10 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Explore the deployment safety hub</span>
              <span className="text-xs">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyArchitecturePage;
