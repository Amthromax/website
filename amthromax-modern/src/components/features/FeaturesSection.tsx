import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

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

const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-950"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tighter mb-6">
            Our Core Competencies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We excel in delivering cutting-edge technology solutions across multiple domains, ensuring your business stays ahead in the digital landscape.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={`/services/${feature.slug}`}
              className="block group"
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2 + index * 0.05,
                }}
                className="relative rounded-xl p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-150 dark:border-gray-800 overflow-hidden min-h-[320px] flex flex-col justify-end shadow-sm"
                style={{
                  backgroundImage: `url(${feature.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25 group-hover:via-black/60 transition-all duration-500 z-0" />

                {/* Text content overlay */}
                <div className="relative z-10 space-y-3 text-white">
                  <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {feature.technology?.map((tech: string) => (
                        <span
                          key={tech}
                          className="text-[10px] bg-white/20 dark:bg-white/10 border border-white/20 px-2 py-0.5 rounded-full text-white font-semibold shadow-sm backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-white/80 group-hover:text-white flex items-center gap-1 transition-colors bg-white/10 hover:bg-white/25 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      Learn More 
                      <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;