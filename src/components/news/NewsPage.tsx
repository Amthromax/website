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

            {/* Right Side 3D Isometric Asterisk Logo Container */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
              <img
                src="/images/amthromax_asterisk_logo.png"
                alt="Amthromax 3D Asterisk Logo"
                className="w-full h-auto max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] object-contain transition-transform duration-300 hover:scale-105"
              />
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

        {/* 3-Column Insights Card Grid (Apple Developer Aesthetic) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group rounded-[28px] bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] p-8 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                {/* Category Header */}
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0066cc] dark:text-[#2997ff] block">
                  {item.category}
                </span>

                {/* Article Title */}
                <Link
                  to={`/news/${item.id}`}
                  className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] dark:text-white group-hover:text-[#0066cc] dark:group-hover:text-[#2997ff] transition-colors leading-[1.25] block tracking-tight"
                >
                  {item.title}
                </Link>

                {/* Excerpt / Summary */}
                <p className="text-sm sm:text-[15px] text-[#515154] dark:text-gray-300 leading-relaxed font-normal">
                  {item.summary}
                </p>
              </div>

              {/* Article Footer Link */}
              <div className="pt-6 mt-6 border-t border-[#e5e5e7]/80 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-medium text-[#86868b] dark:text-gray-500">
                  {item.date}
                </span>
                <Link
                  to={`/news/${item.id}`}
                  className="text-[15px] font-medium text-[#0066cc] dark:text-[#2997ff] group-hover:underline flex items-center gap-1.5"
                >
                  <span>Read article</span>
                  <span>›</span>
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
