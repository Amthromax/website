import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Security" | "Developers" | "Enterprise";
}

const faqs: FAQItem[] = [
  {
    question: "What is Amthromax and what products do you offer?",
    answer: "Amthromax is an enterprise AI software company developing frontier neural architectures, autonomous AI agents, enterprise workflow automation engines, developer APIs, and dedicated platform platforms like Helleious.ai, OrarQlow.ai, and CodeHoomer.ai.",
    category: "General",
  },
  {
    question: "How does Amthromax guarantee zero-trust security and data privacy?",
    answer: "We implement military-grade AES-256 encryption at rest and TLS 1.3 in transit. Our zero-retention privacy engine ensures customer data, proprietary models, and fine-tuning datasets are never stored or used for foundational model training without explicit enterprise consent.",
    category: "Security",
  },
  {
    question: "How can developers integrate Amthromax AI APIs into existing codebases?",
    answer: "Developers can access our low-latency OpenAI-compatible REST APIs, GraphQL endpoints, and official SDKs (TypeScript/Node.js, Python, Rust, Go). Get started instantly with free API quota at amthromax.com/docs.",
    category: "Developers",
  },
  {
    question: "What deployment options are available for enterprise customers?",
    answer: "Amthromax offers multi-cloud SaaS, hybrid VPC deployments (AWS, Azure, GCP), and isolated air-gapped on-premises deployments for defense, healthcare, and financial services organizations.",
    category: "Enterprise",
  },
  {
    question: "What SLAs and uptime guarantees does Amthromax provide?",
    answer: "Our Enterprise plan includes 99.99% uptime SLAs, sub-50ms inference latency targets, 24/7 dedicated engineering support, and custom throughput reservation channels.",
    category: "Enterprise",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", "General", "Security", "Developers", "Enterprise"];

  const filteredFaqs = activeTab === "All" ? faqs : faqs.filter(f => f.category === activeTab);

  return (
    <section className="py-20 bg-[#050506] text-white border-t border-white/[0.08] select-none">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
            <span>Help Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Everything you need to know about Amthromax enterprise AI solutions, developer tools, and security standards.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === cat
                    ? "bg-white text-black shadow-md"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-white pr-4">
                    {faq.question}
                  </span>
                  <span className="shrink-0 size-7 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm transition-transform duration-200">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
