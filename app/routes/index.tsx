import Page from "~/components/Page";
import { useAuth } from "~/contexts/auth";

import { useLoaderData, redirect } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";

export function loader() {
  return redirect("/home");
}

export default function Index() {
  const { logout, user } = useAuth();
  // return redirect("/home");

  return (
    <Page>
      <h1>Home</h1>

      {/* <button onClick={logout}>Logout</button> */}
    </Page>
  );
}
