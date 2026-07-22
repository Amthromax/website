import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useRef } from "react";

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const titleText = "Innovating Tomorrow's Technology Today";
  const words = titleText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-24 px-6 overflow-hidden perspective-1000"
    >
      {/* Animated background elements with parallax */}
      <motion.div
        style={{ y: yBg, scale: scaleImage }}
        className="absolute inset-0 -z-10 opacity-20"
      >
        <div className="w-full h-full bg-gradient-to-tr from-blue-500/40 via-purple-500/20 to-pink-500/40 blur-3xl mix-blend-multiply dark:mix-blend-screen"></div>
      </motion.div>

      <motion.div
        ref={inViewRef}
        style={{ y: yText, opacity: opacityText }}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center max-w-5xl space-y-10 z-10"
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 tracking-tighter flex flex-wrap justify-center gap-x-[0.25em]"
          style={{ lineHeight: 1.05 }}
        >
          {words.map((word, index) => (
            <motion.span
              variants={childVariants}
              key={index}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          variants={childVariants}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium"
        >
          We deliver tailored technology solutions that drive business growth and efficiency through innovative software development, cloud solutions, and AI-powered insights.
        </motion.p>
        
        <motion.div variants={childVariants} className="pt-4">
          <Link to="/solutions" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-all duration-300 shadow-xl text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Our Solutions</span>
              <div className="absolute inset-0 bg-white/20 dark:bg-black/10 transform -skew-x-12 -translate-x-full group-hover:animate-[shine_1s_ease-in-out]"></div>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative interactive elements */}
      <motion.div
        className="absolute top-[15%] left-[10%] -z-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] -z-10 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
};

export default HeroSection;
