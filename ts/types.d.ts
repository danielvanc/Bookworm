// TODO: Seperate out types into their own apporpriate files

/**
 * @description Type for all ENV variables
 */
interface EnvVars {
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
interface User {
  id?: string;
  email?: string;
  full_name?: string;
  user_metadata?: { [key: string]: any };
}

/**
 * @description General type for error handling
 */
interface Errors {
  error: Boolean;
  message: string;
}

interface BooksFeed {
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
interface Book {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  reading: boolean;
  read: boolean;
  authors?: string[];
  publisher?: string;
  publishedDate?: string | number | Date;
  printedPageCount?: number;
  eBook?: boolean;
  price?: number;
  categories?: string[];
}

/**
 * @description initial minimum data return to create a new book
 */
interface initialBook {
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

interface usersBookmarks {
  buid: string;
  id: string;
  reading: boolean;
  read: boolean;
  bookmarked: boolean;
}

/**
 * @description Type for filtering books with users bookmarks
 */
interface BooksAndBookmarks {
  books: Book[];
  usersBookmarks: usersBookmarks[];
}

interface BookMarkItem {
  book: Book;
  usersBookmarks: usersBookmarks[];
  userId: string;
}

type BookPreviewDetails = Pick<Book, "id", "title" | "link" | "image">;

/**
 * @description Type for displaying books in a preview grid list
 */
type BookPreviewList = BookPreviewDetails[];

/**
 * @description Type for displaying singular book in grid list
 */
interface BookPreview {
  book: BookPreviewDetails;
  errors?: Errors;
}

interface TextualDropdownProps {
  title: string;
  description: string;
  type: string;
  action: string;
}
