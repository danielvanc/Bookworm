interface IMeta {
  title?: string;
  description?: string;
  keywords?: string;
  // image?: string;
}

export function getMetaInfo({
  title = "Bookworm - Read more!",
  description = "The Bookapp for book lovers",
  keywords = "books, book, reading",
}: // image,
IMeta) {
  return {
    title,
    description,
    keywords,
    // image,
  };
}
