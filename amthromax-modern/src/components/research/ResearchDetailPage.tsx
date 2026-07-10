import React from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../footer/Footer";

interface ResearchPaperDetail {
  id: string;
  category: string;
  title: string;
  tagline: string;
  abstract: string;
  introduction: string;
  methodology: string;
  results: string;
  date: string;
  readTime: string;
  tags: string[];
}

const researchPapersDetails: Record<string, ResearchPaperDetail> = {
  "predictive-autoscaling": {
    id: "predictive-autoscaling",
    category: "Artificial Intelligence",
    title: "Predictive Autoscaling in Kubernetes via Deep LSTM Networks",
    tagline: "A proactive resource scaling model using recurrent neural networks to forecast request density.",
    abstract: "This paper introduces a proactive autoscaling mechanism that leverages Long Short-Term Memory (LSTM) neural networks to forecast API request volumes. By anticipating traffic spikes up to 15 minutes in advance, our architecture reduces latency spikes by 42% compared to reactive CPU/memory threshold scalers.",
    introduction: "Modern web microservices face dynamic load fluctuations. Reactive autoscalers, which scale based on current CPU/memory consumption, suffer from 'cold start' latency spikes because virtual machines and containers take minutes to initialize. We propose a forecasting system to resolve this.",
    methodology: "We proposed a Deep LSTM-based prediction model trained on aggregated gateway logs. The model takes a sliding window of historical request rates and forecasts traffic trends up to 15 minutes in advance, allowing Kubernetes to deploy replica sets ahead of time.",
    results: "In testing against historical production traffic logs, our proactive model reduced response time spikes during sudden scaling events by 42%. Over-provisioning overhead was simultaneously reduced by 18%, optimizing infrastructure cost.",
    date: "June 2026",
    readTime: "8 min read",
    tags: ["Machine Learning", "Kubernetes", "DevOps"]
  },
  "zero-trust-protocol": {
    id: "zero-trust-protocol",
    category: "Cybersecurity",
    title: "Zero-Trust Protocol and Edge Identity Authentication",
    tagline: "Securing enterprise edge endpoints through cryptographically signed lightweight tokens.",
    abstract: "An examination of cryptographically verified edge nodes for enterprise networks. We present a lightweight identity validation protocol that achieves zero-trust isolation without the high CPU overhead traditional in distributed ledger validations.",
    introduction: "Traditional perimeter security models are inadequate for distributed IoT and hybrid worker networks. Zero-Trust requires continuous validation of device identity at every step of network interaction without slowing down communications.",
    methodology: "We designed a lightweight cryptographic validation token optimized for low-resource edge gateways. Our protocol avoids the computational overhead of decentralized ledgers by utilizing centralized root-of-trust signature verification.",
    results: "Hands-on hardware benchmarks demonstrate token verification times of under 12ms on low-power devices, with zero-trust protection and container separation overhead keeping CPU utilization below 4%.",
    date: "April 2026",
    readTime: "12 min read",
    tags: ["Zero Trust", "Cryptography", "Edge Computing"]
  },
  "distributed-query-execution": {
    id: "distributed-query-execution",
    category: "Cloud Architecture",
    title: "Distributed Query Execution Across Hybrid Multi-Cloud Clusters",
    tagline: "A low-latency SQL routing middleware designed for federated databases.",
    abstract: "A novel routing database middleware designed to orchestrate complex JOIN queries across heterogeneous databases hosted dynamically on AWS, Google Cloud, and on-premises centers, achieving sub-100ms federated response times.",
    introduction: "Storing relational datasets across isolated cloud platforms (such as AWS and Google Cloud) introduces severe latency when joining records across clouds. Query optimization is crucial for distributed transactional execution.",
    methodology: "We implemented a smart SQL compilation and execution engine that sits between user connections and target databases. The engine performs query decomposition, pushing query operations down to local hosts to minimize cross-network data transfers.",
    results: "Federated SQL joins across three geographically separate clouds completed in under 100ms, representing a 5x improvement over standard replication-based methods.",
    date: "January 2026",
    readTime: "10 min read",
    tags: ["Multi-Cloud", "SQL Federation", "Big Data"]
  },
  "lattice-based-cryptography": {
    id: "lattice-based-cryptography",
    category: "Quantum Security",
    title: "Lattice-Based Cryptography in Modern Web API Layers",
    tagline: "Post-quantum defense configurations for high-throughput transactional REST APIs.",
    abstract: "A production case study detailing the deployment of post-quantum lattice cryptography to secure sensitive banking REST APIs. We evaluate handshake overheads and client-side computational footprints on mobile hardware.",
    introduction: "The rise of quantum computing poses a direct threat to widely-used key exchange protocols like RSA and ECDSA. High-security environments must transition to post-quantum alternatives as soon as possible.",
    methodology: "We benchmarked the integration of CRYSTALS-Kyber and CRYSTALS-Dilithium key exchanges within standard RESTful HTTP architectures using optimized micro-benchmarking suites.",
    results: "Client handshake overhead increased by 14%, but overall throughput remained consistent. Client-side memory footprints on modern mobile chips remained under 2.5MB, demonstrating readiness for production.",
    date: "November 2025",
    readTime: "15 min read",
    tags: ["Post-Quantum", "Web Security", "API Design"]
  }
};

const ResearchDetailPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const paper = paperId ? researchPapersDetails[paperId] : null;

  if (!paper) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-950 font-sans">
        <div className="py-24 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Research paper not found</h2>
          <Link to="/research" className="text-indigo-600 dark:text-indigo-400 underline mt-4 inline-block">
            Back to Research
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      {/* Hero Header */}
      <div className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-indigo-950/60 to-black z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-white/70 font-semibold bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            {paper.category} &bull; {paper.readTime}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            {paper.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {paper.tagline}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white pb-2 border-b border-gray-150 dark:border-white/[0.04]">
            Abstract
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed italic">
            {paper.abstract}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white pb-2 border-b border-gray-150 dark:border-white/[0.04]">
            Introduction
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            {paper.introduction}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white pb-2 border-b border-gray-150 dark:border-white/[0.04]">
            Methodology
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            {paper.methodology}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white pb-2 border-b border-gray-150 dark:border-white/[0.04]">
            Experimental Results & Impact
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            {paper.results}
          </p>
        </section>

        <div className="pt-8 border-t border-gray-150 dark:border-white/[0.04] flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2">
            {paper.tags.map((t) => (
              <span
                key={t}
                className="text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1 rounded-xl text-gray-700 dark:text-gray-300 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
          <Link
            to="/research"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            &larr; Back to Research
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResearchDetailPage;
export { researchPapersDetails };
export type { ResearchPaperDetail };
