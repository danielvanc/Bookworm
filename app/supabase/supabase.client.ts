import type { Provider } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";
// import { GoogleStrategy } from "remix-auth-google";
const redirectUrl = `${window.location.origin}/oauth/callback/`;

declare global {
  interface Window {
    ENV: {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
      SESSION_SECRET: string;
      APP_ENV: string;
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
