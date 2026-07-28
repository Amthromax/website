import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Prevent React StrictMode from running the exchange twice.
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const completeLogin = async () => {
      try {
        const searchParams = new URLSearchParams(
          window.location.search
        );

        const code = searchParams.get("code");
        const oauthError = searchParams.get("error");
        const oauthErrorDescription =
          searchParams.get("error_description");

        if (oauthError) {
          throw new Error(
            oauthErrorDescription ||
              "Google authentication was cancelled."
          );
        }

        if (!code) {
          throw new Error(
             "Google did not return an authentication code."
          );
        }

        const { data, error } =
          await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          console.error("Code exchange error:", error);
          throw error;
        }

        if (!data.session || !data.user) {
          throw new Error(
            "Supabase did not create an authentication session."
          );
        }

        // Remove the one-time OAuth code from browser history.
        window.history.replaceState(
          {},
          document.title,
          "/auth/callback"
        );

        navigate("/", {
          replace: true,
          state: {
            authenticationSuccess: true,
          },
        });
      } catch (error) {
        console.error("Authentication callback failed:", error);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Google login could not be completed."
        );
      }
    };

    completeLogin();
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
