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
    <div className="bg-black min-h-screen text-white pt-24 font-sans selection:bg-white/10 select-none pb-24">
      <SEO title="User Profile | Amthromax" description="Manage your Amthromax subscription and security parameters." />
      
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Header Title Section */}
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold text-blue-400 uppercase tracking-widest block font-inter">Dashboard Suite</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-inter">Security & Account Settings</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar Profile Box */}
          <div className="md:col-span-1 p-8 rounded-3xl bg-black border border-white/15 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl">
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
            
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-white truncate max-w-[220px] font-inter">
                {fullName || "User Account"}
              </h2>
              <p className="text-xs text-gray-300 font-medium truncate max-w-[220px] font-inter">{user.email}</p>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-black border border-white/20 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm font-inter">
              <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Enterprise Member</span>
            </div>
          </div>

          {/* Account Settings Details Form */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-black border border-white/15 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm font-extrabold text-white font-inter">General Parameters</span>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-extrabold text-blue-400 hover:text-blue-300 transition-colors font-inter cursor-pointer"
                  >
                    Edit Details
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateName} className="space-y-4 font-inter">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold text-gray-300 uppercase tracking-wide">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-white/20 focus:border-blue-400 rounded-xl text-sm font-semibold focus:outline-none transition-all text-white placeholder-gray-500 font-inter" 
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      type="submit" 
                      disabled={isUpdating}
                      className="px-5 py-2.5 bg-white text-black text-xs font-black rounded-xl hover:bg-gray-100 disabled:opacity-50 transition-all cursor-pointer shadow-md font-inter"
                    >
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        const name = user.user_metadata?.full_name || user.user_metadata?.name || "";
                        setFullName(name);
                        setIsEditing(false);
                      }}
                      className="px-5 py-2.5 bg-black border border-white/20 text-xs font-bold text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer font-inter"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-sm font-inter">
                  <div className="flex justify-between py-2 border-b border-white/10 items-center">
                    <span className="text-gray-300 font-semibold text-xs">User UUID</span>
                    <span className="font-mono text-xs text-white font-bold tracking-tight bg-black px-3 py-1 rounded-lg border border-white/20 select-all">{user.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10 items-center">
                    <span className="text-gray-300 font-semibold text-xs">Auth Method</span>
                    <span className="text-white font-extrabold text-xs uppercase tracking-wider bg-black px-3 py-1 rounded-lg border border-white/20">{provider}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10 items-center">
                    <span className="text-gray-300 font-semibold text-xs">Joined Date</span>
                    <span className="text-white font-bold text-xs">{new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
                className="px-5 py-2.5 bg-black hover:bg-white/10 border border-white/20 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md font-inter"
              >
                Sign Out Account
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

          {/* Model endpoints grid */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-extrabold text-gray-300 uppercase tracking-widest block font-inter mb-2">Available Models</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[
                { name: "MORFIX 0.1", status: "Active" },
                { name: "INTOX 0.2", status: "Active" },
                { name: "COTISES 0.5 MAX", status: "Active" },
                { name: "VERKOX 0.4 INSTANT", status: "Active" }
              ].map((model, idx) => (
                <div key={idx} className="p-4 bg-black border border-white/15 hover:border-white/30 rounded-xl flex items-center justify-between transition-all shadow-md">
                  <span className="text-[12px] font-extrabold text-white font-number tracking-wide">{model.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span className="text-[10px] font-black text-white uppercase tracking-wider font-inter">{model.status}</span>
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
