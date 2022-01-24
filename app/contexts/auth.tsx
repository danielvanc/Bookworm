import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { SupabaseClient, Session } from "@supabase/supabase-js";

interface ContextProps {
  login?: () => void;
  logout?: () => void;
  user?: Session | null;
}

const defaultContext: ContextProps = {
  login: () => {},
  logout: () => {},
  user: null,
};

export const AuthContext = createContext<ContextProps>(defaultContext);
AuthContext.displayName = "AuthContext";

export function AuthProvider({
  children,
  supabase,
}: {
  children: ReactNode;
  supabase: SupabaseClient;
}) {
  const [user, setUser] = useState<any>(null);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    window.history.pushState({}, "", "/");
  }

  async function handleLogIn() {
    await supabase.auth.signIn({
      provider: "github",
    });
  }

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = {
    login: handleLogIn,
    logout: handleLogout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
