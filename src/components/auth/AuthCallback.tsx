import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const completeGoogleLogin = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            throw error;
          }

          if (!data.session) {
            throw new Error("No session was created.");
          }
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          throw new Error("Authentication session was not found.");
        }

        navigate("/", {
          replace: true,
          state: { googleLoginSuccess: true },
        });
      } catch (error) {
        console.error("OAuth callback error:", error);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Google login could not be completed."
        );
      }
    };

    completeGoogleLogin();
  }, [navigate]);

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 text-center font-sans">
        <div className="bg-white dark:bg-[#161617] rounded-3xl p-8 border border-gray-150 dark:border-white/[0.06] shadow-2xl max-w-sm w-full space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Login failed</h2>
          <p className="text-sm text-gray-550 dark:text-gray-400">{errorMessage}</p>
          <button 
            onClick={() => navigate("/", { replace: true })}
            className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold transition-all hover:opacity-90"
          >
            Return home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 text-center font-sans">
      <div className="flex flex-col items-center space-y-4">
        <span className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Completing your Google login...</p>
      </div>
    </div>
  );
}
