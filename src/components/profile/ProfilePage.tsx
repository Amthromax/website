import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../layout/SEO";
import {
  getUserConsentRecord,
  saveUserConsentRecord,
  downloadUserDataExport,
  validateAccountDeletion,
  requestAccountDeletion,
  type UserConsentRecord,
} from "../../lib/privacyService";
import { getAIPrivacyConfig, saveAIPrivacyConfig, type AIPrivacyConfig } from "../../lib/aiPrivacy";
import { PRIVACY_POLICY_VERSION } from "../../lib/privacyConfig";
import { DEFAULT_RETENTION_POLICY } from "../../lib/retentionConfig";

export const ProfilePage: React.FC = () => {
  const { user, authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Privacy & Consent State
  const [consentRecord, setConsentRecord] = useState<UserConsentRecord>(getUserConsentRecord());
  const [aiPrivacyConfig, setAiPrivacyConfig] = useState<AIPrivacyConfig>(getAIPrivacyConfig());

  // Deletion Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationPhrase, setDeleteConfirmationPhrase] = useState("");
  const [deletionStatus, setDeletionStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Sync state with user profile metadata
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
    } else if (user) {
      const name = user.user_metadata?.full_name || user.user_metadata?.name || "";
      setFullName(name);
    }
  }, [user, authLoading, navigate]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateMessage(null);

    try {
      let isFallback = false;
      try {
        const { error } = await supabase.auth.updateUser({
          data: { full_name: fullName },
        });
        if (error) {
          isFallback = true;
        }
      } catch (err) {
        isFallback = true;
      }

      if (isFallback) {
        localStorage.setItem("amthromax-profile", JSON.stringify({ full_name: fullName }));
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("auth-change"));
      }

      setUpdateMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);

      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (err: any) {
      setUpdateMessage({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleConsent = (key: keyof Pick<UserConsentRecord, "analytics" | "marketing">) => {
    const updated = saveUserConsentRecord({ [key]: !consentRecord[key] }, user?.id);
    setConsentRecord(updated);
    setUpdateMessage({ type: "success", text: `Privacy preference for ${key} updated successfully.` });
    setTimeout(() => setUpdateMessage(null), 3000);
  };

  const handleToggleAIPrivacy = (key: keyof AIPrivacyConfig) => {
    const updated = saveAIPrivacyConfig({ [key]: !aiPrivacyConfig[key] });
    setAiPrivacyConfig(updated);
    setUpdateMessage({ type: "success", text: "AI Data Privacy configuration updated." });
    setTimeout(() => setUpdateMessage(null), 3000);
  };

  const handleExportData = () => {
    if (!user) return;
    downloadUserDataExport(user.id, user.email || "user@amthromax.com", fullName);
    setUpdateMessage({ type: "success", text: "Personal Data Archive exported successfully (JSON format)." });
    setTimeout(() => setUpdateMessage(null), 4000);
  };

  const handleExecuteDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const res = requestAccountDeletion(user.id, user.email || "user@amthromax.com", deleteConfirmationPhrase);
    if (!res.success) {
      setDeletionStatus({ success: false, message: res.message });
      return;
    }

    setDeletionStatus({ success: true, message: res.message });
    setTimeout(() => {
      setShowDeleteModal(false);
      signOut();
      navigate("/", { replace: true });
    }, 2500);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <span className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const avatarChar = (fullName || user.email || "?")[0].toUpperCase();
  const rawProvider = (user.app_metadata?.provider || user.identities?.[0]?.provider || "google").toLowerCase();
  const provider =
    rawProvider.includes("google") ||
    rawProvider === "email" ||
    user.identities?.some((i: any) => i.provider === "google") ||
    user.user_metadata?.iss?.includes("google") ||
    !user.app_metadata?.provider
      ? "GOOGLE OAUTH"
      : rawProvider.toUpperCase() + " OAUTH";

  const deletionCheck = validateAccountDeletion(user.id, "Owner");

  return (
    <div className="bg-black min-h-screen text-white pt-24 font-sans selection:bg-white/10 select-none pb-24">
      <SEO title="User Profile & Privacy Settings | Amthromax" description="Manage your Amthromax subscription, security parameters, and DPDP privacy settings." />

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Header Title Section */}
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold text-blue-400 uppercase tracking-widest block font-inter">Dashboard Suite</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-inter">Security & Privacy Settings</h1>
        </div>

        {/* Global Alert Notices */}
        <AnimatePresence>
          {updateMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="p-4 rounded-2xl border border-white/20 bg-black text-white text-sm font-bold flex items-center justify-between font-inter shadow-xl"
            >
              <span>{updateMessage.text}</span>
              <button onClick={() => setUpdateMessage(null)} className="opacity-70 hover:opacity-100 min-w-[20px] cursor-pointer">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Avatar Profile Box */}
          <div className="md:col-span-1 p-8 rounded-3xl bg-black border border-white/15 flex flex-col items-center justify-between text-center shadow-2xl h-full min-h-[340px]">
            <div className="flex flex-col items-center space-y-4 w-full my-auto py-4">
              <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-2 border-white/20 bg-black relative shadow-inner">
                {user.user_metadata?.avatar_url || user.user_metadata?.picture ? (
                  <img
                    src={user.user_metadata.avatar_url || user.user_metadata.picture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-3xl font-black text-white font-inter">{avatarChar}</span>
                )}
              </div>

              <div className="space-y-1 w-full flex flex-col items-center">
                <h2 className="text-lg font-extrabold text-white truncate max-w-[220px] font-inter">
                  {fullName || "User Account"}
                </h2>
                <p className="text-xs text-gray-300 font-medium truncate max-w-[220px] font-inter">{user.email}</p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black border border-white/20 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm font-inter shrink-0">
              <span className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              <span>Enterprise Member</span>
            </div>
          </div>

          {/* Account Settings Details Form */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-black border border-white/15 flex flex-col justify-between shadow-2xl h-full min-h-[340px] transition-all duration-300">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm font-extrabold text-white font-inter">General Parameters</span>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-extrabold text-blue-400 hover:text-blue-300 transition-colors font-inter cursor-pointer"
                  >
                    Edit Details
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const name = user.user_metadata?.full_name || user.user_metadata?.name || "";
                      setFullName(name);
                      setIsEditing(false);
                    }}
                    className="text-xs font-extrabold text-gray-400 hover:text-white transition-colors font-inter cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className="space-y-4 font-inter">
                {/* Full Name Row */}
                <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 border-b border-white/10 sm:items-center gap-2">
                  <span className="text-white font-bold text-base md:text-lg shrink-0">Full Name</span>
                  {isEditing ? (
                    <form onSubmit={handleUpdateName} className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full sm:w-64 px-3 py-1.5 bg-black border border-white/30 focus:border-blue-400 rounded-lg text-sm font-semibold focus:outline-none transition-all text-white placeholder-gray-500 font-inter"
                        placeholder="Your name"
                        required
                        autoFocus
                      />
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="px-3.5 py-1.5 bg-white text-black text-xs font-black rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all cursor-pointer shadow-md font-inter shrink-0"
                      >
                        {isUpdating ? "Saving..." : "Save"}
                      </button>
                    </form>
                  ) : (
                    <span className="text-white font-bold text-sm">{fullName || "Not specified"}</span>
                  )}
                </div>

                {/* User UUID Row */}
                <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 border-b border-white/10 sm:items-center gap-1">
                  <span className="text-white font-bold text-base md:text-lg">User UUID</span>
                  <span className="font-mono text-xs text-white font-bold tracking-tight select-all">{user.id}</span>
                </div>

                {/* Auth Method Row */}
                <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 border-b border-white/10 sm:items-center gap-1">
                  <span className="text-white font-bold text-base md:text-lg">Auth Method</span>
                  <span className="text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2">
                    {provider.includes("GOOGLE") && (
                      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                    )}
                    <span>{provider}</span>
                  </span>
                </div>

                {/* Joined Date Row */}
                <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 border-b border-white/10 sm:items-center gap-1">
                  <span className="text-white font-bold text-base md:text-lg">Joined Date</span>
                  <span className="text-white font-bold text-sm">{new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <button
                onClick={async () => {
                  await signOut();
                  navigate("/", { replace: true });
                }}
                className="px-5 py-2.5 bg-black hover:bg-white/10 border border-white/20 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md font-inter"
              >
                Sign Out Account
              </button>
            </div>
          </div>
        </div>

        {/* DPDP PRIVACY & DATA PROTECTION DASHBOARD (Phases 6, 7, 8, 10) */}
        <div className="p-8 rounded-3xl bg-black border border-white/15 space-y-8 shadow-2xl font-inter">
          <div className="space-y-1 border-b border-white/10 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold text-blue-400 uppercase tracking-widest block font-inter">Privacy & Governance</span>
              <h3 className="text-2xl font-black text-white font-inter">Privacy, Data Protection & Rights</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-inter font-semibold">
                Policy v{PRIVACY_POLICY_VERSION}
              </span>
              <Link to="/data-protection" className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold hover:bg-blue-500/20 transition-colors">
                DPDP Specs
              </Link>
            </div>
          </div>

          {/* Privacy & Consent Controls */}
          <div className="space-y-6">
            <h4 className="text-base font-bold text-white tracking-tight">1. Preference & Consent Management</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-white">Performance Telemetry</h5>
                  <p className="text-xs text-zinc-400">Anonymous operational system analytics</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleConsent("analytics")}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${consentRecord.analytics ? "bg-blue-500" : "bg-zinc-800"}`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${consentRecord.analytics ? "left-6" : "left-0.5"}`} />
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-white">Product Communications</h5>
                  <p className="text-xs text-zinc-400">Feature updates and technical announcements</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleConsent("marketing")}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${consentRecord.marketing ? "bg-blue-500" : "bg-zinc-800"}`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${consentRecord.marketing ? "left-6" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* AI Data Safeguards & Secret Redaction (Phase 10) */}
          <div className="space-y-6 pt-4 border-t border-white/10">
            <h4 className="text-base font-bold text-white tracking-tight">2. AI Data Safeguards & Model Training Opt-Out</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-white">Automatic Secret Redaction</h5>
                  <p className="text-xs text-zinc-400">Sanitizes API keys & passwords in AI prompts</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleAIPrivacy("redactSecretsBeforeInference")}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${aiPrivacyConfig.redactSecretsBeforeInference ? "bg-blue-500" : "bg-zinc-800"}`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${aiPrivacyConfig.redactSecretsBeforeInference ? "left-6" : "left-0.5"}`} />
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-white">Provider Training Opt-Out</h5>
                  <p className="text-xs text-zinc-400">Disables data usage for third-party AI training</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleAIPrivacy("disableProviderTraining")}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${aiPrivacyConfig.disableProviderTraining ? "bg-blue-500" : "bg-zinc-800"}`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${aiPrivacyConfig.disableProviderTraining ? "left-6" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Data Retention Schedule Summary */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-base font-bold text-white tracking-tight">3. Data Lifecycle & Retention Safeguards</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-inter">
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                <span className="text-zinc-400 font-medium">API Execution Logs</span>
                <p className="text-white font-inter font-bold tracking-tight text-sm">{DEFAULT_RETENTION_POLICY.sessionLogsDays} Days Retention</p>
                <p className="text-[11px] text-zinc-400">Security monitoring & diagnostic telemetry</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                <span className="text-zinc-400 font-medium">AI Prompt Logs</span>
                <p className="text-white font-inter font-bold tracking-tight text-sm">{DEFAULT_RETENTION_POLICY.aiConversationsDays} Days Retention</p>
                <p className="text-[11px] text-zinc-400">Model reasoning & interaction memory</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                <span className="text-zinc-400 font-medium">Account Deletion Grace</span>
                <p className="text-white font-inter font-bold tracking-tight text-sm">{DEFAULT_RETENTION_POLICY.deletedAccountsGraceDays} Days Grace Period</p>
                <p className="text-[11px] text-zinc-400">Statutory window prior to hard database scrub</p>
              </div>
            </div>
          </div>

          {/* Data Export & Account Deletion Actions (Phases 7 & 8) */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white font-inter">Data Subject Rights Actions</h4>
              <p className="text-xs text-zinc-400 font-inter">Download a full archive of your profile and data, or request account erasure.</p>
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={handleExportData}
                className="px-3.5 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all shadow-md cursor-pointer whitespace-nowrap shrink-0"
              >
                Export Data (.json)
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="px-3.5 py-2 rounded-xl bg-white text-red-600 text-xs font-bold hover:bg-zinc-100 transition-all shadow-md cursor-pointer whitespace-nowrap shrink-0"
              >
                Request Account Deletion
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Inference Resource Panel */}
        <div className="p-8 rounded-3xl bg-black border border-white/15 space-y-6 shadow-2xl">
          <div className="space-y-1 border-b border-white/10 pb-4">
            <span className="text-[11px] font-extrabold text-blue-400 uppercase tracking-widest block font-inter">Resource Space</span>
            <h3 className="text-xl font-extrabold text-white font-inter">Workspace Compute & Endpoints</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tokens Consumption Progress */}
            <div className="space-y-3.5 bg-black border border-white/15 p-6 rounded-2xl shadow-inner">
              <div className="flex justify-between items-center">
                <span className="text-gray-200 font-bold text-xs font-inter">Monthly Inference Volume</span>
                <span className="font-number text-sm font-extrabold text-white tracking-tight bg-black px-3 py-1 rounded-lg border border-white/20 shadow-sm">1.46B / 10.0B tokens</span>
              </div>
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/15">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full w-[14.6%] shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              </div>
              <p className="text-[11px] text-gray-300 font-medium font-inter">Renews on August 29, 2026. Limit resets automatically.</p>
            </div>

            {/* Sandbox details */}
            <div className="space-y-3.5 bg-black border border-white/15 p-6 rounded-2xl flex flex-col justify-between shadow-inner">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-300 font-extrabold font-inter">Runtime Engine</span>
                  <p className="text-base font-extrabold text-white font-inter tracking-tight mt-0.5">amx-agent-production-v3</p>
                </div>
                <span className="inline-flex px-3 py-1 bg-black border border-white/20 text-[10px] uppercase tracking-wider font-black text-white rounded-md shadow-sm font-inter">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-gray-300 font-medium font-inter">Located in AWS cluster node us-east-1.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Deletion Modal (Phase 8) */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121214] border border-red-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-6 shadow-2xl"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold text-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Confirm Account Deletion Request</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {deletionCheck.warningMessage}
                </p>
              </div>

              {deletionCheck.requiresWorkspaceTransfer ? (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs space-y-2">
                  <p className="font-bold">Sole Workspace Owner Protection Active</p>
                  <p className="text-[11px] text-amber-200">
                    To prevent leaving workspace <span className="font-mono">{deletionCheck.ownedWorkspaceNames.join(", ")}</span> orphaned, please assign a co-owner or delete the workspace before initiating personal profile deletion.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleExecuteDeleteAccount} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Type <span className="font-mono text-red-400 font-bold">DELETE MY ACCOUNT</span> to confirm:
                    </label>
                    <input
                      type="text"
                      required
                      value={deleteConfirmationPhrase}
                      onChange={(e) => setDeleteConfirmationPhrase(e.target.value)}
                      placeholder="DELETE MY ACCOUNT"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                    />
                  </div>

                  {deletionStatus?.message && (
                    <div className={`p-3 rounded-xl text-xs font-medium ${deletionStatus.success ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20' : 'bg-red-500/10 text-red-300 border border-red-500/20'}`}>
                      {deletionStatus.message}
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-bold text-zinc-300 hover:bg-zinc-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      Submit Deletion Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
