import { json, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { useFetchers, useLoaderData } from "@remix-run/react";
import { oAuthStrategy } from "~/auth/auth.server";
import { FAILURE_REDIRECT } from "~/auth/auth.server";
import {
  createBookmark,
  getLatestBooks,
  markAsNotRead,
  markAsNotReading,
  markAsRead,
  markAsReading,
  removeBookmark,
} from "~/models/books.server";
import { useUser } from "~/utils/user";
import Notification from "~/components/Notification";
import PreviewBookItem from "~/components/PreviewBookItem";

// TODO: Move messaging to a separate file

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const userId = formData.get("user_id")?.toString() ?? "";
  const bookId = formData.get("book_id")?.toString() ?? "";
  const buid = formData.get("buid")?.toString() ?? "";

  const action = formData.get("_action");

  const isAddingBookmark = action === "create";
  const isRemovingBookmark = action === "remove-bookmark";

  const isReading = action === "reading";
  const isNotReading = action === "remove-reading";

  const isRead = action === "read";
  const isNotRead = action === "remove-read";

  const addingBookmarkError = `Error adding bookmark. Please retry`;
  const removingBookmarkError = `Error removing bookmark. Please retry.`;
  const isReadingError = `Error marking book as reading. Please retry`;
  const isNotReadingError = `Error marking book as not reading. Please retry`;

  const isReadError = `Error marking book as read. Please retry.`;
  const isNotReadError = `Error marking book as not finished. Please retry`;

  let errorMessage = "";
  let successMessage = "";
  let errors = { error: true, action };

  try {
    if (isAddingBookmark) {
      errorMessage = addingBookmarkError;
      successMessage = "Successfully added to your bookmarks!";
      if (Math.random() > 0.5) {
        throw new Error();
      }
      await createBookmark(buid, bookId, userId);
    }

    if (isRemovingBookmark) {
      errorMessage = removingBookmarkError;
      successMessage = "Successfully removed from your bookmarks!";
      if (Math.random() > 0.5) {
        throw new Error();
      }
      await removeBookmark(buid);
    }

    if (isReading) {
      errorMessage = isReadingError;
      successMessage = "Successfully marked as reading!";
      if (Math.random() > 0.5) {
        throw new Error();
      }
      await markAsReading(buid, bookId, userId);
    }

    if (isNotReading) {
      errorMessage = isNotReadingError;
      successMessage = "Successfully marked as not reading!";
      if (Math.random() > 0.5) {
        throw new Error();
      }
      await markAsNotReading(buid);
    }

    if (isRead) {
      errorMessage = isReadError;
      successMessage = "Successfully marked as read!";
      if (Math.random() > 0.5) {
        throw new Error();
      }

      await markAsRead(buid, bookId, userId);
    }

    if (isNotRead) {
      errorMessage = isNotReadError;
      successMessage = "Successfully marked as not finished!";
      if (Math.random() > 0.5) {
        throw new Error();
      }
      await markAsNotRead(buid);
    }

    return json({ status: 200, message: successMessage, id: buid || bookId });
  } catch (e) {
    return {
      ...errors,
      errorMessage,
    };
  }
}

export async function loader({ request }: LoaderArgs) {
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });

  const { id } = session?.user!;
  const data = await getLatestBooks(id, 10);

  return json(data);
}

export default function Home() {
  const { books, usersBookmarks } = useLoaderData<BooksAndBookmarks>();
  const { id: userId } = useUser();
  const updates = useFetchers();
  const orderByFirstUpdate = [...updates].reverse();
  const status = orderByFirstUpdate?.[0];

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="sr-only font-monty text-xl">Discover - latest!</h1>
        <ul className="flex flex-col gap-6">
          {books.map((book: Book) => {
            return (
              <PreviewBookItem
                key={book.id}
                book={book}
                usersBookmarks={usersBookmarks}
                userId={String(userId)}
              />
            );
          })}
        </ul>
      </div>

      {status && status.type === "done" ? (
        <Notification status={status} />
      ) : null}
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Oh no!</h1>
      <pre>{error.message}</pre>
      <p>There was an error in the Discover route!</p>
    </>
  );
}
