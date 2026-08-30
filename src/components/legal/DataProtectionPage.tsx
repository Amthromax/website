import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";
import { LEGAL_CONFIG, DATA_INVENTORY } from "../../lib/privacyConfig";

const DataProtectionPage: React.FC = () => {
  const handleManageCookies = () => {
    window.dispatchEvent(new Event("open-cookie-consent"));
  };

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen font-sans antialiased transition-colors duration-300">
      <SEO
        title="Data Protection & DPDP Framework | Amthromax"
        description="Amthromax data protection principles, Data Principal rights, Data Fiduciary responsibilities, and Digital Personal Data Protection (DPDP) alignment framework."
      />

      {/* Hero Header */}
      <section className="relative pt-[72px] pb-10 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-black">
        <div className="max-w-[1420px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 font-sans">
            <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Data Protection</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-3.5"
          >
            <h1 className="text-3xl sm:text-[38px] lg:text-[40px] font-normal tracking-tight text-gray-950 dark:text-white leading-tight font-sans">
              Data Protection & Privacy Governance
            </h1>
            <p className="text-[17px] sm:text-lg text-gray-600 dark:text-gray-300 max-w-[1300px] leading-[1.75] font-normal">
              Establishing transparent data processing practices, strict Data Subject rights, and robust security controls for enterprise AI workflows under US (CCPA/CPRA), EU GDPR, and international data protection standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="legal-container pt-[72px] space-y-[42px] font-sans">
        
        {/* Notice Alert - Compact Apple Box */}
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-2 max-w-[1300px]">
          <div className="flex items-center gap-2 font-bold text-gray-950 dark:text-white text-sm">
            <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center text-[10px] font-bold">
              i
            </span>
            <span>Regulatory & Legal Disclaimer</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            This page outlines Amthromax Inc.'s technical and operational data protection architecture designed to support compliance with US (CCPA/CPRA), EU GDPR, and global data privacy regulations. Status:{" "}
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-300 font-mono text-[11px] font-semibold">
              {LEGAL_CONFIG.legalReviewStatus}
            </span>
          </p>
        </div>

        {/* Core DPDP Pillars */}
        <section className="space-y-4 max-w-[1300px]">
          <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
            1. Core Data Protection Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Box 1 */}
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs flex items-center justify-center shadow-sm">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-950 dark:text-white tracking-tight">Purpose Limitation</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  Personal data is processed strictly for the explicit purpose authorized by the Data Principal (user) upon signup or service interaction.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs flex items-center justify-center shadow-sm">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-950 dark:text-white tracking-tight">Data Minimization</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  Amthromax collects only the minimum personal data points necessary to deliver secure enterprise AI execution and workspace collaboration.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs flex items-center justify-center shadow-sm">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-950 dark:text-white tracking-tight">Zero Secret Leakage</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  API keys, passwords, and private tokens are automatically redacted by our privacy engine before prompts reach third-party AI models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Principal Rights Table */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
            2. Data Principal Rights & Self-Service Tools
          </h2>
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <div className="divide-y divide-gray-200 dark:divide-white/10">
              
              {/* Row 1 */}
              <div className="py-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 dark:text-white tracking-tight">Right to Access Summary & Information</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">View stored personal data, workspace memberships, and active consents in your profile settings.</p>
                </div>
                <Link to="/profile" className="px-4 py-2 rounded-full bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-gray-200 text-[11px] font-bold text-white dark:text-black transition-all shadow-sm shrink-0">
                  View Settings
                </Link>
              </div>

              {/* Row 2 */}
              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 dark:text-white tracking-tight">Right to Data Portability & Export</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Generate a machine-readable JSON archive containing profile data, agent configs, and consent logs.</p>
                </div>
                <Link to="/profile" className="px-4 py-2 rounded-full bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-gray-200 text-[11px] font-bold text-white dark:text-black transition-all shadow-sm shrink-0">
                  Export Data
                </Link>
              </div>

              {/* Row 3 */}
              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 dark:text-white tracking-tight">Right to Erasure & Account Deletion</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Request complete account removal subject to 30-day statutory grace period and security retention safety rules.</p>
                </div>
                <Link to="/profile" className="px-4 py-2 rounded-full bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-gray-200 text-[11px] font-bold text-white dark:text-black transition-all shadow-sm shrink-0">
                  Delete Account
                </Link>
              </div>

              {/* Row 4 */}
              <div className="py-4 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 dark:text-white tracking-tight">Right to Withdraw Consent</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Withdraw optional consent for analytics, marketing, or automated communications anytime.</p>
                </div>
                <button onClick={handleManageCookies} className="px-4 py-2 rounded-full bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-gray-200 text-[11px] font-bold text-white dark:text-black transition-all shadow-sm cursor-pointer shrink-0">
                  Manage Cookies
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Data Inventory Matrix */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
            3. Amthromax Data Inventory Matrix
          </h2>
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-800 dark:text-gray-200">
                <thead className="bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-[10px] rounded-lg">
                  <tr>
                    <th className="p-3 rounded-l-lg">Category</th>
                    <th className="p-3">Data Points</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Storage Location</th>
                    <th className="p-3 rounded-r-lg">Retention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {DATA_INVENTORY.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-3 font-bold text-gray-950 dark:text-white shrink-0">{item.category}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300 font-medium">{item.dataPoints.join(", ")}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300 font-medium">{item.purpose}</td>
                      <td className="p-3 text-gray-500 dark:text-gray-400 font-medium">{item.storageLocation}</td>
                      <td className="p-3 font-mono text-gray-700 dark:text-gray-300 font-bold text-[11px]">{item.retentionPeriod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Grievance Redressal Mechanism */}
        <section className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              4. Grievance Redressal & Contact
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              In accordance with global data protection requirements, Amthromax Inc. has designated a Data Protection & Privacy Desk to address data privacy inquiries, consent withdrawal requests, or data processing concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">Data Fiduciary</span>
              <p className="text-gray-950 dark:text-white font-bold text-sm">{LEGAL_CONFIG.dataFiduciaryName}</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">Grievance Desk</span>
              <p className="text-gray-950 dark:text-white font-bold text-sm">{LEGAL_CONFIG.grievanceOfficerName}</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">Email Contact</span>
              <p className="text-gray-950 dark:text-white font-bold text-sm">
                <a href={`mailto:${LEGAL_CONFIG.grievanceOfficerEmail}`} className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {LEGAL_CONFIG.grievanceOfficerEmail}
                </a>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">Office Location</span>
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-xs leading-snug">{LEGAL_CONFIG.grievanceOfficerAddress}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DataProtectionPage;
