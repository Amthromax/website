import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface TryDropdownButtonProps {
  onTryClick: () => void;
}

const TryDropdownButton: React.FC<TryDropdownButtonProps> = ({ onTryClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
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
    <div ref={containerRef} className="relative inline-block select-none">
      {/* Split Pill Button */}
      <div className="inline-flex items-center bg-white dark:bg-white text-black rounded-full p-0.5 border border-gray-200 dark:border-white/20 shadow-sm hover:shadow-md transition-all">
        {/* Left Action Button */}
        <button
          type="button"
          onClick={onTryClick}
          className="h-8 px-3.5 text-xs font-normal text-black hover:opacity-80 transition-opacity flex items-center gap-1.5 cursor-pointer"
        >
          <span>Try for free</span>
        </button>

        {/* Vertical Divider */}
        <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-300" />

        {/* Right Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-8 w-8 flex items-center justify-center text-black hover:opacity-80 transition-opacity cursor-pointer rounded-r-full"
          aria-label="Toggle menu"
        >
          <span className={`text-[10px] transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
            ▲
          </span>
        </button>
      </div>

      {/* Popover Dropdown Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-52 bg-[#0d0e10] border border-white/10 rounded-2xl p-4 shadow-2xl z-50 text-white font-sans text-left"
          >
            {/* PRODUCTS */}
            <div>
              <p className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Products
              </p>
              <div className="space-y-1">
                <Link
                  to="/orarqlow"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-xs font-normal text-gray-200 hover:text-white py-1 transition-colors group"
                >
                  <span>OrarQlow.Ai</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-white transition-colors">↗</span>
                </Link>
                <Link
                  to="/helleious"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-xs font-normal text-gray-200 hover:text-white py-1 transition-colors group"
                >
                  <span>Helleious.Ai</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-white transition-colors">↗</span>
                </Link>
                <Link
                  to="/codehoomer"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-xs font-normal text-gray-200 hover:text-white py-1 transition-colors group"
                >
                  <span>CodeHoomer.Ai</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-white transition-colors">↗</span>
                </Link>
                <Link
                  to="/solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-xs font-normal text-gray-200 hover:text-white py-1 transition-colors group"
                >
                  <span>Enterprise Systems</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-white transition-colors">↗</span>
                </Link>
              </div>
            </div>



            {/* DEVELOPERS */}
            <div className="mt-3 pt-2.5 border-t border-white/10">
              <p className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Developers
              </p>
              <div className="space-y-1">
                <Link
                  to="/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-xs font-normal text-gray-200 hover:text-white py-1 transition-colors group"
                >
                  <span>API Console</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-white transition-colors">↗</span>
                </Link>
                <Link
                  to="/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-xs font-normal text-gray-200 hover:text-white py-1 transition-colors group"
                >
                  <span>Documentation</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-white transition-colors">↗</span>
                </Link>
                <Link
                  to="/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-xs font-normal text-gray-200 hover:text-white py-1 transition-colors group"
                >
                  <span>Amthromax Build</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-white transition-colors">↗</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TryDropdownButton;
