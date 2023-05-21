import type { Session, SupabaseClient, Provider } from "@supabase/supabase-js";
import * as React from "react";
import { useRevalidator } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import invariant from "tiny-invariant";

export const SUCCESS_REDIRECT = "/home";
export const FAILURE_REDIRECT = "/login";

declare global {
  interface Window {
    env: {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
      SESSION_SECRET: string;
      APP_ENV: string;
    };
  }
}

export type ContextType = {
  supabase: SupabaseClient;
  session: Session | null;
};

export function useWatchSession(initialSession: Session | null) {
  const [supabase, setSupabase] = React.useState<SupabaseClient | null>(null);
  const [session, setSession] = React.useState<Session | null>(initialSession);
  const { revalidate } = useRevalidator();

  // TODO: Fix type error
  // @ts-ignore
  const context: ContextType = { supabase, session };

  const serverAccessToken = session?.access_token;

  React.useEffect(() => {
    invariant(window.env.SUPABASE_URL, "SUPABASE_URL is required");
    invariant(window.env.SUPABASE_KEY, "SUPABASE_KEY is required");

    if (!supabase) {
      const supabaseClient = createBrowserClient(
        window.env.SUPABASE_URL,
        window.env.SUPABASE_KEY
      );
      setSupabase(supabaseClient);
      const {
        data: { subscription },
      } = supabaseClient.auth.onAuthStateChange((_, session) => {
        if (session?.access_token !== serverAccessToken) {
          // server and client are out of sync.
          revalidate();
          setSession(session);
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [revalidate, serverAccessToken, supabase]);

  return context;
}

export async function signInWithProvider(provider: Provider) {
  const redirectTo = `${window.location.origin}/oauth/callback/`;
  const supabaseClient = createClient(
    window.env.SUPABASE_URL,
    window.env.SUPABASE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: true,
      },
    }
  );
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  });

  if (error) throw error;
}

function getBrowserClient() {
  return createClient(window.env.SUPABASE_URL, window.env.SUPABASE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: true,
    },
  });
}

export async function logUserOut() {
  const supabaseClient = getBrowserClient();

  return await supabaseClient.auth.signOut();
}
