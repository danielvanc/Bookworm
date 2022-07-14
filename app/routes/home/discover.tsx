import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { oAuthStrategy, FAILURE_REDIRECT } from "~/auth/auth.server";
import { getLatestBooks } from "~/models/books.server";
import { useUser } from "~/utils/user";
import PreviewListBookItem from "~/components/PreviewListBookItem";

// TODO: Add paginated results

export const loader = async ({ request }: LoaderArgs) => {
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });
  const { id } = session?.user!;
  const data = await getLatestBooks(id, 25);

  return json(data);
};

export default function Discover() {
  const { id: userId } = useUser();
  const { books, usersBookmarks } = useLoaderData<typeof loader>();

  return (
    <div className="md:p-sectionMedium">
      <hr />
      <h1 className="font-monty text-2xl md:mb-10">Discover!</h1>

      <ul className="relative my-3 flex flex-wrap gap-6">
        {books.map((book) => {
          return (
            <PreviewListBookItem
              key={book.id}
              book={book}
              usersBookmarks={usersBookmarks}
              userId={String(userId)}
            />
          );
        })}
      </ul>
    </div>
  );
}
