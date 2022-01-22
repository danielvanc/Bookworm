import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { SupabaseClient, Session } from "@supabase/supabase-js";

type AuthContext = {
  login?: () => void;
  logout?: () => void;
  user?: Session | null;
};

const defaultContext: AuthContext = {
  login: () => {},
  logout: () => {},
  user: null,
};

export const SupabaseContext = createContext<AuthContext>(defaultContext);

export function SupabaseProvider({
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

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(SupabaseContext);

  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }

  return context;
}
