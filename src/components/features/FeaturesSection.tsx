import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import React, { useRef } from "react";

const features = [
  {
    title: "Custom Software Development",
    description: "Tailored applications built to solve your unique business requirements.",
    technology: ["React", "Node.js", "Python", "AWS"],
    bgImage: "/images/251b80f44a10171b3221c8e65f1c0edf.jpg",
    slug: "custom-software",
  },
  {
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services for optimal performance and cost efficiency.",
    technology: ["AWS", "Azure", "Google Cloud", "Kubernetes"],
    bgImage: "/images/2b9888c054781328a6ffad2370ead6f4.jpg",
    slug: "cloud-solutions",
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
];

const FeatureCard: React.FC<{ feature: any; index: number }> = ({ feature, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link to={`/services/${feature.slug}`} className="block perspective-1000">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        variants={{
          hidden: { opacity: 0, y: 50, scale: 0.95 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
              type: "spring", 
              stiffness: 100, 
              damping: 20, 
              delay: index * 0.1 
            }
          }
        }}
        whileHover={{ scale: 1.02, zIndex: 10 }}
        className="relative rounded-2xl p-8 transition-shadow duration-500 border border-gray-200/50 dark:border-gray-800/50 overflow-hidden min-h-[360px] flex flex-col justify-end shadow-lg hover:shadow-2xl"
      >
        {/* Background Image with slight scale on hover */}
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700"
          style={{ backgroundImage: `url(${feature.bgImage})` }}
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 group-hover:via-black/70 transition-all duration-500 z-10" />

        {/* Content */}
        <div className="relative z-20 space-y-4 text-white transform-gpu" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-3xl font-black text-white tracking-tight leading-tight mb-2 drop-shadow-md">
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
                  className="text-[10px] bg-white/10 border border-white/20 px-2.5 py-1 rounded-full text-white/90 font-semibold shadow-sm backdrop-blur-md hover:bg-white/20 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </motion.div>
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
      className="py-32 bg-gray-50 dark:bg-gray-950 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Capabilities</span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tighter mb-6">
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
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent opacity-50"></div>
    </section>
  );
};

export default FeaturesSection;