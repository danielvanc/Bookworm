import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { closeSession, FAILURE_REDIRECT } from "~/auth/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { response } = await closeSession(request);

  return redirect(FAILURE_REDIRECT, { headers: response.headers });
};
