import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useRef } from "react";
import { FAILURE_REDIRECT, oAuthStrategy } from "~/auth/auth.server";
import {
  createBookmark,
  markAsNotReading,
  markAsRead,
  markAsReading,
  removeBookmark,
} from "~/models/books.server";
import { useMatchesData, useUser } from "~/utils/user";
import PreviewListBookItem from "~/components/PreviewListBookItem";
import OverviewList from "~/components/OverviewList";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = formData.get("user_id") as string;
  const bookId = formData.get("book_id") as string;
  const bookmark = formData.get("bookmark");
  const action = formData.get("action");
  let errors = { error: true };

  if (bookmark) {
    const isCreating = bookmark === "create";

    try {
      if (isCreating) {
        await createBookmark(bookId, userId);
      } else if (bookmark === "delete") {
        await removeBookmark(bookId, userId);
      }
      return json({ status: 200 });
    } catch (e) {
      return {
        ...errors,
        message: isCreating
          ? "Error adding bookmark"
          : "Error removing bookmark",
      };
    }
  }

  if (action) {
    const isReading = action === "reading";
    const isRead = action === "read";
    const isNotReading = action === "not-reading";

    try {
      if (isReading) await markAsReading(bookId, userId);
      if (isNotReading) await markAsNotReading(bookId, userId);
      if (isRead) await markAsRead(bookId, userId);

      return json({ status: 200 });
    } catch (e) {
      return {
        ...errors,
        message: isRead
          ? "Error marking book status to read"
          : "Error marking book status to not read",
      };
    }
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });

  return null;
};

export default function Overview() {
  const containerRef = useRef<HTMLElement>(null);
  const { id: userId } = useUser();
  const { books, usersBookmarks } = useMatchesData(
    "routes/home"
  ) as BooksAndBookmarks;

  // TODO: Create a custom hook to handle this, if we use hScrolling
  function handleScroll(evt: React.WheelEvent<HTMLElement>) {
    if (!containerRef.current) return;

    containerRef.current.scrollLeft += evt.deltaY;
  }

  return (
    <>
      <section
        className="flex items-center overflow-x-auto overscroll-none bg-grayWorm-200 md:p-sectionMedium"
        ref={containerRef}
        onWheel={handleScroll}
      >
        <div className="flex items-center justify-center">
          <div>
            <h1 className="font-monty text-xl">Discover - latest!</h1>
            <ul className="relative my-3 flex w-full gap-6">
              {books.map((book: Book) => {
                return (
                  <PreviewListBookItem
                    key={book.id}
                    book={book}
                    usersBookmarks={usersBookmarks}
                    userId={String(userId)}
                  />
                );
              })}
            </ul>
            <p>
              <Link to="/home/discover">View all</Link>
            </p>
          </div>
        </div>
      </section>

      {usersBookmarks.length > 0 ? (
        <div className="bg-grayWorm-100 md:p-sectionMedium">
          <div className="mb-10">
            <h2 className="font-monty text-xl">Recently bookmarked to read</h2>
            <OverviewList data={usersBookmarks} listType="bookmarked" />
          </div>
          <div>
            <h2 className="font-monty text-xl">Recently read</h2>
            <OverviewList data={usersBookmarks} listType="read" />
          </div>
        </div>
      ) : null}
    </>
  );
}
