import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import React from "react";

export const features = [
  {
    title: "Custom Software Development",
    description: "Tailored applications built to solve your unique business requirements.",
    technology: ["React", "Node.js", "Python", "AWS"],
    bgImage: "/images/251b80f44a10171b3221c8e65f1c0edf.jpg",
    slug: "custom-software",
    /* Cover drawn as a brand lockup: round icon badge + one-line name. */
    cover: "logo",
    logoText: "Custom Software",
    logoSub: "Development",
  },
  {
    title: "Artificial Intelligence",
    description: "AI-powered analytics, automation, and intelligent systems that transform business operations.",
    technology: ["TensorFlow", "PyTorch", "scikit-learn", "OpenAI API"],
    bgImage: "/images/5d9f8bf53cf9af46dd158c098c36f970.jpg",
    slug: "artificial-intelligence",
  },
  {
    title: "Cybersecurity",
    description: "Robust security solutions to protect digital assets and ensure compliance with industry standards.",
    technology: ["AWS Security", "Zero Trust", "SIEM", "Penetration Testing"],
    bgImage: "/images/97f11a9e8437c9f1885ddedf9822bf2b.jpg",
    slug: "cybersecurity",
  },
  {
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with advanced analytics and visualization tools.",
    technology: ["Tableau", "Power BI", "D3.js", "Python Pandas"],
    bgImage: "/images/eccdd4f9979503f74a6ceef111f5df90.jpg",
    slug: "data-analytics",
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
    technology: ["React Native", "Flutter", "Swift", "Kotlin"],
    bgImage: "/images/f69fb955aebe93c0bb4c606be8d02b8a.jpg",
    slug: "mobile-apps",
  },
  {
    title: "Enterprise Cloud Solutions",
    description: "Scalable cloud architecture, microservices, and zero-trust infrastructure for mission-critical operations.",
    technology: ["AWS", "Kubernetes", "Docker", "Terraform"],
    bgImage: "/images/251b80f44a10171b3221c8e65f1c0edf.jpg",
    slug: "cloud-solutions",
  },
];

export const FeatureCard: React.FC<{ feature: any; index: number }> = ({ feature, index }) => {
  return (
    <Link
      to={`/services/${feature.slug}`}
      className="block w-[82vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              type: "spring", 
              stiffness: 100, 
              damping: 20, 
              delay: index * 0.1 
            }
          }
        }}
        className="relative rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 overflow-hidden min-h-[360px] flex flex-col items-center justify-center text-center group shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${feature.bgImage})` }}
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors duration-500 z-10" />

        {/* Content: one centred statement; the detail fades in on hover */}
        <div className="relative z-20 flex flex-col items-center text-white">
          {feature.cover === "logo" ? (
          <h3 aria-label={feature.title} className="flex items-center gap-2.5 text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-2">
            <span className="flex flex-col items-center text-center leading-none">
              <span className="text-[24px] md:text-[26px] font-semibold tracking-[-0.02em] whitespace-nowrap">{feature.logoText}</span>
              <span className="mt-2 pl-[0.42em] text-[13px] md:text-sm font-bold uppercase tracking-[0.42em] text-white/90">{feature.logoSub}</span>
            </span>
          </h3>
          ) : (
          <h3 className="text-3xl md:text-[34px] font-medium font-sans text-white tracking-[-0.01em] leading-[1.2] max-w-[14ch] drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-2">
            {feature.title}
          </h3>
          )}
          <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/85 line-clamp-2">
            {feature.description}
          </p>
        </div>
        <svg aria-hidden="true" className="absolute bottom-6 right-6 z-20 size-5 text-white/80 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
      </motion.div>
    </Link>
  );
};

const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className="pt-32 pb-20 bg-white dark:bg-black relative overflow-hidden"
    >
      {/* Corner Text - Inter font in solid Black / White */}
      <div className="absolute top-8 left-6 sm:left-10 md:left-14 z-20">
        <a
          href="/helleious"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-sans font-bold tracking-widest uppercase text-black dark:text-white hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          HELLEIOUS.AI
          <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <div className="absolute top-8 right-6 sm:right-10 md:right-14 z-20">
        <Link
          to="/codehoomer"
          className="text-sm font-sans font-bold tracking-widest uppercase text-black dark:text-white hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          CODEHOOMER.AI
          <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <h2 className="text-5xl md:text-6xl font-medium font-sans text-gray-900 dark:text-gray-50 tracking-tight mb-6">
            Our Core Competencies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium">
            We excel in delivering cutting-edge technology solutions across multiple domains, ensuring your business stays ahead in the digital landscape.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="-mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-5 overflow-x-auto overflow-y-hidden px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:gap-8 sm:overflow-x-visible sm:px-0 sm:pb-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/services/all"
            className="group inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-medium text-white ring-1 ring-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_14px_30px_-16px_rgba(0,0,0,0.85)] transition-all duration-300 hover:bg-[#0d0d0d] hover:shadow-[0_1px_2px_rgba(0,0,0,0.45),0_20px_40px_-16px_rgba(0,0,0,0.95)] active:scale-[0.98] cursor-pointer dark:bg-white dark:text-gray-900 dark:ring-white/20 dark:hover:bg-gray-100"
          >
            <span>Load more</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              &darr;
            </span>
          </Link>
        </div>
      </div>
      
    </section>
  );
};

export default FeaturesSection;