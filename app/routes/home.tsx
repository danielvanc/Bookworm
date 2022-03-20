import type { ActionFunction, LoaderFunction } from "remix";
import { Form, json, Outlet, useLoaderData } from "remix";
import { authenticator, oAuthStrategy } from "~/auth/auth.server";
import { FAILURE_REDIRECT } from "~/auth/auth.server";
import BookList from "~/components/BookLIst";
// import { PrismaClient } from "@prisma/client";

type LoaderData = { email?: string };

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: FAILURE_REDIRECT });
};

export const loader: LoaderFunction = async ({ request }) => {
  // const prisma = new PrismaClient();
  // const allUsers = await prisma.profile.findMany();
  // return { allUsers };
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });

  return json<LoaderData>({ email: session.user?.email });
};

export default function Index() {
  // const { allUsers } = useLoaderData();
  const { email } = useLoaderData<LoaderData>();
  return (
    <div className="skeleton">
      <header>
        <h1>Hello {email}</h1>
        <Form method="post">
          <button>Log Out</button>
        </Form>
      </header>
      <BookList />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
