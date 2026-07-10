import React from "react";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";
import { Link } from "react-router-dom";

const ProductsPage: React.FC = () => {
  const products = [
    {
      id: "custom-software",
      title: "Custom Software Suite",
      desc: "Tailored enterprise solutions built with low-latency frameworks, optimized caching, and automated sync layers. Designed for companies demanding zero operational lag.",
      icon: "💻",
      link: "/services/custom-software"
    },
    {
      id: "cloud-solutions",
      title: "Cloud Infrastructure Pipelines",
      desc: "High-throughput cloud pipelines running on auto-scaling clusters, complete with cryptographic edge routing and SOC2-compliant databases.",
      icon: "☁️",
      link: "/services/cloud-solutions"
    },
    {
      id: "artificial-intelligence",
      title: "Atlas AI Agent Networks",
      desc: "Deploy specialized agentic swarms that automatically plan, execute, retrieve semantic data, and automate entire back-office processes.",
      icon: "🧠",
      link: "/services/artificial-intelligence"
    },
    {
      id: "cybersecurity",
      title: "Zero-Trust Cybersecurity Shield",
      desc: "Establish threat detection layers, post-quantum cryptography, and sandboxed runtimes to isolate and defend critical API endpoints.",
      icon: "🛡️",
      link: "/services/cybersecurity"
    },
    {
      id: "data-analytics",
      title: "Cognitive Knowledge Mining",
      desc: "Convert high-volume unstructured files into searchable, auditable semantic databases with real-time analytics indicators.",
      icon: "📊",
      link: "/services/data-analytics"
    },
    {
      id: "mobile-apps",
      title: "Scalable Mobile Integrations",
      desc: "Deploy cross-platform applications featuring local offline sync, push notifications, and remote model invocation channels.",
      icon: "📱",
      link: "/services/mobile-apps"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO 
        title="Amthromax Products | Enterprise AI & Software Systems" 
        description="Browse the suite of Amthromax products: custom software engineering, cloud pipelines, Atlas AI agents, cybersecurity tools, and analytics." 
      />

      {/* Hero Header */}
      <div className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-zinc-950/40 to-black z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            PRODUCT PORTFOLIO
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            Intelligent Products & APIs
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Scalable automation frameworks, zero-trust cloud pipelines, and cognitive models designed to run at industrial scale.
          </p>
        </div>
      </div>

      {/* Product List Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <div 
              key={prod.id} 
              className="group flex flex-col justify-between p-8 bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] rounded-3xl hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-4">
                <span className="text-3xl inline-block p-3.5 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-white/[0.02]">
                  {prod.icon}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {prod.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                  {prod.desc}
                </p>
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800/80">
                <Link 
                  to={prod.link} 
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Explore Capabilities</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
