import type { LoaderFunction } from "remix";
import type { BookPreviewList, BooksFeed } from "remix.env";
import { Link, useCatch, json, useLoaderData, Outlet } from "remix";
import PreviewBook from "~/components/PreviewBook";
import React from "react";

export const loader: LoaderFunction = async () => {
  const api = `${process.env.ALL_BOOKS_API}""&maxResults=20` || "";

  try {
    const result = await fetch(api);
    const data: BooksFeed = await result.json();

    const books = data?.items.map((book) => ({
      id: book.id,
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks?.thumbnail || "",
      link: book.volumeInfo.canonicalVolumeLink,
    }));

    return json(books, {
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
  const books: BookPreviewList = useLoaderData();

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
              {books.map((book) => (
                <li key={book.id} className="flex">
                  <PreviewBook book={book} />
                </li>
              ))}
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
