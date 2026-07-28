import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [preferences, setPreferences] = useState({
    strictlyNecessary: true,
    analytics: false,
    marketing: false,
    personalized: false,
  });

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

  const handleSavePreferences = () => {
    localStorage.setItem("amthromax-cookie-consent", JSON.stringify(preferences));
    setShowPreferencesModal(false);
    setIsVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-[#252423]/95 backdrop-blur-md border-t border-white/[0.08] p-5 md:p-6 shadow-2xl font-sans"
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
                    onClick={() => setShowPreferencesModal(true)}
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
                  onClick={() => setShowPreferencesModal(true)}
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

      <AnimatePresence>
        {showPreferencesModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0f0f10] border border-white/[0.08] rounded-3xl max-w-lg w-full p-6 md:p-8 text-white font-sans space-y-6 max-h-[90vh] overflow-y-auto relative scrollbar-none"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Cookie Preferences</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Websites and apps use cookies and other identifiers to store and retrieve information on your device. Some of this information may be shared with third parties for different purposes. Use the tool below to manage your preferences. You can change them anytime.{" "}
                  <Link to="/cookie-policy" className="underline hover:text-white transition-colors">
                    Learn more
                  </Link>
                </p>
              </div>

              <div className="space-y-6 pt-2">
                {/* Strictly Necessary */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full border border-white/30 flex items-center justify-center bg-white/10 text-white select-none shrink-0 pointer-events-none">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-semibold text-white/95">Strictly necessary</h5>
                    <p className="text-xs text-white/50 leading-relaxed">
                      These cookies are required for the site to work and can't be turned off. They support essential functions like security, user authentication, and customer support.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div 
                  className="flex items-start gap-4 cursor-pointer group select-none"
                  onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                >
                  <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${preferences.analytics ? 'border-white bg-white text-black' : 'border-white/20 group-hover:border-white/45'}`}>
                    {preferences.analytics && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-semibold text-white/95 group-hover:text-white transition-colors">Analytics Cookies</h5>
                    <p className="text-xs text-white/50 leading-relaxed">
                      These cookies help us understand how visitors interact with our site. They allow us to measure traffic and improve site performance.
                    </p>
                  </div>
                </div>

                {/* Marketing measurement */}
                <div 
                  className="flex items-start gap-4 cursor-pointer group select-none"
                  onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                >
                  <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${preferences.marketing ? 'border-white bg-white text-black' : 'border-white/20 group-hover:border-white/45'}`}>
                    {preferences.marketing && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-semibold text-white/95 group-hover:text-white transition-colors">Marketing measurement</h5>
                    <p className="text-xs text-white/50 leading-relaxed">
                      These cookies help us measure the effectiveness of our marketing campaigns.
                    </p>
                  </div>
                </div>

                {/* Personalized marketing */}
                <div 
                  className="flex items-start gap-4 cursor-pointer group select-none"
                  onClick={() => setPreferences(prev => ({ ...prev, personalized: !prev.personalized }))}
                >
                  <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${preferences.personalized ? 'border-white bg-white text-black' : 'border-white/20 group-hover:border-white/45'}`}>
                    {preferences.personalized && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-semibold text-white/95 group-hover:text-white transition-colors">Personalized marketing</h5>
                    <p className="text-xs text-white/50 leading-relaxed">
                      This helps us personalize and measure OpenAI's own marketing on third-party platforms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="w-full py-3 bg-white text-black font-semibold rounded-full text-sm hover:opacity-90 transition-all focus:outline-none"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
