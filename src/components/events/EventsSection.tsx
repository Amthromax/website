import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ProductBullet {
  title: string;
  desc: string;
}

interface ProductIdeaItem {
  id: string;
  badge: string;
  title: string;
  specs: string;
  location: string;
  type: string;
  link: string;
  category: string;
  modalTitle: string;
  description: string;
  bullets: ProductBullet[];
  icon: string;
}

const productIdeasData: ProductIdeaItem[] = [
  {
    id: "idea-1",
    badge: "Product 01",
    title: "OrarQlow.Ai Swarm Orchestration Engine",
    specs: "v1.4 Core Architecture · Latency <15ms",
    location: "Amthromax Core Lab, San Francisco, CA",
    type: "Autonomous Agent System",
    link: "/products",
    category: "Autonomous Swarm Systems",
    modalTitle: "Orchestrating multi-agent intelligence at hyper-scale",
    description: "OrarQlow.Ai orchestrates autonomous agent swarms across distributed cloud infrastructure with sub-15ms execution latency and zero-trust memory state synchronization.",
    bullets: [
      { title: "Prevent", desc: "We are careful what memory states are shared across agent instances. We isolate and encrypt tenant memory contexts using zero-trust hardware enclaves." },
      { title: "Protect", desc: "We always stay vigilant and observant. We monitor execution pipelines for dynamic agent divergence and automatically terminate unauthorized sub-tasks." },
      { title: "Scale", desc: "Autonomous auto-scaling automatically provisions and balances up to 10,000 parallel execution threads without cold-start delays." }
    ],
    icon: "users"
  },
  {
    id: "idea-2",
    badge: "Product 02",
    title: "CodeHoomer.Ai High-Throughput Analytics",
    specs: "PostgreSQL & VectorDB Native · 100M+ Inferences",
    location: "Amthromax Data Systems, New York, NY",
    type: "Neural Data Grid",
    link: "/products",
    category: "Neural Data Analytics",
    modalTitle: "High-throughput neural data processing & vector telemetry",
    description: "Built natively on PostgreSQL & VectorDB clusters, CodeHoomer.Ai handles over 100M+ real-time inferences daily with sub-5ms semantic retrieval.",
    bullets: [
      { title: "Analyze", desc: "Stream telemetry logs, neural model embeddings, and runtime execution metrics in real-time." },
      { title: "Optimize", desc: "Automated vector index compaction reduces storage footprint by 60% while boosting query throughput." },
      { title: "Secure", desc: "Strict row-level security (RLS) and encrypted vector stores ensure complete customer data isolation." }
    ],
    icon: "chart"
  },
  {
    id: "idea-3",
    badge: "Product 03",
    title: "Helleious.Ai Zero-Code Workflow Triggers",
    specs: "Serverless Kubernetes · SOC2 Certified",
    location: "Amthromax Cloud, Austin, TX",
    type: "Event-Driven Automation",
    link: "/products",
    category: "Event-Driven Automation",
    modalTitle: "Event-driven workflow triggers with zero-code complexity",
    description: "Helleious.Ai allows engineering teams to deploy resilient event-driven AI workflows on serverless Kubernetes clusters backed by SOC2 Type II security.",
    bullets: [
      { title: "Trigger", desc: "Instantaneous execution on WebHooks, Kafka streams, and REST API events with guaranteed delivery." },
      { title: "Automate", desc: "Visual node graph editor with strict TypeScript payload validation and automated retry handlers." },
      { title: "Audit", desc: "Immutable cryptographic audit trails capture every state change, input payload, and output response." }
    ],
    icon: "zap"
  },
  {
    id: "idea-4",
    badge: "Product 04",
    title: "Roqlow 0.4 Instant Lattice Encryption",
    specs: "NIST Quantum Standard · Hardware Isolation",
    location: "Amthromax Cyber Lab, San Francisco, CA",
    type: "Post-Quantum Security",
    link: "/products",
    category: "Post-Quantum Security",
    modalTitle: "Next-generation CRYSTALS-Kyber post-quantum security",
    description: "Roqlow 0.4 integrates NIST-standard lattice encryption protocols to protect high-volume enterprise telemetry against future quantum computing decryption.",
    bullets: [
      { title: "Encrypt", desc: "Instant post-quantum key exchanges safeguard confidential enterprise payload streams in real time." },
      { title: "Isolate", desc: "Zero-trust Hardware Security Modules (HSM) store private cryptographic keys in air-gapped enclaves." },
      { title: "Verify", desc: "Continuous packet verification validates payload integrity before agent execution occurs." }
    ],
    icon: "shield"
  },
  {
    id: "idea-5",
    badge: "Product 05",
    title: "Amthromax SDKs & Edge API Gateway",
    specs: "REST & WebSockets · OpenAPI 3.1",
    location: "Amthromax Developer Hub, Seattle, WA",
    type: "Developer Infrastructure",
    link: "/developers",
    category: "Developer Infrastructure",
    modalTitle: "High-speed edge routing & developer SDK ecosystem",
    description: "Amthromax Edge Gateway delivers global REST and WebSocket routing backed by official TypeScript, Python, and Go SDK client packages.",
    bullets: [
      { title: "Connect", desc: "Global edge points of presence route inference calls to nearest GPU clusters in under 10ms." },
      { title: "Develop", desc: "Typed SDK libraries feature automatic exponential backoff, WebSocket streaming, and connection pooling." },
      { title: "Govern", desc: "Fine-grained API key permission scopes, billing quotas, and rate limiting protect production systems." }
    ],
    icon: "code"
  },
  {
    id: "idea-6",
    badge: "Product 06",
    title: "Vector Context Mesh & Dynamic RAG",
    specs: "Sub-5ms Semantic Search · HNSW Indexing",
    location: "Amthromax AI Core, Palo Alto, CA",
    type: "Cognitive Vector Engine",
    link: "/products",
    category: "Cognitive Vector Engine",
    modalTitle: "Sub-5ms semantic vector retrieval & dynamic RAG mesh",
    description: "High-dimensional vector mesh architecture providing instant dynamic context retrieval and knowledge injection for enterprise LLMs.",
    bullets: [
      { title: "Retrieve", desc: "HNSW vector indexing provides 99.8% recall accuracy across multi-gigabyte document collections." },
      { title: "Inject", desc: "Context window optimization compresses raw documents into dense neural representations." },
      { title: "Sync", desc: "Real-time vector synchronization updates knowledge repositories without costly model fine-tuning." }
    ],
    icon: "mesh"
  }
];

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "users":
      return (
        <svg className="w-8 h-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case "chart":
      return (
        <svg className="w-8 h-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case "zap":
      return (
        <svg className="w-8 h-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "shield":
      return (
        <svg className="w-8 h-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "code":
      return (
        <svg className="w-8 h-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "mesh":
    default:
      return (
        <svg className="w-8 h-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
  }
};

const EventsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIdea, setSelectedIdea] = useState<ProductIdeaItem | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-[#f5f5f7] dark:bg-[#000000] transition-colors duration-300 antialiased overflow-hidden relative">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        {/* Section Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
            Explore Amthromax Product Ideas
          </h2>
        </div>

        {/* Scrollable Product Ideas Carousel in Original Apple Box Styling */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scrollbar-none pb-4 pt-2 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-12 lg:px-12 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {productIdeasData.map((idea) => (
            <motion.div
              key={idea.id}
              onClick={() => setSelectedIdea(idea)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="w-[270px] sm:w-[300px] shrink-0 bg-white dark:bg-[#161617] rounded-[24px] border border-[#e5e5e7]/80 dark:border-white/[0.08] p-6 flex flex-col justify-between min-h-[250px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition-all duration-300 cursor-pointer group"
            >
              {/* Badge & Title Block */}
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#e8e8ed] dark:bg-white/10 text-[11px] font-semibold text-[#1d1d1f] dark:text-gray-200 group-hover:bg-[#1d1d1f] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                  {idea.badge}
                </span>

                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-snug group-hover:text-black dark:group-hover:text-gray-200">
                  {idea.title}
                </h3>
              </div>

              {/* Product Metadata Footer */}
              <div className="space-y-3 pt-6 border-t border-[#e5e5e7]/60 dark:border-white/10">
                <p className="text-xs text-[#86868b] dark:text-gray-400 font-medium">
                  {idea.specs}
                </p>

                <div className="space-y-0.5 text-xs text-[#515154] dark:text-gray-300 font-medium">
                  <p>{idea.location}</p>
                  <p className="text-[#86868b] dark:text-gray-400">{idea.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Trailing spacer so the last card displays completely without clipping */}
          <div className="w-6 sm:w-10 lg:w-12 shrink-0" aria-hidden="true" />
        </div>

        {/* Carousel Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-2">
          {/* Left Action Button */}
          <Link
            to="/products"
            className="px-6 py-2.5 bg-[#1d1d1f] hover:bg-[#333336] dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white rounded-full text-xs font-semibold transition-all duration-200 shadow-xs inline-block"
          >
            View all product ideas
          </Link>

          {/* Right Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll product ideas left"
              className="w-9 h-9 rounded-full bg-[#e8e8ed]/80 hover:bg-[#e8e8ed] dark:bg-white/10 dark:hover:bg-white/20 text-[#1d1d1f] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll product ideas right"
              className="w-9 h-9 rounded-full bg-[#e8e8ed]/80 hover:bg-[#e8e8ed] dark:bg-white/10 dark:hover:bg-white/20 text-[#1d1d1f] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Dark Detail Modal matching Image 1 */}
      <AnimatePresence>
        {selectedIdea && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6 sm:p-10 text-white overflow-y-auto"
            onClick={() => setSelectedIdea(null)}
          >
            {/* Top Right Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdea(null);
              }}
              className="fixed top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer z-50"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full my-auto py-8 space-y-6 text-left relative"
            >
              {/* Category Icon */}
              <div className="mb-2">
                {renderIcon(selectedIdea.icon)}
              </div>

              {/* Subtitle / Category Label */}
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest block">
                {selectedIdea.category}
              </span>

              {/* Headline / Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug">
                {selectedIdea.modalTitle}
              </h2>

              {/* Main Description */}
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                {selectedIdea.description}
              </p>

              {/* Bulleted Highlights */}
              <ul className="space-y-4 pt-2 text-sm sm:text-base text-white/90">
                {selectedIdea.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-white/60 text-lg leading-none mt-0.5">•</span>
                    <div className="leading-relaxed">
                      <span className="font-bold italic text-white mr-1.5">{bullet.title}:</span>
                      <span className="text-white/80">{bullet.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventsSection;
