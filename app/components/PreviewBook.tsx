import { Link } from "@remix-run/react";

export default function PreviewBook({ book, errors }: BookPreview) {
  const { id, image, title } = book;

  return (
    <Link to={`/home/book/${id}`} className="inline-block" prefetch="intent">
      <img
        src={image ? image : "/images/book-cover.png"}
        alt={title}
        className="my-3 min-w-[15vw] shadow-md shadow-slate-800"
      />
    </Link>
  );
}
