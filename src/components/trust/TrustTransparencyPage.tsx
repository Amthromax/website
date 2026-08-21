import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

interface TrustPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  metrics: { label: string; value: string }[];
}

const trustPillars: TrustPillar[] = [
  {
    id: "ethical-ai",
    number: "01",
    title: "Ethical AI Alignment & Governance",
    subtitle: "Safety-first agent deployment with multi-tiered human oversight and adversarial alignment.",
    description: "Every autonomous model and neural workflow running on Amthromax infrastructure undergoes continuous red-teaming, alignment benchmarking, and bias auditing before enterprise deployment.",
    details: [
      "Independent internal & third-party AI safety red-teaming",
      "Deterministic Action Firewalls for autonomous agent tool calls",
      "Strict prohibition of unvetted auto-executable code in production environments",
      "Real-time alignment evaluations against standardized safety benchmarks"
    ],
    metrics: [
      { label: "Alignment Audit Pass Rate", value: "99.94%" },
      { label: "Safety Evaluation Latency", value: "< 2.1ms" }
    ]
  },
  {
    id: "data-privacy",
    number: "02",
    title: "Data Sovereignty & Zero Training Retention",
    subtitle: "Your proprietary code, data, and workflows belong strictly to your enterprise.",
    description: "Amthromax enforces zero-data-retention policies across all commercial API endpoints and managed agent clusters. Customer data is never used to train foundation models without explicit written opt-in.",
    details: [
      "Zero-data-retention (ZDR) policy enforced across all LLM inference routers",
      "AES-256 encryption at rest & TLS 1.3 encryption in transit with custom KMS keys",
      "Isolated single-tenant workspace clusters with VPC peering options",
      "Automated ephemeral data scrubbing upon session termination"
    ],
    metrics: [
      { label: "Model Training Opt-In Default", value: "0% (Never)" },
      { label: "Data Encryption Standard", value: "AES-256-GCM" }
    ]
  },
  {
    id: "auditability",
    number: "03",
    title: "Cryptographic Auditability & SBOM Transparency",
    subtitle: "Verifiable lineage and transparent software supply chain verification.",
    description: "We provide complete lineage provenance for every model checkpoint, dataset split, and agent action trace, enabling full compliance audits for regulated industries.",
    details: [
      "Cryptographically signed Software Bill of Materials (SBOM) for all container images",
      "Immutable execution logs for agentic workflow decision paths",
      "SOC 2 Type II & ISO/IEC 27001 certified security architecture",
      "Public real-time incident reports and security transparency logs"
    ],
    metrics: [
      { label: "SOC 2 Type II", value: "Certified" },
      { label: "Audit Log Integrity", value: "SHA-256 Signed" }
    ]
  },
  {
    id: "open-research",
    number: "04",
    title: "Open Research & Responsible Disclosure",
    subtitle: "Advancing frontier AI safety research through open peer-reviewed whitepapers.",
    description: "We believe long-term trust is earned through peer validation. Amthromax regularly publishes technical benchmarks, safety architecture documentation, and vulnerability disclosures to the global R&D community.",
    details: [
      "Open access to Amthromax R&D research publications & whitepapers",
      "Responsible vulnerability disclosure program with dedicated security rewards",
      "Collaborative safety benchmarks with academic institutions & peer labs",
      "Transparent reporting of system capabilities, limitations, and edge failure cases"
    ],
    metrics: [
      { label: "Peer-Reviewed Publications", value: "34+" },
      { label: "Bug Bounty Response Time", value: "< 4 Hours" }
    ]
  }
];

const TrustTransparencyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("ethical-ai");

  const selectedPillar = trustPillars.find((p) => p.id === activeTab) || trustPillars[0];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300 antialiased">
      <SEO
        title="Trust & Transparency | Amthromax R&D"
        description="Explore Amthromax's commitments to ethical AI governance, zero data retention, cryptographic auditability, and open safety research."
      />

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-b border-gray-200 dark:border-white/10">
        <div className="max-w-4xl space-y-6">

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-gray-900 dark:text-white tracking-tight leading-[1.08]">
            Trust & Transparency <br />
            at Amthromax
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed max-w-2xl">
            Our unwavering commitment to ethical AI alignment, customer data sovereignty, verifiable model lineage, and transparent open research.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center text-xs text-gray-600 dark:text-gray-400 font-medium">
            <span className="flex items-center gap-1.5 text-gray-900 dark:text-white font-semibold">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              SOC 2 Type II Certified
            </span>
            <span className="text-gray-300 dark:text-white/20">•</span>
            <span className="flex items-center gap-1.5 text-gray-900 dark:text-white font-semibold">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Zero-Data Retention Default
            </span>
            <span className="text-gray-300 dark:text-white/20">•</span>
            <span className="flex items-center gap-1.5 text-gray-900 dark:text-white font-semibold">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              ISO/IEC 27001 Compliant
            </span>
          </div>
        </div>
      </section>

      {/* Trust Metrics Bar */}
      <section className="py-12 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-b border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Uptime SLA</p>
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">99.99%</p>
            <p className="text-[11px] text-gray-500">Multi-region active failover</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer Data Opt-In</p>
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">0%</p>
            <p className="text-[11px] text-gray-500">Never used for foundational training</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Encryption Standard</p>
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">AES-256</p>
            <p className="text-[11px] text-gray-500">At rest & TLS 1.3 in transit</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Safety Audits</p>
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">Quarterly</p>
            <p className="text-[11px] text-gray-500">Independent red-team reviews</p>
          </div>
        </div>
      </section>

      {/* Four Pillars Interactive Section */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-b border-gray-200 dark:border-white/10 space-y-16">
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-serif text-gray-900 dark:text-white tracking-tight">
            Our Core Principles of Trust
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
            Architected from the ground up to ensure enterprise safety, legal compliance, and verifiable transparency.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 border-b border-gray-200 dark:border-white/10 pb-4">
          {trustPillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActiveTab(pillar.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === pillar.id
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:text-black hover:bg-gray-200 dark:bg-white/[0.04] dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 border border-gray-200 dark:border-white/5"
              }`}
            >
              {pillar.number}. {pillar.title}
            </button>
          ))}
        </div>

        {/* Pillar Details Card */}
        <motion.div
          key={selectedPillar.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Summary */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
              Pillar {selectedPillar.number}
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-gray-900 dark:text-white tracking-tight leading-snug">
              {selectedPillar.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              {selectedPillar.description}
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-gray-200 dark:border-white/10">
              {selectedPillar.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">{m.label}</span>
                  <span className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Checklist */}
          <div className="lg:col-span-6 space-y-4 border-l border-gray-200 dark:border-white/10 pl-6 lg:pl-10">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
              Key Safeguards & Protocol Enforcements
            </h4>
            <div className="space-y-4">
              {selectedPillar.details.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 py-3 border-b border-gray-100 dark:border-white/5">
                  <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-900 dark:bg-white/10 dark:text-white flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-normal leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Compliance & Certification Downloads Section */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-white tracking-tight">
              Compliance Documentation & Resources
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-normal">
              Access third-party audit summaries, privacy impact assessments, and security whitepapers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/privacy-center" className="group block border-t border-gray-200 dark:border-white/10 pt-6 pb-4 hover:border-gray-400 dark:hover:border-white/30 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Compliance Report</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                SOC 2 Type II Security Report Summary ›
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                Independent examination report verifying system security, availability, and confidentiality controls.
              </p>
            </div>
          </Link>

          <Link to="/security" className="group block border-t border-gray-200 dark:border-white/10 pt-6 pb-4 hover:border-gray-400 dark:hover:border-white/30 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Architecture Whitepaper</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Zero-Trust AI Agent Execution Specs ›
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                Technical specification on memory isolation, eBPF firewalling, and deterministic action restrictions.
              </p>
            </div>
          </Link>

          <Link to="/data-protection" className="group block border-t border-gray-200 dark:border-white/10 pt-6 pb-4 hover:border-gray-400 dark:hover:border-white/30 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Legal Framework</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Data Processing Addendum (DPA) ›
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                Standard contractual clauses and GDPR/CCPA data protection guarantees for enterprise subscribers.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION: Security Compliance & Accreditation */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-black text-gray-900 dark:text-white text-center">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">
            Security compliance &<br className="hidden sm:inline" /> accreditation
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-white font-normal leading-relaxed max-w-3xl mx-auto">
            Amthromax supports our customers’ compliance with privacy laws, including the GDPR, CCPA, HIPAA, and FERPA, and offers a Data Processing Addendum and Business Associate Agreement for customers. The infrastructure supporting API and Amthromax Enterprise, Business, Edu, for Developers and for Healthcare products has been evaluated by an independent third-party auditor to confirm that our controls align with industry standards for security and confidentiality.
          </p>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Visit{" "}
            <Link to="/security" className="text-gray-900 dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium">
              Amthromax trust portal
            </Link>{" "}
            to learn more about our security controls, and{" "}
            <Link to="/data-protection" className="text-gray-900 dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium">
              product compliance page
            </Link>{" "}
            to view compliance status by products.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TrustTransparencyPage;
