import type { books } from "@prisma/client";
import type { Book, BooksFeed } from "remix.env";
import { prisma } from "~/utils/prisma.server";

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

export function removeBookmark(
  bookId: books["book_id"],
  userId: books["user_id"]
) {
  return prisma.books.deleteMany({
    where: {
      user_id: userId,
      book_id: bookId,
    },
  });
}

export function markAsRead() {}

export function markAsReading() {}

export async function getUsersBookmarks(user_id: string) {
  const allBookIds = await prisma.profile.findUnique({
    where: {
      id: user_id,
    },
    include: {
      books: true,
    },
  });

  // const usersBookmarks = [];
  const usersBookmarks = allBookIds?.books?.map((book) => book.book_id) || [];

  return usersBookmarks;
}

export async function displayLatestBooks(userId: string, total: number) {
  const api = `${process.env.ALL_BOOKS_API}""&maxResults=${total}` || "";
  const result = await fetch(api);
  const data: BooksFeed = await result.json();
  const usersBookmarks = await getUsersBookmarks(userId);

  const books: Book[] = data?.items?.map((book) => ({
    id: book.id,
    description: book.volumeInfo.description,
    title: book.volumeInfo.title,
    image: book.volumeInfo.imageLinks?.thumbnail,
    link: book.volumeInfo.canonicalVolumeLink,
  }));

  return { books, usersBookmarks };
}

export async function getUsersLatestBookmarks(userId: string, total: number) {
  const api = `https://www.googleapis.com/books/v1/volumes/`;
  const allBookmarkIds = await getUsersBookmarks(userId);

  if (!allBookmarkIds.length) return [];

  async function fetchBookInfo(bookId: string): Promise<Book> {
    const result = await fetch(`${api}${bookId}`);
    const data = await result.json();

    return {
      id: data.id,
      title: data.volumeInfo.title,
      description: data.volumeInfo.description,
      image: data.volumeInfo.imageLinks?.thumbnail,
      link: data.volumeInfo.canonicalVolumeLink,
    };
  }

  const bookmarks = await Promise.all(
    allBookmarkIds.map(async (book: string) => {
      const data = await fetchBookInfo(book);
      return data;
    })
  );

  return bookmarks || [];
}
