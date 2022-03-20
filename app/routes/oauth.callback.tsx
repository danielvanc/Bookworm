import { useEffect } from "react";
import type { ActionFunction } from "remix";
import { useFetcher } from "remix";
import { oAuthAuthenticator } from "~/auth/auth.server";
import { supabaseClient } from "~/supabase/supabase.client";
import { SUCCESS_REDIRECT, FAILURE_REDIRECT } from "~/auth/auth.server";

export const action: ActionFunction = async ({ request }) => {
  await oAuthAuthenticator.authenticate("BKW-oauth", request, {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT,
  });
};

export default function OAuth() {
  const fetcher = useFetcher();

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        delete session?.user?.identities;
        localStorage.removeItem("supabase.auth.token");

        if (event === "SIGNED_IN") {
          const formData = new FormData();
          formData.append("session", JSON.stringify(session));

          fetcher.submit(formData, { method: "post" });
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [fetcher]);

  return null;
}
