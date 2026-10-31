import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { newsItems } from "../blog/blogData";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";
import ListControls, { sortItems, type SortKey, type LayoutKey } from "../common/ListControls";

/** How many cards the feed opens with; Load more reveals the rest. */
const INITIAL_VISIBLE = 9;

const NewsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [layout, setLayout] = useState<LayoutKey>("grid");
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const filters = ["All", "SALES", "Release", "Announcement", "Roadmap", "Partnership"];

  const filteredItems = sortItems(
    selectedFilter === "All"
      ? newsItems
      : newsItems.filter((item) => item.category.toUpperCase() === selectedFilter.toUpperCase()),
    sortBy
  );

  const shownItems = filteredItems.slice(0, visible);
  const selectFilter = (f: string) => {
    setSelectedFilter(f);
    setVisible(INITIAL_VISIBLE);
  };

  /* The chips read "Releases" where the value is "Release"; the menu follows. */
  const filterLabel = (f: string) => (f === "All" || f === "SALES" ? f : `${f}s`);

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
    <div className="bg-white dark:bg-black transition-colors duration-300 min-h-screen font-sans">
      <SEO
        title="Newsroom & Insights | Amthromax"
        description="Latest company announcements, AI research, product launches, and technology updates from Amthromax."
      />

      {/* Hero Section */}
      <section className="bg-white dark:bg-black border-b border-gray-200 dark:border-white/10 py-12 sm:py-16 lg:py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Side Info & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center space-x-2 text-xs font-normal tracking-wide text-gray-500 dark:text-gray-400">
                <span>Insights</span>
                <span className="text-gray-400">&gt;</span>
                <span className="text-gray-900 dark:text-white font-normal">All Insights</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-sans text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                All Insights
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed font-normal">
                Always-on prospecting that finds the right leads at the right time, every time.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  className="bg-black dark:bg-white text-white dark:text-black font-medium text-xs px-5 py-2.5 rounded-full shadow-sm hover:opacity-90 transition-all cursor-pointer select-none"
                >
                  Sign up for free
                </button>
              </div>
            </div>

            {/* Amthromax mark */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
              <img
                src="/images/amthromax_asterisk_logo.png"
                alt="Amthromax logo"
                className="w-full h-auto max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] object-contain transition-transform duration-300 hover:scale-105 dark:invert dark:brightness-125"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Insights Content Feed Section */}
      <main className="py-12 sm:py-16 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
        
        {/* Section Heading & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 dark:border-white/10 pb-6">
          <h2 className="text-3xl sm:text-4xl font-normal font-sans text-gray-900 dark:text-white tracking-tight">
            Insights
          </h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => selectFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-normal transition-all duration-300 select-none cursor-pointer ${
                  selectedFilter.toUpperCase() === filter.toUpperCase()
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
                }`}
              >
                {filterLabel(filter)}
              </button>
            ))}

            <ListControls
              categories={filters}
              selectedCategory={selectedFilter}
              onSelectCategory={selectFilter}
              sortBy={sortBy}
              onSortBy={setSortBy}
              layout={layout}
              onLayout={setLayout}
              labelFor={filterLabel}
              className="ml-1"
            />
          </div>
        </div>

        {/* 3-Column Insights Card Grid (Apple Developer Aesthetic) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={layout}
          className={
            layout === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "flex flex-col gap-4"
          }
        >
          {shownItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`group rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-8 hover:shadow-md transition-shadow duration-300 ${
                layout === "grid"
                  ? "flex flex-col justify-between h-full"
                  : "flex flex-col gap-4 md:flex-row md:items-center md:gap-10"
              }`}
            >
              <div className={layout === "grid" ? "space-y-4" : "space-y-3 md:flex-1"}>
                {/* Category Header */}
                <span className="text-xs font-normal uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                  {item.category}
                </span>

                {/* Article Title */}
                <Link
                  to={`/news/${item.id}`}
                  className="text-xl sm:text-2xl font-normal text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-[1.25] block tracking-tight font-sans"
                >
                  {item.title}
                </Link>

                {/* Excerpt / Summary */}
                <p className="text-sm sm:text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  {item.summary}
                </p>
              </div>

              {/* Article Footer Link */}
              <div className={`flex items-center justify-between ${
                layout === "grid"
                  ? "pt-6 mt-6 border-t border-gray-200 dark:border-white/10"
                  : "md:w-60 md:shrink-0 md:justify-end md:gap-6 pt-4 mt-0 border-t border-gray-200 dark:border-white/10 md:border-t-0"
              }`}>
                <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                  {item.date}
                </span>
                <Link
                  to={`/news/${item.id}`}
                  className="text-xs font-normal text-gray-900 dark:text-white group-hover:underline flex items-center gap-1.5"
                >
                  <span>Read article</span>
                  <span>›</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {visible < filteredItems.length && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setVisible((v) => v + INITIAL_VISIBLE)}
              className="group inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-medium text-gray-900 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_26px_-16px_rgba(15,23,42,0.5)] transition-all duration-300 hover:border-gray-400 hover:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_16px_34px_-16px_rgba(15,23,42,0.6)] active:scale-[0.98] cursor-pointer dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15"
            >
              <span>Load more</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
                &darr;
              </span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;
