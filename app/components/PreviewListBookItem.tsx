import type { BookMarkItem } from "remix.env";
import { useFetcher } from "@remix-run/react";
import PreviewBook from "./PreviewBook";

export default function PreviewListBookItem({
  book,
  usersBookmarks,
  userId,
}: BookMarkItem) {
  const fetcher = useFetcher();
  const isBusy = fetcher.state === "submitting";
  const isIdle = fetcher.state === "idle";
  const hasErrors = fetcher.data?.error;
  const isBookmarked = usersBookmarks.includes(book.id);
  const isBookToBookmark =
    fetcher.submission?.formData.get("book_id") === book.id;
  const isCreatingBookmark =
    isBookToBookmark &&
    fetcher.submission?.formData.get("bookmark") === "create";
  const isRemovingBookmark =
    isBookToBookmark &&
    fetcher.submission?.formData.get("bookmark") === "delete";

  return (
    <li key={book.id} className="flex">
      <PreviewBook book={book} />

      <fetcher.Form method="post">
        <input type="hidden" name="book_id" value={book.id} />
        <input type="hidden" name="user_id" value={userId} />

        {isCreatingBookmark || (isIdle && isBookmarked) ? (
          <button
            type="submit"
            name="bookmark"
            disabled={isBusy}
            value="delete"
            aria-label="Remove Bookmark"
          >
            Remove Bookmark
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
            Bookmark book
          </button>
        ) : null}

        {isIdle && hasErrors ? (
          <p>There was an error adding this bookmark</p>
        ) : null}
      </fetcher.Form>
    </li>
  );
}
