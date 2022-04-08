import type { ActionFunction } from "@remix-run/node";
import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
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
        // Remove identities as we don't need them
        // and it makes the session obj to large.
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
