import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import React from "react";

const features = [
  {
    title: "Custom Software Development",
    description: "Tailored applications built to solve your unique business requirements.",
    technology: ["React", "Node.js", "Python", "AWS"],
    bgImage: "/images/251b80f44a10171b3221c8e65f1c0edf.jpg",
    slug: "custom-software",
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

const FeatureCard: React.FC<{ feature: any; index: number }> = ({ feature, index }) => {
  return (
    <Link to={`/services/${feature.slug}`} className="block">
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
        className="relative rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 overflow-hidden min-h-[360px] flex flex-col justify-end shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${feature.bgImage})` }}
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 z-10" />

        {/* Content */}
        <div className="relative z-20 space-y-4 text-white">
          <h3 className="text-3xl font-bold font-sans text-white tracking-tight leading-tight mb-2 drop-shadow-md">
            {feature.title}
          </h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-2">
            {feature.description}
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-4">
            <div className="flex flex-wrap gap-2">
              {feature.technology?.slice(0, 3).map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs text-white/80 font-semibold tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div 
              className="text-white/80 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </div>
          </div>
        </div>
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
      className="py-32 bg-white dark:bg-black relative overflow-hidden"
    >
      {/* Corner Text - Inter font in solid Black / White */}
      <div className="absolute top-8 left-6 sm:left-10 md:left-14 z-20">
        <a
          href="/helleious"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-sans font-black tracking-widest uppercase text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
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
          className="text-sm font-sans font-black tracking-widest uppercase text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
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
          <h2 className="text-5xl md:text-6xl font-bold font-sans text-gray-900 dark:text-gray-50 tracking-tight mb-6">
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
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
      
    </section>
  );
};

export default FeaturesSection;