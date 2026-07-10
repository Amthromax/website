import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const LoginSection: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 md:p-8 font-sans transition-colors duration-300">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row relative min-h-[550px]"
      >
        {/* Left Side: Gradient Banner */}
        <div className="w-full md:w-[45%] bg-[#0f0f10] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden text-white select-none">
          {/* Decorative Blur Spheres (B&W / Monochrome Gradients) */}
          <div className="absolute top-[-20%] left-[-20%] w-72 h-72 bg-white/[0.08] rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-20%] w-72 h-72 bg-white/[0.05] rounded-full mix-blend-screen filter blur-3xl opacity-40 pointer-events-none" />

          {/* Logo */}
          <div className="relative z-10">
            <span className="text-4xl font-light text-white/90 leading-none select-none">*</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 relative z-10 pt-24 md:pt-0">
            <span className="text-xs uppercase tracking-widest text-white/70 font-semibold">You can easily</span>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-white/95">
              Get access your personal hub for clarity and productivity
            </h2>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-between bg-white dark:bg-gray-900 transition-colors duration-300">
          {/* Top Row: Logo & Title */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              {/* Asterisk Logo in B&W */}
              <span className="text-3xl font-light text-black dark:text-white select-none">*</span>
              {/* Close Button back to home */}
              <Link to="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                ✕
              </Link>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition-all duration-300">
                {isSignUp ? "Create an account" : "Sign in to Amthromax"}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed max-w-sm">
                Access your tasks, notes, and projects anytime, anywhere - and keep everything flowing in one place.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 my-6">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center space-y-3"
                >
                  <span className="text-2xl">✨</span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Authentication Successful</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Welcome back! Redirecting you to your workspace dashboard...
                  </p>
                  <Link
                    to="/"
                    className="inline-block mt-2 px-4 py-2 bg-black hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black rounded-full text-xs font-semibold transition-all shadow-sm"
                  >
                    Go to Homepage
                  </Link>
                </motion.div>
              ) : (
                <motion.div key="inputs" className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="farazhaidet786@gmail.com"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-850 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5 relative">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Password</label>
                      {!isSignUp && (
                        <a href="#" className="text-[10px] text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white font-medium underline">
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-4 pr-10 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-850 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button (B&W) */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 bg-black hover:bg-neutral-850 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black rounded-xl text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white dark:border-black border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>{isSignUp ? "Get Started" : "Sign In"}</span>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Social Sign In */}
          {!isSuccess && (
            <div className="space-y-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                </div>
                <span className="relative px-3 text-[10px] text-gray-400 bg-white dark:bg-gray-900 uppercase tracking-widest font-semibold">
                  or continue with
                </span>
              </div>

              {/* Social Buttons (B&W Minimalist Style) */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold text-gray-850 dark:text-gray-200 flex justify-center items-center space-x-2 transition-all"
                >
                  <span>GitHub</span>
                </button>
                <button
                  type="button"
                  className="py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold text-gray-850 dark:text-gray-200 flex justify-center items-center space-x-2 transition-all"
                >
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold text-gray-850 dark:text-gray-200 flex justify-center items-center space-x-2 transition-all"
                >
                  <span>Apple</span>
                </button>
              </div>

              {/* Toggle Account View */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-gray-500 hover:text-black dark:text-gray-455 dark:hover:text-white transition-colors"
                >
                  {isSignUp ? (
                    <>
                      Already have an account? <span className="text-black dark:text-white font-bold underline">Sign in</span>
                    </>
                  ) : (
                    <>
                      Don't have an account? <span className="text-black dark:text-white font-bold underline">Sign up</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSection;
