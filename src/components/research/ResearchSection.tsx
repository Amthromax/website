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
}

const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    slug: "predictive-autoscaling",
    category: "Artificial Intelligence",
    title: "Predictive Autoscaling in Kubernetes via Deep LSTM Networks",
    abstract: "This paper introduces a proactive autoscaling mechanism that leverages Long Short-Term Memory (LSTM) neural networks to forecast API request volumes. By anticipating traffic spikes up to 15 minutes in advance, our architecture reduces latency spikes by 42% compared to reactive CPU/memory threshold scalers.",
    date: "June 2026",
    readTime: "8 min read",
    tags: ["Machine Learning", "Kubernetes", "DevOps"],
  },
  {
    id: "2",
    slug: "zero-trust-protocol",
    category: "Cybersecurity",
    title: "Zero-Trust Protocol and Edge Identity Authentication",
    abstract: "An examination of cryptographically verified edge nodes for enterprise networks. We present a lightweight identity validation protocol that achieves zero-trust isolation without the high CPU overhead traditional in distributed ledger validations.",
    date: "April 2026",
    readTime: "12 min read",
    tags: ["Zero Trust", "Cryptography", "Edge Computing"],
  },
  {
    id: "3",
    slug: "distributed-query-execution",
    category: "distributed-query-execution",
    title: "Distributed Query Execution Across Hybrid Multi-Cloud Clusters",
    abstract: "A novel routing database middleware designed to orchestrate complex JOIN queries across heterogeneous databases hosted dynamically on AWS, Google Cloud, and on-premises centers, achieving sub-100ms federated response times.",
    date: "January 2026",
    readTime: "10 min read",
    tags: ["Multi-Cloud", "SQL Federation", "Big Data"],
  },
  {
    id: "4",
    slug: "lattice-based-cryptography",
    category: "Quantum Security",
    title: "Lattice-Based Cryptography in Modern Web API Layers",
    abstract: "A production case study detailing the deployment of post-quantum lattice cryptography to secure sensitive banking REST APIs. We evaluate handshake overheads and client-side computational footprints on mobile hardware.",
    date: "November 2025",
    readTime: "15 min read",
    tags: ["Post-Quantum", "Web Security", "API Design"],
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
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-gray-950 min-h-[80vh] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full"
          >
            Scientific Division
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-white"
          >
            Research & Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed"
          >
            Explore our scientific breakthroughs, whitepapers, and engineering paradigms that power our production technology.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { value: "24+", label: "Published Papers" },
            { value: "12", label: "Patents Pending" },
            { value: "40%", label: "Avg. Latency Reduced" },
            { value: "15+", label: "Research Experts" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-55 dark:bg-gray-900 border border-gray-150 dark:border-gray-800/60 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Publications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {researchPapers.map((paper) => (
            <Link
              key={paper.id}
              to={`/research/${paper.slug}`}
              className="block group"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-[#161617] border border-gray-100 dark:border-white/[0.04] rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden min-h-[320px]"
              >
                {/* Card top-right read time badge */}
                <div className="absolute top-6 right-8 text-xs font-semibold text-gray-400 dark:text-gray-500">
                  {paper.readTime}
                </div>

                <div>
                  {/* Category tag */}
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-4">
                    {paper.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {paper.title}
                  </h3>

                  {/* Abstract */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                    {paper.abstract}
                  </p>
                </div>

                <div>
                  {/* Date Only (Author name removed per user request) */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/[0.04] text-xs">
                    <div className="text-gray-450 dark:text-gray-400 font-semibold uppercase tracking-wider">
                      Published
                    </div>
                    <div className="text-gray-400 dark:text-gray-500">
                      {paper.date}
                    </div>
                  </div>

                  {/* Tags & Action Button */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-2">
                      {paper.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-gray-50 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-md font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center gap-1 transition-colors">
                      Read Paper
                      <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">→</span>
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
