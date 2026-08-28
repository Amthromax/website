import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementBannerProps {
  onRegisterClick?: () => void;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if dismissed
    const isDismissed = sessionStorage.getItem("amthromax_announcement_dismissed");
    if (isDismissed) return;

    // Check if user has accepted terms / cookie consent or on initial session
    const consent = localStorage.getItem("amthromax-cookie-consent");
    if (consent) {
      setIsVisible(true);
    } else {
      // Listen for cookie/terms acceptance event
      const handleConsentAccepted = () => {
        setIsVisible(true);
      };
      window.addEventListener("amthromax-consent-accepted", handleConsentAccepted);
      
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => {
        window.removeEventListener("amthromax-consent-accepted", handleConsentAccepted);
        clearTimeout(timer);
      };
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("amthromax_announcement_dismissed", "true");
    setIsVisible(false);
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Open event registration landing page in a new browser tab as requested
    window.open("/register", "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0c]/95 backdrop-blur-xl text-white border-t border-white/10 select-none font-sans py-3 px-4 sm:px-8 shadow-[0_-4px_30px_rgba(0,0,0,0.9)] antialiased"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
            {/* High Clarity Announcement Text */}
            <div className="flex-1 flex items-center justify-center text-center text-xs sm:text-[13.5px] font-medium text-white tracking-normal leading-normal overflow-hidden">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="font-semibold text-white">Amthromax Next AI is coming.</span>{" "}
                <span className="text-zinc-400 font-normal">
                  A new generation of enterprise intelligence — autonomous reasoning, real-time pipelines, and beyond.{" "}
                </span>
                <span className="text-white font-semibold hover:text-[#d4ff00] transition-colors hover:underline cursor-pointer whitespace-nowrap" onClick={handleRegisterClick}>
                  Be the first to know &rarr;
                </span>
              </p>
            </div>

            {/* Premium Neon Yellow Register Button & Close Icon */}
            <div className="flex items-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={handleRegisterClick}
                className="bg-[#d4ff00] hover:bg-[#c2f000] text-black font-bold text-xs sm:text-[12.5px] px-5 py-2 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] border border-black/10 cursor-pointer flex items-center gap-1.5"
              >
                <span>Learn More</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 focus:outline-none"
                aria-label="Close announcement"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
