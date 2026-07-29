import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  authLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const initializeAuth = async () => {
      try {
        let currentSession: Session | null = null;
        let currentUser: User | null = null;

        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) {
            console.warn("Session loading error:", error.message);
          }
          currentSession = session;
          currentUser = session?.user ?? null;
        } catch (dbErr) {
          console.warn("Database auth connection failed:", dbErr);
        }

        // Fallback to local storage auth
        if (!currentUser && localStorage.getItem("amthromax-user")) {
          const email = localStorage.getItem("amthromax-user")!;
          const storedProfile = localStorage.getItem("amthromax-profile");
          const displayName = storedProfile ? JSON.parse(storedProfile).full_name : email.split("@")[0].toUpperCase();
          
          currentUser = {
            id: "mock-user-uuid-1234-5678-90ab",
            email: email,
            created_at: new Date().toISOString(),
            app_metadata: { provider: "email" },
            user_metadata: { full_name: displayName },
            aud: "authenticated",
            role: "authenticated",
          } as any;
        }

        if (active) {
          setSession(currentSession);
          setUser(currentUser);
          setAuthLoading(false);
        }
      } catch (e) {
        console.error("Auth init exception:", e);
        if (active) {
          setAuthLoading(false);
        }
      }
    };

    initializeAuth();

    let subscriptionObj: any = null;
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, updatedSession) => {
        console.log("Supabase auth event:", event);

        if (active) {
          let currentSession = updatedSession;
          let currentUser = updatedSession?.user ?? null;

          if (!currentUser && localStorage.getItem("amthromax-user")) {
            const email = localStorage.getItem("amthromax-user")!;
            const storedProfile = localStorage.getItem("amthromax-profile");
            const displayName = storedProfile ? JSON.parse(storedProfile).full_name : email.split("@")[0].toUpperCase();
            
            currentUser = {
              id: "mock-user-uuid-1234-5678-90ab",
              email: email,
              created_at: new Date().toISOString(),
              app_metadata: { provider: "email" },
              user_metadata: { full_name: displayName },
              aud: "authenticated",
              role: "authenticated",
            } as any;
          }

          setSession(currentSession);
          setUser(currentUser);
          setAuthLoading(false);

          if (currentUser?.email) {
            localStorage.setItem("amthromax-user", currentUser.email);
          } else {
            localStorage.removeItem("amthromax-user");
            localStorage.removeItem("amthromax-profile");
          }
        }
      });
      subscriptionObj = subscription;
    } catch (e) {
      console.warn("Could not listen to supabase auth events:", e);
    }

    const handleAuthChange = () => {
      console.log("Custom auth-change/storage event triggered");
      initializeAuth();
    };

    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      active = false;
      if (subscriptionObj) {
        subscriptionObj.unsubscribe();
      }
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      authLoading,
      isAuthenticated: Boolean(user),
    }),
    [session, user, authLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
