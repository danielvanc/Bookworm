/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

/**
 * @description Type for all ENV variables
 */
export interface EnvVars {
  ENV: {
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
    SESSION_SECRET: string;
    APP_ENV;
  };
}

/**
 * @description Type for all User information
 */
export interface User {
  id?: string;
  email?: string;
  full_name?: string;
  user_metadata?: { [key: string]: any };
}

/**
 * @description General type for error handling
 */
export interface Errors {
  error: Boolean;
  message: string;
}

export interface BooksFeed {
  items: Array<{
    id: string;
    volumeInfo: {
      title: string;
      description: string;
      imageLinks: {
        thumbnail: string;
      };
      canonicalVolumeLink: string;
    };
  }>;
}

/**
 * @description Minimum data to create a new book
 */
export interface Book {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

/**
 * @description initial minimum data return to create a new book
 */
export interface initialBook {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
    canonicalVolumeLink: string;
  };
}

export type usersBookmarks = string[];

/**
 * @description Type for filtering books with users bookmarks
 */
export interface BooksAndBookmarks {
  books: Book[];
  usersBookmarks: usersBookmarks;
}

export interface BookMarkItem {
  book: Book;
  usersBookmarks: usersBookmarks;
  userId: string;
}

export type BookPreviewDetails = Pick<Book, "id", "title" | "link" | "image">;

/**
 * @description Type for displaying books in a preview grid list
 */
export type BookPreviewList = BookPreviewDetails[];

/**
 * @description Type for displaying singular book in grid list
 */
export interface BookPreview {
  book: BookPreviewDetails;
  errors?: Errors;
}
