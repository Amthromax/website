import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
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
    {
      title: "Industries",
      items: [
        { name: "Autonomous Financial Systems", href: "/solutions" },
        { name: "BioTech & Genomics", href: "/solutions" },
        { name: "Aerospace & Orbital Systems", href: "/solutions" },
        { name: "Quantum & Compute Grids", href: "/solutions" },
        { name: "Next-Gen Robotics", href: "/solutions" },
        { name: "Sovereign Infrastructure", href: "/solutions" },
        { name: "Edge & IoT Networks", href: "/solutions" },
        { name: "Spatial Media & Synthetic Web", href: "/solutions" },
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
              <Link to="/data-protection" className="hover:text-black dark:hover:text-white transition-colors">
                Data Protection Framework
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 lg:gap-4 xl:gap-6">
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
          <div className="flex flex-wrap items-center gap-6 sm:space-x-10">
            <a href="https://x.com/Amthromax" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">X</a>
            <a href="https://www.linkedin.com/company/amthromaxresearch/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">LinkedIn</a>
            <a href="https://github.com/Amthromax" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">GitHub</a>
            <a href="https://www.instagram.com/amthromax/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">Instagram</a>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {/* Inline Theme Switcher for Bottom Bar */}
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTheme(false)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  !isDark
                    ? "bg-white text-black shadow-xs border border-gray-300"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                </svg>
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme(true)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark
                    ? "bg-black text-white shadow-xs border border-zinc-700"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.3 2c.43 0 .77.37.7.8-.57 3.6 1.15 7.24 4.3 9 2.5 1.4 5.56 1.3 7.9-.17.37-.23.86.07.82.5-.72 7.02-6.68 12.43-13.72 11.83C5.26 23.37.5 18.42.03 11.39-.42 4.67 4.7 0 11.3 0c.34 0 .68.02 1 .06V2z"/>
                </svg>
                <span>Dark</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5 text-[#1a1815] dark:text-white font-bold text-sm sm:text-base select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1a1815] dark:bg-white shrink-0 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
