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
    {
      title: "Solutions",
      items: [
        { name: "AI Agents", href: "/services/artificial-intelligence" },
        { name: "Code Modernization", href: "/services/custom-software" },
        { name: "Customer Support", href: "/solutions" },
        { name: "Cybersecurity", href: "/services/cybersecurity" },
        { name: "Financial Services", href: "/solutions" },
        { name: "Government", href: "/solutions" },
        { name: "Healthcare", href: "/solutions" },
        { name: "Life Sciences", href: "/solutions" },
        { name: "Nonprofits", href: "/solutions" },
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
      className="w-full bg-[#dcd9d2] dark:bg-[#121213] text-[#1a1815] dark:text-white pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 lg:pb-32 transition-colors duration-300 font-sans border-t border-[#cecac1] dark:border-white/10 select-none"
    >
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-start"
        >
          {/* Left Column: 3D Asterisk Logo + Copyright + Legal Links */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-10 flex flex-col items-center text-center">
            {/* 3D Isometric 6-Pointed Asterisk Logo (Responsive across Mobile, Tablet, Laptop) */}
            <Link to="/" className="block mx-auto w-fit group">
              <img
                src="/images/amthromax_asterisk_logo.png"
                alt="Amthromax 3D Asterisk Logo"
                className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#1a1815] dark:text-white tracking-tight">
                Amthromax © {new Date().getFullYear()}
              </h3>
            </div>

            {/* Vertical Legal Links */}
            <div className="flex flex-col space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg font-medium text-[#5c5850] dark:text-gray-400">
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

          {/* Right Columns: Multi-Column Links Grid + Emails */}
          <div className="lg:col-span-8 flex flex-col gap-10 pt-2 sm:pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
              {footerColumns.map((column) => (
                <div key={column.title} className="space-y-4 sm:space-y-6">
                  <h4 className="font-extrabold text-xs sm:text-sm lg:text-base uppercase tracking-wider lg:tracking-widest text-[#1a1815] dark:text-white">
                    {column.title}
                  </h4>
                  <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg font-medium text-[#5c5850] dark:text-gray-400">
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

            {/* Company Emails — bottom of nav columns */}
            <div className="pt-8 border-t border-[#cecac1] dark:border-white/10">
              <p className="text-[10px] font-bold text-[#5c5850] dark:text-gray-500 uppercase tracking-widest mb-5">Contact</p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-10">
                <a href="mailto:contact@amthromax.com" className="flex items-center gap-2 text-sm sm:text-base font-medium text-[#1a1815] dark:text-white hover:opacity-70 transition-opacity">
                  <span className="text-[#5c5850] dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">General</span>
                  <span className="text-[#5c5850] dark:text-gray-500">·</span>
                  <span className="underline underline-offset-2">contact@amthromax.com</span>
                </a>
                <a href="mailto:support@amthromax.com" className="flex items-center gap-2 text-sm sm:text-base font-medium text-[#1a1815] dark:text-white hover:opacity-70 transition-opacity">
                  <span className="text-[#5c5850] dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Support</span>
                  <span className="text-[#5c5850] dark:text-gray-500">·</span>
                  <span className="underline underline-offset-2">support@amthromax.com</span>
                </a>
                <a href="mailto:press@amthromax.com" className="flex items-center gap-2 text-sm sm:text-base font-medium text-[#1a1815] dark:text-white hover:opacity-70 transition-opacity">
                  <span className="text-[#5c5850] dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Press</span>
                  <span className="text-[#5c5850] dark:text-gray-500">·</span>
                  <span className="underline underline-offset-2">press@amthromax.com</span>
                </a>
              </div>
            </div>

            {/* AI Models — below Contact */}
            <div className="pt-8 border-t border-[#cecac1] dark:border-white/10">
              <p className="text-[10px] font-bold text-[#5c5850] dark:text-gray-500 uppercase tracking-widest mb-5">Models</p>
              <div className="flex flex-row flex-wrap gap-x-8 gap-y-3">
                {["Morfix", "Cotises", "Intox", "Instant Verkox"].map((model) => (
                  <a
                    key={model}
                    href="/blog"
                    className="text-sm sm:text-base font-medium text-[#5c5850] dark:text-gray-400 hover:text-[#1a1815] dark:hover:text-white transition-colors"
                  >
                    {model}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>


        {/* Bottom Bar: Social Links + Live System Status */}

        <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-[#cecac1] dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 text-sm sm:text-base text-[#5c5850] dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-6 sm:space-x-10">
            <a href="https://x.com/Amthromax" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">X</a>
            <a href="https://www.linkedin.com/company/amthromaxresearch/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">LinkedIn</a>
            <a href="https://github.com/Amthromax" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">GitHub</a>
            <a href="https://www.instagram.com/amthromax/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">Instagram</a>
          </div>

          <div className="flex items-center gap-2.5 text-[#1a1815] dark:text-white font-bold text-sm sm:text-base select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1a1815] dark:bg-white shrink-0" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
