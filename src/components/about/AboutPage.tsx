import React from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";
import { COMPANY_CONFIG } from "../../config/company";

const AboutPage: React.FC = () => {
  const aboutSchema = {
    "@type": "AboutPage",
    "@id": "https://amthromax.com/about/#webpage",
    "url": "https://amthromax.com/about",
    "name": "About Amthromax | AI Software & Enterprise Systems Company",
    "description":
      "Amthromax is an AI software and technology company building enterprise AI platforms, intelligent agents, intelligent automation, developer infrastructure, APIs, and next-generation software systems.",
    "mainEntity": {
      "@id": "https://amthromax.com/#organization"
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300 antialiased">
      <SEO
        title="About Amthromax | AI Software & Enterprise Systems Company"
        description="Amthromax is an AI software and technology company building enterprise AI platforms, intelligent agents, intelligent automation, developer infrastructure, APIs, and next-generation software systems."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" }
        ]}
        schema={aboutSchema}
      />

      <main>
        {/* Hero Header */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-white text-gray-900 dark:bg-black dark:text-white">
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-tight text-gray-900 dark:text-white font-sans">
              What is Amthromax?
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-normal max-w-4xl mx-auto">
              Amthromax is an AI software and technology company building enterprise AI platforms, intelligent agents, intelligent automation, developer infrastructure, APIs, and next-generation software systems.
            </p>
          </div>
        </section>

        {/* AGI Vision Banner Section */}
        <section className="bg-white text-gray-900 dark:bg-black dark:text-white py-28 md:py-36 lg:py-44">
          <div className="max-w-[1530px] mx-auto px-4 sm:px-8 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="lg:col-span-5 space-y-6 -ml-1 sm:-ml-2 lg:-ml-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-gray-900 dark:text-white leading-tight font-sans">
                  Our vision for Enterprise Autonomous Intelligence
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                  At Amthromax, our mission is to build resilient AI platforms, agentic swarms, and post-quantum infrastructure that empower global organizations to operate with complete computational autonomy.
                </p>
                <div className="flex items-center gap-5 pt-2">
                  <Link
                    to="/research"
                    className="text-gray-900 hover:text-black dark:text-white dark:hover:text-gray-300 font-medium text-sm sm:text-base inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <span>Amthromax AI Roadmap</span>
                    <span className="text-xs group-hover:translate-x-1 transition-transform">&gt;</span>
                  </Link>
                  <Link
                    to="/company"
                    className="text-gray-900 hover:text-black dark:text-white dark:hover:text-gray-300 font-medium text-sm sm:text-base inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <span>System Charter</span>
                    <span className="text-xs group-hover:translate-x-1 transition-transform">&gt;</span>
                  </Link>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="lg:col-span-7 space-y-3">
                <div className="relative rounded-[32px] overflow-hidden border border-gray-200 dark:border-white/15 shadow-2xl w-full h-[520px] sm:h-[620px] lg:h-[700px]">
                  <svg className="w-full h-full object-cover" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="35%" stopColor="#fef08a" />
                        <stop offset="65%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                      <linearGradient id="hillGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                      <filter id="oilPaint" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="24" xChannelSelector="R" yChannelSelector="G" />
                      </filter>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#skyGrad)" />
                    
                    {/* Impressionist Painterly Layers */}
                    <g filter="url(#oilPaint)" opacity="0.92">
                      <circle cx="400" cy="200" r="280" fill="#fde047" opacity="0.65" />
                      <path d="M-50 350 C 150 250, 350 400, 550 300 C 750 200, 850 380, 950 350 L 950 700 L -50 700 Z" fill="url(#hillGrad)" />
                      <path d="M-50 420 C 200 320, 400 480, 650 360 C 800 280, 900 450, 950 420 L 950 700 L -50 700 Z" fill="#0284c7" opacity="0.75" />
                      <path d="M-50 480 C 100 400, 300 520, 500 440 C 700 360, 850 500, 950 460 L 950 700 L -50 700 Z" fill="#eab308" opacity="0.65" />
                      <circle cx="200" cy="180" r="140" fill="#a855f7" opacity="0.45" />
                      <circle cx="650" cy="150" r="160" fill="#38bdf8" opacity="0.55" />
                    </g>

                    {/* Canvas Texture Overlay */}
                    <rect width="100%" height="100%" fill="#ffffff" opacity="0.05" style={{ mixBlendMode: 'overlay' }} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Impact Stats Grid - Apple Box Styling */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Daily Autonomous Inferences", value: "100M+" },
              { label: "Enterprise Uptime SLA", value: "99.999%" },
              { label: "Global Region Deployments", value: "40+" },
              { label: "Enterprise Partners & Clients", value: "500+" }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 sm:p-8 bg-gray-50 dark:bg-white/5 rounded-[24px] sm:rounded-[28px] border border-gray-200 dark:border-white/10 text-center space-y-2 shadow-sm dark:shadow-xl hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-normal uppercase tracking-wider block">
                  {stat.label}
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 dark:text-white tracking-tight font-sans">
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Narrative & What We Build Section */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 md:py-24 space-y-20">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 dark:text-white tracking-tight leading-tight font-sans">
                What We Build
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                Amthromax develops AI and software products including <strong>Codehoomer AI</strong>, <strong>Helleious AI</strong>, and <strong>Orarqlow AI</strong>, alongside modular enterprise infrastructure. Our primary software products include:
              </p>
              <ul className="space-y-4 pt-2">
                {[
                  { title: "Codehoomer AI", desc: "Autonomous AI software engineering partner and developer assistant built by Amthromax to build, test, refactor, and deploy enterprise codebases.", link: "/codehoomer" },
                  { title: "Helleious AI", desc: "Enterprise multi-agent operating system developed by Amthromax providing model context protocol integration, knowledge retrieval, and zero-trust data governance.", link: "/helleious" },
                  { title: "Orarqlow AI", desc: "Autonomous agent swarm orchestration engine developed by Amthromax designed to deploy and orchestrate distributed multi-agent swarms with sub-15ms latency.", link: "/orarqlow" },
                  { title: "Enterprise AI Infrastructure", desc: "High-throughput cognitive orchestration layers, typed SDKs, and zero-trust cloud pipelines.", link: "/products" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-sm sm:text-base font-normal text-gray-800 dark:text-gray-200">
                    <svg className="w-5 h-5 text-gray-900 dark:text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <Link to={item.link} className="font-semibold text-gray-900 dark:text-white hover:underline">
                        {item.title}:
                      </Link>{" "}
                      {item.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 bg-gray-50 dark:bg-white/5 p-8 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[36px] border border-gray-200 dark:border-white/10 shadow-sm">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 dark:text-white tracking-tight font-sans">
                Engineering Computational Autonomy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                Our mission is to build intelligent technology that enables organizations and developers to create, operate, and scale AI-powered software safely and efficiently.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                We believe the future of enterprise software relies on zero-latency integration layers, proactive self-healing workflows, and post-quantum security protocols—removing manual operational drag so human teams can focus on strategic breakthroughs.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="px-6 py-3 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-medium text-xs rounded-full transition-all shadow-xs"
                >
                  Explore Products →
                </Link>
                <Link
                  to="/developers"
                  className="px-6 py-3 bg-gray-100 text-black dark:bg-white/10 dark:text-white border border-gray-200 dark:border-white/10 font-medium text-xs rounded-full hover:opacity-90 transition-all"
                >
                  Developer Hub →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AGI Mission Statement & Visual Section */}
        <section className="bg-white text-gray-900 dark:bg-black dark:text-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center space-y-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-gray-900 dark:text-white leading-snug max-w-4xl mx-auto font-sans">
              We are building safe, resilient enterprise AI platforms and autonomous intelligence systems, empowering global organizations to achieve complete computational autonomy.
            </h2>
            <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-gray-200 dark:border-white/15 shadow-2xl w-full h-[400px] sm:h-[520px] lg:h-[600px] max-w-5xl mx-auto">
              <img
                src="/images/agi_mission_team.png"
                alt="Amthromax AI Research Team"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Technology & Engineering Pillars */}
        <section className="bg-white dark:bg-black py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 dark:text-white tracking-tight font-sans">
                Technology Standards
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-normal">
                The technical foundations that power every product, API endpoint, and neural model in our catalog.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: "01",
                  title: "Intelligent Systems",
                  desc: "Proprietary transformer models and specialized agentic runtimes engineered for deterministic business execution."
                },
                {
                  num: "02",
                  title: "Enterprise Scaling",
                  desc: "Kubernetes-orchestrated serverless microservices providing sub-15ms response latency at global scale."
                },
                {
                  num: "03",
                  title: "Zero-Trust Security",
                  desc: "Lattice-based post-quantum cryptography, SAML SSO, hardware key isolation, and SOC2 compliance."
                },
                {
                  num: "04",
                  title: "Cognitive Autonomy",
                  desc: "Self-healing background pipelines, asynchronous telemetry streaming, and multi-agent coordination."
                }
              ].map((pillar, i) => (
                <div key={i} className="space-y-3 py-2">
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                    {pillar.num} / FOUNDATION
                  </span>
                  <h3 className="text-xl font-normal text-gray-900 dark:text-white tracking-tight font-sans">{pillar.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-normal">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Company Information & Contact */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20 md:py-28 space-y-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 dark:text-white tracking-tight font-sans">
                Global Operations
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                Amthromax operates global infrastructure across 40+ cloud regions, serving Fortune 500 enterprises, hyper-growth startups, and developer communities worldwide.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex justify-between py-2.5 border-b border-gray-200 dark:border-white/10 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-normal">Official Entity:</span>
                  <span className="text-gray-900 dark:text-white font-normal">{COMPANY_CONFIG.legalName}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-200 dark:border-white/10 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-normal">Industry Category:</span>
                  <span className="text-gray-900 dark:text-white font-normal">{COMPANY_CONFIG.category}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-200 dark:border-white/10 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-normal">Official Contact:</span>
                  <span className="text-gray-900 dark:text-white font-normal">{COMPANY_CONFIG.email}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-200 dark:border-white/10 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-normal">Canonical Domain:</span>
                  <span className="text-gray-900 dark:text-white font-normal">{COMPANY_CONFIG.url}</span>
                </div>
              </div>
            </div>

            <div className="p-10 sm:p-12 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-[32px] sm:rounded-[36px] border border-gray-200 dark:border-white/10 space-y-6 shadow-sm dark:shadow-2xl">
              <h3 className="text-3xl font-normal text-gray-900 dark:text-white tracking-tight font-sans">
                Enterprise &amp; Engineering Contact
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed font-normal">
                Looking to integrate Amthromax AI platforms, request custom agent swarms, or discuss enterprise deployment specifications?
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-medium text-xs rounded-full transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Contact Sales</span>
                  <span>↗</span>
                </a>
                <Link
                  to="/docs"
                  className="px-7 py-3.5 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white font-medium text-xs rounded-full hover:opacity-90 transition-all"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Careers CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 md:pb-28">
          <div className="p-12 sm:p-16 md:p-20 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[28px] sm:rounded-[36px] text-center space-y-6 shadow-sm dark:shadow-2xl">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-gray-900 dark:text-white leading-tight max-w-4xl mx-auto font-sans">
              Join us in shaping the future of Enterprise AI
            </h2>
            <div>
              <Link
                to="/careers"
                className="text-gray-900 hover:text-black dark:text-white dark:hover:text-gray-300 font-medium text-sm sm:text-base inline-flex items-center gap-1.5 transition-colors group"
              >
                <span>View careers</span>
                <span className="text-xs group-hover:translate-x-1 transition-transform">&gt;</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
