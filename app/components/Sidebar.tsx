import PreviewBookLarge from "./PreviewBookLarge";

interface BookProps {
  data: usersBookmarks[];
}

export default function Sidebar({ data }: BookProps) {
  const currentlyReading = data.filter((book) => book.reading);
  const readingLatest = [...currentlyReading].reverse()[0];

  return (
    <div className="md:p-sectionMedium">
      <h2 className="font-monty text-xl">Recently set as reading</h2>
      <PreviewBookLarge book={readingLatest} />
    </div>
  );
}
