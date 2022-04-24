import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FAILURE_REDIRECT, oAuthStrategy } from "~/auth/auth.server";
import {
  getUsersLatestBookmarks,
  markAsRead,
  markAsReading,
  markAsNotReading,
} from "~/models/books.server";
import OverviewList from "~/components/OverviewList";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = formData.get("user_id") as string;
  const bookId = formData.get("book_id") as string;
  const action = formData.get("action");
  let errors = { error: true };

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
      message: isReading
        ? "Error marking book status to reading"
        : "Error marking book status to not reading",
    };
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });
  const { id } = session?.user!;
  const bookmarks = await getUsersLatestBookmarks(id, 3);

  return bookmarks;
};

export default function OverviewIndex() {
  const data = useLoaderData<Book[]>();

  return (
    <div className="bg-grayWorm-100 md:flex md:w-full md:justify-between md:gap-10 md:p-sectionMedium">
      <div className="md:w-1/3">
        <h3>Bookmarked to read</h3>
        <OverviewList data={data} listType="bookmarked" />
      </div>
      <div className="md:w-1/3">
        <h3>Currently reading</h3>
        <OverviewList data={data} listType="reading" />
      </div>
      <div className="md:w-1/3">
        <h3>Recently read</h3>
        <OverviewList data={data} listType="read" />
      </div>
    </div>
  );
}
