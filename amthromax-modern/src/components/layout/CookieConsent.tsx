import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsVisible(true);
    };
    window.addEventListener("open-cookie-consent", handleOpen);

    // Check if user has already made a choice
    const consent = localStorage.getItem("amthromax-cookie-consent");
    if (!consent) {
      // Show banner after a short delay
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
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[380px] z-50 bg-white/95 dark:bg-[#161617]/95 backdrop-blur-md border border-gray-150 dark:border-white/[0.06] rounded-2xl p-5 shadow-2xl transition-colors duration-300 font-sans"
        >
          <div className="flex flex-col gap-4">
            {/* Header info */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800/80 flex items-center justify-center flex-shrink-0 text-xl">
                🍪
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  We use cookies
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  We use cookies to personalize your experience, analyze web traffic, and improve our services. By clicking "Accept", you agree to our use of cookies.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleDecline}
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 rounded-lg transition-colors duration-200"
              >
                Decline
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAccept}
                className="bg-black dark:bg-white text-white dark:text-black text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Accept All
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
