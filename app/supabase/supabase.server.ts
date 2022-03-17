import type { Session } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DAN_TEST: string;
      VERCEL_URL: string;
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
      SUPABASE_SERVICE_KEY: string;
    }
  }
}

invariant(process.env.SUPABASE_URL, "SUPABASE_URL is required");
invariant(process.env.SUPABASE_SERVICE_KEY, "SUPABASE_KEY is required");

export const supabaseServer = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { autoRefreshToken: false, persistSession: false }
);

export { Session };
