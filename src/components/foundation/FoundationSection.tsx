import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

interface ResourceItem {
  title: string;
  date: string;
  image: string;
  slug: string;
}

const FoundationSection: React.FC = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: programsRef, inView: programsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: fundRef, inView: fundInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const resources: ResourceItem[] = [
    {
      title: "Committing to communities: The 2026 People-First AI Fund",
      date: "Jun 15, 2026",
      image: "/images/glass_blue_butterfly.jpg",
      slug: "committing-to-communities-2026",
    },
    {
      title: "Update on the People-First AI Fund",
      date: "Jun 4, 2026",
      image: "/images/glass_green_flower.png",
      slug: "update-on-people-first-ai-fund",
    },
    {
      title: "Resilience in the age of AI",
      date: "Jun 1, 2026",
      image: "/images/glass_blue_shell.jpg",
      slug: "resilience-in-the-age-of-ai",
    },
    {
      title: "Economic Futures in the Age of AI",
      date: "May 27, 2026",
      image: "/images/glass_pink_flower.png",
      slug: "economic-futures-in-the-age-of-ai",
    },
    {
      title: "AI for Alzheimer's",
      date: "Apr 8, 2026",
      image: "/images/glass_yellow_flower.png",
      slug: "ai-for-alzheimers",
    },
    {
      title: "Update on the Amthromax Foundation",
      date: "Mar 24, 2026",
      image: "/images/glass_blue_concentric.jpg",
      slug: "update-on-amthromax-foundation",
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
              src="/images/foundation_hero_new.jpg"
              alt="Golden sunrays breaking through dark clouds, representing hope and deep tech potential"
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
                AI in Finance and Economics
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Deploying machine learning models to simulate economic cycles, track sovereign resource flows, and design equitable trade mechanisms.
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((item, index) => (
            <Link
              key={index}
              to={`/foundation/${item.slug}`}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="flex flex-col space-y-4 p-5 rounded-3xl border border-gray-150 dark:border-white/[0.04] bg-white dark:bg-gray-900 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full"
              >
                {/* Image Container */}
                <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-gray-50 dark:bg-gray-950/40 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                      {item.date}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between text-xs font-bold text-blue-650 dark:text-blue-450 border-t border-gray-100 dark:border-white/[0.04]">
                    <span>Read Article</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FoundationSection;
