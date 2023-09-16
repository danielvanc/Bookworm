// TODO: Fix these type issues
// @ts-nocheck
import type { books } from "@prisma/client";
import { saveToRedis, getCacheData } from "../utils/redis.server";
import { prisma } from "~/utils/prisma.server";
import config from "~/config";

const initialBookData = (data: initialBook) => ({
  id: data.id,
  title: data.volumeInfo?.title,
  description: data.volumeInfo?.description,
  image: data.volumeInfo?.imageLinks?.thumbnail,
  link: data.volumeInfo?.previewLink,
  authors: data.volumeInfo?.authors,
  publisher: data.volumeInfo?.publisher,
  publishedDate: data.volumeInfo?.publishedDate,
  printedPageCount: data.volumeInfo?.printedPageCount,
  categories: data.volumeInfo?.categories,
  eBook: data.saleInfo?.isEbook,
  price: data.saleInfo?.retailPrice?.amount,
});

export async function createBookmark(
  id: books["id"],
  book_id: books["book_id"],
  user_id: books["user_id"]
) {
  if (!id) {
    return await prisma.books.create({
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

  return await prisma.books.update({
    where: {
      id,
    },
    data: {
      bookmarked: true,
    },
  });
}

export async function removeBookmark(book_id: books["id"]) {
  return await prisma.books.update({
    where: {
      id: book_id,
    },
    data: {
      bookmarked: false,
    },
  });
}

export async function markAsRead(
  id: books["id"],
  book_id: books["book_id"],
  user_id: books["user_id"]
) {
  if (!id) {
    return await prisma.books.create({
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

  return await prisma.books.upsert({
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
export async function markAsNotRead(id: books["id"]) {
  return await prisma.books.update({
    where: {
      id,
    },
    data: {
      read: false,
    },
  });
}

export async function markAsReading(
  id: books["id"],
  book_id: books["book_id"],
  user_id: books["user_id"]
) {
  if (!id) {
    return await prisma.books.create({
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

  return await prisma.books.upsert({
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

export async function markAsNotReading(id: books["id"]) {
  return await prisma.books.update({
    where: {
      id,
    },
    data: {
      reading: false,
    },
  });
}

export async function getAllRead(id: string) {
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
        const { id: buid, book_id, reading, read, bookmarked } = book;
        return { buid, book_id, reading, read, bookmarked };
      }) || [];

  if (usersBookmarks.length) {
    bookmarks = await getAllBooksmarkData(usersBookmarks);
  }

  return { userId: id, bookmarks };
}

export async function getBookmarks(id: string) {
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
        const { id: buid, book_id, reading, read, bookmarked } = book;
        return { buid, book_id, reading, read, bookmarked };
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
      const { id: buid, book_id, reading, read, bookmarked } = book;
      return { buid, book_id, reading, read, bookmarked };
    }) || [];
  return usersBookmarks;
}

export async function getLatestBooks(userId: books["user_id"], total: number) {
  const api = `${config.API.ALL_BOOKS}""&maxResults=${total}` || "";
  let latestBooks;
  let usersBookmarks: Book[] = [];
  let cacheEntry = await getCacheData("home-latest-books");

  if (cacheEntry) {
    const c0 = new Date().getTime();
    const parsedCache = JSON.parse(cacheEntry).filter(
      (item) => !item.source && !item.responseTime
    );
    const c1 = new Date().getTime();
    latestBooks = [
      ...parsedCache,
      { source: "cache" },
      { responseTime: `${c1 - c0}ms` },
    ];
  } else {
    const t0 = new Date().getTime();
    const data: BooksFeed = await fetch(api).then((res) => res.json());
    const t1 = new Date().getTime();
    const books: Book[] = data?.items?.map((book) => initialBookData(book));
    const allBooks = [...books];
    allBooks.push({ source: "api" });
    latestBooks = [...allBooks, { responseTime: `${t1 - t0}ms` }];
    saveToRedis("home-latest-books", latestBooks);
  }

  const bookmarkIds = await getUsersBookmarks(userId);

  if (bookmarkIds.length) {
    usersBookmarks = await getAllBooksmarkData(bookmarkIds);
  }

  return { books: latestBooks, usersBookmarks };
}

export async function fetchBookInfo(bookId: string): Promise<Book> {
  // TODO: Add error handling component for api requests
  const result = await fetch(`${config.API.BOOK}${bookId}`).then(
    (res) => res.json() as Promise<initialBook>
  );

  return initialBookData(result);
}

async function getAllBooksmarkData(bookmarkIds: usersBookmarks[]) {
  return await Promise.all(
    bookmarkIds.map(async (book: books) => {
      const data = await fetchBookInfo(book.book_id);
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
