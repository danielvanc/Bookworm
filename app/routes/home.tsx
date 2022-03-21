import type { ActionFunction, LoaderFunction } from "remix";
import { Form, json, Outlet, useLoaderData } from "remix";
import { authenticator, oAuthStrategy } from "~/auth/auth.server";
import SideBar from "~/components/Sidebar";
import { FAILURE_REDIRECT } from "~/auth/auth.server";

type LoaderData = { email?: string };

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: FAILURE_REDIRECT });
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });

  return json<LoaderData>({ email: session.user?.email });
};

export default function Home() {
  const { email } = useLoaderData<LoaderData>();
  return (
    <div className="root-frame h-[100vh] bg-grayWorm-100">
      <header className="bg-rosyWorm px-8 py-4 text-white">
        <h1>Hello {email}</h1>
        <Form method="post">
          <button>Log Out</button>
        </Form>
      </header>

      <div className="flex h-[100vh] flex-row-reverse flex-wrap">
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
