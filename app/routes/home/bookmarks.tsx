import PreviewListBookItem from "~/components/PreviewListBookItem";
import { useMatchesData, useUser } from "~/utils/user";

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
