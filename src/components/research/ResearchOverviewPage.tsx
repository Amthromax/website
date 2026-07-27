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
      color: "from-pink-500 to-rose-600"
    },
    {
      name: "Cryptographic Security Lab",
      focus: "Post-quantum lattice security, zero-trust cryptographic protocols, and secure sandboxing.",
      tag: "Quantum & Zero-Trust",
      color: "from-cyan-500 to-blue-600"
    },
    {
      name: "Distributed Systems Lab",
      focus: "Federated SQL query compilation, edge compute synchronization, and auto-scaling middleware.",
      tag: "Cloud Infrastructure",
      color: "from-purple-500 to-indigo-600"
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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
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
          <span className="text-xs uppercase tracking-widest text-violet-400 font-bold bg-violet-950/50 border border-violet-800/30 px-3.5 py-1.5 rounded-full">
            Scientific Overview
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Amthromax R&D Labs
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Where breakthrough theories meet industrial-scale engineering. We study, model, and build the future of AI, security, and cloud scalability.
          </p>
        </motion.div>
      </div>

      {/* R&D Labs Section */}
      <div ref={labsRef} className="max-w-6xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-650 dark:text-blue-400">Our Specialization</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Three Pillars of Discovery</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            Our researchers are distributed across three highly integrated labs, each dedicated to solving concrete bottlenecks in scaling modern enterprise applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {labs.map((lab, index) => (
            <motion.div 
              key={lab.name}
              initial={{ opacity: 0, y: 35 }}
              animate={labsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: index * 0.15 }}
              className="bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between transition-colors shadow-sm hover:shadow-md h-[280px]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-5 dark:opacity-10 rounded-bl-[100px] pointer-events-none" />
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">
                  {lab.tag}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-gray-905 dark:text-white">
                  {lab.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                  {lab.focus}
                </p>
              </div>

              <div className="pt-4">
                <Link to="/research/publications" className="text-xs font-bold text-blue-650 dark:text-blue-400 hover:underline">
                  Browse Publications &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Advisory Board Section */}
      <div ref={boardRef} className="bg-gray-50 dark:bg-gray-900/50 py-24 transition-colors">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-650 dark:text-blue-400 font-bold">Research Leaders</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Our Advisory Panel</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              Dr. Elena Rostova and our core research panel work shoulder-to-shoulder with engineering to deploy models directly to our client platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {board.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={boardInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] p-8 rounded-3xl space-y-4 transition-all shadow-sm"
              >
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-xs font-semibold text-blue-650 dark:text-blue-400">{member.title}</p>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Collaboration Call to Action */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Collaborate With Our Lab</h2>
        <p className="text-gray-505 dark:text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Are you an academic institution or enterprise organization interested in piloting quantum-safe API topologies or custom agent networks? Let's connect.
        </p>
        <div className="pt-4">
          <Link to="/contact" className="inline-block px-7 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-all shadow-md text-sm">
            Contact Research Division
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResearchOverviewPage;
