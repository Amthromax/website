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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
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
        <section className="relative py-24 md:py-32 overflow-hidden bg-black text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-zinc-950/50 to-black z-0" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 inline-block">
              Corporate Profile &amp; Mission
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              What is Amthromax?
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-medium max-w-4xl mx-auto">
              Amthromax is an AI software and technology company building enterprise AI platforms, intelligent agents, intelligent automation, developer infrastructure, APIs, and next-generation software systems.
            </p>
          </div>
        </section>

        {/* Global Impact Stats Grid */}
        <section className="max-w-7xl mx-auto px-6 py-12 border-b border-gray-150 dark:border-white/[0.04]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Daily Autonomous Inferences", value: "100M+" },
              { label: "Enterprise Uptime SLA", value: "99.999%" },
              { label: "Global Region Deployments", value: "40+" },
              { label: "Enterprise Partners & Clients", value: "500+" }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 bg-gray-50 dark:bg-[#161617] rounded-2xl border border-gray-150 dark:border-white/[0.04] text-center space-y-2">
                <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider block">
                  {stat.label}
                </span>
                <h3 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Narrative & What We Build Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 space-y-20">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Core Capabilities
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                What We Build
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                Amthromax develops modular computational architectures that bridge theoretical cognitive research with real-world enterprise operations. Our core software suite includes:
              </p>
              <ul className="space-y-3.5 pt-2">
                {[
                  { title: "Enterprise AI Platforms", desc: "High-throughput orchestration layers for machine learning models and serverless inferencing." },
                  { title: "AI Agents Runtime", desc: "Autonomous multi-agent swarms equipped with tool execution, planning, and memory persistence." },
                  { title: "Intelligent Automation Engine", desc: "Event-driven workflow triggers connecting CRM, ERP, and un-structured document pipelines." },
                  { title: "Developer Infrastructure & APIs", desc: "Typed SDKs (TypeScript, Python, Go) and REST/WebSocket endpoints for low-latency integration." },
                  { title: "Post-Quantum Cryptography", desc: "Zero-trust network encryption tunnels and lattice-based security protocols." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200">
                    <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">{item.title}:</strong> {item.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 bg-gray-50 dark:bg-[#161617] p-8 md:p-10 rounded-[32px] border border-gray-150 dark:border-white/[0.04]">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Our Mission
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                Engineering Computational Autonomy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                Our mission is to build intelligent technology that enables organizations and developers to create, operate, and scale AI-powered software safely and efficiently.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                We believe the future of enterprise software relies on zero-latency integration layers, proactive self-healing workflows, and post-quantum security protocols—removing manual operational drag so human teams can focus on strategic breakthroughs.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs rounded-full hover:opacity-90 transition-all shadow-md"
                >
                  Explore Products →
                </Link>
                <Link
                  to="/developers"
                  className="px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 font-extrabold text-xs rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Developer Hub →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Technology & Engineering Pillars */}
        <section className="bg-gray-50 dark:bg-[#121213] py-20 md:py-28 border-y border-gray-150 dark:border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Engineering Principles
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                Technology Standards
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
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
                <div key={i} className="p-8 bg-white dark:bg-[#161617] rounded-3xl border border-gray-150 dark:border-white/[0.04] space-y-4 shadow-sm">
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    {pillar.num} / FOUNDATION
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{pillar.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed font-medium">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Company Information & Contact */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 space-y-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Company Information
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                Global Operations
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                Amthromax operates global infrastructure across 40+ cloud regions, serving Fortune 500 enterprises, hyper-growth startups, and developer communities worldwide.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-semibold">Official Entity:</span>
                  <strong className="text-gray-900 dark:text-white">{COMPANY_CONFIG.legalName}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-semibold">Industry Category:</span>
                  <strong className="text-gray-900 dark:text-white">{COMPANY_CONFIG.category}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-semibold">Official Contact:</span>
                  <strong className="text-gray-900 dark:text-white">{COMPANY_CONFIG.email}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-semibold">Canonical Domain:</span>
                  <strong className="text-gray-900 dark:text-white">{COMPANY_CONFIG.url}</strong>
                </div>
              </div>
            </div>

            <div className="p-10 bg-black text-white rounded-[36px] border border-white/10 space-y-6 shadow-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Connect With Us
              </span>
              <h3 className="text-3xl font-black text-white tracking-tight">
                Enterprise &amp; Engineering Contact
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                Looking to integrate Amthromax AI platforms, request custom agent swarms, or discuss enterprise deployment specifications?
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-white text-black font-extrabold text-xs rounded-full hover:bg-gray-200 transition-all shadow-lg flex items-center gap-1.5"
                >
                  <span>Contact Sales</span>
                  <span>↗</span>
                </a>
                <Link
                  to="/docs"
                  className="px-7 py-3.5 bg-zinc-900 border border-white/20 text-white font-extrabold text-xs rounded-full hover:bg-white/10 transition-all"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
