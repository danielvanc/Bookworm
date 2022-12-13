import { json, redirect, type LoaderArgs } from "@remix-run/node";
import { useFetchers, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { FAILURE_REDIRECT, getSession } from "~/auth/auth.server";
import { fetchBookInfo, getUsersBookmarks } from "~/models/books.server";
import BookItemFooter from "~/components/BookItemFooter";
import Notification from "~/components/Notification";

export async function loader({ request, params }: LoaderArgs) {
  const { session } = await getSession(request);
  if (!session) return redirect(FAILURE_REDIRECT);

  const { id: userId } = session?.user!;
  const { id: bookId } = params;

  invariant(bookId, "bookId is required");
  invariant(userId, "userId is required");

  const data = await fetchBookInfo(bookId);
  const bookmarks = await getUsersBookmarks(userId);

  const userBookmark = bookmarks.find((bookmark) => bookmark.id === bookId);
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
      <div className="flex flex-col-reverse gap-16 px-5 md:flex-row-reverse xl:px-0">
        <article className="basis-3/5 pb-10 xl:pt-40">
          <h1 className="mb-10 text-2xl font-extrabold md:text-4xl xl:text-7xl">
            {title}
          </h1>

          <BookItemFooter
            buid={buid}
            bookId={bookId}
            userId={userId}
            isBookmarked={isBookmarked}
            isReading={isReading}
            isRead={isRead}
            showReadMore={false}
          />

          <div
            className="mt-10 text-lg lg:text-lg [&_p]:text-2xl lg:[&_p]:text-2xl [&_li]:ml-6"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <p className="mt-14">
            <a
              href={link}
              target="_blank"
              className="rounded-lg bg-rosyWorm py-5 px-10 text-white"
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
            className="w-full rounded-md border-[1em] border-white/50 drop-shadow-2xl lg:border-[2em] xl:border-[7em]"
          />
        </div>
      </div>
      {status && status?.type === "done" && status?.data?.message ? (
        <Notification
          status={status}
          classNames="mx-auto w-full max-w-[400px] left-1/2 -translate-x-1/2"
        />
      ) : null}
    </>
  );
}

export function CatchBoundary() {
  return <div>CatchBoundary</div>;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Oh no, no book id was provided!</h1>
      <pre>{error.message}</pre>
    </>
  );
}
