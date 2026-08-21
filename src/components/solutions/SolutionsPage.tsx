import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "../footer/Footer";

interface SolutionItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longText: string;
  image: string;
  features: string[];
  imageClass?: string;
}

const solutionsList: SolutionItem[] = [
  {
    id: "agentic-workflows",
    title: "Autonomous Agentic Workflows",
    category: "AI Intelligence",
    description: "Orchestrate specialized AI agents to solve complex multi-step tasks autonomously with closed-loop feedback and reflection.",
    longText: "Our Agentic Workflows engine leverages advanced Large Language Models configured as autonomous specialists. Each agent decomposes goals, drafts plans, writes code or handles data retrieval, and reviews output. A secondary supervisor agent evaluates results to guarantee reliability before routing responses to production databases.",
    image: "/images/man_at_desk.jpg",
    features: [
      "Dynamic Goal Decomposition",
      "Self-Correction & Code Execution",
      "Supervisor-Evaluator Loop Checks",
      "Low-Latency Execution Pipelines"
    ],
    imageClass: "object-cover object-[center_35%]"
  },
  {
    id: "cognitive-knowledge-mining",
    title: "Cognitive Knowledge Mining & RAG",
    category: "Data Processing",
    description: "Ingest, parse, and index massive multi-modal documents, videos, and relational tables for real-time contextual semantic search.",
    longText: "Unlock insights trapped in structured and unstructured data silos. This platform parses PDF charts, transcription files, audio clips, and operational logs, converting them into multi-modal vector embeddings. It uses Hybrid Search (combining BM25 keyword matching and Dense Passage Retrieval) to supply LLMs with rich context for zero-hallucination Q&A.",
    image: "/images/yellow_coat.jpg",
    features: [
      "Multi-Modal Vector Embedding",
      "Hybrid dense-sparse retrieval",
      "Automatic PDF chart & graph extraction",
      "Metadata-filtered semantic indexes"
    ],
    imageClass: "object-cover object-[center_35%]"
  },
  {
    id: "quantum-safe-gateway",
    title: "Quantum-Safe Encryption Gateways",
    category: "Infrastructure Security",
    description: "Protect critical data transport layers using post-quantum cryptography combined with distributed validation nodes.",
    longText: "Prepare your enterprise network defenses for the post-quantum era. Our gateways deploy crystals-kyber key agreements and crystals-dilithium digital signatures inside active HTTP/REST and gRPC channels. Integrated hardware security modules ensure lightning-fast handshakes with negligible overhead.",
    image: "/images/woman_phone.jpg",
    features: [
      "CRYSTALS-Kyber key exchange",
      "Post-quantum digital signatures",
      "gRPC & WebSocket compatibility",
      "Hardware-accelerated crypto handshakes"
    ],
    imageClass: "object-cover object-[center_30%]"
  }
];

const SolutionsPage: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-gray-50 font-sans transition-colors duration-300 antialiased">
      {/* Hero */}
      <div className="relative py-20 md:py-28 overflow-hidden flex items-center justify-center text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-[#1d1d1f] dark:text-white">
            Tailored Intelligent Systems
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#515154] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Deploying state-of-the-art AI agents, multi-modal ingestion pipelines, and post-quantum encryption matrices for enterprise scale.
          </p>
        </div>
      </div>

      {/* Solutions Grid - Apple Developer Container Styling */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20 space-y-16">
        {solutionsList.map((sol, index) => (
          <motion.div
            key={sol.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`bg-white dark:bg-black border border-[#e5e5e7] dark:border-white/10 rounded-[28px] sm:rounded-[36px] p-8 sm:p-10 lg:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col lg:flex-row gap-10 lg:gap-12 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Visual Media (Image) */}
            <div className="w-full lg:w-1/2 aspect-video lg:aspect-[4/3] rounded-[20px] sm:rounded-[24px] overflow-hidden border border-[#e5e5e7]/80 dark:border-white/10 relative bg-[#f5f5f7] dark:bg-white/5 shrink-0">
              <img
                src={sol.image}
                alt={sol.title}
                className={`w-full h-full transform hover:scale-105 transition-transform duration-500 ${
                  sol.imageClass || "object-cover object-center"
                }`}
              />
            </div>

            {/* Description Block */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white leading-tight">
                  {sol.title}
                </h2>
              </div>

              <p className="text-[#515154] dark:text-gray-300 text-base leading-relaxed font-normal">
                {sol.description}
              </p>
              <p className="text-[#515154]/90 dark:text-gray-400 text-sm sm:text-[15px] leading-relaxed font-normal">
                {sol.longText}
              </p>

              {/* Bullet features */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-[#e5e5e7]/80 dark:border-white/10">
                {sol.features.map((feat) => (
                  <li key={feat} className="flex items-start text-xs sm:text-sm font-medium text-[#1d1d1f] dark:text-gray-200">
                    <svg className="w-4 h-4 text-[#0066cc] dark:text-[#2997ff] mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Footer card */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-24">
        <div className="bg-white dark:bg-black border border-[#e5e5e7] dark:border-white/10 rounded-[28px] sm:rounded-[36px] p-10 sm:p-14 text-center space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
            Need a custom integration?
          </h3>
          <p className="text-[#515154] dark:text-gray-300 max-w-xl mx-auto text-base leading-relaxed font-normal">
            Our specialized engineering team builds tailor-made models and architectural integrations matching your data architecture parameters.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-block px-8 py-3.5 bg-[#0066cc] hover:bg-[#0052a3] text-white font-medium rounded-full transition-all shadow-xs text-sm"
            >
              Consult Our Engineers
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SolutionsPage;
