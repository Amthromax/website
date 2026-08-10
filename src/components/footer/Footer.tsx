import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

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

  const footerColumns: FooterColumn[] = [
    {
      title: "Research",
      items: [
        { name: "Research Index", href: "/research" },
        { name: "Research Overview", href: "/research/overview" },
        { name: "Tech Publications", href: "/research/publications" },
        { name: "Security Standards", href: "/security" },
        { name: "System Safety", href: "/security" },
        { name: "Trust & Transparency", href: "/about" },
      ],
    },
    {
      title: "Products",
      items: [
        { name: "Product Index", href: "/products" },
        { name: "Platform Core", href: "/platform" },
        { name: "Pricing Plans", href: "/pricing" },
        { name: "AI Agent Networks", href: "/services/artificial-intelligence" },
        { name: "Custom Software", href: "/services/custom-software" },
        { name: "Cloud Solutions", href: "/services/cloud-solutions" },
        { name: "Cybersecurity", href: "/services/cybersecurity" },
      ],
    },
    {
      title: "Business",
      items: [
        { name: "Overview", href: "/overview", isExternal: true },
        { name: "Solutions", href: "/products", isExternal: true },
        { name: "Resources", href: "/research", isExternal: true },
        { name: "Partner Network", href: "/partners", isExternal: true },
        { name: "Contact Sales", href: "/contact", isExternal: true },
        { name: "Developer Hub", href: "/developers" },
        { name: "API Docs", href: "/docs", isExternal: true },
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
        { name: "Foundation", href: "/foundation" },
        { name: "Contact Support", href: "/contact", isExternal: true },
      ],
    },
  ];

  const handleManageCookies = () => {
    window.dispatchEvent(new Event("open-cookie-consent"));
  };

  return (
    <footer
      ref={ref}
      className="w-full bg-[#dcd9d2] dark:bg-[#121213] text-[#1a1815] dark:text-white pt-24 sm:pt-32 pb-24 sm:pb-32 transition-colors duration-300 font-sans border-t border-[#cecac1] dark:border-white/10 select-none"
    >
      <div className="w-full px-8 sm:px-16 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start"
        >
          {/* Left Column: Massive 3D Asterisk Logo + Copyright + Legal Links */}
          <div className="lg:col-span-4 space-y-10">
            {/* Massive 3D Isometric 6-Pointed Asterisk Logo */}
            <Link to="/" className="inline-block group">
              <svg viewBox="0 0 240 240" fill="none" className="w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 transition-transform duration-300 group-hover:scale-105">
                <g transform="translate(120, 120)">
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle})`}>
                      {/* 3D Shadow Face */}
                      <polygon
                        points="0,-85 24,-71 24,-24 0,-38"
                        fill="#1a1815"
                        stroke="#1a1815"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      {/* Front White Face */}
                      <polygon
                        points="-24,-71 0,-85 0,-38 -24,-24"
                        fill="#FFFFFF"
                        stroke="#1a1815"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                    </g>
                  ))}
                </g>
              </svg>
            </Link>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1815] dark:text-white tracking-tight">
                Amthromax © {new Date().getFullYear()}
              </h3>
            </div>

            {/* Vertical Legal Links */}
            <div className="flex flex-col space-y-4 text-base sm:text-lg font-medium text-[#5c5850] dark:text-gray-400">
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
                className="text-left hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                Manage Cookies
              </button>
            </div>
          </div>

          {/* Right Columns: Massive Multi-Column Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-12 lg:gap-16 pt-4">
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-6">
                <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-widest text-[#1a1815] dark:text-white">
                  {column.title}
                </h4>
                <ul className="space-y-4 text-base sm:text-lg font-medium text-[#5c5850] dark:text-gray-400">
                  {column.items.map((item, idx) => (
                    <li key={idx}>
                      {item.isExternal ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center"
                        >
                          {item.name}
                          <span className="text-xs ml-1 opacity-70">↗</span>
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className="hover:text-black dark:hover:text-white transition-colors"
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
        </motion.div>

        {/* Bottom Bar: Social Links + Live System Status */}
        <div className="mt-24 pt-12 border-t border-[#cecac1] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8 text-base text-[#5c5850] dark:text-gray-400">
          <div className="flex items-center space-x-10">
            <a href="https://x.com/Amthromax" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">X</a>
            <a href="https://www.linkedin.com/company/amthromaxresearch/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">LinkedIn</a>
            <a href="https://github.com/Amthromax" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">GitHub</a>
            <a href="https://www.instagram.com/amthromax/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">Instagram</a>
          </div>

          <div className="flex items-center gap-2.5 text-[#1a1815] dark:text-white font-bold text-base select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1a1815] dark:bg-white shrink-0" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
