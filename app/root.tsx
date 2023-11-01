import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import "~/tailwind.css";
import { getMetaInfo } from "~/utils/seo";
import { getSession } from "./auth/auth.server";
import { useWatchSession } from "./auth/client";
import { Session } from "@supabase/auth-helpers-remix";

export function meta() {
  return [
    { charset: "utf-8" },
    { viewport: "width=device-width,initial-scale=1" },
    { ...getMetaInfo({ title: "Welcome to BKWorm!" }) },
  ];
}

export function links() {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com?crossOrigin=true" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat:wght@600&family=Source+Serif+Pro:wght@400;700&display=swap&crossOrigin=true",
    },
  ];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { SUPABASE_URL, SUPABASE_KEY, NODE_ENV } = process.env;
  const { session, error, response } = await getSession(request);

  return json({
    session: session,
    error,
    env: {
      SUPABASE_URL,
      SUPABASE_KEY,
      APP_ENV: NODE_ENV,
    },
    headers: response.headers,
  });
};

export default function App() {
  const { env, session } = useLoaderData<typeof loader>();
  const context = useWatchSession(session as unknown as Session);
  const isLoggedIn = session?.user;
  const htmlClasses = isLoggedIn ? `h-full bg-gray-100` : `h-full`;
  const bodyClasses = isLoggedIn ? `h-full` : `flex flex-col h-full`;

  return (
    <html lang="en" className={htmlClasses}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className={`font-serifPro ${bodyClasses}`}>
        <Outlet context={context} />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <Scripts />
      </body>
    </html>
  );
}

// TODO: Add a better U.I component for main Error Boundary
// TODO: Fix these below
export function ErrorBoundary() {
  const error = useRouteError();

  if (error === 404) {
    return (
      <html lang="en" className="dark">
        <head>
          <title>You 404'd</title>
          <Links />
        </head>
        <body className="bg-gray">
          {/* TODO: Add a custom 404 component */}
          <p>You came to the wrong place, dude!</p>
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <>
      <h1>Boom!</h1>
      {/* <pre>{error.message}</pre> */}
      <p>Houston we have a problem with the mainframe</p>
    </>
  );
}
