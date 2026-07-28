import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsVisible(true);
    };
    window.addEventListener("open-cookie-consent", handleOpen);

    const consent = localStorage.getItem("amthromax-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("open-cookie-consent", handleOpen);
      };
    }

    return () => {
      window.removeEventListener("open-cookie-consent", handleOpen);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem("amthromax-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("amthromax-cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#252423]/95 backdrop-blur-md border-t border-white/[0.08] p-5 md:p-6 shadow-2xl font-sans"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-4xl">
              <h4 className="text-sm font-semibold text-white/95 tracking-wide">
                We use cookies
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-normal">
                We use cookies to help this site function, understand service usage, and support marketing efforts. Visit{" "}
                <button
                  type="button"
                  onClick={handleDecline}
                  className="underline hover:text-white transition-colors focus:outline-none"
                >
                  Manage Cookies
                </button>{" "}
                to change preferences anytime. View our{" "}
                <Link
                  to="/cookie-policy"
                  className="underline hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>{" "}
                for more info.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDecline}
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold text-white/90 hover:bg-white/5 hover:border-white/45 transition-all focus:outline-none"
              >
                Manage Cookies
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold text-white/90 hover:bg-white/5 hover:border-white/45 transition-all focus:outline-none"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="px-6 py-2.5 rounded-full bg-white/10 text-xs font-semibold text-white hover:bg-white/20 transition-all focus:outline-none border border-white/10"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
