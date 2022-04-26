import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/react/routeModules";
import tailwindStyles from "./tailwind.css";
import { getMetaInfo } from "./utils/seo";
import {
  authenticator,
  FAILURE_REDIRECT,
  oAuthStrategy,
} from "./auth/auth.server";

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

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: FAILURE_REDIRECT });
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await oAuthStrategy.checkSession(request);
  return {
    user: session?.user || {},
    ENV: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      SESSION_SECRET: process.env.SESSION_SECRET,
      APP_ENV: process.env.NODE_ENV,
    },
  };
};

interface LoaderData {
  user: User;
  ENV: EnvVars;
}

export default function App() {
  const { user, ENV } = useLoaderData<LoaderData>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-serifPro">
        {user?.email ? (
          <LoggedIn user={user}>
            <Outlet />
            <ScrollRestoration />
          </LoggedIn>
        ) : (
          <>
            <Outlet />
            <ScrollRestoration />
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function LoggedIn({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <div className="root-frame min-h-[100vh] overflow-y-hidden bg-grayWorm-100">
      <header className="bg-rosyWorm px-8 py-4 text-white">
        <h1>
          Hello {user.user_metadata?.full_name} of {user.email}
        </h1>
        <Form method="post">
          <button>Log Out</button>
        </Form>
      </header>

      {children}
    </div>
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
