import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { oAuthStrategy, FAILURE_REDIRECT } from "~/auth/auth.server";
import PreviewListBookItem from "~/components/PreviewListBookItem";
import { getBookmarks } from "~/models/books.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });

  const { userId, bookmarks } = await getBookmarks(request);

  return json({ userId, bookmarks });
}

export default function Bookmarks() {
  const { userId, bookmarks } = useLoaderData<typeof loader>();

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="sr-only font-monty text-xl">Discover - latest!</h1>
        <ul className="flex flex-col gap-6">
          {bookmarks.map((book: Book) => {
            return (
              <PreviewListBookItem
                key={book.id}
                book={book}
                // TODO: Fix TS Error
                // @ts-ignore
                usersBookmarks={bookmarks}
                userId={String(userId)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Oh no!</h1>
      <pre>{error.message}</pre>
      <p>There was an error in the Bookmarks route!</p>
    </>
  );
}
