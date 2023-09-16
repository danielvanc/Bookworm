import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as React from "react";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { FAILURE_REDIRECT, getSession } from "~/auth/auth.server";
import { classNames } from "~/utils";
import Header from "~/components/Header";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

export const loader = async ({ request }: LoaderArgs) => {
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

  const refreshFetcher = useFetcher();

  const userData = session?.user.user_metadata || {};
  const name = userData?.full_name
    ? userData?.full_name.split(" ")[0]
    : userData.email;
  const email = userData.email;
  const avatar = userData?.avatar_url || "";

  const navigation = [
    { name: "Home", href: "/home", icon: HomeIcon, current: true },
  ];

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
    <div className="min-h-full">
      <Header name={name} email={email} avatar={avatar} />

      <div className="py-10">
        <div className="lg:max-w-screen-desktopMax mx-auto max-w-3xl sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
            <nav
              aria-label="Sidebar"
              className="sticky top-4 divide-y divide-gray-300"
            >
              <div className="space-y-1 pb-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50",
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>
          <main className="lg:col-span-9">
            <>
              <div className="mt-4">
                <Outlet />
              </div>
            </>
          </main>
        </div>
      </div>
    </div>
  );
}
