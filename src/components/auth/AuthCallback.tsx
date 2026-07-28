import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let completed = false;

    const navigateToHome = () => {
      if (completed) return;
      completed = true;
      navigate("/", {
        replace: true,
        state: { authenticationSuccess: true }
      });
    };

    // 1. Immediately check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigateToHome();
      }
    });

    // 2. Subscribe to auth state changes to detect transition to signed-in automatically
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AuthCallback observed event:", event);
      if (session) {
        navigateToHome();
      }
    });

    // 3. Poll for the session to load for up to 8 seconds
    const startTime = Date.now();
    const intervalId = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        clearInterval(intervalId);
        navigateToHome();
      } else if (Date.now() - startTime > 8000) {
        clearInterval(intervalId);
        if (!completed) {
          setErrorMessage("Authentication session could not be established within 8 seconds.");
        }
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
      subscription.unsubscribe();
    };
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
