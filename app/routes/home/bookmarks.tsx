import type { LoaderArgs } from "@remix-run/node";
import { useMatchesData, useUser } from "~/utils/user";
import { oAuthStrategy, FAILURE_REDIRECT } from "~/auth/auth.server";
import PreviewListBookItem from "~/components/PreviewListBookItem";

export const loader = async ({ request }: LoaderArgs) => {
  await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });

  return null;
};

export default function Bookmarks() {
  const { id: userId } = useUser();
  const { usersBookmarks } = useMatchesData("routes/home") as {
    usersBookmarks: Book[];
  };

  return (
    <div className="md:p-sectionMedium">
      <h1 className="font-monty text-2xl md:mb-10">Your Bookmarks</h1>

      <ul className="relative my-3 flex flex-wrap gap-6">
        {usersBookmarks.map((book) => {
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
