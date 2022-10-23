import { rest } from "msw";
import * as booksDB from "../test/data/books";

export const handlers = [
  rest.get("///books/v1/volumes", async (req, res, ctx) => {
    const total = req.url.search.split("=")[2];

    const allBooks = await booksDB.getBooks(Number(total));

    return res(ctx.status(200), ctx.json({ books: allBooks }));
  }),
];
