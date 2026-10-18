import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";
import { features, FeatureCard } from "./FeaturesSection";

const AllServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans transition-colors duration-300 antialiased">
      <SEO
        title="All Services | Amthromax"
        description="Every Amthromax engineering service: custom software, applied AI, cybersecurity, data analytics, mobile applications and enterprise cloud."
      />

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-[#0b0b0c] dark:to-black">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(15,23,42,0.07),transparent_70%)] dark:bg-[radial-gradient(60%_100%_at_50%_100%,rgba(255,255,255,0.08),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-24 text-center"
        >
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400"
          >
            <Link to="/" className="transition-colors hover:text-gray-900 dark:hover:text-white">
              Home
            </Link>
            <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white">Services</span>
          </nav>

          <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.08] text-gray-900 dark:text-white">
            Every Amthromax service
          </h1>

          <p className="text-pretty mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            The full set of engineering practices we run, from bespoke software and applied AI
            through to security, data and cloud infrastructure. Open any one for its methodology,
            stack and deliverables.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {features.map((f) => (
              <span
                key={f.title}
                className="rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-300"
              >
                {f.title}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Every service as a card */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </section>

      {/* Closing call to action */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-12 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_18px_44px_-28px_rgba(15,23,42,0.4)] dark:border-white/10 dark:bg-[#0d0d0f] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_18px_44px_-28px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3">
              <h2 className="text-balance text-2xl md:text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
                Not sure which one you need?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Most engagements cut across several of these. Tell us what you are trying to ship
                and we will map it to the right practice.
              </p>
            </div>

            <Link
              to="/contact-sales"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-sm font-medium text-white ring-1 ring-black/10 shadow-[0_1px_2px_rgba(15,23,42,0.3),0_14px_30px_-16px_rgba(15,23,42,0.8)] transition-all duration-300 hover:bg-black active:scale-[0.98] dark:bg-white dark:text-gray-900 dark:ring-white/20 dark:hover:bg-gray-100"
            >
              <span>Talk to engineering</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllServicesPage;
