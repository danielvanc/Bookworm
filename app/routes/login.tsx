// TODO: Fix ts errors
// @ts-nocheck
import { type LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { oAuthStrategy, SUCCESS_REDIRECT } from "~/auth/auth.server";
import AuthenticateForm from "~/components/AuthenticateForm";
import AuthLayout from "~/components/AuthLayout";
import { TextField } from "~/components/Fields";
import Logo from "~/components/Logo";

export async function loader({ request }: LoaderArgs) {
  await oAuthStrategy.checkSession(request, {
    successRedirect: SUCCESS_REDIRECT,
  });

  return {};
}

export default function Login() {
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
        <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center rounded-full bg-rosyWorm py-2 px-4 text-sm font-semibold text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </button>
          </div>
        </form>
        <AuthenticateForm />
      </AuthLayout>
    </>
  );
}
