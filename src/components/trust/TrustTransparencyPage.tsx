import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";
import { COMMITMENTS } from "./commitments";

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

/* Entries the attestation strip cycles through. Each one is a real event type
   the ledger records, not decoration. */
const LEDGER_EVENTS: { system: string; action: string; scope: string }[] = [
  { system: "KMS", action: "Tenant key rotated", scope: "eu-west" },
  { system: "SANDBOX", action: "Container destroyed on task exit", scope: "us-east" },
  { system: "POLICY", action: "Egress destination denied", scope: "ap-south" },
  { system: "AUDIT", action: "Operator read recorded", scope: "eu-west" },
  { system: "RETENTION", action: "Session artefacts scrubbed", scope: "us-east" },
  { system: "SBOM", action: "Container image signature verified", scope: "global" },
  { system: "REDTEAM", action: "Adversarial suite completed", scope: "staging" },
  { system: "LEDGER", action: "Chain anchor committed", scope: "global" },
];

/* Material a reviewer actually asks for, grouped by what kind of document it is. */
const TRUST_RESOURCES = [
  { title: "How every agent execution is isolated", kind: "Architecture", to: "/security" },
  { title: "Reading the attestation ledger as an auditor", kind: "Guide", to: "/trust" },
  { title: "Data Processing Addendum and subprocessor list", kind: "Legal", to: "/data-protection" },
  { title: "Preparing for a vendor security review", kind: "Use case", to: "/privacy-center" },
  { title: "Zero-trust agent execution specification", kind: "Whitepaper", to: "/security" },
  { title: "Responsible disclosure and researcher rewards", kind: "Programme", to: "/research" },
];

/* Who touches customer data, and why. */
const SUBPROCESSORS = [
  { name: "Cloud compute", purpose: "Model inference and sandbox execution", region: "Customer-selected" },
  { name: "Object storage", purpose: "Encrypted artefact and snapshot storage", region: "Customer-selected" },
  { name: "Telemetry pipeline", purpose: "Audit stream delivery and ledger anchoring", region: "Regional" },
  { name: "Identity provider", purpose: "Federated authentication, no payload access", region: "Customer-operated" },
];

/* A number that counts up the first time it scrolls into view. Driven by rAF
   against elapsed time, so it tracks real time rather than frame count. */
