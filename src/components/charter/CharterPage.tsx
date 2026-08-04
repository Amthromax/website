import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

interface StageDetail {
  id: string;
  stage: string;
  name: string;
  badge: string;
  description: string;
  techSpecs: string[];
}

interface YearGrowth {
  year: string;
  label: string;
  inferences: string;
  targetScale: string;
  regions: number;
  barHeight: number; // percentage for chart
  status: "Past Baseline" | "Current (Now)" | "Coming Year" | "Projected Target";
  highlight: boolean;
  milestone: string;
  growthRate: string;
}

const CharterPage: React.FC = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: commitmentsRef, inView: commitmentsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: diagramRef, inView: diagramInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: growthRef, inView: growthInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: governanceRef, inView: governanceInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [activeStage, setActiveStage] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(1); // Default to 2026 (Now) index 1

  const architectureStages: StageDetail[] = [
    {
      id: "stage-1",
      stage: "Stage 01",
      name: "Model Ingestion & Neural Layer",
      badge: "Cognitive Processing",
      description: "Proprietary transformer models process incoming high-throughput telemetry and autonomous agent requests.",
      techSpecs: [
        "Sub-10ms neural inferencing",
        "Dynamic weight allocation",
        "Multi-modal context windows (2M+ tokens)"
      ]
    },
    {
      id: "stage-2",
      stage: "Stage 02",
      name: "Alignment & Safety Guardrails",
      badge: "Constitutional Veto",
      description: "Real-time safety circuits inspect model intent, preventing prompt injection, data drift, or unauthorized actions.",
      techSpecs: [
        "Hardware-isolated veto board",
        "Continuous constitutional evaluation",
        "Zero-latency safety boundary checks"
      ]
    },
    {
      id: "stage-3",
      stage: "Stage 03",
      name: "Quantum Cryptographic Tunnel",
      badge: "Zero-Trust Encryption",
      description: "Data payloads are encrypted using lattice-based post-quantum cryptography before cross-region dispatch.",
      techSpecs: [
        "CRYSTALS-Kyber-1024 Key Exchange",
        "Lattice-based signature verification",
        "Hardware Security Module (HSM) isolation"
      ]
    },
    {
      id: "stage-4",
      stage: "Stage 04",
      name: "Edge Execution & Global Mesh",
      badge: "99.999% SLA Uptime",
      description: "Validated execution instructions deploy across 40+ sovereign cloud regions with strict regional data residency.",
      techSpecs: [
        "Multi-region auto-failover clusters",
        "Sovereign data boundary compliance",
        "Real-time distributed ledger audit trail"
      ]
    }
  ];

  const growthData: YearGrowth[] = [
    {
      year: "2025",
      label: "Foundation & Baseline R&D",
      inferences: "60M / day",
      targetScale: "60M Daily Target",
      regions: 32,
      barHeight: 20,
      status: "Past Baseline",
      highlight: false,
      milestone: "Baseline infrastructure deployment & multi-agent model evaluation across 32 cloud regions.",
      growthRate: "Baseline Scale"
    },
    {
      year: "2026",
      label: "Global Operations (Now)",
      inferences: "100M+ / day",
      targetScale: "100M+ Daily Target",
      regions: 40,
      barHeight: 40,
      status: "Current (Now)",
      highlight: true,
      milestone: "Commercial global deployment with 99.999% SLA uptime across 40+ sovereign cloud regions.",
      growthRate: "+66% Target Growth"
    },
    {
      year: "2027",
      label: "Coming Year (Scale Surge)",
      inferences: "350M+ / day",
      targetScale: "350M+ Daily Target",
      regions: 65,
      barHeight: 60,
      status: "Coming Year",
      highlight: true,
      milestone: "Expansion into 65+ global regions with next-gen autonomous cognitive mesh architecture.",
      growthRate: "+250% Target Surge"
    },
    {
      year: "2028",
      label: "Autonomous Enterprise Scale",
      inferences: "800M+ / day",
      targetScale: "800M+ Daily Target",
      regions: 100,
      barHeight: 75,
      status: "Projected Target",
      highlight: false,
      milestone: "Universal sovereign computational backbone for Fortune 500 enterprise networks.",
      growthRate: "+128% Target Growth"
    },
    {
      year: "2029",
      label: "Global Mesh Horizon",
      inferences: "1.8B+ / day",
      targetScale: "1.8B+ Daily Target",
      regions: 150,
      barHeight: 88,
      status: "Projected Target",
      highlight: false,
      milestone: "Lattice-encrypted post-quantum cognitive mesh serving sovereign entities worldwide.",
      growthRate: "+125% Target Scale"
    },
    {
      year: "2030",
      label: "Universal AGI Infrastructure",
      inferences: "5B+ / day",
      targetScale: "5B+ Daily Target",
      regions: 250,
      barHeight: 100,
      status: "Projected Target",
      highlight: false,
      milestone: "Fully autonomous, zero-trust AGI computational infrastructure operating globally.",
      growthRate: "+177% Target Scale"
    }
  ];

  const commitments = [
    {
      number: "01",
      title: "Broadly Beneficial AGI & Autonomous Systems",
      subtitle: "Prioritizing Universal Human & Economic Flourishing",
      description:
        "We commit to using our computational resources and cognitive software models to benefit all of humanity. We actively construct systems that democratize advanced intelligence, remove operational friction across industries, and prevent dangerous concentration of technological capability.",
      principles: [
        "Distributing cognitive tools to public institutions and global enterprises alike",
        "Refusing deployments that deliberately exacerbate systemic inequality",
        "Ensuring data sovereignty and localized economic empowerment"
      ]
    },
    {
      number: "02",
      title: "Long-Term Safety & Alignment First",
      subtitle: "Rigorous Verification Over Unvetted Speed",
      description:
        "Safety is not an after-thought; it is integrated into the core neural architecture. We pledge to delay or halt deployment of any advanced model if alignment verification, post-quantum cryptographic safety, or boundary controls fall short of our uncompromising standards.",
      principles: [
        "Hardware-enforced zero-trust key isolation for agent execution",
        "Continuous automated alignment testing across multi-agent networks",
        "Mandatory external safety audits prior to frontier model releases"
      ]
    },
    {
      number: "03",
      title: "Technical Leadership & Open Research",
      subtitle: "Fostering Global Standards Through Shared Knowledge",
      description:
        "To address global AI safety challenges effectively, we lead in fundamental research and share security tools, whitepapers, and interoperability protocols with the broader scientific community whenever safe to do so.",
      principles: [
        "Publishing peer-reviewed papers on system resilience and post-quantum encryption",
        "Open-sourcing alignment verification frameworks for autonomous agents",
        "Collaborating with academic research labs globally"
      ]
    },
    {
      number: "04",
      title: "Cooperative & Governance Orientation",
      subtitle: "Uniting Enterprise, Academic, and Regulatory Leaders",
      description:
        "We actively avoid zero-sum competitive dynamics. Should another research institution approach beneficial AGI before us, we pledge to assist their alignment and safety validation rather than rushing a competing product to market.",
      principles: [
        "Establishing shared safety standards with leading AI research institutions",
        "Providing technical counsel to international regulatory bodies",
        "Maintaining transparent governance with independent oversight"
      ]
    }
  ];

  const governancePillars = [
    {
      title: "Independent Safety Board",
      desc: "Our safety council holds veto authority over any frontier model deployment that fails safety protocols."
    },
    {
      title: "Continuous Observability",
      desc: "Real-time telemetry monitors autonomous agent behaviors, latency, and boundary parameters across global regions."
    },
    {
      title: "Quantum-Safe Infrastructure",
      desc: "All agent communications are encrypted with CRYSTALS-Kyber and lattice-based post-quantum algorithms."
    },
    {
      title: "Ethical Data Stewardship",
      desc: "Strict adherence to zero-retention data residency laws, enterprise privacy, and sovereign client boundaries."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#0a0a0d] text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      <SEO
        title="Our Charter | Amthromax AI"
        description="The Amthromax Charter outlines our foundational commitments to broadly beneficial AI, safety alignment, open research, and cooperative governance."
      />

      {/* 1. Hero Section */}
      <section ref={heroRef} className="pt-28 pb-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto"
        >
          The Amthromax Charter
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Our mission is to ensure that artificial general intelligence and autonomous software systems serve the public interest, safeguard human dignity, and elevate enterprise capability across the globe.
        </motion.p>
      </section>

      {/* 2. Executive Statement Banner */}
      <section className="py-12 border-y border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121318]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto space-y-4 text-center md:text-left md:flex md:items-center md:justify-between md:gap-12">
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
              "We believe advanced AI must be developed with unyielding ethical rigor, technical resilience, and universal accountability."
            </p>
            <div className="shrink-0 space-y-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
              <span className="block font-bold text-gray-900 dark:text-white">Amthromax Board of Directors</span>
              <span>San Francisco • London • Tokyo</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Charter Commitments Section */}
      <section ref={commitmentsRef} className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={commitmentsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Core Directives</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Our Four Pillar Commitments
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-medium">
            These non-negotiable mandates govern every research initiative, product feature, and commercial deployment at Amthromax.
          </p>
        </motion.div>

        <div className="space-y-16">
          {commitments.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={commitmentsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="grid md:grid-cols-12 gap-8 items-start border-b border-gray-200 dark:border-white/10 pb-16 last:border-b-0"
            >
              <div className="md:col-span-3 space-y-2">
                <span className="text-4xl md:text-5xl font-black text-gray-300 dark:text-gray-700 tracking-tight block">
                  {c.number}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-gray-500 dark:text-gray-400 block">
                  Pillar Commitment
                </span>
              </div>

              <div className="md:col-span-9 space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                    {c.title}
                  </h3>
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {c.subtitle}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                  {c.description}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">
                    Operational Execution:
                  </h4>
                  <ul className="space-y-2.5">
                    {c.principles.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                        <span className="text-gray-900 dark:text-white font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Safety Architecture Diagram Section */}
      <section ref={diagramRef} className="py-24 bg-gray-50 dark:bg-[#121318] border-y border-gray-200 dark:border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={diagramInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">System Architecture Flow</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Autonomous Safety Protocol Flow
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg font-medium leading-relaxed">
              An architectural pipeline showing how model requests traverse constitutional guardrails, lattice cryptography, and edge execution nodes.
            </p>
          </motion.div>

          {/* Interactive Visual Node Diagram */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {architectureStages.map((stg, idx) => {
                const isActive = activeStage === idx + 1;
                return (
                  <motion.div
                    key={stg.id}
                    onClick={() => setActiveStage(idx + 1)}
                    whileHover={{ y: -4 }}
                    className={`p-6 md:p-8 rounded-3xl border transition-all cursor-pointer space-y-4 relative ${
                      isActive
                        ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xl scale-[1.02]"
                        : "bg-white dark:bg-[#15161b] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black uppercase tracking-widest ${
                        isActive ? "text-gray-400 dark:text-gray-600" : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {stg.stage}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-white/20 text-white dark:bg-black/10 dark:text-black"
                          : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400"
                      }`}>
                        {stg.badge}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-extrabold tracking-tight leading-snug">
                      {stg.name}
                    </h3>

                    <p className={`text-xs md:text-sm font-medium leading-relaxed ${
                      isActive ? "text-gray-300 dark:text-gray-700" : "text-gray-600 dark:text-gray-400"
                    }`}>
                      {stg.description}
                    </p>

                    {/* Step indicator arrow */}
                    {idx < architectureStages.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center text-xs font-bold shadow-md">
                          →
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Stage Spec Detail Panel */}
            <div className="p-8 md:p-10 bg-white dark:bg-[#15161b] border border-gray-200 dark:border-white/10 rounded-3xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Active Architecture Stage
                  </span>
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white">
                    {architectureStages[activeStage - 1].name} — Detailed Specifications
                  </h4>
                </div>
                <div className="flex gap-2">
                  {architectureStages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStage(i + 1)}
                      className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                        activeStage === i + 1
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      0{i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-gray-150 dark:border-white/10">
                {architectureStages[activeStage - 1].techSpecs.map((spec, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
                      Parameter 0{sIdx + 1}
                    </span>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {spec}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Growth & Projections Chart (Current State & Coming Years) */}
      <section ref={growthRef} className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={growthInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Scale & Trajectory</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Computational Growth: Now & Coming Years
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg font-medium leading-relaxed">
            Historical milestones, current daily throughput (2026 NOW), and upcoming multi-year infrastructure expansions.
          </p>
        </motion.div>

        {/* Visual Growth Chart Container */}
        <div className="space-y-12">
          {/* Main Bar Visualizer */}
          <div className="p-8 md:p-12 bg-gray-50 dark:bg-[#121318] border border-gray-200 dark:border-white/10 rounded-3xl space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Daily Inferences & Computational Scale Targets (2025–2030)
              </span>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                  <span className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 inline-block" /> Past Baseline
                </span>
                <span className="flex items-center gap-1.5 text-gray-900 dark:text-white font-black">
                  <span className="w-3 h-3 rounded-full bg-black dark:bg-white inline-block" /> Current (Now) & Coming Year
                </span>
              </div>
            </div>

            {/* Chart Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-end min-h-[300px] pt-8">
              {growthData.map((g, idx) => {
                const isSelected = selectedYear === idx;
                return (
                  <div
                    key={g.year}
                    onClick={() => setSelectedYear(idx)}
                    className="group flex flex-col items-center space-y-4 cursor-pointer"
                  >
                    {/* Value Badge */}
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full transition-all ${
                      isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black scale-110 shadow-lg"
                        : "bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-200"
                    }`}>
                      {g.inferences}
                    </span>

                    {/* Vertical Bar */}
                    <div className="w-full max-w-[64px] bg-gray-200 dark:bg-white/5 rounded-2xl h-[200px] flex items-end p-1.5 relative overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${g.barHeight}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`w-full rounded-xl transition-colors ${
                          g.status === "Current (Now)"
                            ? "bg-gradient-to-t from-gray-900 to-black dark:from-gray-300 dark:to-white"
                            : g.status === "Coming Year"
                            ? "bg-gradient-to-t from-gray-700 to-gray-900 dark:from-gray-400 dark:to-gray-100"
                            : isSelected
                            ? "bg-black dark:bg-white"
                            : "bg-gray-400 dark:bg-gray-600 group-hover:bg-gray-600 dark:group-hover:bg-gray-400"
                        }`}
                      />
                    </div>

                    {/* Year & Status Label */}
                    <div className="text-center space-y-1">
                      <span className={`text-base font-extrabold block ${
                        isSelected ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
                      }`}>
                        {g.year}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                        g.status === "Current (Now)"
                          ? "text-black dark:text-white font-black"
                          : g.status === "Coming Year"
                          ? "text-gray-800 dark:text-gray-200 font-bold"
                          : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {g.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Year Milestone Detail Card */}
          <div className="p-8 md:p-10 bg-black text-white dark:bg-white dark:text-black rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/10 dark:bg-black/10 rounded-full text-xs font-black uppercase tracking-widest">
                  {growthData[selectedYear].year} Operational Scale & Target
                </span>
                <span className="text-xs font-bold opacity-80">
                  Status: {growthData[selectedYear].status}
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                {growthData[selectedYear].label}
              </h3>
              <p className="text-gray-300 dark:text-gray-700 text-base md:text-lg font-medium leading-relaxed">
                {growthData[selectedYear].milestone}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 shrink-0 text-center lg:text-right border-t lg:border-t-0 lg:border-l border-white/20 dark:border-black/20 pt-6 lg:pt-0 lg:pl-8 w-full lg:w-auto">
              <div>
                <span className="text-[10px] uppercase font-bold opacity-70 block mb-1">Target Capacity</span>
                <span className="text-xl md:text-2xl font-black">{growthData[selectedYear].targetScale}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold opacity-70 block mb-1">Cloud Regions</span>
                <span className="text-xl md:text-2xl font-black">{growthData[selectedYear].regions}+</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold opacity-70 block mb-1">Target Metric</span>
                <span className="text-xl md:text-2xl font-black">{growthData[selectedYear].growthRate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Governance & Safety Framework Section */}
      <section ref={governanceRef} className="py-24 bg-gray-50 dark:bg-[#121318] border-y border-gray-200 dark:border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={governanceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Safety & Governance</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Institutional Safeguards
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg font-medium leading-relaxed">
              How we translate our philosophical commitments into technical controls, architectural guarantees, and independent oversight.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {governancePillars.map((g, idx) => (
              <div key={idx} className="space-y-3">
                <span className="text-sm font-black text-gray-900 dark:text-white tracking-wider block">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {g.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom Action CTA Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="bg-black text-white rounded-[32px] p-8 md:p-14 border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Join Us in Building Responsible AI
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
              Explore our research whitepapers or connect with our alignment team to partner on safe enterprise technology.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              to="/research"
              className="px-7 py-4 bg-white text-black font-extrabold text-xs rounded-full hover:bg-gray-200 transition-all shadow-lg uppercase tracking-wider"
            >
              Read Research ↗
            </Link>
            <Link
              to="/contact"
              className="px-7 py-4 bg-white/10 text-white font-extrabold text-xs rounded-full hover:bg-white/20 transition-all border border-white/20 uppercase tracking-wider"
            >
              Contact Team ↗
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CharterPage;
