import React from "react";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";
import { Link } from "react-router-dom";

// Premium Custom SVG Logos (Monochromatic Obsidian)
const SoftwareIcon: React.FC = () => (
  <svg className="w-8 h-8 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="softwareGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
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
  <svg className="w-8 h-8 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cloudGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <path d="M18 10C18 6.68629 15.3137 4 12 4C9.36443 4 7.1264 5.70014 6.31154 8.04907C3.8967 8.35824 2 10.4578 2 13C2 15.7614 4.23858 18 7 18H17C19.7614 18 22 15.7614 22 13C22 10.4578 20.1033 8.35824 17.6885 8.04907C17.8924 8.66597 18 9.31754 18 10Z" stroke="url(#cloudGrad)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 9V15M12 15L9 12M12 15L15 12" stroke="url(#cloudGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AIIcon: React.FC = () => (
  <svg className="w-8 h-8 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aiGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="3" stroke="url(#aiGrad)" strokeWidth="2" />
    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
    <path d="M8 12H9M15 12H16M12 8V9M12 15V16" stroke="url(#aiGrad)" strokeWidth="1.5" />
    <path d="M7.5 7.5L9.5 9.5M14.5 14.5L16.5 16.5M16.5 7.5L14.5 9.5M9.5 14.5L7.5 16.5" stroke="url(#aiGrad)" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
  </svg>
);

const SecurityIcon: React.FC = () => (
  <svg className="w-8 h-8 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="securityGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="url(#securityGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 11L11 13L15 9" stroke="url(#securityGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DataIcon: React.FC = () => (
  <svg className="w-8 h-8 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dataGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <path d="M21 7V17C21 19.2091 16.9706 21 12 21C7.02944 21 3 19.2091 3 17V7" stroke="url(#dataGrad)" strokeWidth="2" />
    <path d="M21 7C21 9.20914 16.9706 11 12 11C7.02944 11 3 9.20914 3 7C3 4.79086 7.02944 3 12 3C16.9706 3 21 4.79086 21 7Z" stroke="url(#dataGrad)" strokeWidth="2" />
    <path d="M21 12C21 14.2091 16.9706 16 12 16C7.02944 16 3 14.2091 3 12" stroke="url(#dataGrad)" strokeWidth="2" />
  </svg>
);

const MobileIcon: React.FC = () => (
  <svg className="w-8 h-8 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mobileGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
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
      id: "orarqlow-ai",
      title: "OrarQlow.Ai Swarm Engine",
      desc: "Distributed low-latency autonomous agent swarm orchestration engine capable of sub-15ms coordination across Kubernetes nodes.",
      icon: <AIIcon />,
      link: "/orarqlow"
    },
    {
      id: "helleious-ai",
      title: "Helleious.Ai Workflow Platform",
      desc: "Enterprise zero-code AI automation, blueprint orchestration, and event-driven trigger system built for modern teams.",
      icon: <SoftwareIcon />,
      link: "/helleious"
    },
    {
      id: "codehoomer-ai",
      title: "CodeHoomer.Ai Engineering Studio",
      desc: "Autonomous AI software developer for building, testing, refactoring, and auditing enterprise codebases at scale.",
      icon: <DataIcon />,
      link: "/codehoomer"
    },
    {
      id: "custom-software",
      title: "Custom Software Suite",
      desc: "Tailored enterprise solutions built with low-latency frameworks, optimized caching, and automated sync layers.",
      icon: <SoftwareIcon />,
      link: "/services/custom-software"
    },
    {
      id: "cloud-solutions",
      title: "Cloud Infrastructure Pipelines",
      desc: "High-throughput cloud pipelines running on auto-scaling clusters, complete with cryptographic edge routing.",
      icon: <CloudIcon />,
      link: "/services/cloud-solutions"
    },
    {
      id: "artificial-intelligence",
      title: "Atlas AI Agent Networks",
      desc: "Deploy specialized agentic swarms that automatically plan, execute, retrieve semantic data, and automate processes.",
      icon: <AIIcon />,
      link: "/services/artificial-intelligence"
    },
    {
      id: "cybersecurity",
      title: "Zero-Trust Cybersecurity Shield",
      desc: "Establish threat detection layers, post-quantum cryptography, and sandboxed runtimes to defend API endpoints.",
      icon: <SecurityIcon />,
      link: "/services/cybersecurity"
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
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-gray-50 font-sans transition-colors duration-300 antialiased">
      <SEO 
        title="Amthromax Products | Enterprise AI & Software Systems" 
        description="Browse the suite of Amthromax products: custom software engineering, cloud pipelines, Atlas AI agents, cybersecurity tools, and analytics." 
      />

      {/* Hero Header */}
      <div className="relative py-20 md:py-28 overflow-hidden flex flex-col items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-black z-0 pointer-events-none" />
        
        {/* Top Header Label Bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-6 w-full flex justify-between items-center text-xs text-gray-400 font-sans">
          <a 
            href="/overview" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-gray-300 hover:text-white font-medium transition-colors cursor-pointer group"
          >
            <span>Overview</span>
            <span className="text-sm font-bold leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>

          <a 
            href="/contact" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-gray-300 hover:text-white font-medium transition-colors cursor-pointer group"
          >
            <span>Contact Sales</span>
            <span className="text-sm font-bold leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-[0.15em] text-gray-400 font-semibold">
            PRODUCT PORTFOLIO
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Intelligent Products & APIs
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Scalable automation frameworks, zero-trust cloud pipelines, and cognitive models designed to run at industrial scale.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-white text-black font-semibold rounded-full text-xs hover:bg-gray-150 transition-all shadow-md font-sans cursor-pointer flex items-center gap-2"
            >
              <span>Contact Sales</span>
              <span className="text-sm font-bold leading-none">↗</span>
            </a>
            <a
              href="/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-black border border-white/20 text-white font-medium rounded-full text-xs hover:bg-white/10 transition-all font-sans cursor-pointer flex items-center gap-2"
            >
              <span>System Overview</span>
              <span className="text-sm font-bold leading-none">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Core AI Models Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 pb-12 space-y-12">
        <div className="max-w-3xl space-y-3 text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.15em] text-[#6e6e73] dark:text-gray-400 font-semibold">
            COGNITIVE POWER
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
            Core AI Models & Systems
          </h2>
          <p className="text-base sm:text-lg text-[#515154] dark:text-gray-300 font-normal leading-relaxed">
            Our state-of-the-art model registry is designed for heavy analytical inferences, low-latency synchronizations, and secure sandboxed computation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1 */}
          <div className="group bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between">
            <div className="aspect-[16/9] w-full overflow-hidden bg-[#f5f5f7] dark:bg-white/5">
              <img 
                src="/images/0c3a15fc-04e8-46bf-8892-2693e8e64a01.png" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="MORFIX 0.1" 
              />
            </div>
            <div className="p-8 sm:p-10 lg:p-12 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">1. Instant Customer Sync</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] dark:text-white tracking-tight uppercase">MORFIX 0.1</h3>
              </div>
              <p className="text-[#515154] dark:text-gray-300 leading-relaxed text-sm sm:text-[15px] font-normal pt-1">
                Automatically capture incoming emails, intelligently categorize support requests, and push prioritized contact data directly to your local tracking CRM dashboards without a single keystroke of manual copy-pasting.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="group bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between">
            <div className="aspect-[16/9] w-full overflow-hidden bg-[#f5f5f7] dark:bg-white/5">
              <img 
                src="/images/51d4fd10-875a-4a4c-8891-6349ef1919da.png" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="INTOX 0.2" 
              />
            </div>
            <div className="p-8 sm:p-10 lg:p-12 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">2. Low Operational Overhead</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] dark:text-white tracking-tight uppercase">INTOX 0.2</h3>
              </div>
              <p className="text-[#515154] dark:text-gray-300 leading-relaxed text-sm sm:text-[15px] font-normal pt-1">
                Our lightweight code designs run inside autonomous micro-instances on the edge network, ensuring that you only pay for exactly the compute cycles you use, eliminating expensive flat hosting rates and server maintenance constraints.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between">
            <div className="aspect-[16/9] w-full overflow-hidden bg-[#f5f5f7] dark:bg-white/5">
              <img 
                src="/images/818f256b-7d9a-4246-95b7-df2a884df162.png" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="COTISES 0.5 MAX" 
              />
            </div>
            <div className="p-8 sm:p-10 lg:p-12 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">3. Automated Marketing Triggers</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] dark:text-white tracking-tight uppercase">COTISES 0.5 MAX</h3>
              </div>
              <p className="text-[#515154] dark:text-gray-300 leading-relaxed text-sm sm:text-[15px] font-normal pt-1">
                Set up dynamic event triggers that launch highly personalized outreach campaigns based on user behavior inside your website. Nurture leads continuously without requiring dedicated marketing bandwidth to expand your customer base.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between">
            <div className="aspect-[16/9] w-full overflow-hidden bg-[#f5f5f7] dark:bg-white/5">
              <img 
                src="/images/9ea0fcc0-1dac-4578-8919-75e82976b010.png" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="VERKOX 0.4 INSTANT" 
              />
            </div>
            <div className="p-8 sm:p-10 lg:p-12 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">4. Smart Logistics & Tracking</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] dark:text-white tracking-tight uppercase">VERKOX 0.4 INSTANT</h3>
              </div>
              <p className="text-[#515154] dark:text-gray-300 leading-relaxed text-sm sm:text-[15px] font-normal pt-1">
                Maintain complete oversight of your small business supply chain. Agents parse receipts, forecast inventory needs, and automatically flag accounting anomalies by correlating data across your spreadsheet tools in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product List Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20 space-y-12">
        <div className="max-w-3xl space-y-3 text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.15em] text-[#6e6e73] dark:text-gray-400 font-semibold">
            CAPABILITIES & TOOLS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
            Enterprise Solutions Portfolio
          </h2>
          <p className="text-base sm:text-lg text-[#515154] dark:text-gray-300 font-normal">
            Browse our core APIs, platform suites, and custom automation infrastructure deployed at scale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <div 
              key={prod.id} 
              className="group flex flex-col justify-between p-8 sm:p-10 bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] rounded-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center p-3.5 bg-[#f5f5f7] dark:bg-white/5 rounded-2xl border border-[#e5e5e7]/60 dark:border-white/10 transition-transform duration-300 group-hover:scale-105">
                  {prod.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                  {prod.title}
                </h3>
                <p className="text-[#515154] dark:text-gray-300 text-sm leading-relaxed font-normal">
                  {prod.desc}
                </p>
              </div>
              
              <div className="pt-6 mt-6 border-t border-[#e5e5e7]/80 dark:border-white/10">
                <Link 
                  to={prod.link} 
                  className="text-[15px] font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white group-hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Capabilities</span>
                  <span>›</span>
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

