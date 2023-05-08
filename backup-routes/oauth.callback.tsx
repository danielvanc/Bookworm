import type { ActionArgs } from "@remix-run/node";
import type { SupabaseClient } from "@supabase/auth-helpers-remix";
import * as React from "react";
import { redirect } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { getSession } from "~/auth/auth.server";
import { SUCCESS_REDIRECT, FAILURE_REDIRECT } from "~/auth/auth.server";

export const action = async ({ request }: ActionArgs) => {
  const { session, response } = await getSession(request);

  return redirect(session ? SUCCESS_REDIRECT : FAILURE_REDIRECT, {
    headers: response.headers,
  });
};

export default function OAuth() {
  const fetcher = useFetcher();
  const [supabase, setSupabase] = React.useState<SupabaseClient | null>(null);

  React.useEffect(() => {
    if (!supabase) {
      const supabaseClient = createBrowserClient(
        window.env.SUPABASE_URL,
        window.env.SUPABASE_KEY
      );
      setSupabase(supabaseClient);

      const {
        data: { subscription },
      } = supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
          if (session) {
            const formData = new FormData();
            formData.append("session", JSON.stringify(session));
            fetcher.submit(formData, { method: "post" });
          }
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  return null;
}
