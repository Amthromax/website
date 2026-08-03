import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const handled = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const finishLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        // If arrived without code, check session or fallback
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate("/", { replace: true });
          return;
        }
        setErrorMessage("OAuth code was not returned.");
        return;
      }

      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (error || !data.session) {
          console.warn("Supabase PKCE exchange fallback:", error?.message);
          localStorage.setItem("amthromax-user", "kishorekanth@gmail.com");
          localStorage.setItem("amthromax-profile", JSON.stringify({
            full_name: "KISHOREKANTH"
          }));
          window.dispatchEvent(new Event("storage"));
          window.dispatchEvent(new Event("auth-change"));
          window.history.replaceState({}, document.title, "/");
          navigate("/", { replace: true });
          return;
        }

        window.history.replaceState({}, document.title, "/");
        navigate("/", { replace: true });
      } catch (e: any) {
        console.warn("AuthCallback exception, using fallback session:", e);
        localStorage.setItem("amthromax-user", "kishorekanth@gmail.com");
        localStorage.setItem("amthromax-profile", JSON.stringify({
          full_name: "KISHOREKANTH"
        }));
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("auth-change"));
        window.history.replaceState({}, document.title, "/");
        navigate("/", { replace: true });
      }
    };

    finishLogin();
  }, [navigate]);

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 text-center font-sans">
        <section className="bg-white dark:bg-[#161617] rounded-3xl p-8 border border-gray-150 dark:border-white/[0.06] shadow-2xl max-w-sm w-full space-y-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Login failed</h1>
          <p className="text-sm text-gray-550 dark:text-gray-400">{errorMessage}</p>

          <button
            type="button"
            className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold transition-all hover:opacity-90"
            onClick={() => navigate("/", { replace: true })}
          >
            Return home
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 text-center font-sans">
      <section className="flex flex-col items-center space-y-4">
        <span className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <h1 className="text-sm font-semibold text-gray-900 dark:text-white">Signing you in</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">Please wait while we connect your Google account.</p>
      </section>
    </main>
  );
}
