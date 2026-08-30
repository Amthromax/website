import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";
import {
  PRIVACY_FRAMEWORKS,
  detectUserJurisdiction,
  setUserJurisdictionOverride,
  type PrivacyFrameworkRule,
} from "../../lib/globalPrivacyEngine";
import { detectGPC, type GPCStatus } from "../../lib/gpcEngine";
import { getUserConsentRecord, saveUserConsentRecord, type UserConsentRecord } from "../../lib/privacyService";
import { SUBPROCESSORS, PROCESSING_ACTIVITIES } from "../../lib/dataProcessorRegistry";
import { LEGAL_CONFIG } from "../../lib/privacyConfig";

const GlobalPrivacyCenterPage: React.FC = () => {
  const [jurisdiction, setJurisdiction] = useState<PrivacyFrameworkRule>(detectUserJurisdiction());
  const [gpcStatus] = useState<GPCStatus>(detectGPC());
  const [consentRecord, setConsentRecord] = useState<UserConsentRecord>(getUserConsentRecord());
  const [activeTab, setActiveTab] = useState<"overview" | "rights" | "cookies" | "processors" | "activities">("overview");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleJurisdictionChange = () => {
      setJurisdiction(detectUserJurisdiction());
    };
    window.addEventListener("amthromax_jurisdiction_change", handleJurisdictionChange);
    return () => window.removeEventListener("amthromax_jurisdiction_change", handleJurisdictionChange);
  }, []);

  const handleToggleConsent = (key: keyof Pick<UserConsentRecord, "analytics" | "marketing">) => {
    const updated = saveUserConsentRecord({ [key]: !consentRecord[key] });
    setConsentRecord(updated);
  };

  const handleManageCookiesModal = () => {
    window.dispatchEvent(new Event("open-cookie-consent"));
  };

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen font-sans antialiased transition-colors duration-300">
      <SEO
        title="Global Privacy Center & Data Governance | Amthromax"
        description="Amthromax global privacy center supporting EU GDPR, UK GDPR, California CCPA/CPRA, India DPDP, Brazil LGPD, PIPEDA, and universal data principal rights."
      />

      {/* Hero Header */}
      <section className="relative pt-[60px] pb-10 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-black">
        <div className="max-w-[1420px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 font-sans">
            <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Privacy Center</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4"
          >
            <h1 className="text-3xl sm:text-[38px] lg:text-[40px] font-normal tracking-tight text-gray-950 dark:text-white leading-tight font-sans">
              Global Privacy Center & Rights Portal
            </h1>
            <p className="text-[17px] sm:text-lg text-gray-600 dark:text-gray-300 max-w-[1300px] leading-[1.75] font-normal">
              Manage your personal data preferences, submit Data Subject requests under GDPR, CCPA/CPRA, DPDP, or LGPD, inspect subprocessor transfers, and configure privacy-preserving defaults.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="legal-container pt-[48px] space-y-[42px] font-sans">
        
        {/* Jurisdiction & GPC Signal Banner */}
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">Detected Framework:</span>
                <span className="inline-block text-xs font-bold text-gray-950 dark:text-white">
                  {jurisdiction.name}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">{jurisdiction.disclaimer}</p>
            </div>

            {/* Premium Framework Switcher Dropdown */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Region:</span>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-3.5 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 rounded-xl text-xs font-bold text-gray-900 dark:text-white shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{jurisdiction.regionName} ({jurisdiction.id})</span>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 p-1.5 space-y-0.5"
                  >
                    {Object.values(PRIVACY_FRAMEWORKS).map((fw) => {
                      const isSelected = fw.id === jurisdiction.id;
                      return (
                        <button
                          key={fw.id}
                          type="button"
                          onClick={() => {
                            setUserJurisdictionOverride(fw.id);
                            setJurisdiction(fw);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-black dark:bg-white text-white dark:text-black font-bold shadow-sm"
                              : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-bold tracking-tight">{fw.regionName}</span>
                            <span className={`text-[10px] ${isSelected ? "text-gray-300 dark:text-gray-600 font-mono" : "text-gray-400 dark:text-gray-500 font-mono"}`}>{fw.id}</span>
                          </div>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 text-white dark:text-black text-[11px] font-bold flex items-center justify-center">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* GPC Signal Detection Box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${gpcStatus.isGpcDetected ? "bg-blue-600 dark:bg-blue-400 animate-pulse" : "bg-zinc-400 dark:bg-zinc-600"}`} />
              <span className="font-bold text-gray-950 dark:text-white">Global Privacy Control (GPC):</span>
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                {gpcStatus.isGpcDetected ? "Active Opt-Out Signal Transmitted by Browser" : "No GPC Opt-Out Signal Detected"}
              </span>
            </div>
            {gpcStatus.isGpcDetected && (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-blue-800 dark:text-blue-300 text-[11px] font-bold">
                Auto-Opt-Out Active
              </span>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-200 dark:border-white/10"
            }`}
          >
            Privacy Overview
          </button>
          <button
            onClick={() => setActiveTab("rights")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "rights"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-200 dark:border-white/10"
            }`}
          >
            My Rights & DSAR Router
          </button>
          <button
            onClick={() => setActiveTab("cookies")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "cookies"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-200 dark:border-white/10"
            }`}
          >
            Cookie Preferences
          </button>
          <button
            onClick={() => setActiveTab("processors")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "processors"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-200 dark:border-white/10"
            }`}
          >
            Third-Party Subprocessors
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "activities"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-200 dark:border-white/10"
            }`}
          >
            Data Map & Legal Basis
          </button>
        </div>

        {/* TAB 1: Privacy Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-950 dark:text-white tracking-tight">Active Jurisdiction Rights Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase">Right of Access</span>
                  <p className={`font-bold mt-0.5 ${jurisdiction.rights.access ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
                    {jurisdiction.rights.access ? "Supported" : "N/A"}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase">Right to Erasure</span>
                  <p className={`font-bold mt-0.5 ${jurisdiction.rights.erasure ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
                    {jurisdiction.rights.erasure ? "Supported" : "N/A"}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase">Data Portability</span>
                  <p className={`font-bold mt-0.5 ${jurisdiction.rights.portability ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
                    {jurisdiction.rights.portability ? "Supported" : "N/A"}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase">Opt-Out Sale/Share</span>
                  <p className={`font-bold mt-0.5 ${jurisdiction.rights.optOutSaleShare ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
                    {jurisdiction.rights.optOutSaleShare ? "Supported (CCPA)" : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-gray-950 dark:text-white">Submit Privacy Request (DSAR)</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                  Submit a verified Data Subject Access Request for personal data access, correction, restriction, or erasure under GDPR, CCPA, DPDP, or LGPD.
                </p>
                <Link to="/privacy/request" className="inline-block px-4 py-2 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-gray-200 text-white dark:text-black text-xs font-bold transition-all shadow-sm">
                  Launch Request Portal
                </Link>
              </div>

              <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-gray-950 dark:text-white">Export Data Archive</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                  Download a machine-readable JSON archive containing profile data, workspace memberships, AI agent configurations, and consent logs.
                </p>
                <Link to="/profile" className="inline-block px-4 py-2 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-gray-200 text-white dark:text-black text-xs font-bold transition-all shadow-sm">
                  Go to Settings Export
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Rights Router & DSAR */}
        {activeTab === "rights" && (
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="space-y-1 border-b border-gray-200 dark:border-white/10 pb-4">
              <h3 className="text-base font-bold text-gray-950 dark:text-white tracking-tight">Data Principal & Subject Rights Router</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Select your desired privacy action to proceed to automated verification and processing.</p>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-white/10">
              <div className="py-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 dark:text-white">Right of Access (DSAR)</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Obtain confirmation of personal data processing and receive a summary copy.</p>
                </div>
                <Link to="/privacy/request?type=ACCESS" className="px-4 py-2 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-gray-200 text-white dark:text-black text-xs font-bold transition-all shadow-sm shrink-0">
                  Request Access
                </Link>
              </div>

              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 dark:text-white">Right to Rectification & Correction</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Correct inaccurate, incomplete, or outdated personal information stored in your account.</p>
                </div>
                <Link to="/privacy/request?type=RECTIFICATION" className="px-4 py-2 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-gray-200 text-white dark:text-black text-xs font-bold transition-all shadow-sm shrink-0">
                  Request Correction
                </Link>
              </div>

              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 dark:text-white">Right to Erasure / Account Deletion</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Request complete erasure of personal data subject to statutory financial retention rules.</p>
                </div>
                <Link to="/privacy/request?type=ERASURE" className="px-4 py-2 rounded-xl bg-white dark:bg-transparent border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold transition-all shadow-sm shrink-0">
                  Request Erasure
                </Link>
              </div>

              <div className="py-4 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 dark:text-white">CCPA / CPRA Do Not Sell or Share My Info</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Opt out of cross-context behavioral advertising and personal information transfer.</p>
                </div>
                <Link to="/privacy/request?type=CCPA_OPT_OUT_SALE_SHARE" className="px-4 py-2 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-gray-200 text-white dark:text-black text-xs font-bold transition-all shadow-sm shrink-0">
                  Opt Out Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Cookie Preferences */}
        {activeTab === "cookies" && (
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-white/10 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-gray-950 dark:text-white tracking-tight">Cookie & Tracker Categories</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Configure category consent for essential, performance, and marketing cookie technologies.</p>
              </div>
              <button onClick={handleManageCookiesModal} className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold hover:bg-zinc-800 dark:hover:bg-gray-200 cursor-pointer shadow-sm">
                Open Consent Banner
              </button>
            </div>

            <div className="space-y-4">
              {/* Strictly Necessary */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-gray-950 dark:text-white">Strictly Necessary Cookies</h5>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 font-medium">Essential for security, authentication, and session persistence.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-200 text-[10px] font-bold">Always Active</span>
              </div>

              {/* Analytics */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-gray-950 dark:text-white">Analytics & Performance</h5>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 font-medium">Anonymous operational metrics to optimize feature response latencies.</p>
                </div>
                <button
                  onClick={() => handleToggleConsent("analytics")}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${consentRecord.analytics ? "bg-black dark:bg-white" : "bg-gray-300 dark:bg-zinc-700"}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white dark:bg-black absolute top-1 transition-transform ${consentRecord.analytics ? "left-6" : "left-1"}`} />
                </button>
              </div>

              {/* Marketing */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-gray-950 dark:text-white">Marketing & Product Updates</h5>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 font-medium">Product announcements and technical feature release emails.</p>
                </div>
                <button
                  onClick={() => handleToggleConsent("marketing")}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${consentRecord.marketing ? "bg-black dark:bg-white" : "bg-gray-300 dark:bg-zinc-700"}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white dark:bg-black absolute top-1 transition-transform ${consentRecord.marketing ? "left-6" : "left-1"}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Subprocessor Registry */}
        {activeTab === "processors" && (
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="space-y-1 border-b border-gray-200 dark:border-white/10 pb-4">
              <h3 className="text-base font-bold text-gray-950 dark:text-white tracking-tight">Third-Party Subprocessor Registry</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Verified technical service providers, processing purposes, and international transfer mechanisms.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-800 dark:text-gray-200">
                <thead className="bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-[10px] rounded-lg">
                  <tr>
                    <th className="p-3 rounded-l-lg">Subprocessor</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Data Shared</th>
                    <th className="p-3">Region</th>
                    <th className="p-3 rounded-r-lg">Transfer Safeguard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {SUBPROCESSORS.map((sp) => (
                    <tr key={sp.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-3 font-bold text-gray-950 dark:text-white">
                        <a href={sp.privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 dark:text-blue-400">
                          {sp.name}
                        </a>
                      </td>
                      <td className="p-3 text-gray-600 dark:text-gray-300 font-medium">{sp.category}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300 font-medium">{sp.dataShared.join(", ")}</td>
                      <td className="p-3 text-gray-500 dark:text-gray-400 font-medium">{sp.region}</td>
                      <td className="p-3 font-mono text-[11px] text-gray-700 dark:text-gray-300 font-semibold">{sp.transferMechanism}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: Data Map & Legal Basis */}
        {activeTab === "activities" && (
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="space-y-1 border-b border-gray-200 dark:border-white/10 pb-4">
              <h3 className="text-base font-bold text-gray-950 dark:text-white tracking-tight">Data Processing Register & Legal Basis</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Lawful processing bases under EU GDPR Article 6, UK GDPR, and retention policies.</p>
            </div>

            <div className="space-y-3">
              {PROCESSING_ACTIVITIES.map((pa) => (
                <div key={pa.id} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <h5 className="text-xs font-bold text-gray-950 dark:text-white">{pa.name}</h5>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-blue-800 dark:text-blue-300 font-mono text-[10px] font-bold">
                      Legal Basis: {pa.legalBasisGDPR}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">{pa.purpose}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400 pt-1 border-t border-gray-200 dark:border-white/10">
                    <span><strong>Data Categories:</strong> {pa.dataCategories.join(", ")}</span>
                    <span>•</span>
                    <span><strong>Retention:</strong> {pa.retentionPolicy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legal Disclaimer & Grievance Contact */}
        <section className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-950 dark:text-white tracking-tight">Data Protection Contact & Grievance Desk</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Direct inquiries regarding international privacy rights or data protection officers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">Data Fiduciary / Controller</span>
              <p className="text-gray-950 dark:text-white font-bold text-sm">{LEGAL_CONFIG.dataFiduciaryName}</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">Privacy Email</span>
              <p className="text-gray-950 dark:text-white font-bold text-sm">
                <a href={`mailto:${LEGAL_CONFIG.privacyContactEmail}`} className="underline hover:text-blue-600 dark:hover:text-blue-400">
                  {LEGAL_CONFIG.privacyContactEmail}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GlobalPrivacyCenterPage;
