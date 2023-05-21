import { createServerClient } from "@supabase/auth-helpers-remix";
import invariant from "tiny-invariant";

export const SUCCESS_REDIRECT = "/home";
export const FAILURE_REDIRECT = "/login";

export function createSupabaseClient(request: Request) {
  const { SUPABASE_URL, SUPABASE_KEY } = process.env;
  const response = new Response();

  invariant(SUPABASE_URL, "SUPABASE_URL is required");
  invariant(SUPABASE_KEY, "SUPABASE_KEY is required");

  const supabaseClient = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    request,
    response,
  });

  return { supabaseClient, response };
}

export async function getSession(request: Request) {
  const { supabaseClient, response } = createSupabaseClient(request);

  const {
    data: { session },
    error,
  } = await supabaseClient.auth.getSession();

  // console.log("session is", session);
  return { session, error, response };
}

// TODO: Re-factor so we can use use await requireAuth() in loaders;
// export async function requireAuth(request: Request) {
//   const { supabaseClient, response } = createSupabaseClient(request);

//   const {
//     data: { session },
//   } = await supabaseClient.auth.getSession();

//   if (!session) {
//     redirect(FAILURE_REDIRECT, {
//       headers: response.headers,
//     });
//   }

//   return { session, response };
// }

export async function closeSession(request: Request) {
  const { supabaseClient, response } = createSupabaseClient(request);
  const { error } = await supabaseClient.auth.signOut();

  return { error, response };
}
