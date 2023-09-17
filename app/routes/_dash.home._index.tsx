import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useFetchers, useLoaderData } from "@remix-run/react";
import { getLatestBooks } from "~/models/books.server";
import Notification from "~/components/Notification";
import { FAILURE_REDIRECT, getSession } from "~/auth/auth.server";
import Discover from "~/components/Discover";

// TODO: Move messaging to a separate file

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await getSession(request);
  if (!session?.user) return redirect(FAILURE_REDIRECT);

  const { id } = session?.user;
  const data = await getLatestBooks(id, 10);

  if (!data || !data?.books || !data?.books.length)
    throw new Response("Problem fetching book list...", {
      status: 403,
    });

  return json(data);
}

export default function DashboardHome() {
  const { books, usersBookmarks } = useLoaderData<BooksAndBookmarks>();
  const updates = useFetchers() || [];
  const orderByFirstUpdate = [...updates]?.reverse();
  const status = orderByFirstUpdate?.[0];

  return (
    <div className="flex items-center justify-center">
      <h1 className="font-monty sr-only text-xl">Discover - latest!</h1>
      <Discover books={books} usersBookmarks={usersBookmarks} />
      {status && status?.data ? <Notification status={status} /> : null}
    </div>
  );
}

export function ErrorBoundary() {
  // const error = useRouteError();

  // TODO: fix these below
  // if (error === 403) {
  //   return (
  //     <div className="mt-10 text-center">
  //       {/* <h2 className="mb-4">{caught.data}</h2>
  //       <button onClick={() => window.location.reload()}>Retry?</button> */}
  //     </div>
  //   );
  // }

  //  return (
  //    <div>
  //      <h1>Caught</h1>
  //      <p>Status: {caught.status}</p>
  //      <pre>
  //        <code>{JSON.stringify(caught.data, null, 2)}</code>
  //      </pre>
  //    </div>
  //  );

  return (
    <>
      <h1>Oh no!</h1>
      {/* <pre>{error.message}</pre> */}
      <p>There was an error in the Discover route!</p>
    </>
  );
}
