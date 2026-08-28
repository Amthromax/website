import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LoginDropdownButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block select-none font-sans"
    >
      {/* Log in button with arrow indicator */}
      <Link
        to="/login"
        onClick={() => setIsOpen(false)}
        className="h-9 px-3 text-gray-700 hover:text-black dark:text-white/80 dark:hover:text-white rounded-full text-sm font-medium transition-all select-none flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-white/10"
      >
        <span>Log in</span>
        <span className={`text-[8px] opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </Link>

      {/* Popover Dropdown Card showing Console & API Platform */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-1.5 w-56 bg-white dark:bg-[#0d0e10] border border-gray-200 dark:border-white/10 rounded-2xl p-2.5 shadow-2xl z-50 text-gray-900 dark:text-white font-sans text-left"
          >
            <div className="space-y-1">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all group"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 dark:text-white text-[13px]">Console</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-normal">Account &amp; Management</span>
                </div>
              </Link>

              <Link
                to="/overview"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all group"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 dark:text-white text-[13px]">API Platform</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-normal">Developer Portal &amp; Keys</span>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginDropdownButton;
