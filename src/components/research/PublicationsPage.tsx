import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

// Define Types
interface Paper {
  slug: string;
  category: string;
  title: string;
  abstract: string;
  date: string;
  readTime: string;
  tags: string[];
  authors: string;
}

const publicationsDatabase: Paper[] = [
  {
    slug: "predictive-autoscaling",
    category: "Artificial Intelligence",
    title: "Predictive Autoscaling in Kubernetes via Deep LSTM Networks",
    abstract: "This paper introduces a proactive autoscaling mechanism that leverages Long Short-Term Memory (LSTM) neural networks to forecast API request volumes. By anticipating traffic spikes up to 15 minutes in advance, our architecture reduces latency spikes by 42% compared to reactive CPU/memory threshold scalers.",
    date: "June 2026",
    readTime: "8 min read",
    tags: ["Machine Learning", "Kubernetes", "DevOps"],
    authors: "Sarah Chen, Elena Rostova, Marcus Vance"
  },
  {
    slug: "zero-trust-protocol",
    category: "Cybersecurity",
    title: "Zero-Trust Protocol and Edge Identity Authentication",
    abstract: "An examination of cryptographically verified edge nodes for enterprise networks. We present a lightweight identity validation protocol that achieves zero-trust isolation without the high CPU overhead traditional in distributed ledger validations.",
    date: "April 2026",
    readTime: "12 min read",
    tags: ["Zero Trust", "Cryptography", "Edge Computing"],
    authors: "Marcus Vance, Sarah Chen"
  },
  {
    slug: "distributed-query-execution",
    category: "Cloud Architecture",
    title: "Distributed Query Execution Across Hybrid Multi-Cloud Clusters",
    abstract: "A novel routing database middleware designed to orchestrate complex JOIN queries across heterogeneous databases hosted dynamically on AWS, Google Cloud, and on-premises centers, achieving sub-100ms federated response times.",
    date: "January 2026",
    readTime: "10 min read",
    tags: ["Multi-Cloud", "SQL Federation", "Big Data"],
    authors: "Elena Rostova, Marcus Vance"
  },
  {
    slug: "lattice-based-cryptography",
    category: "Quantum Security",
    title: "Lattice-Based Cryptography in Modern Web API Layers",
    abstract: "A production case study detailing the deployment of post-quantum lattice cryptography to secure sensitive banking REST APIs. We evaluate handshake overheads and client-side computational footprints on mobile hardware.",
    date: "November 2025",
    readTime: "15 min read",
    tags: ["Post-Quantum", "Web Security", "API Design"],
    authors: "Marcus Vance, Sarah Chen, Elena Rostova"
  },
  {
    slug: "transformer-networks-automation",
    category: "Artificial Intelligence",
    title: "Transformer-based Task Chains for Autonomous Agent Coordination",
    abstract: "This research examines how low-latency fine-tuned LLM networks can orchestrate multi-step business process automation pipelines using custom DAG execution graphs, reducing process errors by 30%.",
    date: "August 2025",
    readTime: "14 min read",
    tags: ["LLMs", "Agent Coordination", "Automation"],
    authors: "Sarah Chen, Elena Rostova"
  },
  {
    slug: "federated-edge-learning",
    category: "Artificial Intelligence",
    title: "Federated Learning on Heterogeneous Edge Nodes with Adaptive Compression",
    abstract: "We present a decentralized training framework for heterogeneous edge nodes featuring network-adaptive model weight compression, reducing public-egress payload sizes by 64% while maintaining model parity.",
    date: "May 2026",
    readTime: "11 min read",
    tags: ["Federated Learning", "Edge Compute", "Model Compression"],
    authors: "Sarah Chen, Marcus Vance"
  },
  {
    slug: "l7-ebpf-microsegmentation",
    category: "Cybersecurity",
    title: "Zero-Trust Microsegmentation at Layer 7 using eBPF Filters",
    abstract: "An investigation into implementing zero-trust pod network microsegmentation using eBPF kernel hooks at the Layer 7 layer, completely bypassing iptables overhead.",
    date: "March 2026",
    readTime: "13 min read",
    tags: ["eBPF", "Kubernetes Security", "Zero Trust"],
    authors: "Marcus Vance, Elena Rostova"
  },
  {
    slug: "state-sync-crdt",
    category: "Cloud Architecture",
    title: "State Synchronization in Geographically Distributed Event Sourcing Architectures",
    abstract: "An-evaluation of conflict-free replicated data types (CRDTs) to sync event-sourced audit channels across multiple cloud regions under high packet loss conditions.",
    date: "February 2026",
    readTime: "9 min read",
    tags: ["CRDTs", "Event Sourcing", "Multi-Region"],
    authors: "Elena Rostova, Sarah Chen"
  },
  {
    slug: "pq-signature-consensus",
    category: "Quantum Security",
    title: "Post-Quantum Signature Verification for Distributed Ledger Consensus",
    abstract: "Deploying Dilithium signature schemes in high-speed consensus configurations, discussing optimization techniques for proof sizing and low-latency signature unpacking.",
    date: "October 2025",
    readTime: "16 min read",
    tags: ["Quantum Proofs", "Consensus Protocols", "Web3 Security"],
    authors: "Marcus Vance, Sarah Chen"
  }
];

const PublicationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCitationPaper, setSelectedCitationPaper] = useState<Paper | null>(null);

  const categories = ["All", "Artificial Intelligence", "Cybersecurity", "Cloud Architecture", "Quantum Security"];

  const filteredPapers = publicationsDatabase.filter((paper) => {
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === "All" || paper.category === activeCategory;

    return matchesSearch && matchesCategory;
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO 
        title="Technical Publications | Amthromax Research" 
        description="Search and download scientific publications, research studies, and whitepapers on systems engineering, AI, and cybersecurity." 
      />

      {/* Header */}
      <div className="relative py-20 md:py-28 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-purple-950/50 to-zinc-950 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <span className="text-xs uppercase tracking-widest text-violet-400 font-bold bg-violet-950/40 border border-violet-800/30 px-3.5 py-1.5 rounded-full">
            Scientific Database
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Technical Publications
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Search our indexed repository of peer-reviewed articles, system architecture documents, and security whitepapers.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:max-w-md relative">
          <input
            type="text"
            placeholder="Search papers, abstracts, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3 text-[10px] text-gray-400 hover:text-black dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all border ${
                activeCategory === cat
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-sm"
                  : "bg-gray-55 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        {filteredPapers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPapers.map((paper) => (
              <div
                key={paper.slug}
                className="bg-white dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden min-h-[320px]"
              >
                <div className="absolute top-6 right-8 text-xs font-semibold text-gray-400 dark:text-gray-500">
                  {paper.readTime}
                </div>

                <div>
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3">
                    {paper.category}
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white mb-3">
                    {paper.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                    {paper.abstract}
                  </p>
                </div>

                <div>
                  {/* Authors & date */}
                  <div className="pt-5 border-t border-gray-100 dark:border-white/[0.04]">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Authors</p>
                    <p className="text-xs text-gray-650 dark:text-gray-300 font-semibold">{paper.authors}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Published in {paper.date}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={() => setSelectedCitationPaper(paper)}
                      className="text-xs font-bold text-gray-550 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      Cite Paper (BibTeX)
                    </button>
                    
                    <Link
                      to={`/research/${paper.slug}`}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
                    >
                      <span>Read Publication</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-2">
            <h3 className="text-lg font-bold text-gray-905 dark:text-white">No publications matched your filters</h3>
            <p className="text-sm text-gray-400">Try adjusting your search criteria or changing the category filter.</p>
          </div>
        )}
      </div>

      {/* BibTeX Citation Modal */}
      <AnimatePresence>
        {selectedCitationPaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#161617] w-full max-w-xl rounded-3xl p-8 border border-gray-150 dark:border-white/[0.06] shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">BibTeX Citation</h3>
                <button
                  onClick={() => setSelectedCitationPaper(null)}
                  className="text-gray-450 hover:text-black dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-500">Copy the citation block below to cite in your research documents:</p>
              
              <pre className="p-4 bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl text-[10px] md:text-xs overflow-x-auto text-gray-700 dark:text-gray-300 font-mono">
                {getBibtex(selectedCitationPaper)}
              </pre>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getBibtex(selectedCitationPaper));
                    alert("Citation copied to clipboard!");
                  }}
                  className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-full hover:opacity-90 transition-all"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={() => setSelectedCitationPaper(null)}
                  className="px-5 py-2.5 border border-gray-200 dark:border-gray-800 text-xs font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800"
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
export { publicationsDatabase };
