import {
  json,
  type MetaFunction,
  type ActionArgs,
  type LoaderArgs,
} from "@remix-run/node";
import {
  Form,
  Link,
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

export const action = async ({ request }: ActionArgs) => {
  await authenticator.logout(request, { redirectTo: FAILURE_REDIRECT });
};

export const loader = async ({ request }: LoaderArgs) => {
  const session = await oAuthStrategy.checkSession(request);

  return json({
    user: session?.user,
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
  const userData = user.user_metadata || {};
  const name = userData.full_name.split(" ")[0];
  const avatar = userData.avatar_url || "";
  return (
    <div className="root-frame min-h-[100vh] overflow-y-hidden bg-grayWorm-100">
      <header className="flex items-center justify-around bg-rosyWorm px-8 py-4 text-white">
        <div className="w-[20vw]">
          <Link to="/" title="back to overview">
            <img
              src="/images/logo_header.svg"
              alt="BKWorm - Book app for book lovers!"
              className="inline-block"
            />
          </Link>
        </div>
        <Form className="w-[60vw]">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for books"
            className="w-full rounded-xl py-3 px-5 font-monty text-slate-500"
          />
        </Form>
        <div className="align-center flex w-[20vw] items-center justify-end gap-x-3 font-monty">
          <h1>Hey, {name}!</h1>
          <img
            src={avatar}
            alt=""
            width="46"
            height="46"
            className="rounded-full"
          />
        </div>

        {/* TODO: Add menu dropdown */}
        {/* <Form method="post">
          <button>Log Out</button>
        </Form> */}
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
