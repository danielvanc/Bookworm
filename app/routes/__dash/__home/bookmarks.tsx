import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBookmarks } from "~/models/books.server";
import { FAILURE_REDIRECT, getSession } from "~/auth/auth.server";
import PreviewBookItem from "~/components/PreviewBookItem";

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await getSession(request);
  if (!session) return redirect(FAILURE_REDIRECT);

  const userId = session.user.id;
  const { bookmarks } = await getBookmarks(userId);

  return json({ userId, bookmarks });
}

export default function Bookmarks() {
  const { userId, bookmarks } = useLoaderData<typeof loader>();

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="font-monty sr-only text-xl">Discover - latest!</h1>
        <ul className="flex flex-col gap-6">
          {bookmarks.map((book: Book, index) => {
            return (
              <PreviewBookItem
                key={`${book.book_id}-${index}`}
                book={book}
                // TODO: Fix with correct type
                usersBookmarks={bookmarks as any}
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
