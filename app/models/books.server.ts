import { prisma } from "~/utils/prisma.server";
import type { Book, BooksFeed } from "remix.env";

// Add record to database table: books
export function createBookmark(bookId: string, userId: string) {
  return prisma.books.create({
    data: {
      user_id: userId,
      book_id: bookId,
      read: false,
      reading: false,
      watching: false,
      bookmarked: true,
    },
  });
}

export function removeBookmark() {}

export function markAsRead() {}

export function markAsReading() {}

export async function getUsersBookmarks(user_id: string) {
  // Instead of this, use findUnique()
  // const getAuthor = await prisma.user.findUnique({
  //     where: {
  //       id: "20",
  //     },
  //     include: {
  //   |    posts: true, // All posts where authorId == 20
  //     },
  //   });
  const allBookIds = await prisma.books.findMany({
    where: { user_id },
    select: {
      book_id: true,
    },
  });
  const usersBookmarks = allBookIds.map((book) => book.book_id);

  return usersBookmarks || [];
}

export async function displayLatestBooks(userId: string, total: number) {
  const api = `${process.env.ALL_BOOKS_API}""&maxResults=${total}` || "";
  const result = await fetch(api);
  const data: BooksFeed = await result.json();
  const usersBookmarks = await getUsersBookmarks(userId);

  const books: Book[] = data?.items.map((book) => ({
    id: book.id,
    description: book.volumeInfo.description,
    title: book.volumeInfo.title,
    image: book.volumeInfo.imageLinks?.thumbnail,
    link: book.volumeInfo.canonicalVolumeLink,
  }));

  return { books, usersBookmarks };
}
