import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { newsItems } from "../blog/blogData";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const NewsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const filters = ["All", "Release", "Announcement", "Roadmap", "Partnership"];

  const filteredItems =
    selectedFilter === "All"
      ? newsItems
      : newsItems.filter((item) => item.category === selectedFilter);

  const toggleExpand = (id: string) => {
    if (expandedItemId === id) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(id);
    }
  };

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
    <div>
      <SEO
        title="Amthromax News"
        description="Latest company announcements, AI research, product launches, and technology updates from Amthromax."
      />

      <div className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300 min-h-[85vh] font-sans">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">
              Press & Announcements
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
              Newsroom
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Official company updates, product milestone announcements, and technological roadmaps from the Amthromax team.
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center flex-wrap gap-2 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setSelectedFilter(filter);
                  setExpandedItemId(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 select-none ${
                  selectedFilter === filter
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-md scale-103"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-900/40 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {filter}s
              </button>
            ))}
          </div>

          {/* News Feed */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {filteredItems.map((item) => {
              const isExpanded = expandedItemId === item.id;
              let categoryColor = "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/25";
              if (item.category === "Release") {
                categoryColor = "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/25";
              } else if (item.category === "Roadmap") {
                categoryColor = "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/25";
              } else if (item.category === "Partnership") {
                categoryColor = "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/25";
              }

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`group rounded-[24px] bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] p-6 md:p-8 hover:shadow-md transition-all duration-300 ${
                    isExpanded ? "ring-1 ring-blue-500/20" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${categoryColor}`}>
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500">{item.date}</span>
                      </div>
                      <h2
                        onClick={() => toggleExpand(item.id)}
                        className="text-lg md:text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors leading-snug"
                      >
                        {item.title}
                      </h2>
                    </div>

                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all select-none self-start md:self-center"
                    >
                      {isExpanded ? "Collapse" : "Read Update"}
                    </button>
                  </div>

                  <p className="mt-4 text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                    {item.summary}
                  </p>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4 text-gray-600 dark:text-gray-350 text-xs md:text-sm leading-relaxed">
                          {item.content.map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
