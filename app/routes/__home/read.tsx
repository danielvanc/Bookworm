import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { oAuthStrategy, FAILURE_REDIRECT } from "~/auth/auth.server";
import PreviewListBookItem from "~/components/PreviewListBookItem";
import { getAllRead } from "~/models/books.server";
import { useLoaderData } from "@remix-run/react";

// TODO: Fix TS Errors

export async function loader({ request }: LoaderArgs) {
  await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });

  const { userId, bookmarks } = await getAllRead(request);

  return json({ userId, bookmarks });
}

export default function Reading() {
  const { userId, bookmarks } = useLoaderData<typeof loader>();
  // @ts-ignore
  const allBooks = bookmarks.filter((book) => book.read || book.reading);

  return (
    <div className="md:p-sectionMedium">
      <ul className="relative my-3 mb-20 flex flex-wrap gap-6">
        {/* @ts-ignore */}
        {allBooks.map((book) => {
          return (
            <PreviewListBookItem
              key={book.id}
              book={book}
              // @ts-ignore
              usersBookmarks={bookmarks}
              userId={String(userId)}
            />
          );
        })}
      </ul>
    </div>
  );
}
