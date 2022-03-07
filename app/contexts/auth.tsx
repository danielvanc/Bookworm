import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { SupabaseClient, Session, Provider } from "@supabase/supabase-js";

interface ContextProps {
  login: (provider: Provider) => void;
  logout: () => void;
  user: Session | null;
}

const defaultContext: ContextProps = {
  login: () => null,
  logout: () => null,
  user: null,
};

const Providers = {
  google: "google",
  github: "github",
  twitter: "twitter",
  facebook: "facebook",
  email: "email",
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

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    window.history.pushState({}, "", "/");
  }

  function login(provider: Provider) {
    if (provider === Providers.email) return Providers.email;

    async function loginWithSocial() {
      await supabase.auth.signIn({ provider });
    }

    loginWithSocial();
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

  const value = { login, logout, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
