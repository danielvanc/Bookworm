import { useFetcher } from "@remix-run/react";
import { IoGlassesOutline, IoGlasses } from "react-icons/io5";
import { MdDoneOutline, MdDone } from "react-icons/md";
import { useUser } from "~/utils/user";
import PreviewBook from "./PreviewBook";

interface OverviewListProps {
  data: Book[];
  listType: "bookmarked" | "reading" | "read";
}

// TODO: Add Optimistic or Pending U.I for mark as read/reading etc
export default function OverviewList({ data, listType }: OverviewListProps) {
  const fetcher = useFetcher();
  const { id } = useUser();

  return (
    <ul>
      {data.map((book: Book) => {
        const isReading = book.reading;
        const isRead = book.read;
        let criteria = !isReading && !isRead;

        switch (listType) {
          case "reading":
            criteria = isReading;
            break;
          case "read":
            criteria = isRead;
            break;
        }

        if (!criteria) return null;

        return (
          <li key={book.id} className="relative">
            <fetcher.Form method="post">
              <input type="hidden" name="user_id" value={id} />
              <input type="hidden" name="book_id" value={book.id} />
              {!isReading && !isRead ? (
                <>
                  <button
                    type="submit"
                    name="action"
                    value="reading"
                    aria-label="Mark book as reading"
                  >
                    <IoGlassesOutline className=" text-2xl hover:text-yellow-500" />
                  </button>
                  <button
                    type="submit"
                    name="action"
                    value="read"
                    aria-label="Mark book as read"
                  >
                    <MdDoneOutline className=" text-2xl hover:text-yellow-500" />
                  </button>
                </>
              ) : null}
              {isReading ? (
                <>
                  <button
                    type="submit"
                    name="action"
                    value="not-reading"
                    aria-label="Mark book as not reading"
                  >
                    <IoGlasses className="text-2xl text-yellow-500 hover:text-yellow-200" />
                  </button>
                  <button
                    type="submit"
                    name="action"
                    value="read"
                    aria-label="Mark book as read"
                  >
                    <MdDoneOutline className=" text-2xl hover:text-yellow-500" />
                  </button>
                </>
              ) : null}
              {isRead ? (
                <>
                  <button
                    type="submit"
                    name="action"
                    value="reading"
                    aria-label="Mark book as reading"
                  >
                    <IoGlassesOutline className=" text-2xl hover:text-yellow-500" />
                  </button>
                  <MdDone className=" text-2xl" />
                </>
              ) : null}
              <PreviewBook book={book} />
            </fetcher.Form>
          </li>
        );
      })}
    </ul>
  );
}
