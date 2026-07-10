import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownItem {
  label: string;
  href: string;
  isHeader?: boolean;
}

interface NavDropdownProps {
  label: string;
  href: string;
  items: DropdownItem[];
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, href, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150); // slight delay to prevent accidental closing
  };

  return (
    <div
      className="relative py-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Link */}
      <Link
        to={href}
        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 text-sm font-medium flex items-center gap-1 select-none"
      >
        <span>{label}</span>
        <span className={`text-[10px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </Link>

      {/* Invisible Hover Bridge */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute top-[48px] left-0 z-50">
            {/* The dropdown card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="bg-white dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] rounded-2xl p-6 shadow-xl w-60 flex flex-col space-y-3"
            >
              {items.map((item, index) => {
                if (item.isHeader) {
                  return (
                    <span
                      key={index}
                      className="text-[10px] font-bold text-gray-450 dark:text-gray-500 uppercase tracking-widest block pb-1 border-b border-gray-100 dark:border-gray-850"
                    >
                      {item.label}
                    </span>
                  );
                }
                return (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors text-xs font-semibold block"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;