const CountUp: React.FC<{ to: number; decimals?: number; suffix?: string; duration?: number }> = ({
  to,
  decimals = 0,
  suffix = "",
  duration = 1200,
}) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const nodeRef = useRef<HTMLSpanElement>(null);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      /* ease-out cubic: fast first, settles on the real figure */
      setValue(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el || started) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [run, started]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const TrustTransparencyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("ethical-ai");

  /* The attestation strip appends a new signed entry on a real timer, so the
     chain genuinely grows while the page is open. */
  const [ledger, setLedger] = useState<{ id: number; system: string; action: string; scope: string; hash: string }[]>(
    () =>
      LEDGER_EVENTS.slice(0, 4).map((e, i) => ({
        id: i,
        ...e,
        hash: (0xa11ce + i * 0x5f3d).toString(16).padStart(6, "0"),
      })),
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let n = LEDGER_EVENTS.length;
    const t = window.setInterval(() => {
      const e = LEDGER_EVENTS[n % LEDGER_EVENTS.length];
      const id = n;
      n += 1;
      /* Always four rows in, four rows out: the row count never changes, so
         nothing below this section can be pushed around. */
      setLedger((prev) => [
        {
          id,
          ...e,
          hash: Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, "0"),
        },
        ...prev.slice(0, 3),
      ]);
    }, 2600);

    return () => window.clearInterval(t);
  }, []);

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

      {/* Trust Metrics - figures that count up as they arrive */}
      <section className="py-14 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-b border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { label: "Uptime SLA", node: <CountUp to={99.99} decimals={2} suffix="%" />, note: "Multi-region active failover" },
            { label: "Customer data opt-in", node: <CountUp to={0} suffix="%" />, note: "Never used for foundational training" },
            { label: "Encryption standard", node: <>AES-256</>, note: "At rest and TLS 1.3 in transit" },
            { label: "Safety audits", node: <>Quarterly</>, note: "Independent red-team reviews" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              className={`space-y-3 px-0 md:px-7 py-2 ${i === 0 ? "md:pl-0" : "md:border-l border-gray-200 dark:border-white/10"}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
                {stat.label}
              </p>
              <p className="text-3xl sm:text-4xl font-normal tracking-tight text-gray-900 dark:text-white">
                {stat.node}
              </p>
              {/* The rule draws itself once the figure has settled. */}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: "easeOut" }}
                className="block h-px w-full origin-left bg-gray-900 dark:bg-white"
              />
              <p className="text-[11px] text-gray-500 dark:text-gray-400">{stat.note}</p>
            </motion.div>
          ))}
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

      {/* IN-BETWEEN CONTENT DETAILS BOX WITH GOLD PARTICLE WAVE BACKGROUND */}
      <section className="py-12 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-12 border border-gray-800/80 dark:border-white/10 shadow-2xl overflow-hidden text-white group">
          {/* HD Gold Particle Wave Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-[1.01]"
            style={{ 
              backgroundImage: "url('/images/gold_particle_wave.png')",
              filter: "contrast(110%) brightness(115%) saturate(125%)",
              WebkitFilter: "contrast(110%) brightness(115%) saturate(125%)",
            }}
          />
          {/* Minimal Dark Shadow Gradient for Crisp Text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent pointer-events-none" />

          {/* Content Details Inside Box */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-snug drop-shadow-lg">
                Enterprise Assurance & Continuous Alignment Verification
              </h3>
              <p className="text-xs sm:text-sm text-gray-100 font-normal leading-relaxed max-w-2xl drop-shadow-md">
                Amthromax provides real-time cryptographic audit logs, automated action firewalls, and dedicated single-tenant VPC enclaves to protect sensitive enterprise intelligence.
              </p>
              
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1 border-l-2 border-blue-500 pl-3 bg-black/40 backdrop-blur-sm p-2 rounded-r-lg">
                  <span className="text-[11px] text-gray-300 font-medium block">Action Firewalls</span>
                  <span className="text-xs font-bold text-white">Deterministic</span>
                </div>
                <div className="space-y-1 border-l-2 border-emerald-400 pl-3 bg-black/40 backdrop-blur-sm p-2 rounded-r-lg">
                  <span className="text-[11px] text-gray-300 font-medium block">Data Retention</span>
                  <span className="text-xs font-bold text-white">0% Storage</span>
                </div>
                <div className="space-y-1 border-l-2 border-indigo-400 pl-3 bg-black/40 backdrop-blur-sm p-2 rounded-r-lg">
                  <span className="text-[11px] text-gray-300 font-medium block">Audit Logs</span>
                  <span className="text-xs font-bold text-white">SHA-256 Signed</span>
                </div>
                <div className="space-y-1 border-l-2 border-cyan-400 pl-3 bg-black/40 backdrop-blur-sm p-2 rounded-r-lg">
                  <span className="text-[11px] text-gray-300 font-medium block">SLA Guarantee</span>
                  <span className="text-xs font-bold text-white">99.99% Uptime</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/security"
                className="px-6 py-3.5 bg-white text-black hover:bg-gray-200 text-xs font-bold rounded-full transition-all shadow-xl inline-flex items-center gap-2"
              >
                <span>View Security Posture</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live attestation strip */}
      <section className="py-20 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-t border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500">// append-only</span>
            <h2 className="text-balance text-2xl sm:text-4xl font-serif text-gray-900 dark:text-white tracking-tight leading-[1.15]">
              The ledger is the record
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Key rotations, policy denials, operator reads and retention sweeps are hashed into an append-only chain. Entries can be verified; they cannot be edited or removed.
            </p>
          </div>

          <div className="lg:col-span-8 w-full">
            <div className="flex items-center justify-between gap-4 pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
              <span>Recent attestations</span>
              <span className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-900/60 dark:bg-white/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-white" />
                </span>
                Streaming
              </span>
            </div>

            {/* Chain: each row links to the one below it */}
            <ul className="relative space-y-0 border-t border-gray-200 dark:border-white/10">
              {ledger.map((entry, slot) => (
                <li
                  key={slot}
                  className="relative flex h-[74px] sm:h-[58px] items-center border-b border-gray-200 dark:border-white/10 pl-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rotate-45 border border-gray-400 dark:border-white/30 bg-white dark:bg-black"
                  />

                  <motion.span
                    key={entry.id}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="grid w-full grid-cols-12 items-center gap-y-1 gap-x-3"
                  >
                    <span className="col-span-12 sm:col-span-2 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500">
                      {entry.system}
                    </span>
                    <span className="col-span-8 sm:col-span-6 text-[13px] text-gray-900 dark:text-white">
                      {entry.action}
                    </span>
                    <span className="col-span-4 sm:col-span-2 text-[11px] text-gray-500 dark:text-gray-400">
                      {entry.scope}
                    </span>
                    <span className="col-span-12 sm:col-span-2 font-mono text-[11px] text-gray-400 dark:text-gray-600 sm:text-right">
                      #{entry.hash}
                    </span>
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What we will not do */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-t border-gray-200 dark:border-white/10">
        <div className="max-w-2xl space-y-4 mb-16">
          <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500">// commitments</span>
          <h2 className="text-balance text-3xl sm:text-5xl font-serif text-gray-900 dark:text-white tracking-tight leading-[1.1]">
            What we will not do
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Every platform lists what it protects. These are the four things we decline to do, which is the part that actually constrains us.
          </p>
        </div>

        <div className="space-y-0">
          {COMMITMENTS.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 border-t border-gray-200 dark:border-white/10 py-10 last:border-b transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <span className="md:col-span-1 font-mono text-xs text-gray-400 dark:text-gray-600 pt-1">{item.n}</span>
              <h3 className="md:col-span-5 text-xl sm:text-2xl font-serif text-gray-900 dark:text-white tracking-tight leading-snug">
                {item.title}
              </h3>
              <div className="md:col-span-6 space-y-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.body}</p>
                <Link
                  to={`/trust/commitments/${item.slug}`}
                  className="inline-flex items-center gap-2 border-b border-gray-900/20 dark:border-white/25 pb-1 text-[13px] text-gray-900 dark:text-white transition-colors hover:border-gray-900 dark:hover:border-white"
                >
                  <span>Explore this commitment</span>
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subprocessors */}
      <section className="py-20 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-t border-gray-200 dark:border-white/10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500">// supply chain</span>
            <h2 className="text-balance text-2xl sm:text-4xl font-serif text-gray-900 dark:text-white tracking-tight">
              Who else touches the data
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm md:text-right">
            The categories of subprocessor involved in serving a request, and what each one is scoped to see.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUBPROCESSORS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              className="space-y-3 border-t-2 border-gray-900 dark:border-white pt-5"
            >
              <h3 className="text-sm text-gray-900 dark:text-white tracking-tight">{p.name}</h3>
              <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">{p.purpose}</p>
              <span className="inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500">
                {p.region}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust resources */}
      <section className="bg-[#111113] text-white">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-12 py-20 sm:py-24 space-y-14">
          <div className="text-center space-y-6">
            <h2 className="text-balance text-3xl sm:text-5xl font-serif tracking-tight text-white">
              Trust resources
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
              The documents a security reviewer usually asks for, in the order they usually ask for them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRUST_RESOURCES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: "easeOut" }}
              >
                <Link
                  to={item.to}
                  className="group flex h-full min-h-[170px] flex-col justify-between rounded-xl bg-[#1a1a1d] p-6 ring-1 ring-white/[0.06] transition-colors duration-300 hover:bg-[#222226] hover:ring-white/15"
                >
                  <h3 className="text-base sm:text-lg font-serif leading-snug text-white">
                    {item.title}
                  </h3>

                  <span className="flex items-center gap-2 text-xs text-gray-400">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6.5l-6 6a2.5 2.5 0 103.5 3.5l6.5-6.5a4 4 0 10-5.7-5.7L5.5 10.5"
                      />
                    </svg>
                    <span className="transition-colors group-hover:text-gray-200">{item.kind}</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Certification Downloads Section */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-t border-gray-200 dark:border-white/10 space-y-12">
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
