import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

interface FooterLink {
  name: string;
  href: string;
  isExternal?: boolean;
  isHeader?: boolean;
  isAction?: boolean;
}

interface FooterColumn {
  title: string;
  items: FooterLink[];
}

const Footer: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const footerColumns: FooterColumn[] = [
    {
      title: "Research",
      items: [
        { name: "Research Index", href: "/research" },
        { name: "Research Overview", href: "/research" },
        { name: "Tech Publications", href: "/research" },
        { name: "Latest Advancements", href: "", isHeader: true },
        { name: "Cloud Scaler AI", href: "/services" },
        { name: "Zero-Trust Guard", href: "/services" },
        { name: "Quantum Vault", href: "/services" },
        { name: "Safety", href: "", isHeader: true },
        { name: "Security Standards", href: "/about" },
        { name: "Deployment Safety", href: "/about", isExternal: true },
        { name: "Security & Privacy", href: "/privacy" },
        { name: "Trust & Transparency", href: "/about" },
      ],
    },
    {
      title: "Products",
      items: [
        { name: "Web Solutions", href: "/services", isExternal: true },
        { name: "Mobile Engineering", href: "/services", isExternal: true },
        { name: "Cloud Infrastructure", href: "/services", isExternal: true },
        { name: "Custom Software", href: "/services", isExternal: true },
        { name: "AI Integrations", href: "/services", isExternal: true },
        { name: "Cyber Defense", href: "/services" },
        { name: "API Platform", href: "", isHeader: true },
        { name: "Overview", href: "/services" },
        { name: "API Log In", href: "/login" },
        { name: "Docs", href: "/services", isExternal: true },
      ],
    },
    {
      title: "Business",
      items: [
        { name: "Overview", href: "/about" },
        { name: "Solutions", href: "/services" },
        { name: "Resources", href: "/research" },
        { name: "Partner Network", href: "/about" },
        { name: "Contact Sales", href: "/contact" },
        { name: "Developers", href: "", isHeader: true },
        { name: "Amthromax SDK", href: "/services", isExternal: true },
        { name: "Open Source Tools", href: "/about" },
        { name: "API Docs", href: "/services", isExternal: true },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "About Us", href: "/about" },
        { name: "Our Charter", href: "/about" },
        { name: "Careers", href: "/about" },
        { name: "Newsroom", href: "/about" },
        { name: "Foundation", href: "/foundation" },
        { name: "Support", href: "", isHeader: true },
        { name: "Help Center", href: "/contact", isExternal: true },
        { name: "Contact Support", href: "/contact" },
      ],
    },
    {
      title: "More",
      items: [
        { name: "Academy", href: "/about" },
        { name: "Livestreams", href: "/research" },
        { name: "Podcast", href: "/research" },
        { name: "RSS", href: "/research" },
        { name: "Terms & Policies", href: "", isHeader: true },
        { name: "Terms of Use", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Settings", href: "", isAction: true },
      ],
    },
  ];

  const handleManageCookies = () => {
    window.dispatchEvent(new Event("open-cookie-consent"));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer
      ref={ref}
      className="w-full bg-[#f5f5f7] dark:bg-[#0b0b0c] pt-20 pb-28 relative overflow-hidden transition-colors duration-300 font-sans"
    >
      {/* Giant Watermark Background */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-[35%] pointer-events-none select-none z-0">
        <span className="text-[18vw] font-bold text-[#e5e5e7] dark:text-[#18181b] tracking-tight leading-none select-none transition-colors duration-300">
          Amthromax
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Top Card: CTA */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-b from-[#1c1c1e] to-[#000000] rounded-[32px] px-8 py-12 md:py-16 text-center text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                Turn your data into clarity
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                Amthromax makes it effortless to uncover insights and share them with your team.
              </p>
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white hover:bg-gray-150 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Card: OpenAI-styled Brand & Link columns */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-[#161617] rounded-[32px] p-8 md:p-12 border border-gray-100 dark:border-white/[0.04] shadow-sm relative transition-colors duration-300"
          >
            {/* 5-Column Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 pb-12">
              {footerColumns.map((column) => (
                <div key={column.title} className="flex flex-col">
                  <h4 className="font-semibold text-black dark:text-white text-sm mb-4">
                    {column.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {column.items.map((item, idx) => {
                      if (item.isHeader) {
                        return (
                          <li key={idx} className="pt-4 pb-1">
                            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                              {item.name}
                            </span>
                          </li>
                        );
                      }
                      if (item.isAction) {
                        return (
                          <li key={idx}>
                            <button
                              onClick={handleManageCookies}
                              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm font-normal text-left transition-colors duration-200"
                            >
                              {item.name}
                            </button>
                          </li>
                        );
                      }
                      if (item.isExternal) {
                        return (
                          <li key={idx}>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm font-normal transition-colors duration-200"
                            >
                              {item.name}
                              <span className="text-[10px] ml-0.5 opacity-70">↗</span>
                            </a>
                          </li>
                        );
                      }
                      return (
                        <li key={idx}>
                          <Link
                            to={item.href}
                            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm font-normal transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Separator and Bottom Row matching OpenAI style */}
            <div className="pt-8 border-t border-gray-150 dark:border-white/[0.06] flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Social links (left) */}
              <div className="flex items-center space-x-5 text-gray-400 dark:text-gray-500">
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors duration-200" aria-label="X">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors duration-200" aria-label="GitHub">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors duration-200" aria-label="Discord">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
                  </svg>
                </a>
              </div>

              {/* Copyright (center) */}
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-normal">
                <span>
                  Amthromax © 2015–{new Date().getFullYear()}
                </span>
                <button
                  onClick={handleManageCookies}
                  className="hover:underline font-medium text-black dark:text-white ml-1.5 transition-all"
                >
                  Manage Cookies
                </button>
              </div>

              {/* Live Status indicator (right) */}
              <div className="flex items-center">
                <div className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 px-3.5 py-1.5 rounded-full text-xs font-bold border border-zinc-250 dark:border-zinc-700 shadow-sm select-none transition-colors duration-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 dark:bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900 dark:bg-white animate-pulse"></span>
                  </span>
                  <span>All Systems Operational</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
