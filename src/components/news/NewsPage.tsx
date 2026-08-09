import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { newsItems } from "../blog/blogData";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const NewsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "SALES", "Release", "Announcement", "Roadmap", "Partnership"];

  const filteredItems =
    selectedFilter === "All"
      ? newsItems
      : newsItems.filter((item) => item.category.toUpperCase() === selectedFilter.toUpperCase());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300 min-h-screen font-sans">
      <SEO
        title="Newsroom & Insights | Amthromax"
        description="Latest company announcements, AI research, product launches, and technology updates from Amthromax."
      />

      {/* Warm Beige / Off-White Hero Section */}
      <section className="bg-[#f7f6f2] dark:bg-[#141415] border-b border-gray-200/70 dark:border-white/5 py-12 sm:py-16 lg:py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Side Info & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center space-x-2 text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                <span>Insights</span>
                <span className="text-gray-400">&gt;</span>
                <span className="text-gray-900 dark:text-white font-bold">All Insights</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-sans text-gray-950 dark:text-white tracking-tight leading-[1.1]">
                All Insights
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed font-normal">
                Always-on prospecting that finds the right leads at the right time, every time.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  className="bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:opacity-90 transition-all cursor-pointer"
                >
                  Sign up for free
                </button>
              </div>
            </div>

            {/* Right Side Illustration Card Box */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-[#faf9f6] dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 sm:p-8 flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 320 220" fill="none" className="w-full h-auto max-w-[280px]">
                  {/* Growth Bar Chart Card */}
                  <rect x="195" y="15" width="95" height="75" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
                  <path d="M210 65 L227 45 L245 52 L275 25" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M266 25 H275 V34" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="210" y="55" width="9" height="20" rx="1" fill="#e2e8f0" />
                  <rect x="226" y="45" width="9" height="30" rx="1" fill="#e2e8f0" />
                  <rect x="243" y="40" width="9" height="35" rx="1" fill="#e2e8f0" />
                  <rect x="260" y="28" width="9" height="47" rx="1" fill="#2563eb" />

                  {/* Person sitting at desk working on laptop */}
                  <path d="M175 42 C162 42 155 52 155 65 C155 78 164 85 175 85 C195 78 195 65 C195 52 188 42 175 42 Z" fill="#1e293b" />
                  <circle cx="178" cy="68" r="14" fill="#fed7aa" />

                  {/* Torso / Lavender Shirt */}
                  <path d="M142 105 C142 92 156 88 175 88 C194 88 208 92 208 105 L200 155 H150 Z" fill="#c084fc" opacity="0.8" stroke="#1e293b" strokeWidth="2" />

                  {/* Laptop */}
                  <rect x="180" y="120" width="68" height="44" rx="4" fill="white" stroke="#1e293b" strokeWidth="2.5" />
                  <circle cx="214" cy="142" r="3.5" fill="#1e293b" />
                  <path d="M165 164 H265 L269 169 H160 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2" />

                  {/* Hands typing */}
                  <path d="M170 142 Q190 150 205 143" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />

                  {/* Desk Line */}
                  <path d="M130 169 H275 Q280 169 280 182 V195" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Insights Content Feed Section */}
      <main className="py-12 sm:py-16 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
        
        {/* Section Heading & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200/80 dark:border-white/10 pb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-gray-950 dark:text-white tracking-tight">
            Insights
          </h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 select-none cursor-pointer ${
                  selectedFilter.toUpperCase() === filter.toUpperCase()
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
                }`}
              >
                {filter === "All" || filter === "SALES" ? filter : `${filter}s`}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Insights Card Grid (Matching Screenshot) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group rounded-2xl bg-[#f5f4f0] dark:bg-[#161617] p-6 sm:p-7 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Category Header */}
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 block">
                  {item.category}
                </span>

                {/* Article Title */}
                <Link
                  to={`/news/${item.id}`}
                  className="text-xl sm:text-2xl font-bold font-sans text-gray-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-[1.25] block tracking-tight"
                >
                  {item.title}
                </Link>

                {/* Excerpt / Summary */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-1">
                  {item.summary}
                </p>
              </div>

              {/* Article Footer Link */}
              <div className="pt-4 mt-4 border-t border-gray-200/50 dark:border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                  {item.date}
                </span>
                <Link
                  to={`/news/${item.id}`}
                  className="text-xs font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Read article →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;
