import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

// Define Types
export interface Paper {
  slug: string;
  category: string;
  type?: "Publication" | "Overview" | "Milestone" | "Release" | "Research";
  title: string;
  abstract: string;
  date: string;
  readTime: string;
  tags: string[];
  authors: string;
  heroGradient?: string;
}

export const publicationsDatabase: Paper[] = [
  {
    slug: "predictive-autoscaling",
    category: "Artificial Intelligence",
    type: "Publication",
    title: "Predictive Autoscaling in Kubernetes via Deep LSTM Networks",
    abstract: "This paper introduces a proactive autoscaling mechanism that leverages Long Short-Term Memory (LSTM) neural networks to forecast API request volumes. By anticipating traffic spikes up to 15 minutes in advance, our architecture reduces latency spikes by 42% compared to reactive CPU/memory threshold scalers.",
    date: "Aug 1, 2026",
    readTime: "8 min read",
    tags: ["Machine Learning", "Kubernetes", "DevOps"],
    authors: "Sarah Chen, Elena Rostova, Marcus Vance",
    heroGradient: "from-blue-600 via-indigo-600 to-sky-400"
  },
  {
    slug: "zero-trust-protocol",
    category: "Cybersecurity",
    type: "Research",
    title: "Zero-Trust Protocol and Edge Identity Authentication",
    abstract: "An examination of cryptographically verified edge nodes for enterprise networks. We present a lightweight identity validation protocol that achieves zero-trust isolation without the high CPU overhead traditional in distributed ledger validations.",
    date: "Jul 29, 2026",
    readTime: "12 min read",
    tags: ["Zero Trust", "Cryptography", "Edge Computing"],
    authors: "Marcus Vance, Sarah Chen",
    heroGradient: "from-emerald-600 via-teal-600 to-cyan-500"
  },
  {
    slug: "distributed-query-execution",
    category: "Cloud Architecture",
    type: "Milestone",
    title: "Distributed Query Execution Across Hybrid Multi-Cloud Clusters",
    abstract: "A novel routing database middleware designed to orchestrate complex JOIN queries across heterogeneous databases hosted dynamically on AWS, Google Cloud, and on-premises centers, achieving sub-100ms federated response times.",
    date: "Jul 15, 2026",
    readTime: "10 min read",
    tags: ["Multi-Cloud", "SQL Federation", "Big Data"],
    authors: "Elena Rostova, Marcus Vance",
    heroGradient: "from-purple-600 via-violet-600 to-indigo-500"
  },
  {
    slug: "lattice-based-cryptography",
    category: "Quantum Security",
    type: "Publication",
    title: "Lattice-Based Cryptography in Modern Web API Layers",
    abstract: "A production case study detailing the deployment of post-quantum lattice cryptography to secure sensitive banking REST APIs. We evaluate handshake overheads and client-side computational footprints on mobile hardware.",
    date: "Jun 28, 2026",
    readTime: "15 min read",
    tags: ["Post-Quantum", "Web Security", "API Design"],
    authors: "Marcus Vance, Sarah Chen, Elena Rostova",
    heroGradient: "from-sky-600 via-blue-700 to-indigo-900"
  },
  {
    slug: "transformer-networks-automation",
    category: "Artificial Intelligence",
    type: "Release",
    title: "Transformer-based Task Chains for Autonomous Agent Coordination",
    abstract: "This research examines how low-latency fine-tuned LLM networks can orchestrate multi-step business process automation pipelines using custom DAG execution graphs, reducing process errors by 30%.",
    date: "Jun 10, 2026",
    readTime: "14 min read",
    tags: ["LLMs", "Agent Coordination", "Automation"],
    authors: "Sarah Chen, Elena Rostova",
    heroGradient: "from-blue-500 via-cyan-600 to-teal-700"
  },
  {
    slug: "federated-edge-learning",
    category: "Artificial Intelligence",
    type: "Overview",
    title: "Federated Learning on Heterogeneous Edge Nodes with Adaptive Compression",
    abstract: "We present a decentralized training framework for heterogeneous edge nodes featuring network-adaptive model weight compression, reducing public-egress payload sizes by 64% while maintaining model parity.",
    date: "May 22, 2026",
    readTime: "11 min read",
    tags: ["Federated Learning", "Edge Compute", "Model Compression"],
    authors: "Sarah Chen, Marcus Vance",
    heroGradient: "from-violet-600 via-purple-700 to-pink-600"
  },
  {
    slug: "l7-ebpf-microsegmentation",
    category: "Cybersecurity",
    type: "Publication",
    title: "Zero-Trust Microsegmentation at Layer 7 using eBPF Filters",
    abstract: "An investigation into implementing zero-trust pod network microsegmentation using eBPF kernel hooks at the Layer 7 layer, completely bypassing iptables overhead.",
    date: "Apr 14, 2026",
    readTime: "13 min read",
    tags: ["eBPF", "Kubernetes Security", "Zero Trust"],
    authors: "Marcus Vance, Elena Rostova",
    heroGradient: "from-slate-700 via-zinc-800 to-neutral-900"
  }
];

const PublicationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCitationPaper, setSelectedCitationPaper] = useState<Paper | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [subscribeForm, setSubscribeForm] = useState({ firstName: "", lastName: "", email: "" });
  const [subscribeSubmitted, setSubscribeSubmitted] = useState(false);

  const [activeTypeFilter, setActiveTypeFilter] = useState("All");
  const typeFilters = ["All", "Overview", "Publication", "Research", "Release"];

  const categories = ["All", "Artificial Intelligence", "Cybersecurity", "Cloud Architecture", "Quantum Security"];

  const heroSlides = publicationsDatabase.slice(0, 4);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const filteredPapers = publicationsDatabase
    .filter((paper) => {
      const matchesSearch = 
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = activeCategory === "All" || paper.category === activeCategory;
      const matchesType = activeTypeFilter === "All" || paper.type === activeTypeFilter;

      return matchesSearch && matchesCategory && matchesType;
    });

  const getBibtex = (paper: Paper) => {
    return `@article{amthromax_${paper.slug.replace(/-/g, "_")},
  author = {${paper.authors}},
  title = {${paper.title}},
  journal = {Amthromax Journal of Advanced Technology Research},
  year = {${paper.date.split(" ").pop()}},
  month = {${paper.date.split(" ")[0].toLowerCase()}},
  url = {https://amthromax.com/research/${paper.slug}}
}`;
  };

  const activeHeroPaper = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300 antialiased">
      <SEO 
        title="Amthromax Core | Research & Technical Publications" 
        description="Amthromax data, research, and stories on real-world AI use. Search our indexed repository of peer-reviewed articles and whitepapers." 
      />

      {/* SECTION 1: Core Style Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-[1550px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 border-b border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.05]"
            >
              Amthromax <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">Core</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl font-normal leading-relaxed max-w-lg"
            >
              Foundational AI research, core architecture benchmarks, and technical intelligence for next-generation enterprise systems.
            </motion.p>
          </div>

          {/* Right Hero Card Slider Column */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end w-full">
            <div className="relative w-full max-w-2xl lg:max-w-3xl min-h-[380px] sm:min-h-[460px] flex flex-col">
              
              {/* Stacked Backing Cards for 3D Depth */}
              <div className="absolute inset-0 bg-blue-900/30 rounded-[36px] translate-x-5 -translate-y-5 scale-[0.92] border border-white/10 blur-[1px]" />
              <div className="absolute inset-0 bg-indigo-900/40 rounded-[36px] translate-x-2.5 -translate-y-2.5 scale-[0.96] border border-white/10" />

              {/* Active Hero Slide Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`relative w-full min-h-[380px] sm:min-h-[460px] rounded-[36px] p-8 sm:p-12 md:p-16 bg-gradient-to-br ${activeHeroPaper.heroGradient || "from-blue-600 to-indigo-800"} flex flex-col justify-between shadow-2xl border border-white/20 overflow-hidden group`}
                >
                  {/* Subtle Shimmer Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_65%)] pointer-events-none" />
                  
                  <div className="space-y-3 relative z-10">
                    <span className="text-xs font-bold text-white uppercase tracking-widest inline-block">
                      {activeHeroPaper.category}
                    </span>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.2] tracking-tight">
                      <Link to={`/research/${activeHeroPaper.slug}`} className="hover:underline">
                        {activeHeroPaper.title}
                      </Link>
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Arrow Controls */}
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-900 dark:text-white transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-900 dark:text-white transition-all cursor-pointer"
                aria-label="Next slide"
              >
                ›
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: Technical Publications Header & Filters */}
      <section className="max-w-[1550px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 pt-20 pb-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Technical Publications
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
            Search our indexed repository of peer-reviewed articles, system architecture documents, and security whitepapers.
          </p>
        </div>

        {/* Search Input & Category Filters */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between max-w-[1550px] mx-auto">
          {/* Search Box */}
          <div className="w-full md:max-w-md relative">
            <input
              type="text"
              placeholder="Search papers, abstracts, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2.5 bg-transparent border-b border-gray-300 dark:border-white/15 rounded-none text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-900 dark:focus:border-white/40 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-0 top-3 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                    : "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Minimalist Research List */}
      <section className="max-w-[1550px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 pb-32 pt-16">
        <div className="space-y-8">
          
          {/* Main Title Header */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            Research
          </h2>

          {/* Filter Type Tabs Row */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 pb-4">
            {typeFilters.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveTypeFilter(type)}
                className={`text-sm font-semibold transition-all cursor-pointer ${
                  activeTypeFilter === type
                    ? "text-gray-900 dark:text-white font-bold underline underline-offset-8 decoration-2"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Publication List Items */}
          {filteredPapers.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-white/10 border-t border-gray-200 dark:border-white/10">
              {filteredPapers.map((paper) => (
                <div 
                  key={paper.slug}
                  className="py-10 group flex flex-col md:flex-row md:items-start justify-between gap-8 sm:gap-16 transition-all"
                >
                  {/* Left Column: Type & Date */}
                  <div className="w-40 sm:w-52 shrink-0 space-y-2">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">
                      {paper.type || "Publication"}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                      {paper.date}
                    </p>
                  </div>

                  {/* Right Column: Title & Abstract */}
                  <div className="space-y-3 flex-1 max-w-4xl">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      <Link to={`/research/${paper.slug}`}>
                        {paper.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                      {paper.abstract}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No research publications matched your selection</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Try selecting "All" to view all publications.</p>
            </div>
          )}

        </div>
      </section>

      {/* SECTION 4: Stay Updated Section */}
      <section className="border-t border-gray-200 dark:border-white/10 py-24 max-w-[1550px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Form Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                Stay updated
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-normal leading-relaxed max-w-lg">
                Subscribe to receive the latest peer-reviewed research papers, system architecture blueprints, and AI safety insights from Amthromax R&D Labs.
              </p>
            </div>

            {subscribeSubmitted ? (
              <div className="p-6 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-2xl space-y-2">
                <h4 className="text-base font-bold text-gray-900 dark:text-white">Thank you for subscribing!</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">You will receive future Amthromax technical publications and dataset releases directly in your inbox.</p>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (subscribeForm.email) setSubscribeSubmitted(true);
                }} 
                className="space-y-4 max-w-lg"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    First name <span className="text-gray-400 dark:text-gray-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subscribeForm.firstName}
                    onChange={(e) => setSubscribeForm({ ...subscribeForm, firstName: e.target.value })}
                    className="w-full py-2 bg-transparent border-b border-gray-300 dark:border-white/20 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-900 dark:focus:border-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Last name <span className="text-gray-400 dark:text-gray-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subscribeForm.lastName}
                    onChange={(e) => setSubscribeForm({ ...subscribeForm, lastName: e.target.value })}
                    className="w-full py-2 bg-transparent border-b border-gray-300 dark:border-white/20 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-900 dark:focus:border-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Email <span className="text-gray-400 dark:text-gray-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={subscribeForm.email}
                    onChange={(e) => setSubscribeForm({ ...subscribeForm, email: e.target.value })}
                    className="w-full py-2 bg-transparent border-b border-gray-300 dark:border-white/20 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-900 dark:focus:border-white transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black text-xs font-bold rounded-full transition-all cursor-pointer shadow-lg"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Visual Video Side */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative aspect-square w-full max-w-md lg:max-w-lg rounded-[32px] overflow-hidden bg-black/5 dark:bg-white/5 shadow-2xl border border-gray-200 dark:border-white/10 group">
              <video
                src="/video/c8294fa6ad33fbabdb1d5d9ed86f3749_720w.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* BibTeX Citation Modal */}
      <AnimatePresence>
        {selectedCitationPaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#121214] w-full max-w-xl rounded-[28px] p-8 border border-gray-200 dark:border-white/15 shadow-2xl space-y-5 text-gray-900 dark:text-white relative"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">BibTeX Citation</h3>
                <button
                  onClick={() => setSelectedCitationPaper(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">Copy the BibTeX block below to cite in your research papers:</p>
              
              <pre className="p-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 rounded-2xl text-[10px] sm:text-xs overflow-x-auto text-gray-800 dark:text-gray-300 font-mono">
                {getBibtex(selectedCitationPaper)}
              </pre>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(getBibtex(selectedCitationPaper));
                    alert("Citation copied to clipboard!");
                  }}
                  className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Copy to Clipboard
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCitationPaper(null)}
                  className="px-6 py-2.5 border border-gray-300 dark:border-white/20 text-xs font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default PublicationsPage;
