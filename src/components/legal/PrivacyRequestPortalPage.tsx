import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { detectUserJurisdiction } from "../../lib/globalPrivacyEngine";
import {
  submitPrivacyRequest,
  getPrivacyRequestById,
  type PrivacyRequestType,
  type PrivacyRequestItem,
} from "../../lib/privacyRequestService";

const PrivacyRequestPortalPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const [requestType, setRequestType] = useState<PrivacyRequestType>("ACCESS");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [submittedRequest, setSubmittedRequest] = useState<PrivacyRequestItem | null>(null);

  // Status Search state
  const [searchRequestId, setSearchRequestId] = useState("");
  const [foundRequest, setFoundRequest] = useState<PrivacyRequestItem | null>(null);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const typeParam = searchParams.get("type") as PrivacyRequestType;
    if (typeParam) {
      setRequestType(typeParam);
    }
    if (user) {
      setEmail(user.email || "");
      setFullName(user.user_metadata?.full_name || user.user_metadata?.name || "");
    }
  }, [user, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentJur = detectUserJurisdiction();
    const req = submitPrivacyRequest(
      user?.id || "guest_user",
      email,
      fullName || "Data Subject",
      requestType,
      currentJur.id,
      description
    );
    setSubmittedRequest(req);
  };

  const handleSearchRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(false);
    const res = getPrivacyRequestById(searchRequestId.trim());
    if (res) {
      setFoundRequest(res);
    } else {
      setFoundRequest(null);
      setSearchError(true);
    }
  };

  return (
    <div className="bg-[#f5f5f7] text-gray-900 min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <SEO
        title="Privacy Rights Request Portal | Amthromax"
        description="Submit Data Subject Access Requests (DSAR), erasure, portability, or CCPA opt-out requests under GDPR, CCPA/CPRA, DPDP, and LGPD frameworks."
      />

      {/* Hero Header */}
      <section className="relative pt-[60px] pb-10 border-b border-black/[0.06] bg-[#f5f5f7]">
        <div className="max-w-[1420px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4 font-inter">
            <Link to="/privacy-center" className="hover:text-black transition-colors">
              Privacy Center
            </Link>
            <span>/</span>
            <span className="text-gray-900">Privacy Request Portal</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-3"
          >
            <h1 className="text-3xl sm:text-[38px] lg:text-[40px] font-normal tracking-tight text-gray-950 leading-tight font-inter">
              Privacy Subject Request Portal (DSAR)
            </h1>
            <p className="text-[17px] sm:text-lg text-gray-600 max-w-[1300px] leading-[1.75] font-normal">
              Exercise your legal rights under GDPR, CCPA/CPRA, India DPDP, Brazil LGPD, or PIPEDA. Every request undergoes automated identity verification and compliance auditing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1420px] mx-auto px-6 sm:px-12 lg:px-16 py-10 space-y-[48px] font-inter">
        
        {submittedRequest ? (
          <div className="bg-white border border-black/[0.06] rounded-2xl p-8 shadow-sm space-y-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-950 tracking-tight">Privacy Request Submitted Successfully</h2>
              <p className="text-xs text-gray-600 font-medium max-w-md mx-auto">
                Your request ID is <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{submittedRequest.id}</span>. An email verification link has been dispatched to your email address.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f5f7] max-w-md mx-auto text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Request Type:</span>
                <span className="font-bold text-gray-900">{submittedRequest.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Target Resolution:</span>
                <span className="font-bold text-gray-900">{new Date(submittedRequest.targetResolutionDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-bold text-blue-600">{submittedRequest.status}</span>
              </div>
            </div>

            <button
              onClick={() => setSubmittedRequest(null)}
              className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left 2 Cols: Submission Form */}
            <div className="md:col-span-2 bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm space-y-6">
              <div className="space-y-1 border-b border-black/[0.06] pb-4">
                <h3 className="text-base font-bold text-gray-950 tracking-tight">Submit New Privacy Request</h3>
                <p className="text-xs text-gray-600 font-medium">Complete all required identity details to initiate formal processing.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-inter">
                <div className="space-y-1">
                  <label className="block font-bold text-gray-900">Request Type</label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value as PrivacyRequestType)}
                    className="w-full px-3 py-2 bg-[#f5f5f7] border border-black/[0.1] rounded-xl font-medium focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="ACCESS">Right of Access / Data Summary (GDPR/DPDP)</option>
                    <option value="RECTIFICATION">Right to Rectification & Correction</option>
                    <option value="ERASURE">Right to Erasure / Account Removal</option>
                    <option value="PORTABILITY">Right to Data Portability (JSON Archive)</option>
                    <option value="RESTRICTION">Right to Restriction of Processing</option>
                    <option value="OBJECTION">Right to Object to Processing</option>
                    <option value="CONSENT_WITHDRAWAL">Withdraw Consent</option>
                    <option value="CCPA_OPT_OUT_SALE_SHARE">CCPA / CPRA Do Not Sell or Share My Info</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-gray-900">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 bg-[#f5f5f7] border border-black/[0.1] rounded-xl font-medium focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-gray-900">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full px-3 py-2 bg-[#f5f5f7] border border-black/[0.1] rounded-xl font-medium focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-gray-900">Request Details / Context (Optional)</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide specific details regarding your request or affected workspace..."
                    className="w-full px-3 py-2 bg-[#f5f5f7] border border-black/[0.1] rounded-xl font-medium focus:outline-none focus:border-black"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition-all cursor-pointer shadow-sm"
                  >
                    Submit Privacy Request
                  </button>
                </div>
              </form>
            </div>

            {/* Right 1 Col: Status Tracker */}
            <div className="md:col-span-1 bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm space-y-4 h-fit">
              <div className="space-y-1 border-b border-black/[0.06] pb-3">
                <h4 className="text-sm font-bold text-gray-950">Track Existing Request</h4>
                <p className="text-xs text-gray-600 font-medium">Enter your Request ID to check status.</p>
              </div>

              <form onSubmit={handleSearchRequest} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  value={searchRequestId}
                  onChange={(e) => setSearchRequestId(e.target.value)}
                  placeholder="prq_178..."
                  className="w-full px-3 py-2 bg-[#f5f5f7] border border-black/[0.1] rounded-xl font-mono focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-all cursor-pointer"
                >
                  Check Status
                </button>
              </form>

              {searchError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-[11px] font-medium border border-red-200">
                  Request ID not found. Please verify the ID and try again.
                </div>
              )}

              {foundRequest && (
                <div className="p-3 rounded-xl bg-[#f5f5f7] text-xs space-y-1 font-inter border border-black/[0.04]">
                  <div className="font-bold text-gray-950">{foundRequest.type}</div>
                  <div className="text-[11px] text-gray-500 font-mono">ID: {foundRequest.id}</div>
                  <div className="text-[11px]">
                    Status: <span className="font-bold text-blue-600">{foundRequest.status}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyRequestPortalPage;
