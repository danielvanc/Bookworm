import { rest } from "msw";
import { buildBookList } from "./books";

export const handlers = [
  rest.get(
    "https://www.googleapis.com/books/v1/volumes",
    async (req, res, ctx) => {
      // const total = req.url.search.split("=")[2];
      const books = buildBookList();

      return res(ctx.status(200), ctx.json({ books }));
    }
  ),
];
