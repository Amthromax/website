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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      {/* Hero */}
      <div className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-indigo-950/40 to-black z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            AMTHROMAX SOLUTIONS
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            Tailored Intelligent Systems
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Deploying state-of-the-art AI agents, multi-modal ingestion pipelines, and post-quantum encryption matrices for enterprise scale.
          </p>
        </div>
      </div>

      {/* Solutions Grid */}
      <div ref={ref} className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {solutionsList.map((sol, index) => (
          <motion.div
            key={sol.id}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex flex-col lg:flex-row gap-12 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Visual Media (Image) */}
            <div className="w-full lg:w-1/2 aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden border border-gray-150 dark:border-white/[0.04] shadow-lg relative bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
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
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                {sol.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                {sol.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                {sol.description}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                {sol.longText}
              </p>

              {/* Bullet features */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {sol.features.map((feat) => (
                  <li key={feat} className="flex items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <span className="text-emerald-500 mr-2 text-base">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Footer card */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-gray-50 dark:bg-[#161617] border border-gray-100 dark:border-white/[0.04] rounded-3xl p-12 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Need a custom integration?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Our specialized engineering team builds tailor-made models and architectural integrations matching your data architecture parameters.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-block px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold rounded-full hover:opacity-90 transition-all shadow-md text-sm"
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
