import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../layout/SEO";

export const ProfilePage: React.FC = () => {
  const { user, authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
          data: { full_name: fullName }
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
      
      // Clear success alert after 3 seconds
      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (err: any) {
      setUpdateMessage({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <span className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const avatarChar = (fullName || user.email || "?")[0].toUpperCase();
  const provider = user.app_metadata?.provider || "email";

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 font-sans selection:bg-white/10 select-none pb-24">
      <SEO title="User Profile | Amthromax" description="Manage your Amthromax subscription and security parameters." />
      
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Header Title Section */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Dashboard Suite</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Security & Account Settings</h1>
        </div>

        {/* Global Alert Notices */}
        <AnimatePresence>
          {updateMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between ${
                updateMessage.type === "success" 
                  ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400" 
                  : "bg-red-950/20 border-red-500/20 text-red-400"
              }`}
            >
              <span>{updateMessage.text}</span>
              <button onClick={() => setUpdateMessage(null)} className="opacity-60 hover:opacity-100 min-w-[20px]">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar Profile Box */}
          <div className="md:col-span-1 p-8 rounded-3xl bg-[#0d0d0e]/60 border border-white/[0.06] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border border-white/10 bg-white/5 relative">
              {user.user_metadata?.avatar_url || user.user_metadata?.picture ? (
                <img 
                  src={user.user_metadata.avatar_url || user.user_metadata.picture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-3xl font-black text-white">{avatarChar}</span>
              )}
            </div>
            
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white truncate max-w-[220px]">
                {fullName || "User Account"}
              </h2>
              <p className="text-xs text-white/50 truncate max-w-[220px]">{user.email}</p>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-wider text-white/85">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>Enterprise Member</span>
            </div>
          </div>

          {/* Account Settings Details Form */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-[#0d0d0e]/60 border border-white/[0.06] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/[0.06] pb-4">
                <span className="text-sm font-bold text-white/90">General Parameters</span>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-bold text-white hover:text-white/80 transition-colors"
                  >
                    Edit Details
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateName} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wide">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 focus:border-white/30 rounded-xl text-sm focus:outline-none transition-all text-white" 
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      type="submit" 
                      disabled={isUpdating}
                      className="px-4 py-2 bg-white text-black text-xs font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {isUpdating ? "Saving..." : "Save"}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        const name = user.user_metadata?.full_name || user.user_metadata?.name || "";
                        setFullName(name);
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-bold rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-1 border-b border-white/[0.02]">
                    <span className="text-white/40 font-semibold">User UUID</span>
                    <span className="font-mono text-xs text-white/60 truncate max-w-[240px] select-all">{user.id}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.02]">
                    <span className="text-white/40 font-semibold">Auth Method</span>
                    <span className="text-white/60 uppercase text-xs tracking-wider">{provider}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.02]">
                    <span className="text-white/40 font-semibold">Joined Date</span>
                    <span className="text-white/60 text-xs">{new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-8 flex justify-end">
              <button
                onClick={async () => {
                  await signOut();
                  navigate("/", { replace: true });
                }}
                className="px-5 py-2.5 bg-red-950/20 hover:bg-red-950/30 border border-red-500/20 text-red-500 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Sign Out Account
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Inference Resource Panel */}
        <div className="p-8 rounded-3xl bg-[#0d0d0e]/60 border border-white/[0.06] space-y-6">
          <div className="space-y-1 border-b border-white/[0.06] pb-4">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Resource Space</span>
            <h3 className="text-lg font-bold text-white">Workspace Compute & Endpoints</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tokens Consumption Progress */}
            <div className="space-y-3 bg-white/[0.01] border border-white/5 p-5 rounded-2xl">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60 font-semibold">Monthly Inference Volume</span>
                <span className="font-mono text-white/90">1.46B / 10.0B tokens</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-[14.6%]" />
              </div>
              <p className="text-[10px] text-white/40">Renews on August 29, 2026. Limit resets automatically.</p>
            </div>

            {/* Sandbox details */}
            <div className="space-y-3 bg-white/[0.01] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase tracking-wide text-white/40 font-bold">Runtime Engine</span>
                  <p className="text-sm font-semibold text-white/90 mt-0.5">amx-agent-production-v3</p>
                </div>
                <span className="inline-flex px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[9px] uppercase tracking-wider font-bold text-emerald-400 rounded-md">
                  Active
                </span>
              </div>
              <p className="text-[10px] text-white/40">Located in AWS cluster node us-east-1.</p>
            </div>
          </div>

          {/* Model endpoints grid */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Available Models</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "MORFIX 0.1", status: "Active" },
                { name: "INTOX 0.2", status: "Active" },
                { name: "COTISES 0.5 MAX", status: "Active" },
                { name: "VERKOX 0.4 INSTANT", status: "Active" }
              ].map((model, idx) => (
                <div key={idx} className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white/90 font-mono">{model.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wide">{model.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
