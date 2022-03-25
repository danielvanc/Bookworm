import type { LoaderFunction } from "remix";
import type { BookPreviewList, BooksFeed } from "remix.env";
import { Link, useCatch, json, useLoaderData, Outlet } from "remix";
import HorizontalScroll from "react-scroll-horizontal";
import PreviewBook from "~/components/PreviewBook";

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
  const books: BookPreviewList = useLoaderData();

  return (
    <>
      <section className="flex h-[60vh] items-center overflow-x-auto bg-grayWorm-200 md:p-sectionMedium">
        <HorizontalScroll reverseScroll={true}>
          {/* TODO: Improve scrolling height area */}
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
        </HorizontalScroll>
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
