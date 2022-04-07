import type { ActionFunction, LoaderFunction } from "remix";
import { Form, json, Outlet, useLoaderData } from "remix";
import { authenticator, oAuthStrategy } from "~/auth/auth.server";
import SideBar from "~/components/Sidebar";
import { FAILURE_REDIRECT } from "~/auth/auth.server";

interface LoaderData {
  id?: string;
  email?: string;
  full_name?: string;
  user_metadata?: { [key: string]: any };
}

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: FAILURE_REDIRECT });
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });

  const { id, email, user_metadata } = session?.user || {};

  return json<LoaderData>({ id, email, user_metadata });
};

export default function Home() {
  const { email, user_metadata } = useLoaderData<LoaderData>();

  return (
    <div className="root-frame h-[100vh] bg-grayWorm-100">
      <header className="bg-rosyWorm px-8 py-4 text-white">
        <h1>
          Hello {user_metadata?.full_name} of {email}
        </h1>
        <Form method="post">
          <button>Log Out</button>
        </Form>
      </header>

      <div className="flex h-[100vh] flex-row-reverse flex-wrap bg-grayWorm-100">
        <main className="md:w-3/4">
          <Outlet />
        </main>

        <aside className="bg-grayWorm-800 md:w-1/4">
          <SideBar />
        </aside>
      </div>
    </div>
  );
}
