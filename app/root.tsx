import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import tailwindStyles from "./tailwind.css";
import { getMetaInfo } from "./utils/seo";

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

export function loader() {
  return {
    ENV: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      SESSION_SECRET: process.env.SESSION_SECRET,
      APP_ENV: process.env.NODE_ENV,
    },
  };
}

export default function App() {
  const { ENV } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-serifPro">
        <Outlet />
        <ScrollRestoration />
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
