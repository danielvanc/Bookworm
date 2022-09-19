// TODO: Fix these type issues
// @ts-nocheck
import type { books } from "@prisma/client";
import { getSession } from "~/auth/auth.server";
import { prisma } from "~/utils/prisma.server";
import config from "~/config";

const initialBookData = (data: initialBook) => ({
  id: data.id,
  title: data.volumeInfo?.title,
  description: data.volumeInfo?.description,
  image: data.volumeInfo?.imageLinks?.thumbnail,
  link: data.volumeInfo?.canonicalVolumeLink,
});

export function createBookmark(
  id: books["id"],
  book_id: books["book_id"],
  user_id: books["user_id"]
) {
  if (!id) {
    return prisma.books.create({
      data: {
        user_id,
        book_id,
        read: false,
        reading: false,
        watching: false,
        bookmarked: true,
      },
    });
  }

  return prisma.books.update({
    where: {
      id,
    },
    data: {
      bookmarked: true,
    },
  });
}

export function removeBookmark(id: books["id"]) {
  return prisma.books.update({
    where: {
      id,
    },
    data: {
      bookmarked: false,
    },
  });
}

export function markAsRead(
  id: books["id"],
  book_id: books["book_id"],
  user_id: books["user_id"]
) {
  if (!id) {
    return prisma.books.create({
      data: {
        user_id,
        book_id,
        read: true,
        reading: false,
        watching: false,
        bookmarked: false,
      },
    });
  }

  return prisma.books.upsert({
    create: {
      user_id,
      book_id,
      read: true,
      reading: false,
      watching: false,
      bookmarked: false,
    },
    where: {
      id,
    },
    update: {
      reading: false,
      read: true,
    },
  });
}
export function markAsNotRead(id: books["id"]) {
  return prisma.books.update({
    where: {
      id,
    },
    data: {
      read: false,
    },
  });
}

export function markAsReading(
  id: books["id"],
  book_id: books["book_id"],
  user_id: books["user_id"]
) {
  if (!id) {
    return prisma.books.create({
      data: {
        user_id,
        book_id,
        read: false,
        reading: true,
        watching: false,
        bookmarked: false,
      },
    });
  }

  return prisma.books.upsert({
    create: {
      user_id,
      book_id,
      read: false,
      reading: true,
      watching: false,
      bookmarked: false,
    },
    where: {
      id,
    },
    update: {
      reading: true,
      read: false,
    },
  });
}

export function markAsNotReading(id: books["id"]) {
  return prisma.books.update({
    where: {
      id,
    },
    data: {
      reading: false,
    },
  });
}

export async function getAllRead(request: Request) {
  const session = await getSession(request);
  const { id } = session?.user;

  let bookmarks: Book[] = [];
  const bookIds = await prisma.profile.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  const usersBookmarks =
    bookIds?.books
      ?.filter((book) => book.read || book.reading)
      .map((book) => {
        const { id: buid, book_id: id, reading, read, bookmarked } = book;
        return { buid, id, reading, read, bookmarked };
      }) || [];

  if (usersBookmarks.length) {
    bookmarks = await getAllBooksmarkData(usersBookmarks);
  }

  return { userId: id, bookmarks };
}

export async function getBookmarks(request: Request) {
  const session = await getSession(request);
  const { id } = session?.user;

  let bookmarks: Book[] = [];
  const bookIds = await prisma.profile.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  const usersBookmarks =
    bookIds?.books
      ?.filter((book) => book.bookmarked)
      .map((book) => {
        const { id: buid, book_id: id, reading, read, bookmarked } = book;
        return { buid, id, reading, read, bookmarked };
      }) || [];

  if (usersBookmarks.length) {
    bookmarks = await getAllBooksmarkData(usersBookmarks);
  }

  return { userId: id, bookmarks };
}

export async function getUsersBookmarks(user_id: books["user_id"]) {
  const bookIds = await prisma.books.findMany({
    where: {
      user_id: user_id,
    },
  });

  const usersBookmarks =
    bookIds?.map((book) => {
      const { id: buid, book_id: id, reading, read, bookmarked } = book;

      return { buid, id, reading, read, bookmarked };
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

export async function fetchBookInfo(bookId: string): Promise<Book> {
  // TODO: Add error handling component for api requests
  const result = await fetch(`${config.API.BOOK}${bookId}`).then(
    (res) => res.json() as Promise<initialBook>
  );

  return initialBookData(result);
}

async function getAllBooksmarkData(bookmarkIds: usersBookmarks[]) {
  return Promise.all(
    bookmarkIds.map(async (book: books) => {
      const data = await fetchBookInfo(book.id);
      data.buid = book.buid;
      data.read = book.read;
      data.reading = book.reading;
      data.bookmarked = book.bookmarked;

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
