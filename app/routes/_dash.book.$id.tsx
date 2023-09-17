import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useFetchers,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { format } from "date-fns";
import { FAILURE_REDIRECT, getSession } from "~/auth/auth.server";
import { fetchBookInfo, getUsersBookmarks } from "~/models/books.server";
import BookItemFooter from "~/components/BookItemFooter";
import Notification from "~/components/Notification";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { session } = await getSession(request);
  if (!session) return redirect(FAILURE_REDIRECT);

  const { id: userId } = session?.user;
  const { id: bookId } = params;

  invariant(bookId, "bookId is required");
  invariant(userId, "userId is required");

  const data = await fetchBookInfo(bookId);

  const bookmarks = await getUsersBookmarks(userId);

  const userBookmark = bookmarks.find(
    (bookmark) => bookmark.book_id === bookId
  );
  const buid = userBookmark?.buid;
  const isBookmarked = userBookmark?.bookmarked ?? false;
  const isReading = userBookmark?.reading ?? false;
  const isRead = userBookmark?.read ?? false;

  return json({
    ...data,
    buid,
    bookId,
    isBookmarked,
    isReading,
    isRead,
    userId,
  });
}

export default function Book() {
  const {
    description,
    image,
    link,
    title,
    authors,
    publisher,
    publishedDate,
    printedPageCount,
    eBook,
    price,
    categories,
    buid,
    bookId,
    isBookmarked,
    isReading,
    isRead,
    userId,
  } = useLoaderData<typeof loader>();
  const updates = useFetchers() || [];
  const orderByFirstUpdate = [...updates]?.reverse();
  const status = orderByFirstUpdate?.[0];

  return (
    <>
      <div className="flex flex-col gap-16 px-5 md:flex-row-reverse xl:px-0">
        <article className="relative basis-3/5 pb-20 xl:pt-20">
          <BookItemFooter
            buid={buid}
            bookId={bookId}
            userId={userId}
            isBookmarked={isBookmarked}
            isReading={isReading}
            isRead={isRead}
            showReadMore={false}
            classNames="flex-0 w-[340px] justify-start"
          />
          <h1 className="my-10 text-2xl font-extrabold md:text-4xl xl:text-7xl">
            {title}
          </h1>

          <div
            className="mt-10 text-lg lg:text-lg [&_b]:text-2xl [&_li]:ml-6 [&_p]:mt-5 [&_p]:text-2xl lg:[&_p]:text-2xl"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <p className="mt-14 hidden md:block">
            <a
              // href={link}
              href={`https://www.google.co.uk/books/edition/_/${bookId}`}
              target="_blank"
              className="bg-rosyWorm hover:bg-rosyWorm-900 rounded-lg px-10 py-5 text-white"
              rel="noreferrer"
            >
              View more information
            </a>
          </p>
        </article>

        <div className="basis-2/5">
          <img
            src={image}
            alt={title}
            className="w-full rounded-md border-[1em] border-white drop-shadow-2xl lg:border-[2em] xl:border-[7em]"
          />

          <div className="mx-auto mt-10 w-3/4 space-y-6 pb-16">
            <div>
              <h3 className="font-semibold text-gray-900">Information</h3>
              <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                <div className="flex justify-between py-3 text-sm font-medium">
                  <dt className="text-gray-500">Author(s)</dt>
                  <dd className="break-all pl-2 text-gray-900">
                    {authors?.join(", ")}
                  </dd>
                </div>
                <div className="flex justify-between py-3 text-sm font-medium">
                  <dt className="text-gray-500">Publisher</dt>
                  <dd className="whitespace-nowrap text-gray-900">
                    {publisher}
                  </dd>
                </div>
                <div className="flex justify-between py-3 text-sm font-medium">
                  <dt className="text-gray-500">Published:</dt>
                  <dd className="whitespace-nowrap text-gray-900">
                    {format(new Date(publishedDate || ""), "do MMM, yyyy")}
                  </dd>
                </div>
                {categories?.length ? (
                  <div className="flex justify-between py-3 text-sm font-medium md:block xl:flex">
                    <dt className="text-gray-500">Categories:</dt>
                    <dd className="break-words text-gray-900 xl:pl-2">
                      {categories?.[0]}
                    </dd>
                  </div>
                ) : null}
                <div className="flex justify-between py-3 text-sm font-medium">
                  <dt className="text-gray-500">Pages</dt>
                  <dd className="whitespace-nowrap text-gray-900">
                    {printedPageCount}
                  </dd>
                </div>
                <div className="flex justify-between py-3 text-sm font-medium">
                  <dt className="text-gray-500">Available as eBook?</dt>
                  <dd className="whitespace-nowrap text-gray-900">
                    {eBook ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="flex justify-between py-3 text-sm font-medium">
                  <dt className="text-gray-500">Price</dt>
                  <dd className="whitespace-nowrap text-gray-900">£{price}</dd>
                </div>
              </dl>
            </div>
          </div>
          <p className="block text-center md:hidden">
            <a
              href={link}
              target="_blank"
              className="bg-rosyWorm hover:bg-rosyWorm-900 rounded-lg px-10 py-5 text-white"
              rel="noreferrer"
            >
              View more information
            </a>
          </p>
        </div>
      </div>
      {status && status?.data === "done" && status?.data?.message ? (
        <Notification
          status={status}
          classNames="mx-auto w-full max-w-[400px] left-1/2 -translate-x-1/2"
        />
      ) : null}
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
    </div>
  );
}
