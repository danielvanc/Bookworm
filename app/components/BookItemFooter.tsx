import { Link, useFetcher } from "@remix-run/react";
import { BookmarkIcon } from "@heroicons/react/20/solid";
import Done from "./icons/Done";
// TODO: Tidy up / seperate out into components

interface Props {
  buid?: string;
  bookId: string;
  userId: string;
  isBookmarked: boolean;
  isReading: boolean;
  isRead: boolean;
  showReadMore?: boolean;
  classNames?: string;
}

export default function BookItemFooter({
  buid,
  bookId,
  userId,
  isBookmarked,
  isReading,
  isRead,
  showReadMore = true,
  classNames = "",
}: Props) {
  const statusFetcher = useFetcher();
  const isIdle = statusFetcher.state === "idle";
  const hasErrors = statusFetcher.data?.error;
  const failedUpdate = hasErrors && isIdle;
  const action = statusFetcher.data?.action;
  const subData = statusFetcher.formData;
  const ErrorMessage = "Error, please retry";

  const isBookmarkAction = action === "create" || action === "remove-bookmark";
  const isReadingAction = action === "remove-reading" || action === "reading";
  const isReadAction = action === "remove-read" || action === "read";

  const isAddingBookmark = subData?.get("_action") === "create";
  const isRemovingBookmark = subData?.get("_action") === "remove-bookmark";
  const isReadingUpdate = subData?.get("_action") === "reading";
  const isNotReadingUpdate = subData?.get("_action") === "remove-reading";

  const isReadUpdate = subData?.get("_action") === "read";
  const isNotReadUpdate = subData?.get("_action") === "remove-read";

  const nonSelectedStyles =
    "text-gray-700 hover:bg-gray-50 focus:ring-gray-900 bg-white focus:border-x-rosyWorm-900 border-gray-300";
  const selectedStyles =
    "bg-gray-100 focus:border-x-pink-300 focus:ring-pink-300 text-gray-500 ";

  const bookmarkButtonStyles = `relative inline-flex items-center rounded-l-md border px-4 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 ${
    (isBookmarked || isAddingBookmark) && !isRemovingBookmark
      ? selectedStyles
      : nonSelectedStyles
  }`;

  return (
    <div>
      <div className="-mt-px flex divide-x-2 divide-gray-200">
        <div
          className={`flex w-0 flex-1 items-center py-4 ${
            classNames ? classNames : "justify-center"
          }`}
        >
          <statusFetcher.Form method="post" action="/home">
            <input type="hidden" name="buid" value={buid} />
            <input type="hidden" name="book_id" value={bookId} />
            <input type="hidden" name="user_id" value={userId} />
            <input
              type="hidden"
              name="isBookmarked"
              value={isBookmarked.toString()}
            />

            <span className="isolate inline-flex rounded-md shadow-sm">
              {isAddingBookmark || isRemovingBookmark ? (
                <button
                  disabled
                  name="_action"
                  value={``}
                  type="submit"
                  className={bookmarkButtonStyles}
                >
                  <BookmarkIcon
                    className={`-ml-1 mr-2 h-5 w-5 ${
                      isAddingBookmark ? "text-orange-300" : "text-gray-400"
                    }`}
                    aria-hidden="true"
                  />
                  {isAddingBookmark ? "Bookmarked" : "Bookmark"}
                </button>
              ) : (
                <button
                  name="_action"
                  value={`${isBookmarked ? "remove-bookmark" : "create"}`}
                  type="submit"
                  className={`${bookmarkButtonStyles} ${
                    failedUpdate && isBookmarkAction ? "text-red-800" : ""
                  }`}
                >
                  <BookmarkIcon
                    className={`-ml-1 mr-2 h-5 w-5 ${
                      isBookmarked ? "text-orange-300" : "text-gray-400"
                    }`}
                    aria-hidden="true"
                  />
                  {failedUpdate && action === "create"
                    ? ErrorMessage
                    : isBookmarked
                    ? "Bookmarked"
                    : "Bookmark"}
                </button>
              )}

              {isReadingUpdate || isNotReadingUpdate ? (
                <button
                  name="_action"
                  value=""
                  type="submit"
                  disabled
                  className="relative -ml-px inline-flex items-center border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500  focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {isReadingUpdate ? "Reading" : "Not Reading"}
                </button>
              ) : (
                <button
                  name="_action"
                  value={`${isReading ? "remove-reading" : "reading"}`}
                  type="submit"
                  className={`relative -ml-px inline-flex items-center border border-gray-300  px-2 py-2 text-sm font-medium sm:px-4 ${
                    isReading && !isReadUpdate
                      ? "bg-gray-100 text-gray-500"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }   focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    failedUpdate && isReadingAction ? "text-red-800" : ""
                  }`}
                >
                  {failedUpdate && action === "reading"
                    ? ErrorMessage
                    : isReading && !isReadUpdate
                    ? "Reading"
                    : "Not Started"}
                </button>
              )}

              {isReadUpdate || isNotReadUpdate ? (
                <button
                  name="_action"
                  value=""
                  type="submit"
                  disabled
                  className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                >
                  {isReadUpdate ? "Read" : "Not Finished"}
                  {isReadUpdate && (
                    <Done className="-mr-2 ml-2 h-5 w-5 text-gray-400" />
                  )}
                </button>
              ) : (
                <button
                  name="_action"
                  value={`${isRead ? "remove-read" : "read"}`}
                  type="submit"
                  className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 px-2 py-2 text-sm sm:px-4 ${
                    isRead && !isReadingUpdate
                      ? "bg-gray-100 text-gray-500"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }   focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    failedUpdate && isReadAction ? "text-red-800" : ""
                  }`}
                >
                  {failedUpdate && isReadAction
                    ? ErrorMessage
                    : isRead && !isReadingUpdate
                    ? "Read"
                    : "Not Finished"}

                  {isRead && !isReadingUpdate && (
                    <Done className="-mr-1 ml-2 h-5 w-5 text-gray-400 sm:-mr-2" />
                  )}
                </button>
              )}
            </span>
          </statusFetcher.Form>
        </div>
        {showReadMore ? (
          <div className="-ml-px flex w-0 flex-1 items-center justify-center">
            <Link
              to={`/book/${bookId}`}
              prefetch="intent"
              type="button"
              className="relative -ml-px inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              Read more...
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
