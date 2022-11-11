import { redirect } from "@remix-run/node";
import { type LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import AuthenticateForm from "~/components/AuthenticateForm";
import AuthLayout from "~/components/AuthLayout";
import Logo from "~/components/Logo";
import LoginWithEmail from "../components/LoginWithEmail";
import { SUCCESS_REDIRECT, getSession } from "~/auth/auth.server";

export async function loader({ request }: LoaderArgs) {
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
              Sign in to your account
            </h2>
            {/* <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{" "}
              for free.
            </p> */}
          </div>
        </div>
        <LoginWithEmail />
        <AuthenticateForm error={error} />
      </AuthLayout>
    </>
  );
}
