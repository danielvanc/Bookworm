import type { ActionFunction } from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { authenticator } from "~/auth/auth.server";
import SideBar from "~/components/Sidebar";
import { FAILURE_REDIRECT } from "~/auth/auth.server";
import { useUser } from "~/utils/user";

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: FAILURE_REDIRECT });
};

export default function Home() {
  const { email, user_metadata } = useUser();

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
