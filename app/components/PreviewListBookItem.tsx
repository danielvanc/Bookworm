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

        {isBookmarked || isCreatingBookmark ? (
          <button
            type="submit"
            name="bookmark"
            disabled={isBusy}
            value="delete"
          >
            Remove Bookmark
          </button>
        ) : !isBookmarked || (isBookmarked && isRemovingBookmark) ? (
          <button
            type="submit"
            name="bookmark"
            disabled={isBusy}
            value="create"
          >
            Bookmark book
          </button>
        ) : null}

        {hasErrors ? <p>There was an error adding this bookmark</p> : null}
      </fetcher.Form>
    </li>
  );
}
