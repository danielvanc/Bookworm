import booksData from "./books-data.json";

let allBooks = [...booksData.items];

export function getBooks(total: number = 10) {
  const books = allBooks || [];

  return books.slice(0, total);
}
