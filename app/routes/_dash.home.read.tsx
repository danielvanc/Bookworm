import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { getAllRead } from "~/models/books.server";
import { useLoaderData } from "@remix-run/react";
import { FAILURE_REDIRECT, getSession } from "~/auth/auth.server";
import PreviewBookItem from "~/components/PreviewBookItem";

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await getSession(request);
  if (!session) return redirect(FAILURE_REDIRECT);

  const userId = session.user.id;
  const { bookmarks } = await getAllRead(userId);

  return json({ userId, bookmarks });
}

export default function Reading() {
  const { userId, bookmarks } = useLoaderData<typeof loader>();
  const allBooks = bookmarks.filter((book) => book.read || book.reading);

  return (
    <div className="md:p-sectionMedium">
      <ul className="relative my-3 mb-20 flex flex-wrap gap-6">
        {allBooks.map((book, index) => (
          <PreviewBookItem
            key={`${book.id}-${index}`}
            book={book}
            // TODO: Fix with correct type
            usersBookmarks={bookmarks as any}
            userId={String(userId)}
          />
        ))}
      </ul>
    </div>
  );
}
