import {
  json,
  redirect,
  type ActionArgs,
  type LoaderArgs,
} from "@remix-run/node";
import { useCatch, useFetchers, useLoaderData } from "@remix-run/react";
import {
  createBookmark,
  getLatestBooks,
  markAsNotRead,
  markAsNotReading,
  markAsRead,
  markAsReading,
  removeBookmark,
} from "~/models/books.server";
import Notification from "~/components/Notification";
import { FAILURE_REDIRECT, getSession } from "~/auth/auth.server";
import Discover from "~/components/Discover";

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

      await createBookmark(buid, bookId, userId);
    }

    if (isRemovingBookmark) {
      errorMessage = removingBookmarkError;
      successMessage = "Successfully removed from your bookmarks!";

      await removeBookmark(buid);
    }

    if (isReading) {
      errorMessage = isReadingError;
      successMessage = "Successfully marked as reading!";

      await markAsReading(buid, bookId, userId);
    }

    if (isNotReading) {
      errorMessage = isNotReadingError;
      successMessage = "Successfully marked as not reading!";

      await markAsNotReading(buid);
    }

    if (isRead) {
      errorMessage = isReadError;
      successMessage = "Successfully marked as read!";

      await markAsRead(buid, bookId, userId);
    }

    if (isNotRead) {
      errorMessage = isNotReadError;
      successMessage = "Successfully marked as not finished!";

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
  const { session } = await getSession(request);
  if (!session) return redirect(FAILURE_REDIRECT);
  const { id } = session?.user!;

  const data = await getLatestBooks(id, 10);
  if (!data || !data?.books || !data?.books.length)
    throw new Response("Problem fetching book list...", {
      status: 403,
    });
  return json(data);
}

export default function Home() {
  const { books, usersBookmarks } = useLoaderData<BooksAndBookmarks>();
  const updates = useFetchers() || [];
  const orderByFirstUpdate = [...updates]?.reverse();
  const status = orderByFirstUpdate?.[0];

  return (
    <div className="flex items-center justify-center">
      <h1 className="sr-only font-monty text-xl">Discover - latest!</h1>

      <Discover books={books} usersBookmarks={usersBookmarks} />

      {status && status?.type === "done" && status?.data?.message ? (
        <Notification status={status} />
      ) : null}
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 403) {
    return (
      <div className="mt-10 text-center">
        <h2 className="mb-4">{caught.data}</h2>
        <button onClick={() => window.location.reload()}>Retry?</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
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
