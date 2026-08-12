import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

const ResearchOverviewPage: React.FC = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: labsRef, inView: labsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: boardRef, inView: boardInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const labs = [
    {
      name: "Cognitive Intelligence Lab",
      focus: "Researching agentic coordination, custom LLM fine-tuning, and memory retention mechanisms.",
      tag: "Agentic AI",
      points: ["Autonomous LLM DAG DAG workflows", "Sub-50ms context retrieval engine", "Multi-modal reasoning architectures"]
    },
    {
      name: "Cryptographic Security Lab",
      focus: "Post-quantum lattice security, zero-trust cryptographic protocols, and secure sandboxing.",
      tag: "Quantum & Zero-Trust",
      points: ["NIST Lattice cryptography", "Zero-overhead kernel eBPF isolation", "Edge hardware token validation"]
    },
    {
      name: "Distributed Systems Lab",
      focus: "Federated SQL query compilation, edge compute synchronization, and auto-scaling middleware.",
      tag: "Cloud Infrastructure",
      points: ["Multi-region CRDT state sync", "Sub-100ms federated SQL execution", "Predictive traffic scaling algorithms"]
    }
  ];

  const board = [
    {
      name: "Dr. Elena Rostova",
      title: "Chief Scientific Officer",
      bio: "Former Distributed Systems Lead at MIT. Specialized in multi-cloud coordination protocol design."
    },
    {
      name: "Prof. Marcus Vance",
      title: "Senior Cryptography Advisor",
      bio: "20+ years researching post-quantum security algorithms and lattice-based authentication."
    },
    {
      name: "Dr. Sarah Chen",
      title: "Lead AI Researcher",
      bio: "Specialist in LSTM networks and reinforcement learning agents for active infrastructure scaling."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO 
        title="Research Overview | Amthromax R&D Labs" 
        description="Explore the scientific foundation, labs, and research teams behind Amthromax's cognitive models and zero-trust cloud pipelines." 
      />

      {/* Hero Header */}
      <div ref={heroRef} className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-zinc-950/60 to-black z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15),transparent_50%)] z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6 space-y-6"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-violet-400 font-semibold bg-violet-950/50 border border-violet-800/30 px-4 py-1.5 rounded-full">
            Scientific Overview
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Amthromax R&D Labs
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Where breakthrough theories meet industrial-scale engineering. We study, model, and build the future of AI, security, and cloud scalability.
          </p>
        </motion.div>
      </div>

      {/* R&D Labs Section - Apple Developer Box Aesthetics */}
      <div ref={labsRef} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6e6e73] dark:text-gray-400">Our Specialization</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">Three Pillars of Discovery</h2>
          <p className="text-[#6e6e73] dark:text-gray-400 text-base sm:text-lg leading-relaxed font-normal">
            Our researchers are distributed across three highly integrated labs, each dedicated to solving concrete bottlenecks in scaling modern enterprise applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {labs.map((lab, index) => (
            <motion.div 
              key={lab.name}
              initial={{ opacity: 0, y: 24 }}
              animate={labsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] p-8 sm:p-10 rounded-[28px] sm:rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-300 h-full"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0066cc] dark:text-[#2997ff] block mb-3">
                  {lab.tag}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white mb-3">
                  {lab.name}
                </h3>
                <p className="text-[#515154] dark:text-gray-300 text-sm sm:text-[15px] leading-relaxed font-normal mb-6">
                  {lab.focus}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#e5e5e7]/60 dark:border-white/10 mb-6">
                  {lab.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#0066cc] dark:text-[#2997ff] shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-[#515154] dark:text-gray-300 font-normal leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e5e7]/80 dark:border-white/10">
                <Link to="/research/publications" className="text-[15px] font-medium text-[#0066cc] dark:text-[#2997ff] hover:underline flex items-center gap-1.5">
                  <span>Browse Publications</span>
                  <span>›</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Advisory Board Section */}
      <div ref={boardRef} className="bg-white dark:bg-[#0a0a0c] py-24 transition-colors border-y border-[#e5e5e7] dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6e6e73] dark:text-gray-400">Research Leaders</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">Our Advisory Panel</h2>
            <p className="text-[#6e6e73] dark:text-gray-400 text-base leading-relaxed font-normal">
              Dr. Elena Rostova and our core research panel work shoulder-to-shoulder with engineering to deploy models directly to our client platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {board.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={boardInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#f5f5f7] dark:bg-[#161617] border border-[#e5e5e7]/80 dark:border-white/[0.08] p-8 sm:p-10 rounded-[28px] space-y-4 transition-all shadow-sm"
              >
                <div className="space-y-1">
                  <h4 className="text-xl font-semibold text-[#1d1d1f] dark:text-white">{member.name}</h4>
                  <p className="text-xs font-semibold text-[#0066cc] dark:text-[#2997ff]">{member.title}</p>
                </div>
                <p className="text-[#515154] dark:text-gray-300 text-sm leading-relaxed font-normal">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Collaboration Call to Action */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">Collaborate With Our Lab</h2>
        <p className="text-[#6e6e73] dark:text-gray-400 text-base max-w-xl mx-auto leading-relaxed font-normal">
          Are you an academic institution or enterprise organization interested in piloting quantum-safe API topologies or custom agent networks? Let's connect.
        </p>
        <div className="pt-4">
          <Link to="/contact" className="inline-block px-8 py-3.5 bg-[#0066cc] hover:bg-[#0052a3] text-white font-medium rounded-full transition-all shadow-sm text-sm">
            Contact Research Division
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResearchOverviewPage;

