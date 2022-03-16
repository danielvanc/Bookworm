import type { Provider } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

declare global {
  interface Window {
    ENV: {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
      SESSION_SECRET: string;
    };
  }
}

if (!window.ENV.SUPABASE_URL) throw new Error("SUPABASE_URL is required");

if (!window.ENV.SUPABASE_KEY) throw new Error("SUPABASE_KEY is required");

if (!window.ENV.SESSION_SECRET) throw new Error("SESSION_SECRET is required");

export const supabaseClient = createClient(
  window.ENV.SUPABASE_URL,
  window.ENV.SUPABASE_KEY,
  { autoRefreshToken: false, persistSession: false }
);

export const signInWithProvider = (
  provider: Provider,
  redirectTo: string = "http://localhost:3000/oauth/callback"
) => supabaseClient.auth.signIn({ provider }, { redirectTo });
