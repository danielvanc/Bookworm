import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useNavigation } from "@remix-run/react";
import { FAILURE_REDIRECT, getSession } from "~/auth/auth.server";
import TabNavigation from "~/components/TabNavigation";
import PreviewBookItemSkeleton from "../components/LoadingUI/PreviewBookItemSkeleton";

const tabs = [
  { name: "Discover", href: "home", current: true },
  { name: "Bookmarked", href: "bookmarks", current: false },
  { name: "Read / Reading", href: "read", current: false },
];

export async function loader({ request }: LoaderArgs) {
  const { session } = await getSession(request);
  if (!session) return redirect(FAILURE_REDIRECT);

  return json({});
}

export default function HomeOverview() {
  const transition = useNavigation();
  const paths = ["/home", "/bookmarks", "/read"];
  const isLoading =
    transition?.state === "loading" &&
    paths.includes(transition.location.pathname);

  return (
    <>
      <TabNavigation
        tabs={tabs}
        optimisticPath={transition?.location?.pathname}
      />
      <div className="mt-4">
        {isLoading ? <PreviewBookItemSkeleton /> : <Outlet />}
      </div>
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Oh no!</h1>
      <pre>{error.message}</pre>
      <p>There was an error in the Home route!</p>
    </>
  );
}
