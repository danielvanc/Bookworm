import fetch from "node-fetch";
import config from "~/config";
import { getLatestBooks } from "~/models/books.server";
// import { buildBookList } from "../../test/generate";

jest.mock("../models/books.server.ts", () => {
  return {
    getLatestBooks: jest.fn(),
  };
});

test("render a list of books", async () => {
  const api = `${config.API.ALL_BOOKS}""&maxResults=10`;
  // @ts-ignore
  await getLatestBooks.mockResolvedValueOnce(
    fetch(api).then((res) => res.json())
  );

  // TODO: Render booklist component with books
});
