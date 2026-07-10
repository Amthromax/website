import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ResourceItem {
  title: string;
  date: string;
  gradient: string;
}

const FoundationSection: React.FC = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: programsRef, inView: programsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: fundRef, inView: fundInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const resources: ResourceItem[] = [
    {
      title: "Committing to communities: The 2026 People-First AI Fund",
      date: "Jun 15, 2026",
      gradient: "from-blue-400/30 to-indigo-500/30 dark:from-blue-600/20 dark:to-indigo-800/20",
    },
    {
      title: "Update on the People-First AI Fund",
      date: "Jun 4, 2026",
      gradient: "from-emerald-400/30 to-teal-500/30 dark:from-emerald-600/20 dark:to-teal-800/20",
    },
    {
      title: "Resilience in the age of AI",
      date: "Jun 1, 2026",
      gradient: "from-purple-400/30 to-pink-500/30 dark:from-purple-600/20 dark:to-pink-800/20",
    },
    {
      title: "Economic Futures in the Age of AI",
      date: "May 27, 2026",
      gradient: "from-cyan-400/30 to-blue-500/30 dark:from-cyan-600/20 dark:to-blue-800/20",
    },
    {
      title: "AI for Alzheimer's",
      date: "Apr 8, 2026",
      gradient: "from-amber-400/30 to-orange-500/30 dark:from-amber-600/20 dark:to-orange-800/20",
    },
    {
      title: "Update on the Amthromax Foundation",
      date: "Mar 24, 2026",
      gradient: "from-rose-400/30 to-pink-500/30 dark:from-rose-600/20 dark:to-pink-800/20",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors duration-300 font-sans">
      {/* 1. Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 max-w-6xl mx-auto px-6 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          {/* Brand Logo representing Amthromax */}
          <div className="w-16 h-16 flex items-center justify-center">
            <img 
              src="/images/logo.png" 
              alt="Amthromax Brand Logo" 
              className="w-14 h-14 object-contain dark:invert transition-all duration-300"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Amthromax AI Foundation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Our mission is to ensure artificial general intelligence benefits all of humanity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-2"
        >
          <button className="bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-150 text-white dark:text-black font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-sm">
            A note from our Board Chair
          </button>
        </motion.div>
      </section>

      {/* 2. Hard Problems & Hero Image */}
      <section className="py-12 max-w-6xl mx-auto px-6 border-b border-gray-100 dark:border-gray-900">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-2xl md:text-3xl font-normal leading-snug text-gray-900 dark:text-white">
              AI has extraordinary potential to help solve some of our hardest problems. But building systems that benefit humanity also means preparing for the challenges advanced AI brings. The Amthromax Foundation is built to address both.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-50 dark:bg-gray-900 relative group"
          >
            <img
              src="/foundation_hero.png"
              alt="Serene branch by the sea representing peace and humanity"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. Commitment Programs Section */}
      <section ref={programsRef} className="py-20 max-w-6xl mx-auto px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={programsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">
            The Amthromax AI Foundation has committed $25 billion toward advanced AI initiatives
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Program Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={programsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col space-y-5 group"
          >
            <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-gray-50 dark:bg-gray-900 shadow-md">
              <img
                src="/images/7cf36cb9b2a640777012b49b3830c1be.jpg"
                alt="Life Sciences Research"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI in Medicine and Life Sciences
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Using AI to accelerate breakthroughs so everyone can benefit from better diagnostics, treatments, and cures.
              </p>
            </div>
          </motion.div>

          {/* Program Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={programsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-5 group"
          >
            <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-gray-50 dark:bg-gray-900 shadow-md">
              <img
                src="/images/39e3c8d5547442fe59e6053b3c08d000.jpg"
                alt="AI Resilience and Ethics Collaboration"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Safety and Alignment Research
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Supporting practical technical solutions for maximizing AI's benefits and minimizing its risks.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. People-First AI Fund Section */}
      <section ref={fundRef} className="py-20 bg-gray-50 dark:bg-[#161617]/50 border-y border-gray-100 dark:border-gray-900/80 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={fundInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            People-First AI Fund
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={fundInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            The People-First AI Fund supports local nonprofits and the communities they serve in shaping how AI is used to advance their missions and address local needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={fundInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-2"
          >
            <button className="bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-150 text-white dark:text-black font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-sm">
              Read the latest
            </button>
          </motion.div>
        </div>
      </section>

      {/* 5. Resources Grid Section */}
      <section className="py-20 max-w-6xl mx-auto px-6 space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Resources
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center gap-6 p-4 rounded-3xl border border-gray-100 dark:border-white/[0.04] bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 group"
            >
              {/* Abstract Gradient Preview Container */}
              <div className={`w-28 h-28 rounded-2xl bg-gradient-to-tr ${item.gradient} flex-shrink-0 relative overflow-hidden flex items-center justify-center text-xl`}>
                <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[1px] group-hover:scale-110 transition-transform duration-500" />
                🌱
              </div>
              
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  {item.date}
                </span>
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-250 leading-snug">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FoundationSection;
