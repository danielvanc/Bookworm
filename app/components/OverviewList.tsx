import type { Book } from "remix.env";
import PreviewBook from "./PreviewBook";

interface BookProps {
  data: Book[];
}

export default function OverviewList({ data }: BookProps) {
  return (
    <ul className="">
      {data.map((book: Book) => {
        return <PreviewBook book={book} key={book.id} />;
      })}
    </ul>
  );
}
