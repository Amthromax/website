import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { saveUserConsentRecord, getUserConsentRecord } from "../../lib/privacyService";
import { detectGPC } from "../../lib/gpcEngine";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [gpcActive, setGpcActive] = useState(false);
  const [preferences, setPreferences] = useState({
    strictlyNecessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const gpc = detectGPC();
    if (gpc.isGpcDetected) {
      setGpcActive(true);
    }

    const handleOpen = () => {
      setIsVisible(true);
    };
    window.addEventListener("open-cookie-consent", handleOpen);

    const record = getUserConsentRecord();
    const consentState = localStorage.getItem("amthromax-cookie-consent");
    if (!consentState) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("open-cookie-consent", handleOpen);
      };
    } else {
      setPreferences({
        strictlyNecessary: true,
        analytics: gpc.isGpcDetected ? false : record.analytics,
        marketing: gpc.isGpcDetected ? false : record.marketing,
      });
    }

    return () => {
      window.removeEventListener("open-cookie-consent", handleOpen);
    };
  }, []);

  const handleAcceptAll = () => {
    const record = saveUserConsentRecord({
      necessary: true,
      analytics: true,
      marketing: true,
    });
    setPreferences({
      strictlyNecessary: true,
      analytics: true,
      marketing: true,
    });
    localStorage.setItem("amthromax-cookie-consent", JSON.stringify(record));
    window.dispatchEvent(new Event("amthromax-consent-accepted"));
    setIsVisible(false);
  };

  const handleRejectOptional = () => {
    const record = saveUserConsentRecord({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    setPreferences({
      strictlyNecessary: true,
      analytics: false,
      marketing: false,
    });
    localStorage.setItem("amthromax-cookie-consent", JSON.stringify(record));
    window.dispatchEvent(new Event("amthromax-consent-accepted"));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const record = saveUserConsentRecord({
      necessary: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    });
    localStorage.setItem("amthromax-cookie-consent", JSON.stringify(record));
    window.dispatchEvent(new Event("amthromax-consent-accepted"));
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
            className="fixed bottom-0 left-0 right-0 z-40 bg-[#161617]/95 backdrop-blur-md border-t border-white/[0.08] p-5 md:p-6 shadow-2xl font-sans text-white select-none"
          >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-4xl">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    Your privacy matters
                  </h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
                    DPDP & GDPR Aligned
                  </span>
                  {gpcActive && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      GPC Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  Amthromax uses necessary technologies to operate the service securely and may use optional technologies such as analytics where applicable. Visit{" "}
                  <button
                    type="button"
                    onClick={() => setShowPreferencesModal(true)}
                    className="underline hover:text-white transition-colors focus:outline-none cursor-pointer"
                  >
                    Manage Preferences
                  </button>{" "}
                  to change choices anytime. Learn more in our{" "}
                  <Link
                    to="/cookie-policy"
                    className="underline hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/data-protection"
                    className="underline hover:text-white transition-colors"
                  >
                    Data Protection Framework
                  </Link>.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPreferencesModal(true)}
                  className="px-5 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/90 hover:bg-white/5 hover:border-white/45 transition-all focus:outline-none cursor-pointer"
                >
                  Manage Preferences
                </button>
                <button
                  type="button"
                  onClick={handleRejectOptional}
                  className="px-5 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/90 hover:bg-white/5 hover:border-white/45 transition-all focus:outline-none cursor-pointer"
                >
                  Reject Optional
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-all focus:outline-none shadow-md cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferencesModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0f0f10] border border-white/[0.08] rounded-3xl max-w-lg w-full p-6 md:p-8 text-white font-sans space-y-6 max-h-[90vh] overflow-y-auto relative scrollbar-none"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Privacy & Technology Preferences</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Manage technology preferences and consent categories. Necessary technologies are required for core security and functionality. Optional analytics technologies help us improve system performance under the DPDP framework.{" "}
                  <Link to="/data-protection" className="underline hover:text-white transition-colors">
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
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-semibold text-white/95">Necessary & Core Security</h5>
                      <span className="text-[10px] uppercase font-mono text-zinc-400">Always Active</span>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Required for authentication, session integrity, encryption, and core SaaS application execution. Cannot be disabled.
                    </p>
                  </div>
                </div>

                {/* Analytics */}
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
                    <h5 className="text-sm font-semibold text-white/95 group-hover:text-white transition-colors">Performance & Analytics</h5>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Collects aggregated, non-identifying telemetry to measure platform uptime, model latency, and execution performance.
                    </p>
                  </div>
                </div>

                {/* Marketing */}
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
                    <h5 className="text-sm font-semibold text-white/95 group-hover:text-white transition-colors">Product & Feature Communications</h5>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Allows Amthromax to send opted-in notifications regarding new AI model releases, security updates, and feature announcements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="w-full py-3 bg-white text-black font-semibold rounded-full text-sm hover:opacity-90 transition-all focus:outline-none cursor-pointer"
                >
                  Save Preferences
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
