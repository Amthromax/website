import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaSalesforce, 
  FaShieldHalved, 
  FaGlobe, 
  FaUserShield,
  FaDatabase,
  FaLock,
  FaMagnifyingGlass,
  FaUsers,
  FaCheckDouble,
  FaPlug,
  FaKey,
  FaChartLine,
  FaFileContract,
  FaSliders,
  FaFilePdf,
  FaCloud,
  FaNetworkWired,
  FaServer
} from "react-icons/fa6";
import { SiPostgresql, SiSnowflake } from "react-icons/si";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const moreFeatures = [
  {
    icon: FaPlug,
    title: "Model Context Protocol (MCP)",
    description: "Connect internal enterprise databases & legacy APIs securely via MCP",
  },
  {
    icon: FaLock,
    title: "Zero-Trust Data Governance",
    description: "Strict zero data retention policy with end-to-end hardware HSM encryption",
  },
  {
    icon: FaMagnifyingGlass,
    title: "Enterprise Knowledge Engine",
    description: "Autonomous RAG retrieval with verified real-time source citation",
  },
  {
    icon: FaUsers,
    title: "Multi-Agent OS Kernel",
    description: "Coordinate cross-department agent teams with unified system orchestration",
  },
  {
    icon: FaCheckDouble,
    title: "SOC 2 Type II Certified",
    description: "Continuous automated security compliance and auditing guardrails",
  },
  {
    icon: FaDatabase,
    title: "Custom Data Connectors",
    description: "Direct integration with Salesforce, Snowflake, PostgreSQL, and Slack",
  },
  {
    icon: FaKey,
    title: "Role-Based Access Control",
    description: "Granular IAM policy scoping for enterprise users and autonomous agents",
  },
  {
    icon: FaChartLine,
    title: "Real-Time Data Streaming",
    description: "High-throughput telemetry & event streaming across enterprise clusters",
  },
  {
    icon: FaFileContract,
    title: "Automated Audit Logs",
    description: "Tamper-proof activity logs for complete enterprise compliance oversight",
  },
  {
    icon: FaFilePdf,
    title: "Multimodal Document Search",
    description: "Parse PDFs, contracts, financial reports, and technical schematics",
  },
  {
    icon: FaGlobe,
    title: "30+ Enterprise Languages",
    description: "Native multilingual processing for global enterprise operations",
  },
  {
    icon: FaServer,
    title: "Context-Aware Memory",
    description: "Persistent enterprise context retention across organizational workflows",
  },
  {
    icon: FaChartLine,
    title: "Executive Analytics Dashboard",
    description: "Instant ARR, SLA metrics, and operational performance insights",
  },
  {
    icon: FaSliders,
    title: "Custom Security Guardrails",
    description: "Define custom DLP (Data Loss Prevention) rules and policy checks",
  },
  {
    icon: FaFilePdf,
    title: "Exportable Governance Reports",
    description: "One-click PDF export of enterprise privacy and audit compliance",
  },
  {
    icon: FaCloud,
    title: "Hybrid Cloud Deployment",
    description: "Flexible deployment across AWS, Azure, GCP, and private on-prem clouds",
  },
  {
    icon: FaNetworkWired,
    title: "Event-Driven Workflows",
    description: "Trigger autonomous multi-agent pipelines on webhooks and database events",
  },
  {
    icon: FaShieldHalved,
    title: "SuperHelleious Enterprise",
    description: "Dedicated private cluster infrastructure with guaranteed 99.99% uptime SLA",
  },
];

