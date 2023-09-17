import type { ActionFunctionArgs } from "@remix-run/node";
import type { AuthError } from "@supabase/supabase-js";
import { redirect } from "@remix-run/node";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import AuthenticateForm from "~/components/AuthenticateForm";
import AuthLayout from "~/components/AuthLayout";
import Logo from "~/components/Logo";
import LoginWithEmail from "../components/LoginWithEmail";
import { SUCCESS_REDIRECT, getSession } from "~/auth/auth.server";
import { createSupabaseClient } from "../auth/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const errors: { email?: string; error?: AuthError | null } = {};

  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "That doesn't look like an email address";
  }

  if (Object.keys(errors).length) {
    return json(errors, { status: 422 });
  }

  const { supabaseClient, response } = createSupabaseClient(request);

  const { data } = await supabaseClient.auth.signInWithOtp({
    email: String(email),
    options: {
      emailRedirectTo: `http://${request.headers.get("host")}/oauth/callback/`,
    },
  });

  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
  return json(
    { data },
    {
      headers: response.headers,
    }
  );
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { session, error, response } = await getSession(request);
  if (session) return redirect(SUCCESS_REDIRECT, { headers: response.headers });

  return json(
    { error },
    {
      headers: response.headers,
    }
  );
}

export default function Login() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <>
      <AuthLayout>
        <div className="flex flex-col">
          <Link to="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to get access
            </h2>
          </div>
        </div>
        <LoginWithEmail />
        <AuthenticateForm error={error} />
      </AuthLayout>
    </>
  );
}
