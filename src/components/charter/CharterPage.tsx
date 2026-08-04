import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

const CharterPage: React.FC = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: commitmentsRef, inView: commitmentsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: governanceRef, inView: governanceInView } = useInView({ triggerOnce: true, threshold: 0.1 });

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300"
        >
          <span>⚖️</span>
          <span>Foundational Principles</span>
        </motion.div>

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

      {/* 4. Governance & Safety Framework Section */}
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

      {/* 5. Bottom Action CTA Section */}
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
