import { rest } from "msw";

// const apiUrl = process.env.SUPABASE_URL;

export const handlers = [
  rest.get(
    // "https://krekwxrqxuanfzvhohvo.supabase.co",
    "/home",
    async (req, res, ctx) => {
      console.log("Found it!");
      return res(ctx.status(200), ctx.json({ message: "from msw" }));
    }
  ),
];
