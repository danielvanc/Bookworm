import type { LoaderArgs } from "@remix-run/node";
import { oAuthStrategy, FAILURE_REDIRECT } from "~/auth/auth.server";
import { useUser, useMatchesData } from "~/utils/user";
import PreviewListBookItem from "~/components/PreviewListBookItem";

export const loader = async ({ request }: LoaderArgs) => {
  await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });

  return null;
};

export default function Reading() {
  const { id: userId } = useUser();
  const { usersBookmarks } = useMatchesData("routes/home") as {
    usersBookmarks: Book[];
  };
  const booksReading = usersBookmarks.filter((book) => book.read);

  return (
    <div className="md:p-sectionMedium">
      <h1 className="font-monty text-2xl md:mb-10">Read!</h1>

      <ul className="relative my-3 flex flex-wrap gap-6">
        {booksReading.map((book) => {
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
