import type { BookMarkItem } from "remix.env";
import { useFetcher } from "@remix-run/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import PreviewBook from "./PreviewBook";

export default function PreviewListBookItem({
  book,
  usersBookmarks,
  userId,
}: BookMarkItem) {
  const bookId = book.id;
  const fetcher = useFetcher();
  const isBusy = fetcher.state === "submitting";
  const isIdle = fetcher.state === "idle";
  const hasErrors = fetcher.data?.error ? fetcher.data : false;
  const isBookToBookmark =
    fetcher.submission?.formData.get("book_id") === bookId;
  const isBookmarked = usersBookmarks.includes(bookId);
  const isCreatingBookmark =
    isBookToBookmark &&
    fetcher.submission?.formData.get("bookmark") === "create";
  const isRemovingBookmark =
    isBookToBookmark &&
    fetcher.submission?.formData.get("bookmark") === "delete";

  return (
    <li key={bookId} className="relative flex">
      <PreviewBook
        book={book}
        errors={isIdle && hasErrors ? hasErrors : undefined}
      />

      <fetcher.Form method="post">
        <input type="hidden" name="book_id" value={bookId} />
        <input type="hidden" name="user_id" value={userId} />

        {isCreatingBookmark || (isIdle && isBookmarked) ? (
          <button
            type="submit"
            name="bookmark"
            disabled={isBusy}
            value="delete"
            aria-label="Remove Bookmark"
          >
            <FaStar className="absolute left-4 text-2xl text-yellow-500 hover:text-yellow-200" />
          </button>
        ) : null}

        {isRemovingBookmark || (isIdle && !isBookmarked) ? (
          <button
            type="submit"
            name="bookmark"
            disabled={isBusy}
            value="create"
            aria-label="Add Bookmark"
          >
            <FaRegStar className="absolute left-4 text-2xl hover:text-yellow-500" />
          </button>
        ) : null}
      </fetcher.Form>
    </li>
  );
}
