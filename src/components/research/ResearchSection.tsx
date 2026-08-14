import React from "react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

interface ResearchPaper {
  id: string;
  slug: string;
  category: string;
  title: string;
  abstract: string;
  date: string;
  readTime: string;
  tags: string[];
  highlights?: string[];
}

const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    slug: "predictive-autoscaling",
    category: "Artificial Intelligence",
    title: "Predictive Autoscaling in Kubernetes via Deep LSTM Networks",
    abstract: "Proactive autoscaling mechanism leveraging Long Short-Term Memory neural networks to forecast API request volumes and eliminate traffic bottleneck spikes.",
    date: "June 2026",
    readTime: "8 min read",
    tags: ["Machine Learning", "Kubernetes", "DevOps"],
    highlights: [
      "Reduces latency spikes by 42% over standard scalers",
      "15-minute advance traffic forecasting model",
      "Production validated across multi-region clusters"
    ]
  },
  {
    id: "2",
    slug: "zero-trust-protocol",
    category: "Cybersecurity",
    title: "Zero-Trust Protocol and Edge Identity Authentication",
    abstract: "Cryptographically verified edge nodes for enterprise networks delivering zero-trust isolation without the high CPU overhead of legacy validation schemes.",
    date: "April 2026",
    readTime: "12 min read",
    tags: ["Zero Trust", "Cryptography", "Edge Computing"],
    highlights: [
      "Sub-millisecond cryptographic handshake protocols",
      "Low CPU footprint edge node isolation",
      "Hardware-enforced identity token validation"
    ]
  },
  {
    id: "3",
    slug: "distributed-query-execution",
    category: "Cloud Architecture",
    title: "Distributed Query Execution Across Hybrid Multi-Cloud Clusters",
    abstract: "Routing database middleware designed to orchestrate complex JOIN queries across heterogeneous databases hosted dynamically on AWS, GCP, and on-prem.",
    date: "January 2026",
    readTime: "10 min read",
    tags: ["Multi-Cloud", "SQL Federation", "Big Data"],
    highlights: [
      "Sub-100ms federated response times",
      "Zero data egress replication overhead",
      "Automated cross-cloud query plan optimization"
    ]
  },
  {
    id: "4",
    slug: "lattice-based-cryptography",
    category: "Quantum Security",
    title: "Lattice-Based Cryptography in Modern Web API Layers",
    abstract: "Production case study detailing post-quantum lattice cryptography deployment to secure sensitive REST APIs against quantum computation threats.",
    date: "November 2025",
    readTime: "15 min read",
    tags: ["Post-Quantum", "Web Security", "API Design"],
    highlights: [
      "NIST post-quantum standard compliance",
      "Minimal mobile client computational footprint",
      "End-to-end payload lattice encryption"
    ]
  },
];

const ResearchSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section ref={ref} className="py-20 sm:py-24 bg-[#f5f5f7] dark:bg-[#000000] min-h-[80vh] transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header - Apple Editorial Style */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] dark:text-white"
          >
            Research & Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#6e6e73] dark:text-gray-400 text-base sm:text-lg leading-relaxed font-normal"
          >
            Explore our scientific breakthroughs, whitepapers, and engineering paradigms that power our production technology.
          </motion.p>
        </div>

        {/* Apple Style Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {[
            { value: "24+", label: "Published Papers" },
            { value: "12", label: "Patents Pending" },
            { value: "40%", label: "Avg. Latency Reduced" },
            { value: "15+", label: "Research Experts" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] rounded-[22px] p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] dark:shadow-none"
            >
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-[#6e6e73] dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* High-Quality Apple Developer "Explore Benefits" Style Box Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {researchPapers.map((paper) => (
            <Link
              key={paper.id}
              to={`/research/${paper.slug}`}
              className="block group h-full"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] rounded-[28px] sm:rounded-[32px] p-8 sm:p-10 lg:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden h-full"
              >
                {/* Header & Badges */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-semibold text-[#0066cc] dark:text-[#2997ff] uppercase tracking-wider">
                      {paper.category}
                    </span>
                    <span className="text-xs font-medium text-[#86868b] dark:text-gray-500 bg-[#f5f5f7] dark:bg-white/5 px-3 py-1 rounded-full">
                      {paper.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white mb-4 group-hover:text-[#0066cc] dark:group-hover:text-[#2997ff] transition-colors leading-[1.25]">
                    {paper.title}
                  </h3>

                  {/* Abstract */}
                  <p className="text-[15px] sm:text-base text-[#515154] dark:text-gray-300 leading-relaxed font-normal mb-8">
                    {paper.abstract}
                  </p>

                  {/* Highlights Bullet List (Apple Developer Style) */}
                  {paper.highlights && (
                    <div className="space-y-3.5 mb-8 pt-4 border-t border-[#e5e5e7]/60 dark:border-white/10">
                      {paper.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#0066cc] dark:text-[#2997ff] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm font-normal text-[#1d1d1f]/90 dark:text-gray-300 leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Link & Metadata */}
                <div>
                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-[#f5f5f7] dark:bg-white/5 text-[#515154] dark:text-gray-300 px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider Line & Action Button */}
                  <div className="flex items-center justify-between pt-6 border-t border-[#e5e5e7]/80 dark:border-white/10">
                    <span className="text-xs font-medium text-[#86868b] dark:text-gray-500">
                      Published {paper.date}
                    </span>
                    <span className="text-[15px] font-medium text-[#0066cc] dark:text-[#2997ff] group-hover:underline flex items-center gap-1.5 transition-colors">
                      Read Paper
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">›</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;

