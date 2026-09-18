import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Sun, Moon, Globe, ChevronDown, Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface FooterLink {
  name: string;
  href: string;
  isExternal?: boolean;
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
  const { isDark, setTheme } = useTheme();

  const [selectedLang, setSelectedLang] = useState({ code: "en", name: "English" });
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "ja", name: "日本語" },
    { code: "de", name: "Deutsch" },
    { code: "fr", name: "Français" },
    { code: "ko", name: "한국어" },
    { code: "it", name: "Italiano" },
    { code: "es", name: "Español" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const footerColumns: FooterColumn[] = [
    {
      title: "Intelligence",
      items: [
        { name: "Intelligence Index", href: "/research" },
        { name: "Intelligence Overview", href: "/research/overview" },
        { name: "Tech Publications", href: "/research/publications" },
        { name: "Security Standards", href: "/security" },
        { name: "System Safety", href: "/security" },
        { name: "Trust & Transparency", href: "/trust" },
      ],
    },
    {
      title: "Products",
      items: [
        { name: "Product Index", href: "/products" },
        { name: "Platform Core", href: "/platform" },
        { name: "OrarQlow.Ai", href: "/orarqlow" },
        { name: "Helleious.Ai", href: "/helleious" },
        { name: "CodeHoomer.Ai", href: "/codehoomer" },
        { name: "Pricing Plans", href: "/pricing" },
        { name: "AI Agent Networks", href: "/services/artificial-intelligence" },
        { name: "Custom Software", href: "/services/custom-software" },
      ],
    },
    {
      title: "Business",
      items: [
        { name: "Overview", href: "/overview", isExternal: true },
        { name: "Solutions", href: "/solutions", isExternal: true },
        { name: "Resources", href: "/research", isExternal: true },
        { name: "Partner Network", href: "/partners", isExternal: true },
        { name: "Contact Sales", href: "/contact", isExternal: true },
        { name: "Developer Hub", href: "/developers" },
        { name: "API Docs", href: "/docs", isExternal: true },
      ],
    },
    {
      title: "API Platform",
      items: [
        { name: "Overview", href: "/overview" },
        { name: "API Log In", href: "/login", isExternal: true },
        { name: "Docs", href: "/docs", isExternal: true },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "About Us", href: "/about" },
        { name: "Our Charter", href: "/charter" },
        { name: "Careers", href: "/careers" },
        { name: "Newsroom", href: "/news" },
        { name: "Blog", href: "/blog" },
        { name: "Intelligence Hub", href: "/foundation" },
        { name: "Contact Support", href: "/contact", isExternal: true },
      ],
    },
    {
      title: "Solutions",
      items: [
        { name: "AI Agents", href: "/services/artificial-intelligence" },
        { name: "Code Modernization", href: "/services/custom-software" },
        { name: "Customer Support", href: "/solutions" },
        { name: "Cybersecurity", href: "/services/cybersecurity" },
        { name: "Small Business", href: "/why/small-businesses" },
      ],
    },
  ];

  const handleManageCookies = () => {
    window.dispatchEvent(new Event("open-cookie-consent"));
  };

  return (
    <footer
      ref={ref}
      className="w-full bg-white dark:bg-black text-gray-900 dark:text-white pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 transition-colors duration-300 font-sans border-t border-gray-200 dark:border-white/10 select-none"
    >
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: 3D Asterisk Logo + Copyright + Legal Links */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6 flex flex-col items-center text-center">
            {/* 3D Isometric 6-Pointed Asterisk Logo */}
            <Link to="/" className="block mx-auto w-fit group">
              <img
                src="/images/amthromax_asterisk_logo.png"
                alt="Amthromax 3D Asterisk Logo"
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain transition-transform duration-300 group-hover:scale-105 dark:invert dark:brightness-125"
              />
            </Link>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#1a1815] dark:text-white tracking-tight">
                Amthromax © {new Date().getFullYear()}
              </h3>
            </div>

            {/* Vertical Legal Links */}
            <div className="flex flex-col items-center text-center space-y-2 sm:space-y-2.5 text-xs sm:text-sm lg:text-base font-medium text-[#5c5850] dark:text-gray-400">
              <Link to="/privacy-center" className="hover:text-black dark:hover:text-white transition-colors">
                Privacy Center
              </Link>
              <Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">
                Terms of Use
              </Link>
              <Link to="/cookie-policy" className="hover:text-black dark:hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <button
                onClick={handleManageCookies}
                className="hover:text-black dark:hover:text-white transition-colors cursor-pointer text-center"
              >
                Manage Cookies
              </button>
            </div>
          </div>

          {/* Right Columns: Multi-Column Links Grid + Emails */}
          <div className="lg:col-span-8 flex flex-col gap-6 pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-4 xl:gap-6">
              {footerColumns.map((column) => (
                <div key={column.title} className="space-y-2.5 sm:space-y-3">
                  <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-[#1a1815] dark:text-white whitespace-nowrap">
                    {column.title}
                  </h4>
                  <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm font-medium text-[#5c5850] dark:text-gray-400">
                    {column.items.map((item, idx) => (
                      <li key={idx}>
                        {item.isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1 group/link"
                          >
                            <span>{item.name}</span>
                            <span className="text-[10px] opacity-70 group-hover/link:translate-x-0.5 transition-transform">↗</span>
                          </a>
                        ) : (
                          <Link
                            to={item.href}
                            className="hover:text-black dark:hover:text-white transition-colors block"
                          >
                            {item.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Company Emails — bottom of nav columns */}
            <div className="pt-5 border-t border-[#cecac1] dark:border-white/10">
              <p className="text-[10px] font-bold text-[#5c5850] dark:text-gray-500 uppercase tracking-widest mb-3">Contact</p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-8">
                <a href="mailto:contact@amthromax.com" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1a1815] dark:text-white hover:opacity-70 transition-opacity">
                  <span className="text-[#5c5850] dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">General</span>
                  <span className="text-[#5c5850] dark:text-gray-500">·</span>
                  <span className="underline underline-offset-2">contact@amthromax.com</span>
                </a>
                <a href="mailto:support@amthromax.com" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1a1815] dark:text-white hover:opacity-70 transition-opacity">
                  <span className="text-[#5c5850] dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Support</span>
                  <span className="text-[#5c5850] dark:text-gray-500">·</span>
                  <span className="underline underline-offset-2">support@amthromax.com</span>
                </a>
                <a href="mailto:press@amthromax.com" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1a1815] dark:text-white hover:opacity-70 transition-opacity">
                  <span className="text-[#5c5850] dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Press</span>
                  <span className="text-[#5c5850] dark:text-gray-500">·</span>
                  <span className="underline underline-offset-2">press@amthromax.com</span>
                </a>
              </div>
            </div>

            {/* AI Models — below Contact */}
            <div className="pt-5 border-t border-[#cecac1] dark:border-white/10">
              <p className="text-[10px] font-bold text-[#5c5850] dark:text-gray-500 uppercase tracking-widest mb-3">Models</p>
              <div className="flex flex-row flex-wrap gap-x-8 gap-y-2">
                {["Simifig", "Ligivor", "Favlon", "Roqlow"].map((model) => (
                  <a
                    key={model}
                    href="/blog"
                    className="text-xs sm:text-sm font-medium text-[#5c5850] dark:text-gray-400 hover:text-[#1a1815] dark:hover:text-white transition-colors"
                  >
                    {model}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>


        {/* Bottom Bar: Social Links + Theme Switcher + Live System Status */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 text-xs sm:text-sm text-[#5c5850] dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            {/* X (Twitter) */}
            <a
              href="https://x.com/Amthromax"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Amthromax on X"
              title="X (Twitter)"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all transform hover:scale-110"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Threads (@) */}
            <a
              href="https://www.threads.net/@amthromax"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Amthromax on Threads"
              title="Threads"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all transform hover:scale-110"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.186 24.004c-3.18 0-5.83-.815-7.882-2.42-2.072-1.624-3.178-3.92-3.178-6.626 0-2.85 1.185-5.226 3.428-6.87 2.222-1.63 5.176-2.42 8.784-2.35 1.107.02 2.2.13 3.25.325v-.36c0-1.44-.39-2.58-1.16-3.39-.77-.81-1.89-1.22-3.33-1.22-1.33 0-2.45.36-3.34 1.08-.89.72-1.4 1.74-1.52 3.03l-3.35-.38c.28-2.17 1.25-3.96 2.89-5.32C8.12.87 10.28.18 12.92.18c2.47 0 4.47.66 5.96 1.96 1.49 1.3 2.25 3.19 2.25 5.62v9.33c0 .85.17 1.48.51 1.88.34.4.85.6 1.53.6.45 0 .93-.11 1.44-.33l.94 3.02c-.89.47-1.88.7-2.97.7-1.48 0-2.61-.42-3.38-1.26-.77-.84-1.16-2.01-1.16-3.51v-.47c-1.11 1.12-2.37 1.95-3.78 2.49-1.41.54-2.8.81-4.17.81zm1.09-3.28c1.37 0 2.58-.35 3.63-1.05 1.05-.7 1.76-1.66 2.13-2.88V12.1c-.81-.19-1.66-.3-2.54-.33-2.54-.07-4.48.45-5.82 1.56-1.34 1.11-2.01 2.58-2.01 4.41 0 1.54.51 2.74 1.53 3.6 1.02.86 2.38 1.29 4.08 1.29z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/amthromaxresearch/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Amthromax on LinkedIn"
              title="LinkedIn"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all transform hover:scale-110"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.49 1.49 0 1 0 0 2.98 1.49 1.49 0 0 0 0-2.98z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@amthromax"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Amthromax on YouTube"
              title="YouTube"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all transform hover:scale-110"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/amthromax/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Amthromax on Instagram"
              title="Instagram"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all transform hover:scale-110"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Amthromax"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Amthromax on GitHub"
              title="GitHub"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all transform hover:scale-110"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {/* Inline Theme Switcher for Bottom Bar - Lucide Icons */}
            <div className="inline-flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setTheme(false)}
                aria-label="Switch to Light Theme"
                title="Light Theme"
                className={`p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                  !isDark
                    ? "bg-gray-200/90 text-black shadow-xs dark:bg-white/20 dark:text-white"
                    : "text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setTheme(true)}
                aria-label="Switch to Dark Theme"
                title="Dark Theme"
                className={`p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                  isDark
                    ? "bg-black text-white shadow-xs border border-zinc-700/60 dark:bg-white/20 dark:text-white"
                    : "text-gray-500 hover:text-black dark:hover:text-white"
                }`}
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-[#1c1c1e] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/15 transition-all text-xs font-semibold cursor-pointer shadow-xs"
              >
                <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <span>{selectedLang.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full right-0 mb-2 w-40 bg-[#1c1c1e] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5 font-sans"
                  >
                    <div className="space-y-0.5 max-h-56 overflow-y-auto scrollbar-none">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setSelectedLang(lang);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                            selectedLang.code === lang.code
                              ? "bg-white/20 text-white font-semibold"
                              : "text-gray-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span>{lang.name}</span>
                          {selectedLang.code === lang.code && (
                            <Check className="w-3.5 h-3.5 text-blue-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