const HelleiousPage: React.FC = () => {
  const helleiousSchema = {
    "@type": "SoftwareApplication",
    "@id": "https://amthromax.com/helleious#software",
    "name": "Helleious AI",
    "url": "https://amthromax.com/helleious",
    "applicationCategory": "EnterpriseApplication",
    "operatingSystem": "Cloud / On-Premises Enterprise Multi-Agent OS",
    "description":
      "Helleious AI is an enterprise multi-agent operating system developed by Amthromax providing model context protocol integration, knowledge retrieval, and zero-trust data governance.",
    "creator": {
      "@id": "https://amthromax.com/#organization"
    },
    "publisher": {
      "@id": "https://amthromax.com/#organization"
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
      <SEO
        title="Helleious AI — Enterprise Multi-Agent Operating System | Amthromax"
        description="Helleious AI is an enterprise multi-agent operating system developed by Amthromax providing model context protocol integration, knowledge retrieval, and zero-trust data governance."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
          { name: "Helleious AI", url: "/helleious" }
        ]}
        schema={helleiousSchema}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 sm:px-12 max-w-7xl mx-auto text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">
            Put AI to work across<br />your enterprise
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Helleious AI is an enterprise multi-agent operating system developed by Amthromax. Explore proven ways to apply AI across your organization—built to fit how your teams work.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Try Helleious Business</span>
              <span className="text-base">↗</span>
            </Link>

            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 text-gray-900 dark:text-white font-semibold text-sm transition-all border border-gray-300 dark:border-white/15 flex items-center gap-2"
            >
              <span>Contact sales</span>
            </a>
          </div>
        </motion.div>
      </section>


      {/* Section 2: Blueprints */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-gray-200 dark:border-white/10">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight">
            Enterprise Blueprints
          </h2>
        </div>

        {/* 2 Side-by-Side Larger Blueprint Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          
          {/* Card 1: MCPKit */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col space-y-4 group cursor-pointer"
          >
            {/* Outer Container with BLACK Obsidian Background & Dot Grid */}
            <div className="w-full min-h-[500px] sm:min-h-[540px] rounded-2xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 group-hover:border-gray-400 dark:group-hover:border-white/30 p-7 sm:p-9 relative overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-300 flex flex-col justify-start space-y-5">
              
              {/* Dot Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#000000_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-10 dark:opacity-25" />

              {/* Top Floating Prompt Box */}
              <motion.div 
                whileHover={{ scale: 1.015, y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-2xl text-black space-y-3.5 z-10 border border-gray-100 relative"
              >
                <p className="text-sm sm:text-base font-bold text-gray-900">
                  Retrieve Q4 enterprise revenue analytics & compliance status
                </p>

                <div className="flex items-center gap-2.5 pt-1">
                  <button className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs hover:bg-gray-100 transition-colors">
                    +
                  </button>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 text-gray-900 text-xs font-extrabold border border-gray-200">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Enterprise Analytics MCP
                  </span>

                  <button className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 text-xs hover:bg-gray-100 transition-colors ml-auto">
                    •••
                  </button>
                </div>
              </motion.div>

              {/* Bottom White Overview Box Sheet */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-6 sm:p-7 shadow-2xl text-black space-y-4 border border-gray-100 flex-1 flex flex-col justify-between relative z-10"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-gray-100">
                    <span className="text-lg">📈</span>
                    <h4 className="text-base font-bold text-gray-900">Executive Summary & Revenue Intelligence</h4>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="text-gray-400">•</span>
                      <span><strong className="text-gray-900 font-bold">ARR Growth Index:</strong> $48.2M (+28% YoY)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gray-400">•</span>
                      <span><strong className="text-gray-900 font-bold">Active Accounts:</strong> 142 Enterprise Customers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gray-400">•</span>
                      <span><strong className="text-gray-900 font-bold">Service SLA Guarantee:</strong> 99.99% Availability</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gray-400">•</span>
                      <span><strong className="text-gray-900 font-bold">Compliance Status:</strong> SOC2 Type II Certified</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gray-400">•</span>
                      <span><strong className="text-gray-900 font-bold">Governance Engine:</strong> Zero-Trust Security Active</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3.5 border-t border-gray-100 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900">
                    <span>⚡</span>
                    <span>Performance Metrics</span>
                  </div>

                  <div className="grid grid-cols-12 text-xs text-gray-500 font-semibold border-b border-gray-100 pb-1.5">
                    <span className="col-span-5">Category</span>
                    <span className="col-span-4">Metric</span>
                    <span className="col-span-3 text-right">Status</span>
                  </div>

                  <div className="grid grid-cols-12 text-xs sm:text-sm text-gray-800 font-medium pt-1 items-center">
                    <span className="col-span-5 font-semibold text-gray-900">ARR Pipeline</span>
                    <span className="col-span-4 font-sans text-xs sm:text-sm text-blue-600 font-bold">$18.4M</span>
                    <span className="col-span-3 text-right font-bold text-gray-900">On Track</span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Title & Description below Card */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Enterprise Data Protocol
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                Connect internal databases & custom systems with Model Context Protocol (MCP).
              </p>
            </div>
          </motion.div>

          {/* Card 2: Knowledge Retrieval */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col space-y-4 group cursor-pointer"
          >
            {/* Outer Container with BLACK Obsidian Background */}
            <div className="w-full min-h-[500px] sm:min-h-[540px] rounded-2xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 group-hover:border-gray-400 dark:group-hover:border-white/30 p-7 sm:p-9 relative overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-300 flex items-center justify-center">
              
              {/* Dynamic Glow on Hover */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />

              {/* Dot Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#000000_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-10 dark:opacity-25" />

              {/* Inner Stacked Layout */}
              <div className="relative z-10 w-full h-full flex items-center justify-between gap-5">
                
                {/* Left QA Box */}
                <motion.div 
                  whileHover={{ scale: 1.015, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-[62%] sm:w-[65%] bg-white rounded-xl p-5 sm:p-6 shadow-2xl text-black space-y-4 z-20 border border-gray-100 flex flex-col justify-between min-h-[380px]"
                >
                  <div className="space-y-3.5">
                    <div className="bg-gray-100 p-3 rounded-lg text-xs sm:text-sm text-gray-800 font-semibold self-end ml-auto w-fit max-w-[90%] shadow-sm">
                      What are our enterprise AI privacy & data governance policies?
                    </div>

                    <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2.5">
                      <p className="font-medium text-gray-900">
                        Amthromax Helleious Operating System enforces strict zero-trust data governance:
                      </p>
                      <ol className="list-decimal pl-4 space-y-1.5 text-gray-700 font-normal">
                        <li>
                          <strong className="font-bold text-gray-900">Zero Data Retention:</strong> Prompts & business data are never stored or used to train foundational LLMs.
                        </li>
                        <li>
                          <strong className="font-bold text-gray-900">Hardware Security:</strong> End-to-end AES-256 encryption with dedicated HSM key rotation.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <input
                      type="text"
                      placeholder="Ask Helleious about enterprise governance..."
                      readOnly
                      className="w-full text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 outline-none cursor-pointer"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-7 h-7 rounded-md bg-gray-900 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-md"
                    >
                      ↑
                    </motion.button>
                  </div>
                </motion.div>

                {/* Right Stacked Document Workspace Cards */}
                <div className="w-[35%] sm:w-[32%] flex flex-col gap-4 relative z-10">
                  
                  {/* Document Card 1 */}
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-lg p-3.5 shadow-md border border-gray-100 space-y-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>FILE</span>
                    </div>
                    <p className="text-xs font-bold text-gray-800 truncate">
                      01_ai_privacy_framework.pdf
                    </p>
                    <h5 className="text-xs font-black text-gray-900 leading-tight">
                      Enterprise Privacy Policy
                    </h5>
                    <div className="pt-1">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-[10px] font-bold">
                        Verified Active
                      </span>
                    </div>
                  </motion.div>

                  {/* Document Card 2 (Active Cited Document Card - Clean Blue Palette) */}
                  <motion.div 
                    whileHover={{ scale: 1.06, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-lg p-3.5 shadow-xl border-2 border-blue-500 space-y-2 transform translate-x-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                      <span>FILE</span>
                    </div>
                    <p className="text-xs font-bold text-gray-800 truncate">
                      02_soc2_type_ii_audit.pdf
                    </p>
                    <h5 className="text-xs font-black text-gray-900 leading-tight">
                      SOC2 Type II Audit
                    </h5>
                    <div className="pt-1">
                      <span className="inline-block px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] font-extrabold border border-blue-200">
                        Cited in response
                      </span>
                    </div>
                  </motion.div>

                </div>

              </div>
            </div>

            {/* Title & Description below Card */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Autonomous Knowledge Engine
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                Deliver real-time, zero-trust answers verified directly from your data.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section 3: AI you can deploy with confidence */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-gray-200 dark:border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight">
            AI you can deploy with confidence
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-medium">
            Bring advanced intelligence into your organization with security, control, and transparency.
          </p>
        </div>

        {/* 2 Column Section: Connect your Data + Carousel Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column Text & Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight leading-tight">
              Connect your data
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed">
              Bring your business context into every prompt—delivering reliable, cited responses.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-xs hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-md"
              >
                Explore apps
              </Link>
              <Link
                to="/docs"
                className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold text-xs border border-gray-300 dark:border-white/15 transition-all backdrop-blur-md flex items-center gap-1.5"
              >
                <span>Connect with MCP</span>
                <span>↗</span>
              </Link>
            </div>
          </div>

          {/* Right Column Graphic Card */}
          <div className="lg:col-span-7">
            <div className="w-full min-h-[380px] sm:min-h-[420px] rounded-2xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 hover:border-gray-400 dark:hover:border-white/30 p-8 relative overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-300 flex items-center justify-center">
              {/* Ambient Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#000000_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-10 dark:opacity-25" />

              {/* Horizontal Icon Strip Flow */}
              <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-6 w-full">
                
                {/* Salesforce Integration */}
                <motion.div 
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white shadow-xl border border-gray-100 flex items-center justify-center shrink-0 cursor-pointer group"
                  title="Salesforce Integration"
                >
                  <FaSalesforce className="w-8 h-8 sm:w-9 sm:h-9 text-[#00A1E0] group-hover:scale-110 transition-transform drop-shadow-sm" />
                </motion.div>

                {/* Slack Authentic 4-Color Logo */}
                <motion.div 
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white shadow-xl border border-gray-100 flex items-center justify-center shrink-0 cursor-pointer group"
                  title="Slack Workspaces"
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform" viewBox="0 0 127 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.4 80c0 7.4-6 13.4-13.4 13.4S.6 87.4.6 80s6-13.4 13.4-13.4h13.4V80zm6.7 0c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v33.5c0 7.4-6 13.4-13.4 13.4s-13.4-6-13.4-13.4V80z" fill="#E01E5A"/>
                    <path d="M47.5 27.4c-7.4 0-13.4-6-13.4-13.4S40.1.6 47.5.6s13.4 6 13.4 13.4v13.4H47.5zm0 6.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4H14c-7.4 0-13.4-6-13.4-13.4S6.6 34.1 14 34.1h33.5z" fill="#36C5F0"/>
                    <path d="M99.6 47.5c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4-6 13.4-13.4 13.4H99.6V47.5zm-6.7 0c0 7.4-6 13.4-13.4 13.4s-13.4-6-13.4-13.4V14c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v33.5z" fill="#2EB67D"/>
                    <path d="M79.5 99.6c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4-13.4-6-13.4-13.4V99.6h13.4zm0-6.7c-7.4 0-13.4-6-13.4-13.4s6-13.4 13.4-13.4h33.5c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4H79.5z" fill="#ECB22E"/>
                  </svg>
                </motion.div>

                {/* CENTRAL HELLEIOUS LOGO BADGE */}
                <motion.div 
                  whileHover={{ scale: 1.08, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white shadow-2xl border-4 border-gray-100 flex flex-col items-center justify-center shrink-0 cursor-pointer group text-center space-y-1.5 p-2 z-20"
                >
                  <div className="grid grid-cols-2 gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-md bg-gray-900 group-hover:scale-110 transition-transform shadow-sm" />
                    <span className="w-3.5 h-3.5 rounded-md bg-gray-900 group-hover:scale-110 transition-transform shadow-sm" />
                    <span className="w-3.5 h-3.5 rounded-md bg-gray-900 group-hover:scale-110 transition-transform shadow-sm" />
                    <span className="w-3.5 h-3.5 rounded-md bg-gray-900 group-hover:scale-110 transition-transform shadow-sm" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest text-gray-900 uppercase">
                    HELLEIOUS
                  </span>
                </motion.div>

                {/* Snowflake Authentic Cyan Logo */}
                <motion.div 
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white shadow-xl border border-gray-100 flex items-center justify-center shrink-0 cursor-pointer group"
                  title="Snowflake Data Cloud"
                >
                  <SiSnowflake className="w-9 h-9 sm:w-11 sm:h-11 text-[#29B5E8] group-hover:scale-110 transition-transform drop-shadow-sm" />
                </motion.div>

                {/* PostgreSQL Authentic Blue Logo */}
                <motion.div 
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white shadow-xl border border-gray-100 flex items-center justify-center shrink-0 cursor-pointer group"
                  title="PostgreSQL Enterprise DB"
                >
                  <SiPostgresql className="w-8 h-8 sm:w-9 sm:h-9 text-[#336791] group-hover:scale-110 transition-transform drop-shadow-sm" />
                </motion.div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 4: Enterprise Security & Governance */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-gray-200 dark:border-white/10 space-y-24">
        
        {/* Top 2-Column: Security Badges Graphic + Security Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column Graphic Card with Certification Badges */}
          <div className="lg:col-span-6">
            <div className="w-full min-h-[400px] rounded-2xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 hover:border-gray-400 dark:hover:border-white/30 p-6 sm:p-8 relative overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-300 flex flex-col justify-between items-center">
              
              {/* Ambient Dot Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#000000_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-10 dark:opacity-25" />

              {/* Top Zero-Trust Status Bar */}
              <div 
                className="w-full flex items-center justify-between z-10 text-xs font-sans font-semibold text-gray-200 px-1 py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white font-semibold">Zero-Trust Guardrails</span>
                </div>
              </div>

              {/* 3 Interactive Obsidian Glass Seals */}
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-6">
                
                {/* Seal 1: SOC 2 TYPE II */}
                <motion.div 
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white text-black flex flex-col items-center justify-center p-4 text-center shadow-2xl border border-gray-100 cursor-pointer group space-y-2"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center group-hover:bg-black transition-colors shadow-md">
                    <FaShieldHalved className="w-4 h-4 text-white" />
                  </div>

                  <div className="space-y-0.5">
                    <h5 className="text-xs font-semibold tracking-tight text-gray-900">SOC 2 TYPE II</h5>
                    <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">AICPA CERTIFIED</p>
                  </div>
                </motion.div>

                {/* Seal 2: ISO 27001 */}
                <motion.div 
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white text-black flex flex-col items-center justify-center p-4 text-center shadow-2xl border border-gray-100 cursor-pointer group space-y-2"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center group-hover:bg-black transition-colors shadow-md">
                    <FaUserShield className="w-4 h-4 text-white" />
                  </div>

                  <div className="space-y-0.5">
                    <h5 className="text-xs font-semibold tracking-tight text-gray-900">ISO 27001</h5>
                    <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">INFO SECURITY</p>
                  </div>
                </motion.div>

                {/* Seal 3: GDPR & CCPA */}
                <motion.div 
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white text-black flex flex-col items-center justify-center p-4 text-center shadow-2xl border border-gray-100 cursor-pointer group space-y-2"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center group-hover:bg-black transition-colors shadow-md">
                    <FaGlobe className="w-4 h-4 text-white" />
                  </div>

                  <div className="space-y-0.5">
                    <h5 className="text-xs font-semibold tracking-tight text-gray-900">GDPR & CCPA</h5>
                    <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">ZERO DATA RETENTION</p>
                  </div>
                </motion.div>

              </div>

              {/* Bottom Security Footer */}
              <div className="w-full text-center pt-2 border-t border-white/10 z-10">
                <p className="text-[11px] text-gray-400 font-medium">
                  Continuous Automated Audits & End-to-End HSM Key Management
                </p>
              </div>

            </div>
          </div>

          {/* Right Column Security Text */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight leading-tight">
              Built-in enterprise security
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed">
              Keep data private and in your control with encryption and configurable policies.
            </p>

            <div className="pt-2">
              <Link
                to="/privacy-center"
                className="px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-xs hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-md inline-block"
              >
                View enterprise privacy
              </Link>
            </div>
          </div>
        </div>

      {/* Section: And much more */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight">
            And much more
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-medium">
            Everything your enterprise needs to deploy, manage, and govern intelligent multi-agent OS solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8 sm:gap-x-12">
          {moreFeatures.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.02 }}
              className="flex items-start gap-4 group"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pt-0.5">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

        {/* Bottom Pitch Dark Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full text-center space-y-6 py-12 relative overflow-hidden"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Transform your organization with intelligent solutions
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            See how Helleious can help you scale AI securely and responsibly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Try Helleious.ai</span>
              <span className="text-base">↗</span>
            </Link>

            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 text-gray-900 dark:text-white font-semibold text-sm transition-all border border-gray-300 dark:border-white/15 flex items-center gap-2"
            >
              <span>Contact sales</span>
            </a>
          </div>
        </motion.div>

      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HelleiousPage;
