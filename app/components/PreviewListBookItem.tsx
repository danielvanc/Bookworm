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
  const isSavingBookmark =
    fetcher.submission?.formData.get("book_id") === book.id;
  const noErrorsSavingBookmark = isSavingBookmark && !errorSavingBookmark;

  return (
    <li key={book.id} className="flex">
      <PreviewBook book={book} />

      <fetcher.Form method="post">
        <input type="hidden" name="book_id" value={book.id} />
        <input type="hidden" name="user_id" value={userId} />
        {itemIsBookmarked || noErrorsSavingBookmark ? (
          <button type="submit" name="bookmark">
            Remove Bookmark
          </button>
        ) : (
          <button type="submit" name="bookmark">
            Bookmark book
            {errorSavingBookmark ? (
              <p>There was an error adding this bookmark</p>
            ) : null}
          </button>
        )}
      </fetcher.Form>
    </li>
  );
}
