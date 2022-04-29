import { NavLink } from "@remix-run/react";
import PreviewBook from "./PreviewBook";

interface BookProps {
  data: usersBookmarks[];
}

export default function Sidebar({ data }: BookProps) {
  const currentlyReading = data.filter((book) => book.reading);
  const readingLatest = [...currentlyReading].reverse()[0];
  const activeStyles = ({ isActive }: { isActive: Boolean }) =>
    isActive ? "border-b-2 border-b-rosyWorm-900 text-rosyWorm" : undefined;

  return (
    <nav className="md:p-sectionMedium">
      <ul>
        <li className="mb-8 font-monty">
          <h2 className="text-xl">Reading</h2>
          <PreviewBook book={readingLatest} />
        </li>
        <li className="mb-8 font-monty">
          <NavLink to="overview" prefetch="intent" className={activeStyles}>
            Overview
          </NavLink>
        </li>
        <li className="mb-8 font-monty">
          <NavLink to="discover" prefetch="intent" className={activeStyles}>
            Discover
          </NavLink>
        </li>
        <li className="mb-8 font-monty">
          <NavLink to="bookmarks" className={activeStyles}>
            Bookmarked
          </NavLink>
        </li>
        <li className="mb-8 font-monty">
          <NavLink to="/home/reading" className={activeStyles}>
            Reading
          </NavLink>
        </li>
        <li className="font-monty">
          <NavLink to="/home/read" className={activeStyles}>
            Read
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
