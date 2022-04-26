import { Link } from "@remix-run/react";
import PreviewBook from "./PreviewBook";

interface BookProps {
  data: usersBookmarks[];
}

export default function Sidebar({ data }: BookProps) {
  const currentlyReading = data.filter((book) => book.reading);
  const readingLatest = [...currentlyReading].reverse()[0];

  return (
    <div className="md:p-sectionMedium">
      <ul>
        <li className="mb-8 font-monty">
          <h2 className="text-xl">Reading</h2>
          <PreviewBook book={readingLatest} />
        </li>
        <li className="mb-8 font-monty">
          <Link to="/home/overview">Overview</Link>
        </li>
        <li className="mb-8 font-monty">
          <Link to="/home/discover">Discover</Link>
        </li>
        <li className="mb-8 font-monty">
          <Link to="/home/bookmarks">Bookmarked</Link>
        </li>
        <li className="mb-8 font-monty">
          <Link to="/home/reading">Reading</Link>
        </li>
        <li className="font-monty">
          <Link to="/home/read">Read</Link>
        </li>
      </ul>
    </div>
  );
}
