import { useFetcher } from "@remix-run/react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import PreviewBook from "./PreviewBookLarge";

export default function PreviewListBookItem({
  book,
  usersBookmarks,
  userId,
}: BookMarkItem) {
  const fetcher = useFetcher();
  const bookId = book.id;
  const isBusy = fetcher.state === "submitting";
  const isIdle = fetcher.state === "idle";
  const hasErrors = fetcher.data?.error ? fetcher.data : false;
  const isBookToBookmark =
    fetcher.submission?.formData.get("book_id") === bookId;
  const isBookmarked = usersBookmarks.map((book) => book.id).includes(bookId);

  const isCreatingBookmark =
    isBookToBookmark &&
    fetcher.submission?.formData.get("bookmark") === "create";
  const isRemovingBookmark =
    isBookToBookmark &&
    fetcher.submission?.formData.get("bookmark") === "delete";

  const showAddBookmark = isRemovingBookmark || (isIdle && !isBookmarked);
  const showRemoveBookmark = isCreatingBookmark || (isIdle && isBookmarked);

  return (
    <li key={bookId} className="relative flex">
      <PreviewBook
        book={book}
        errors={isIdle && hasErrors ? hasErrors : undefined}
      />

      <fetcher.Form method="post">
        <input type="hidden" name="book_id" value={bookId} />
        <input type="hidden" name="user_id" value={userId} />

        {showRemoveBookmark ? (
          <button
            type="submit"
            name="bookmark"
            disabled={isBusy}
            value="delete"
            aria-label="Remove Bookmark"
          >
            <FaBookmark className="absolute left-4 text-2xl text-yellow-500 hover:text-yellow-200" />
          </button>
        ) : null}

        {showAddBookmark ? (
          <button
            type="submit"
            name="bookmark"
            disabled={isBusy}
            value="create"
            aria-label="Add Bookmark"
          >
            <FaRegBookmark className="absolute left-4 text-2xl hover:text-yellow-500" />
          </button>
        ) : null}
      </fetcher.Form>
    </li>
  );
}
