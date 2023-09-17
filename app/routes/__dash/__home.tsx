import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as React from "react";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRevalidator,
} from "@remix-run/react";
import { FAILURE_REDIRECT, getSession } from "~/auth/auth.server";
import TabNavigation from "~/components/TabNavigation";
import PreviewBookItemSkeleton from "~/components/LoadingUI/PreviewBookItemSkeleton";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

const tabs = [
  { name: "Discover", href: "home", current: true },
  { name: "Bookmarked", href: "bookmarks", current: false },
  { name: "Read / Reading", href: "read", current: false },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, error, response } = await getSession(request);
  if (!session?.user) return redirect(FAILURE_REDIRECT);

  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_KEY: process.env.SUPABASE_KEY!,
  };

  return json({
    env,
    session,
    error,
    headers: response.headers,
  });
};

export default function Home() {
  const { env, session } = useLoaderData<typeof loader>();
  const transition = useNavigation();
  const refreshFetcher = useFetcher();
  const paths = ["/home", "/bookmarks", "/read"];
  const isLoading =
    transition?.state === "loading" &&
    paths.includes(transition.location.pathname);

  const { revalidate } = useRevalidator();

  const [supabase] = React.useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_KEY)
  );

  const serverAccessToken = session?.access_token;

  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        session?.access_token !== serverAccessToken &&
        refreshFetcher.state === "idle"
      ) {
        revalidate();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshFetcher, revalidate, serverAccessToken, supabase]);

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
