import type { Provider } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";
const prod = "https://bookworm-rho.vercel.app/oauth/callback";
const local = "http://localhost:3000/oauth/callback/";
const redirectUrl = process.env.NODE_ENV === "production" ? prod : local;

declare global {
  interface Window {
    ENV: {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
      SESSION_SECRET: string;
      VERCEL_URL: string;
    };
  }
}

invariant(window.ENV.SUPABASE_URL, "SUPABASE_URL is required");
invariant(window.ENV.SUPABASE_KEY, "SUPABASE_KEY is required");
invariant(window.ENV.SESSION_SECRET, "SESSION_SECRET is required");

export const supabaseClient = createClient(
  window.ENV.SUPABASE_URL,
  window.ENV.SUPABASE_KEY,
  { autoRefreshToken: false, persistSession: false }
);

export const signInWithProvider = (
  provider: Provider,
  redirectTo: string = redirectUrl
) => supabaseClient.auth.signIn({ provider }, { redirectTo });
