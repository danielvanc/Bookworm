import { json, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { authenticator, oAuthStrategy } from "~/auth/auth.server";
import SideBar from "~/components/Sidebar";
import { FAILURE_REDIRECT } from "~/auth/auth.server";
import { getLatestBooks } from "~/models/books.server";

export const action = async ({ request }: ActionArgs) => {
  await authenticator.logout(request, { redirectTo: FAILURE_REDIRECT });
};

export const loader = async ({ request }: LoaderArgs) => {
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });
  const { id } = session?.user!;
  const data = await getLatestBooks(id, 10);

  return json(data);
};

export default function Home() {
  const { usersBookmarks } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-[100vh] flex-row-reverse flex-wrap bg-grayWorm-100">
      <main className="md:w-3/4">
        <Outlet />
      </main>

      <aside className="bg-grayWorm-800 md:w-1/4">
        <SideBar data={usersBookmarks} />
      </aside>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Oh no!</h1>
      <pre>{error.message}</pre>
      <p>There was an error in the home route!</p>
    </>
  );
}
