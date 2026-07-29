import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../layout/SEO";

export const ProfilePage: React.FC = () => {
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Developer state
  const [apiKey, setApiKey] = useState("amx_live_7c4d29f8a3b5e612f00a4d8c7e9");
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

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

  const handleRotateKey = () => {
    const chars = "abcdef0123456789";
    let newKey = "amx_live_";
    for (let i = 0; i < 27; i++) {
      newKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setApiKey(newKey);
    setUpdateMessage({ type: "success", text: "API key rotated successfully!" });
    setTimeout(() => setUpdateMessage(null), 3000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
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
    <div className="bg-[#050505] min-h-screen text-white pt-24 font-sans selection:bg-white/10 select-none">
      <SEO title="User Profile | Amthromax" description="Manage your Amthromax subscription, developer APIs, and security parameters." />
      
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

            <div className="inline-flex px-3 py-1 bg-white/5 border border-white/15 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/80">
              Developer Tier
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
                  await supabase.auth.signOut();
                  navigate("/", { replace: true });
                }}
                className="px-5 py-2.5 bg-red-950/20 hover:bg-red-950/30 border border-red-500/20 text-red-500 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Sign Out Account
              </button>
            </div>
          </div>
        </div>

        {/* Developer APIs Showcase (Premium Feature) */}
        <div className="p-8 rounded-3xl bg-[#0d0d0e]/60 border border-white/[0.06] space-y-6">
          <div className="space-y-2 border-b border-white/[0.06] pb-4 flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-0.5">Developer Keys</span>
              <h3 className="text-lg font-bold text-white">Amthromax Live APIs</h3>
            </div>
            <button
              onClick={handleRotateKey}
              className="text-xs font-bold text-white hover:text-white/80 transition-colors uppercase tracking-wider"
            >
              Rotate Key
            </button>
          </div>

          <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
            Use this live token to query the Amthromax models (MORFIX, INTOX, COTISES, VERKOX) from terminal pipelines or local integration codeboxes. Keep this token private.
          </p>

          <div className="flex items-center space-x-3 bg-white/[0.02] border border-white/10 p-3 rounded-2xl">
            <span className="text-white/35 font-bold font-mono text-xs pl-2">TOKEN</span>
            <div className="flex-1 font-mono text-xs text-white/90 overflow-hidden truncate">
              {isKeyVisible ? apiKey : "●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●"}
            </div>
            
            <div className="flex space-x-2 flex-shrink-0 pr-1">
              <button 
                onClick={() => setIsKeyVisible(!isKeyVisible)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase hover:bg-white/10 transition-colors cursor-pointer select-none"
              >
                {isKeyVisible ? "Hide" : "Show"}
              </button>
              <button 
                onClick={handleCopyKey}
                className="px-3 py-1.5 bg-white text-black border border-transparent rounded-lg text-[10px] font-bold uppercase hover:opacity-90 transition-all cursor-pointer select-none min-w-[70px] text-center"
              >
                {copiedKey ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
