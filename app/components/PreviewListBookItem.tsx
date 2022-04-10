import { useFetcher } from "@remix-run/react";
import type { BookMarkItem } from "remix.env";
import PreviewBook from "./PreviewBook";

export default function PreviewListBookItem({
  book,
  usersBookmarks,
  userId,
}: BookMarkItem) {
  const fetcher = useFetcher();
  const errorSavingBookmark = fetcher.data?.error;
  const itemIsBookmarked = usersBookmarks.includes(book.id);
  const isProcessingBookmark =
    fetcher.submission?.formData.get("book_id") === book.id;

  const isCreatingBookmark =
    fetcher.submission?.formData.get("bookmark") === "create";

  const isRemovingBookmark =
    fetcher.submission?.formData.get("bookmark") === "delete";

  return (
    <li key={book.id} className="flex">
      <PreviewBook book={book} />

      <fetcher.Form method="post">
        <input type="hidden" name="book_id" value={book.id} />
        <input type="hidden" name="user_id" value={userId} />

        {itemIsBookmarked || isCreatingBookmark ? (
          <button
            type="submit"
            name="bookmark"
            disabled={fetcher.type === "actionSubmission"}
            value="delete"
          >
            Remove Bookmark
          </button>
        ) : !itemIsBookmarked || (itemIsBookmarked && isRemovingBookmark) ? (
          <button
            type="submit"
            name="bookmark"
            disabled={fetcher.type === "actionSubmission"}
            value="create"
          >
            Bookmark book
          </button>
        ) : null}

        {!isProcessingBookmark && errorSavingBookmark ? (
          <p>There was an error adding this bookmark</p>
        ) : null}
      </fetcher.Form>
    </li>
  );
}
