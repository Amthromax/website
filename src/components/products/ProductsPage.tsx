import React from "react";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";
import { Link } from "react-router-dom";

// Premium Custom SVG Logos
const SoftwareIcon: React.FC = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="softwareGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="13" rx="2.5" stroke="url(#softwareGrad)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M2 17H22" stroke="url(#softwareGrad)" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 21H17" stroke="url(#softwareGrad)" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 8L11 10L9 12" stroke="url(#softwareGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 12H16" stroke="url(#softwareGrad)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloudIcon: React.FC = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cloudGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#7e22ce" />
      </linearGradient>
    </defs>
    <path d="M18 10C18 6.68629 15.3137 4 12 4C9.36443 4 7.1264 5.70014 6.31154 8.04907C3.8967 8.35824 2 10.4578 2 13C2 15.7614 4.23858 18 7 18H17C19.7614 18 22 15.7614 22 13C22 10.4578 20.1033 8.35824 17.6885 8.04907C17.8924 8.66597 18 9.31754 18 10Z" stroke="url(#cloudGrad)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 9V15M12 15L9 12M12 15L15 12" stroke="url(#cloudGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AIIcon: React.FC = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aiGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="3" stroke="url(#aiGrad)" strokeWidth="2" />
    <circle cx="5" cy="12" r="1.5" fill="#ec4899" />
    <circle cx="19" cy="12" r="1.5" fill="#ec4899" />
    <circle cx="12" cy="5" r="1.5" fill="#ec4899" />
    <circle cx="12" cy="19" r="1.5" fill="#ec4899" />
    <path d="M8 12H9M15 12H16M12 8V9M12 15V16" stroke="url(#aiGrad)" strokeWidth="1.5" />
    <path d="M7.5 7.5L9.5 9.5M14.5 14.5L16.5 16.5M16.5 7.5L14.5 9.5M9.5 14.5L7.5 16.5" stroke="url(#aiGrad)" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
  </svg>
);

const SecurityIcon: React.FC = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="securityGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
    </defs>
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="url(#securityGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 11L11 13L15 9" stroke="url(#securityGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DataIcon: React.FC = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dataGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <path d="M21 7V17C21 19.2091 16.9706 21 12 21C7.02944 21 3 19.2091 3 17V7" stroke="url(#dataGrad)" strokeWidth="2" />
    <path d="M21 7C21 9.20914 16.9706 11 12 11C7.02944 11 3 9.20914 3 7C3 4.79086 7.02944 3 12 3C16.9706 3 21 4.79086 21 7Z" stroke="url(#dataGrad)" strokeWidth="2" />
    <path d="M21 12C21 14.2091 16.9706 16 12 16C7.02944 16 3 14.2091 3 12" stroke="url(#dataGrad)" strokeWidth="2" />
  </svg>
);

const MobileIcon: React.FC = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mobileGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="url(#mobileGrad)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 18H12.01" stroke="url(#mobileGrad)" strokeWidth="3" strokeLinecap="round" />
    <path d="M10 5H14" stroke="url(#mobileGrad)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ProductsPage: React.FC = () => {
  const products = [
    {
      id: "custom-software",
      title: "Custom Software Suite",
      desc: "Tailored enterprise solutions built with low-latency frameworks, optimized caching, and automated sync layers. Designed for companies demanding zero operational lag.",
      icon: <SoftwareIcon />,
      link: "/services/custom-software"
    },
    {
      id: "cloud-solutions",
      title: "Cloud Infrastructure Pipelines",
      desc: "High-throughput cloud pipelines running on auto-scaling clusters, complete with cryptographic edge routing and SOC2-compliant databases.",
      icon: <CloudIcon />,
      link: "/services/cloud-solutions"
    },
    {
      id: "artificial-intelligence",
      title: "Atlas AI Agent Networks",
      desc: "Deploy specialized agentic swarms that automatically plan, execute, retrieve semantic data, and automate entire back-office processes.",
      icon: <AIIcon />,
      link: "/services/artificial-intelligence"
    },
    {
      id: "cybersecurity",
      title: "Zero-Trust Cybersecurity Shield",
      desc: "Establish threat detection layers, post-quantum cryptography, and sandboxed runtimes to isolate and defend critical API endpoints.",
      icon: <SecurityIcon />,
      link: "/services/cybersecurity"
    },
    {
      id: "data-analytics",
      title: "Cognitive Knowledge Mining",
      desc: "Convert high-volume unstructured files into searchable, auditable semantic databases with real-time analytics indicators.",
      icon: <DataIcon />,
      link: "/services/data-analytics"
    },
    {
      id: "mobile-apps",
      title: "Scalable Mobile Integrations",
      desc: "Deploy cross-platform applications featuring local offline sync, push notifications, and remote model invocation channels.",
      icon: <MobileIcon />,
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
          <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">
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
                <div className="inline-flex items-center justify-center p-3.5 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-white/[0.02] transition-transform duration-300 group-hover:scale-105">
                  {prod.icon}
                </div>
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
