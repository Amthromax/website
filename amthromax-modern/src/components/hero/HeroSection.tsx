import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-10"
        initial={{ scale: 0.5, rotate: 0 }}
        animate={inView ? { scale: 1, rotate: 0 } : { scale: 0.5, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 mask radial-gradient-circle at-center,white 70%,transparent 71%"></div>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        className="text-center max-w-4xl space-y-8"
      >
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-gray-50 tracking-tighter mb-4"
          style={{ lineHeight: 1 }}
        >
          Innovating Tomorrow's Technology Today
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We deliver tailored technology solutions that drive business growth and efficiency through innovative software development, cloud solutions, and AI-powered insights.
        </p>
        <Link to="/solutions" className="inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-base"
          >
            Explore Our Solutions
          </motion.button>
        </Link>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 -z-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
        initial={{ rotate: 0 }}
        animate={inView ? { rotate: 10 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, duration: 3 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 -z-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
        initial={{ rotate: 0 }}
        animate={inView ? { rotate: -10 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, duration: 3 }}
      />
    </section>
  );
};

export default HeroSection;
