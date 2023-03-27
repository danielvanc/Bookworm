import React from "react";
import PreviewBookItem from "./PreviewBookItem";
import { useUser } from "~/utils/user";

export default function Discover({ books, usersBookmarks }: BooksAndBookmarks) {
  const { id: userId } = useUser();

  if (!books.length) return <p>No books found</p>;

  return (
    <ul className="flex flex-col gap-6" data-testid="data">
      {books?.map((book: Book) => {
        if (!book.title || !book.image) return null;

        return (
          <PreviewBookItem
            key={book.id}
            book={book}
            usersBookmarks={usersBookmarks}
            userId={String(userId)}
          />
        );
      })}
    </ul>
  );
}
