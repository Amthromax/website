import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface HighlightItem {
  id: number;
  title: string;
  category: string;
  href: string;
  openInNewTab?: boolean;
}

const EditorialMissionSection: React.FC = () => {
  const highlights: HighlightItem[] = [
    {
      id: 1,
      title: "Helleious.ai Core Views on Safety & Governance",
      category: "Announcements",
      href: "/helleious-safety",
      openInNewTab: true,
    },
    {
      id: 2,
      title: "Codehoomer.ai Responsible Scaling Policy",
      category: "Alignment Science",
      href: "/charter",
    },
    {
      id: 3,
      title: "Helleious.ai Enterprise Economic Index",
      category: "Economic Research",
      href: "/research",
    },
    {
      id: 4,
      title: "Amthromax's Constitution & System Ethics",
      category: "Announcements",
      href: "/charter",
    },
  ];

  return (
    <section className="w-full bg-black text-white py-20 sm:py-28 font-sans select-none border-t border-zinc-900">
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Bold Mission Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug">
              At Amthromax, we build enterprise AI systems and intelligent technology to power the next era of software.
            </h2>
          </motion.div>

          {/* Right Column: Editorial Links with Dark Divider Lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 divide-y divide-zinc-800 border-t border-b border-zinc-800"
          >
            {highlights.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                className="py-5 flex items-center justify-between group transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-zinc-300 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-zinc-400 group-hover:text-white transition-colors shrink-0 ml-4">
                  {item.category}
                </span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EditorialMissionSection;
