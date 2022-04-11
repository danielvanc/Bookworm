import type { Book } from "remix.env";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { useRef } from "react";
import { FAILURE_REDIRECT, oAuthStrategy } from "~/auth/auth.server";
import {
  createBookmark,
  displayLatestBooks,
  removeBookmark,
} from "~/models/books.server";
import { useUser } from "~/utils/user";
import PreviewListBookItem from "~/components/PreviewListBookItem";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const bookmark = formData.get("bookmark");
  const userId = formData.get("user_id") as string;
  const bookId = formData.get("book_id") as string;

  try {
    if (Math.random() > 0.5) throw new Error("Something went wrong");

    if (bookmark === "create") {
      await createBookmark(bookId, userId);
    } else if (bookmark === "delete") {
      await removeBookmark(bookId, userId);
    }
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

  try {
    const data = await displayLatestBooks(id, 10);

    return json(data, {
      headers: {
        "Cache-Control": "private, max-age=3600",
        Vary: "Cookie",
      },
    });
  } catch (error) {
    // TODO: handle error for fetching latest books
    throw new Response(
      `Ugh oh, houston we had a problem fetching the data! Error was: ${error}`,
      {
        status: 500,
      }
    );
  }
};

export default function Overview() {
  const { books, usersBookmarks } = useLoaderData();
  const { id: userId } = useUser();
  const containerRef = useRef<HTMLElement>(null);

  // TODO: Create a custom hook to handle this, if we use hScrolling
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
      <Outlet />
    </>
  );
}

// TODO: Add a better U.I component for Overview CatchBoundary
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

// TODO: Add a better U.I component for Overview Errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Something went wrong here!</h1>
      <pre>{error.message}</pre>
      <p>Houston, we have a problem!</p>
    </>
  );
}
