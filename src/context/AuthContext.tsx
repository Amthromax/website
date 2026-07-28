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
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Session loading error:", error.message);
        }

        if (active) {
          setSession(session);
          setUser(session?.user ?? null);
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, updatedSession) => {
      console.log("Supabase auth event:", event);

      if (active) {
        setSession(updatedSession);
        setUser(updatedSession?.user ?? null);
        setAuthLoading(false);

        if (updatedSession?.user?.email) {
          localStorage.setItem("amthromax-user", updatedSession.user.email);
        } else {
          localStorage.removeItem("amthromax-user");
        }
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
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
