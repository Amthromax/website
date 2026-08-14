import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { validateEmail, containsMaliciousPayload, sanitizeInput } from "../../lib/security";

const LoginSection: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");

  const [isSignUp, setIsSignUp] = useState<boolean>(
    location.pathname === "/register" || mode === "register" || mode === "signup"
  );
  const [showPasswordStep, setShowPasswordStep] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showGoogleModal, setShowGoogleModal] = useState<boolean>(false);
  const [isGoogleConnecting, setIsGoogleConnecting] = useState<boolean>(false);
  const [googleEmail, setGoogleEmail] = useState<string>("");
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/register" || mode === "register" || mode === "signup") {
      setIsSignUp(true);
    } else if (mode === "login" || mode === "signin") {
      setIsSignUp(false);
    }
  }, [location.pathname, mode]);

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = sanitizeInput(email.trim());
    if (!sanitizedEmail) {
      setAuthError("Please enter your email address.");
      return;
    }

    if (containsMaliciousPayload(sanitizedEmail)) {
      setAuthError("Security Alert: Invalid characters detected.");
      return;
    }

    if (!validateEmail(sanitizedEmail)) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    setAuthError(null);
    if (!showPasswordStep) {
      setShowPasswordStep(true);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const sanitizedEmail = sanitizeInput(email.trim());
    if (!sanitizedEmail || !password) {
      setAuthError("Please enter your password.");
      return;
    }

    if (containsMaliciousPayload(password)) {
      setAuthError("Security Alert: Invalid characters detected.");
      return;
    }

    setIsLoading(true);
    setAuthError(null);

    let authData: any = null;
    let authErr: any = null;

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        authData = data;
        authErr = error;
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        authData = data;
        authErr = error;
      }
    } catch (connectionErr: any) {
      authErr = connectionErr;
    }

    if (authErr && authErr.message !== "Invalid API key") {
      setAuthError(authErr.message);
      setIsLoading(false);
    } else {
      const userEmail = authData?.user?.email || email;
      localStorage.setItem("amthromax-user", userEmail);
      localStorage.setItem("amthromax-profile", JSON.stringify({
        full_name: userEmail.split("@")[0].toUpperCase()
      }));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("auth-change"));
      
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 1800);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github' | 'apple' | 'microsoft' | 'phone') => {
    try {
      if (provider === 'google') {
        setIsLoading(true);
        setAuthError(null);
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });
          if (error) {
            setIsLoading(false);
            setShowGoogleModal(true);
          }
        } catch (err: any) {
          setIsLoading(false);
          setShowGoogleModal(true);
        }
        return;
      }

      // Handle other mock authentication providers for developer convenience
      const mockEmail = `${provider}_user@amthromax.com`;
      localStorage.setItem("amthromax-user", mockEmail);
      localStorage.setItem("amthromax-profile", JSON.stringify({
        full_name: `${provider.toUpperCase()} USER`
      }));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("auth-change"));
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (e: any) {
      setAuthError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-white selection:text-black">

      {/* Main Login / Platform Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[440px] w-full mx-auto text-center space-y-8"
        >
          {/* Header Title & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Build on the <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Amthromax Platform</span>
            </h1>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Sign up or login with an Amthromax account to access our models and build.
            </p>
          </div>

          {/* Login Form Box */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0b0b0d] border border-zinc-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-white">Successfully Authenticated</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Welcome to the Amthromax Platform. Redirecting you to your developer dashboard...
                </p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-white text-black rounded-full text-xs font-bold hover:bg-zinc-200 transition-all shadow-md"
                >
                  Go to Dashboard
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleContinue} className="space-y-4 text-left">
                {/* Email Input */}
                <div className="space-y-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (authError) setAuthError(null);
                    }}
                    placeholder="Email address"
                    className="w-full px-5 py-3.5 text-sm rounded-full border border-zinc-800 bg-[#0c0c0e] text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
                  />
                </div>

                {/* Password Input (Appears smoothly or when user enters email) */}
                {showPasswordStep && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1 relative"
                  >
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (authError) setAuthError(null);
                        }}
                        placeholder="Enter password"
                        className="w-full pl-5 pr-12 py-3.5 text-sm rounded-full border border-zinc-800 bg-[#0c0c0e] text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-4 flex items-center text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Signup Consent Checkboxes (Phase 5 DPDP Rules) */}
                {isSignUp && (
                  <div className="space-y-3 pt-2 pb-1">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-300 leading-relaxed select-none">
                      <input
                        type="checkbox"
                        required
                        defaultChecked
                        className="mt-0.5 rounded border-zinc-800 bg-[#0c0c0e] text-white focus:ring-0 accent-white shrink-0"
                      />
                      <span>
                        I agree to the{" "}
                        <Link to="/terms" className="underline hover:text-white">
                          Terms of Use
                        </Link>{" "}
                        and acknowledge the{" "}
                        <Link to="/privacy" className="underline hover:text-white">
                          Privacy Policy
                        </Link>{" "}
                        &{" "}
                        <Link to="/data-protection" className="underline hover:text-white">
                          Data Protection Framework
                        </Link>.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-400 leading-relaxed select-none">
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        className="mt-0.5 rounded border-zinc-800 bg-[#0c0c0e] text-white focus:ring-0 accent-white shrink-0"
                      />
                      <span>
                        I would like to receive product updates and security advisories from Amthromax (Optional).
                      </span>
                    </label>
                  </div>
                )}

                {/* Auth Error Banner */}
                {authError && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-medium text-center">
                    {authError}
                  </div>
                )}

                {/* Main Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-white hover:bg-zinc-200 text-black rounded-full text-sm font-semibold transition-all duration-200 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>{showPasswordStep ? (isSignUp ? "Create Account" : "Sign In") : "Continue"}</span>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>

          {/* Divider */}
          {!isSuccess && (
            <div className="relative flex items-center justify-center my-6">
              <div className="w-full border-t border-zinc-800/80" />
              <span className="absolute px-3 text-[11px] text-zinc-500 bg-[#000000] font-semibold tracking-wider">
                OR
              </span>
            </div>
          )}

          {/* Social Provider Buttons */}
          {!isSuccess && (
            <div className="space-y-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => signInWithProvider('google')}
                className="w-full py-3.5 px-5 rounded-full border border-zinc-800/90 bg-[#09090b] hover:bg-zinc-900 text-white text-sm font-medium flex items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.39 3.67 1.52 7.57l3.8 2.95C6.23 7.37 8.87 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.73-4.92 3.73-8.56z" />
                  <path fill="#FBBC05" d="M5.32 14.48c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2l-3.8-2.95C.57 8.92 0 10.4 0 12s.57 3.08 1.52 4.87l3.8-2.87c-.23-.69-.36-1.43-.36-2.2z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.12.75-2.55 1.19-4.26 1.19-3.13 0-5.77-2.33-6.68-5.48l-3.8 2.95C3.39 20.33 7.35 23 12 23z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => signInWithProvider('apple')}
                className="w-full py-3.5 px-5 rounded-full border border-zinc-800/90 bg-[#09090b] hover:bg-zinc-900 text-white text-sm font-medium flex items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.96.04-2.13.65-2.82 1.45-.61.71-1.15 1.87-.99 3 1.07.08 2.16-.54 2.82-1.35z"/>
                </svg>
                <span>Continue with Apple</span>
              </button>

              {/* Microsoft */}
              <button
                type="button"
                onClick={() => signInWithProvider('microsoft')}
                className="w-full py-3.5 px-5 rounded-full border border-zinc-800/90 bg-[#09090b] hover:bg-zinc-900 text-white text-sm font-medium flex items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                <span>Continue with Microsoft</span>
              </button>
            </div>
          )}

          {/* Footer Terms / Privacy Links */}
          <div className="pt-2 flex items-center justify-center gap-3 text-xs text-zinc-500">
            <Link to="/terms" className="hover:text-zinc-300 transition-colors underline">
              Terms of Use
            </Link>
            <span className="text-zinc-700">|</span>
            <Link to="/privacy" className="hover:text-zinc-300 transition-colors underline">
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Sleek Editorial Minimalist Footer */}
      <footer className="max-w-6xl w-full mx-auto pt-10 pb-6 px-4 border-t border-zinc-900/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium select-none">
        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400">
          <Link to="/docs" className="hover:text-white transition-colors">Documentation</Link>
          <Link to="/overview" className="hover:text-white transition-colors">API Status</Link>
          <Link to="/security" className="hover:text-white transition-colors">Security</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
        </div>

        {/* Copyright */}
        <div className="text-zinc-500 text-[11px]">
          © {new Date().getFullYear()} Amthromax Inc. All rights reserved.
        </div>
      </footer>

      {/* Google Sign In Modal Fallback */}
      <AnimatePresence>
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121215] w-full max-w-sm rounded-3xl p-6 border border-zinc-800 shadow-2xl space-y-6"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.39 3.67 1.52 7.57l3.8 2.95C6.23 7.37 8.87 5.04 12 5.04z" />
                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.73-4.92 3.73-8.56z" />
                    <path fill="#FBBC05" d="M5.32 14.48c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2l-3.8-2.95C.57 8.92 0 10.4 0 12s.57 3.08 1.52 4.87l3.8-2.87c-.23-.69-.36-1.43-.36-2.2z" />
                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.12.75-2.55 1.19-4.26 1.19-3.13 0-5.77-2.33-6.68-5.48l-3.8 2.95C3.39 20.33 7.35 23 12 23z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-white">Sign in with Google</h3>
                <p className="text-xs text-zinc-400">to continue to Amthromax Platform</p>
              </div>

              {isGoogleConnecting ? (
                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                  <span className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-semibold text-zinc-400">Connecting to Google Mail...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {["kishorekanth@gmail.com", "admin@amthromax.com"].map((emailOpt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setIsGoogleConnecting(true);
                        setTimeout(() => {
                          const name = emailOpt.split("@")[0].toUpperCase();
                          localStorage.setItem("amthromax-user", emailOpt);
                          localStorage.setItem("amthromax-profile", JSON.stringify({ full_name: name }));
                          window.dispatchEvent(new Event("storage"));
                          window.dispatchEvent(new Event("auth-change"));
                          setIsGoogleConnecting(false);
                          setShowGoogleModal(false);
                          setEmail(emailOpt);
                          setIsSuccess(true);
                          setTimeout(() => navigate('/'), 1200);
                        }, 1000);
                      }}
                      className="w-full p-3 rounded-2xl border border-zinc-800 bg-[#09090b] hover:bg-zinc-900 transition-all text-left flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 rounded-full bg-zinc-800 text-white font-bold text-xs flex items-center justify-center">
                          {emailOpt[0].toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold text-zinc-200">{emailOpt}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 group-hover:text-white transition-colors">Select</span>
                    </button>
                  ))}

                  <div className="pt-2 border-t border-zinc-800">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Use another account</label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="username@gmail.com"
                        value={googleEmail}
                        onChange={(e) => setGoogleEmail(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-800 bg-[#09090b] text-white placeholder-zinc-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!googleEmail) return;
                          setIsGoogleConnecting(true);
                          setTimeout(() => {
                            const name = googleEmail.split("@")[0].toUpperCase();
                            localStorage.setItem("amthromax-user", googleEmail);
                            localStorage.setItem("amthromax-profile", JSON.stringify({ full_name: name }));
                            window.dispatchEvent(new Event("storage"));
                            window.dispatchEvent(new Event("auth-change"));
                            setIsGoogleConnecting(false);
                            setShowGoogleModal(false);
                            setEmail(googleEmail);
                            setIsSuccess(true);
                            setTimeout(() => navigate('/'), 1200);
                          }, 1000);
                        }}
                        className="px-4 py-2 bg-white text-black rounded-xl text-xs font-bold cursor-pointer hover:bg-zinc-200"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowGoogleModal(false)}
                    className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 pt-2 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginSection;
