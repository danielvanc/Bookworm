import { json, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
import PreviewBookItem from "~/components/PreviewBookItem";

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

  const addingBookmarkError = `Error. Retry adding bookmark?`;
  const removingBookmarkError = `Error. Retry removing bookmark?`;
  const isReadingError = `Error. Retry set to reading?`;
  const isNotReadingError = `Error. Retry set to not reading?`;

  const isReadError = `Error. Retry set to read?`;
  const isNotReadError = `Error. Retry set to not finished?`;

  let errorMessage = "";
  let errors = { error: true, action };

  try {
    if (isAddingBookmark) {
      errorMessage = addingBookmarkError;
      await createBookmark(buid, bookId, userId);
    }

    if (isRemovingBookmark) {
      errorMessage = removingBookmarkError;
      await removeBookmark(buid);
    }

    if (isReading) {
      errorMessage = isReadingError;
      await markAsReading(buid, bookId, userId);
    }

    if (isNotReading) {
      errorMessage = isNotReadingError;
      await markAsNotReading(buid);
    }

    if (isRead) {
      errorMessage = isReadError;
      await markAsRead(buid, bookId, userId);
    }

    if (isNotRead) {
      errorMessage = isNotReadError;
      await markAsNotRead(buid);
    }

    return json({ status: 200 });
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
