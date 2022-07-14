import type { Session } from "~/supabase/supabase.server";
import { createCookieSessionStorage } from "@remix-run/node";
import { Authenticator, AuthorizationError } from "remix-auth";
import { SupabaseStrategy } from "remix-auth-supabase";
import { supabaseServer } from "~/supabase/supabase.server";

export const SUCCESS_REDIRECT = "/home/overview";
export const FAILURE_REDIRECT = "/";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "BKW_SESSION",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [`${process.env.SESSION_SECRET}`],
    secure: process.env.NODE_ENV === "production",
  },
});

export const oAuthStrategy = new SupabaseStrategy(
  {
    supabaseClient: supabaseServer,
    sessionStorage,
    sessionKey: "BKW:session",
    sessionErrorKey: "BKW:error",
  },
  async ({ req }) => {
    const form = await req.formData();
    const session = form?.get("session");

    if (typeof session !== "string")
      throw new AuthorizationError("session not found");

    return JSON.parse(session);
  }
);

export const supabaseStrategy = new SupabaseStrategy(
  {
    supabaseClient: supabaseServer,
    sessionStorage,
    sessionKey: "BKW:session",
    sessionErrorKey: "BKW:error",
  },
  async ({ req, supabaseClient }) => {
    const form = await req.formData();
    const email = form?.get("email");
    const password = form?.get("password");
    const { _action } = Object.fromEntries(form);
    const isSignUp = _action === "signup";

    // TODO: #2 Add user signup/in post verfiication checks
    if (!email) throw new AuthorizationError("Email is required");
    if (typeof email !== "string")
      throw new AuthorizationError("Email must be a string");

    if (!password) throw new AuthorizationError("Password is required");
    if (typeof password !== "string")
      throw new AuthorizationError("Password must be a string");

    return isSignUp
      ? supabaseClient.auth.api
          .signUpWithEmail(email, password)
          .then(({ data, error }): Session => {
            if (error || !data) {
              throw new AuthorizationError(
                error?.message ?? "No user session found"
              );
            }

            return data as Session;
          })
      : supabaseClient.auth.api
          .signInWithEmail(email, password)
          .then(({ data, error }): Session => {
            if (error || !data) {
              throw new AuthorizationError(
                error?.message ?? "No user session found"
              );
            }

            return data as Session;
          });
  }
);

export const authenticator = new Authenticator<Session>(sessionStorage, {
  sessionKey: supabaseStrategy.sessionKey,
  sessionErrorKey: supabaseStrategy.sessionErrorKey,
});

export const oAuthAuthenticator = new Authenticator<Session>(sessionStorage, {
  sessionKey: oAuthStrategy.sessionKey,
  sessionErrorKey: oAuthStrategy.sessionErrorKey,
});

// TODO: fix these errors
// @ts-ignore
authenticator.use(supabaseStrategy);
// @ts-ignore
oAuthAuthenticator.use(oAuthStrategy, "BKW-oauth");
