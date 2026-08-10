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

            {/* Right Side 3D Isometric Asterisk Logo Card Box */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-[#faf9f6] dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/10 rounded-2xl p-8 sm:p-12 flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 240 240" fill="none" className="w-full h-auto max-w-[200px] sm:max-w-[220px]">
                  <g transform="translate(120, 120)">
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <g key={i} transform={`rotate(${angle})`}>
                        {/* 3D Black Side Shadow Face */}
                        <polygon
                          points="0,-85 24,-71 24,-24 0,-38"
                          fill="#000000"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        {/* Front White Face */}
                        <polygon
                          points="-24,-71 0,-85 0,-38 -24,-24"
                          fill="#FFFFFF"
                          stroke="#000000"
                          strokeWidth="2.5"
                          strokeLinejoin="round"
                        />
                      </g>
                    ))}
                  </g>
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
