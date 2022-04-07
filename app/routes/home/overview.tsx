import type { Book, BookMarkItem, BooksFeed } from "remix.env";
import { ActionFunction, LoaderFunction } from "remix";
import React from "react";
import { Link, json, Outlet, useLoaderData, useFetcher, useCatch } from "remix";
import { FAILURE_REDIRECT, oAuthStrategy } from "~/auth/auth.server";
import { createBookmark, getUsersBookmarks } from "~/models/books.server";
import PreviewBook from "~/components/PreviewBook";
import { useUser } from "~/utils/user";

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let userId = formData.get("user_id") as string;
  let bookId = formData.get("book_id") as string;

  // TODO: Detect if action is of type create / remove of bookmark
  try {
    if (Math.random() > 0.5) {
      throw new Error(
        "Something went wrong with saving bookmark. Please try again"
      );
    }

    await createBookmark(bookId, userId);
    return json({ status: 200 });
  } catch (e) {
    return { error: true };
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });
  const { id } = session?.user!;
  const api = `${process.env.ALL_BOOKS_API}""&maxResults=20` || "";

  // TODO: Add this as a util function
  // Get all users current books
  const usersBookmarks = await getUsersBookmarks(id);

  try {
    const result = await fetch(api);
    const data: BooksFeed = await result.json();

    const books: Book[] = data?.items.map((book) => ({
      id: book.id,
      description: book.volumeInfo.description,
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks?.thumbnail,
      link: book.volumeInfo.canonicalVolumeLink,
    }));

    const returnData = { books, usersBookmarks };

    return json(returnData, {
      headers: {
        "Cache-Control": "private, max-age=3600",
        Vary: "Cookie",
      },
    });
  } catch (error) {
    throw new Response(
      `Ugh oh, houston we had a problem fetching the data! Error was: ${error}`,
      {
        status: 500,
      }
    );
  }
};

export default function Overview() {
  const containerRef = React.useRef<HTMLElement>(null);

  const { id: userId } = useUser();

  const { books, usersBookmarks } = useLoaderData();

  // TODO: Create a custom hook to handle this
  function handleScroll(evt: React.WheelEvent<HTMLElement>) {
    if (!containerRef.current) return;

    containerRef.current.scrollLeft += evt.deltaY;
  }

  return (
    <>
      <section
        className="flex h-[60vh] items-center overflow-x-auto overscroll-none bg-grayWorm-200 md:p-sectionMedium"
        ref={containerRef}
        onWheel={handleScroll}
      >
        <div className="flex items-center justify-center">
          <div>
            <h1 className="font-monty text-xl">Discover - latest!</h1>
            <ul className="relative my-3 flex w-full gap-6">
              {books.map((book: Book) => {
                return (
                  <BookItem
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
      <Outlet />
    </>
  );
}

// TODO: Move this to a PreviewListBookItem component
function BookItem({ book, usersBookmarks, userId }: BookMarkItem) {
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

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 500) {
    return (
      <>
        <p>{caught.data}</p>
        <Outlet />
      </>
    );
  }
}
