/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

export interface User {
  id?: string;
  email?: string;
  full_name?: string;
  user_metadata?: { [key: string]: any };
}
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

export interface Book {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

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

export interface BookMarkItem {
  book: Book;
  usersBookmarks: any;
  userId: string;
}

export type BookPreviewDetails = Pick<Book, "id", "title" | "link" | "image">;

export type BookPreviewList = BookPreviewDetails[];

export interface BookPreview {
  book: BookPreviewDetails;
  errors?: Errors;
}
