import type { books } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";
import config from "~/config";

const initialBookData = (data: initialBook) => ({
  id: data.id,
  title: data.volumeInfo.title,
  description: data.volumeInfo.description,
  image: data.volumeInfo.imageLinks?.thumbnail,
  link: data.volumeInfo.canonicalVolumeLink,
  reading: false,
  read: false,
});

export function createBookmark(
  bookId: books["book_id"],
  userId: books["user_id"]
) {
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

export function markAsRead(bookId: books["book_id"], userId: books["user_id"]) {
  return prisma.books.updateMany({
    where: {
      user_id: userId,
      book_id: bookId,
    },
    data: {
      reading: false,
      read: true,
    },
  });
}

export function markAsReading(
  bookId: books["book_id"],
  userId: books["user_id"]
) {
  return prisma.books.updateMany({
    where: {
      user_id: userId,
      book_id: bookId,
    },
    data: {
      reading: true,
      read: false,
    },
  });
}

export function markAsNotReading(
  bookId: books["book_id"],
  userId: books["user_id"]
) {
  return prisma.books.updateMany({
    where: {
      user_id: userId,
      book_id: bookId,
    },
    data: {
      reading: false,
      read: false,
    },
  });
}

export async function getUsersBookmarks(user_id: books["user_id"]) {
  const bookIds = await prisma.profile.findUnique({
    where: {
      id: user_id,
    },
    include: {
      books: true,
    },
  });

  const usersBookmarks =
    bookIds?.books?.map((book) => {
      const { book_id: id, reading, read } = book;
      return { id, reading, read };
    }) || [];

  return usersBookmarks;
}

export async function getLatestBooks(userId: books["user_id"], total: number) {
  const api = `${config.API.ALL_BOOKS}""&maxResults=${total}` || "";
  const data: BooksFeed = await fetch(api).then((res) => res.json());
  const bookmarkIds = await getUsersBookmarks(userId);
  const books: Book[] = data?.items?.map((book) => initialBookData(book));
  let usersBookmarks: Book[] = [];

  if (bookmarkIds.length) {
    usersBookmarks = await getAllBooksmarkData(bookmarkIds);
  }

  return { books, usersBookmarks };
}

async function fetchBookInfo(bookId: string): Promise<Book> {
  // TODO: Add error handling component for api requests
  const result = await fetch(`${config.API.BOOK}${bookId}`).then(
    (res) => res.json() as Promise<initialBook>
  );

  return initialBookData(result);
}

async function getAllBooksmarkData(bookmarkIds: usersBookmarks[]) {
  return Promise.all(
    // TODO: Add correct type for bookmarks
    bookmarkIds.map(async (book: any) => {
      const data = await fetchBookInfo(book.id);
      data.read = book.read;
      data.reading = book.reading;

      return data;
    })
  );
}

export async function getUsersLatestBookmarks(userId: string, total: number) {
  const bookmarkIds = await getUsersBookmarks(userId);

  if (!bookmarkIds.length) return [];

  const bookmarksData = await getAllBooksmarkData(bookmarkIds);

  return bookmarksData;
}
