import {
  json,
  type MetaFunction,
  type ActionArgs,
  type LoaderArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import tailwindStyles from "./tailwind.css";
import { getMetaInfo } from "./utils/seo";
import {
  authenticator,
  FAILURE_REDIRECT,
  getSession,
} from "./auth/auth.server";
import { inject } from "@vercel/analytics";
import Dashboard from "./components/Dashboard";

inject();

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  ...getMetaInfo({ title: "Welcome to BKWorm!" }),
});

export function links() {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com?crossOrigin=true" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat:wght@600&family=Source+Serif+Pro:wght@400;700&display=swap&crossOrigin=true",
    },
    { rel: "stylesheet", href: tailwindStyles },
  ];
}

export const action = async ({ request }: ActionArgs) => {
  await authenticator.logout(request, { redirectTo: FAILURE_REDIRECT });
};

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request);
  const user = session?.user;

  return json({
    user,
    ENV: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      SESSION_SECRET: process.env.SESSION_SECRET,
      APP_ENV: process.env.NODE_ENV,
    },
  });
};

export default function App() {
  const { user, ENV } = useLoaderData<typeof loader>();
  const isLoggedIn = user?.email;
  const htmlClasses = isLoggedIn ? `h-full bg-gray-100` : `h-full`;
  const bodyClasses = isLoggedIn ? `h-full` : `flex flex-col h-full`;

  return (
    <html lang="en" className={htmlClasses}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className={`font-serifPro ${bodyClasses}`}>
        {!isLoggedIn && <Outlet />}

        {isLoggedIn && (
          <Dashboard user={user || {}}>
            <Outlet />
          </Dashboard>
        )}

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
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
  throw new Error(`Unhandled error: ${caught.status}`);
}

// TODO: Add a better U.I component for main Error Boundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Boom!</h1>
      <pre>{error.message}</pre>
      <p>Houston we have a problem with the mainframe</p>
    </>
  );
}
