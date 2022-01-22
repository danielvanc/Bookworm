import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import tailwindStyles from "./tailwind.css";
import { createClient } from "@supabase/supabase-js";
import { SupabaseProvider } from "./contexts/auth";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

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
      SUPERBASE_URL: process.env.SUPERBASE_URL,
      SUPERBASE_KEY: process.env.SUPERBASE_KEY,
      ALL_BOOKS_API: process.env.ALL_BOOKS_API,
    },
  };
}

export default function App() {
  const { ENV } = useLoaderData();
  const config = createClient(ENV.SUPERBASE_URL, ENV.SUPERBASE_KEY);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-serifPro">
        <SupabaseProvider supabase={config}>
          <Outlet />
        </SupabaseProvider>
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

// TODO: Add a catchboundary to the SupabaseProvider so that if the SupabaseClient is not available, the app will not crash.
