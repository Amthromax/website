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
    <div className="bg-[#f5f5f7] text-gray-900 min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <SEO
        title="Data Protection & DPDP Framework | Amthromax"
        description="Amthromax data protection principles, Data Principal rights, Data Fiduciary responsibilities, and Digital Personal Data Protection (DPDP) alignment framework."
      />

      {/* Hero Header - Compact Editorial Spacing */}
      <section className="relative pt-24 pb-10 border-b border-black/[0.06] bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4 font-inter">
            <Link to="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900">Data Protection</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-3.5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-blue-600 text-[11px] font-bold shadow-sm font-inter">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>DPDP Alignment Architecture</span>
              <span>•</span>
              <span>India Framework</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-950 leading-tight font-inter">
              Data Protection & Privacy Governance
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed font-normal">
              Establishing transparent data processing practices, strict Data Principal rights, and robust security controls for enterprise AI workflows under the Digital Personal Data Protection (DPDP) framework.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Compact Spacing & Typography */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-10 space-y-8 font-inter">
        
        {/* Notice Alert - Compact Apple Box */}
        <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-gray-950 text-sm">
            <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center text-[10px] font-bold">
              i
            </span>
            <span>Regulatory & Legal Disclaimer</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            This page outlines Amthromax's technical and operational data protection architecture designed to support compliance with India's Digital Personal Data Protection (DPDP) Act. This document is provided for informational transparency and does not constitute formal legal certification. Status:{" "}
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono text-[11px] font-semibold">
              {LEGAL_CONFIG.legalReviewStatus}
            </span>
          </p>
        </div>

        {/* Core DPDP Pillars */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
            1. Core Data Protection Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Box 1 */}
            <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center shadow-sm">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-950 tracking-tight">Purpose Limitation</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  Personal data is processed strictly for the explicit purpose authorized by the Data Principal (user) upon signup or service interaction.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center shadow-sm">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-950 tracking-tight">Data Minimization</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  Amthromax collects only the minimum personal data points necessary to deliver secure enterprise AI execution and workspace collaboration.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center shadow-sm">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-950 tracking-tight">Zero Secret Leakage</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  API keys, passwords, and private tokens are automatically redacted by our privacy engine before prompts reach third-party AI models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Principal Rights Table */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
            2. Data Principal Rights & Self-Service Tools
          </h2>
          <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm">
            <div className="divide-y divide-black/[0.06]">
              
              {/* Row 1 */}
              <div className="py-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 tracking-tight">Right to Access Summary & Information</h4>
                  <p className="text-xs text-gray-600 font-medium">View stored personal data, workspace memberships, and active consents in your profile settings.</p>
                </div>
                <Link to="/profile" className="px-4 py-2 rounded-full bg-black hover:bg-zinc-800 text-[11px] font-bold text-white transition-all shadow-sm shrink-0">
                  View Settings
                </Link>
              </div>

              {/* Row 2 */}
              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 tracking-tight">Right to Data Portability & Export</h4>
                  <p className="text-xs text-gray-600 font-medium">Generate a machine-readable JSON archive containing profile data, agent configs, and consent logs.</p>
                </div>
                <Link to="/profile" className="px-4 py-2 rounded-full bg-black hover:bg-zinc-800 text-[11px] font-bold text-white transition-all shadow-sm shrink-0">
                  Export Data
                </Link>
              </div>

              {/* Row 3 */}
              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 tracking-tight">Right to Erasure & Account Deletion</h4>
                  <p className="text-xs text-gray-600 font-medium">Request complete account removal subject to 30-day statutory grace period and security retention safety rules.</p>
                </div>
                <Link to="/profile" className="px-4 py-2 rounded-full bg-black hover:bg-zinc-800 text-[11px] font-bold text-white transition-all shadow-sm shrink-0">
                  Delete Account
                </Link>
              </div>

              {/* Row 4 */}
              <div className="py-4 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-950 tracking-tight">Right to Withdraw Consent</h4>
                  <p className="text-xs text-gray-600 font-medium">Withdraw optional consent for analytics, marketing, or automated communications anytime.</p>
                </div>
                <button onClick={handleManageCookies} className="px-4 py-2 rounded-full bg-black hover:bg-zinc-800 text-[11px] font-bold text-white transition-all shadow-sm cursor-pointer shrink-0">
                  Manage Cookies
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Data Inventory Matrix */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
            3. Amthromax Data Inventory Matrix
          </h2>
          <div className="bg-white border border-black/[0.06] rounded-2xl p-4 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-800">
                <thead className="bg-[#f5f5f7] text-gray-700 font-bold uppercase tracking-wider text-[10px] rounded-lg">
                  <tr>
                    <th className="p-3 rounded-l-lg">Category</th>
                    <th className="p-3">Data Points</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Storage Location</th>
                    <th className="p-3 rounded-r-lg">Retention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {DATA_INVENTORY.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#f9f9fb] transition-colors">
                      <td className="p-3 font-bold text-gray-950 shrink-0">{item.category}</td>
                      <td className="p-3 text-gray-600 font-medium">{item.dataPoints.join(", ")}</td>
                      <td className="p-3 text-gray-600 font-medium">{item.purpose}</td>
                      <td className="p-3 text-gray-500 font-medium">{item.storageLocation}</td>
                      <td className="p-3 font-mono text-gray-700 font-bold text-[11px]">{item.retentionPeriod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Grievance Redressal Mechanism */}
        <section className="bg-white border border-black/[0.06] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
              4. Grievance Redressal & Contact
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
              In accordance with DPDP requirements, Amthromax has designated a Grievance Redressal Desk to address data privacy inquiries, consent withdrawal requests, or data processing concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#f5f5f7] border border-black/[0.04] space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Data Fiduciary</span>
              <p className="text-gray-950 font-bold text-sm">{LEGAL_CONFIG.dataFiduciaryName}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f5f7] border border-black/[0.04] space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Grievance Desk</span>
              <p className="text-gray-950 font-bold text-sm">{LEGAL_CONFIG.grievanceOfficerName}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f5f7] border border-black/[0.04] space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Email Contact</span>
              <p className="text-gray-950 font-bold text-sm">
                <a href={`mailto:${LEGAL_CONFIG.grievanceOfficerEmail}`} className="underline hover:text-blue-600 transition-colors">
                  {LEGAL_CONFIG.grievanceOfficerEmail}
                </a>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f5f7] border border-black/[0.04] space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Office Location</span>
              <p className="text-gray-700 font-semibold text-xs leading-snug">{LEGAL_CONFIG.grievanceOfficerAddress}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DataProtectionPage;
