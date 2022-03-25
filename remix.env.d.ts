/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

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

export type BookPreviewDetails = Pick<Book, "id", "title" | "link" | "image">;

export type BookPreviewList = BookPreviewDetails[];

export interface BookPreview {
  book: BookPreviewDetails;
}
