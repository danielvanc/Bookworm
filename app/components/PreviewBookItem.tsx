import BookItemFooter from "./BookItemFooter";

export default function PreviewBookItem({
  book,
  usersBookmarks,
  userId,
}: BookMarkItem) {
  const bookId = book.id;
  const userBookmark = usersBookmarks.find(
    (bookmark) => bookmark.id === bookId
  );
  const buid = userBookmark?.buid;

  const isBookmarked = userBookmark?.bookmarked ?? false;
  const isReading = userBookmark?.reading ?? false;
  const isRead = userBookmark?.read ?? false;

  if (!book.image || !book.title) return null;

  return (
    <li
      key={book.book_id}
      className="flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex flex-col items-start p-8 md:flex-row">
        <div className="w-1/5">
          <img
            className="mx-auto w-full flex-shrink-0 rounded-lg shadow-md md:object-cover"
            src={book.image}
            alt=""
          />
        </div>

        <div className="w-4/5 py-5 md:px-10 md:py-0">
          <h3 className="text-xl font-black text-gray-700">{book.title}</h3>
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dd className="mb-3 mt-1">
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {/* TODO: Replace with book genre */}
                {book.title}
              </span>
            </dd>
            <dd
              className="text-md text-gray-500"
              dangerouslySetInnerHTML={{ __html: book.description }}
            />
            <dt className="sr-only">Role</dt>
          </dl>
        </div>
      </div>

      <BookItemFooter
        buid={buid}
        bookId={bookId}
        userId={userId}
        isBookmarked={isBookmarked}
        isReading={isReading}
        isRead={isRead}
      />
    </li>
  );
}
