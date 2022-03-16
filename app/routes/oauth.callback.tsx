import { useEffect } from "react";
import type { ActionFunction } from "remix";
import { useSubmit } from "remix";
import { oAuthAuthenticator } from "~/auth/auth.server";
import { supabaseClient } from "~/supabase/supabase.client";

export const action: ActionFunction = async ({ request }) => {
  await oAuthAuthenticator.authenticate("BKW-oauth", request, {
    successRedirect: "/",
    failureRedirect: "/welcome",
  });
};

export default function OAuth() {
  const submit = useSubmit();

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        delete session?.user?.identities;
        localStorage.removeItem("supabase.auth.token");

        if (event === "SIGNED_IN") {
          const formData = new FormData();
          formData.append("session", JSON.stringify(session));

          submit(formData, { method: "post" });
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [submit]);

  return null;
}
