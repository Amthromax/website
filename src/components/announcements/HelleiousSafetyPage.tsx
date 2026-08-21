import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

const HelleiousSafetyPage: React.FC = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      <SEO
        title="Helleious.ai Core Views on Safety & Governance | Amthromax"
        description="Official announcement and core views on Safety & Governance by Helleious.ai and Amthromax."
      />

      {/* Top Breadcrumb & Tag Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-500 dark:text-white/50 uppercase tracking-widest">Helleious.ai</span>
            <span className="text-xs text-gray-400 dark:text-white/30">/</span>
            <span className="text-xs font-mono text-gray-500 dark:text-white/50 uppercase tracking-widest">Safety & Governance</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/15 text-xs font-semibold text-gray-900 dark:text-white/90">
            <span className="text-sm font-normal">↗</span>
            <span>Announcements</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-700 dark:text-white/70 uppercase tracking-wider">
            <span>Special Release</span>
            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-pulse" />
            <span>2026 Announcement</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal font-sans tracking-tight leading-[1.08] text-gray-900 dark:text-white">
            Helleious.ai Core Views on Safety & Governance
          </h1>

          <p className="text-lg sm:text-2xl text-gray-600 dark:text-white/70 max-w-3xl leading-relaxed font-normal pt-2">
            Establishing rigorous alignment protocols, sovereign data privacy, and ethical AI governance standards for next-generation intelligence.
          </p>
        </motion.div>
      </section>

      {/* Content Placeholder Container */}
      <section ref={contentRef} className="py-16 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-black">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-12 gap-12 items-start"
          >
            {/* Left Sidebar Info */}
            <div className="md:col-span-4 space-y-6 pb-8 md:pb-0 md:pr-8">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/40 block">Category</span>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Safety & Governance Policy</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/40 block">Published</span>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">August 2026</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/40 block">Status</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/20">
                  Ready for Content Integration
                </span>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-white/10">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs font-mono text-gray-600 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
                >
                  <span>← Return to Overview</span>
                </Link>
              </div>
            </div>

            {/* Right Main Body Content Area */}
            <div className="md:col-span-8 space-y-12">
              {/* Ready State Banner */}
              <div className="p-8 rounded-3xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-normal font-sans text-gray-900 dark:text-white">Page Shell Created Successfully</h3>
                  <span className="text-xs font-mono text-gray-400 dark:text-white/40 uppercase">Helleious.ai</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed font-normal">
                  This page has been structured and connected to the live web application. You can provide the full text, policy specifications, framework details, or images anytime and they will be integrated into this section.
                </p>
              </div>

              {/* Placeholder Content Blocks */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl font-normal font-sans text-gray-900 dark:text-white tracking-tight">1. Core Pillars of Safety</h2>
                  <p className="text-base text-gray-600 dark:text-white/60 leading-relaxed">
                    Overview of safety guardrails, alignment mechanisms, and ethical standard enforcement built into Helleious.ai models.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-normal font-sans text-gray-900 dark:text-white tracking-tight">2. Governance & Institutional Controls</h2>
                  <p className="text-base text-gray-600 dark:text-white/60 leading-relaxed">
                    Independent evaluation procedures, security verification, compliance protocols, and sovereign infrastructure guarantees.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-normal font-sans text-gray-900 dark:text-white tracking-tight">3. Future Milestones & Commitments</h2>
                  <p className="text-base text-white/60 leading-relaxed text-gray-600 dark:text-white/60">
                    Long-term roadmap for AI safety research, open community standards, and continuous audit mechanisms.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="p-10 rounded-3xl bg-gray-50 dark:bg-white/[0.05] border border-gray-200 dark:border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-normal font-sans text-gray-900 dark:text-white">Helleious.ai Safety Framework</h3>
            <p className="text-sm text-gray-600 dark:text-white/60">Provide your custom content details to update this live page.</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:opacity-90 transition-all flex items-center gap-1.5"
            >
              <span>Contact Safety Team</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelleiousSafetyPage;
