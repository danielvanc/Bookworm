import { Link } from "@remix-run/react";

export default function PreviewBookSmall({ book, errors }: BookPreview) {
  const { id, image, title } = book;

  return (
    <Link
      to={`/home/book/${id}`}
      className="relative my-4 flex min-w-[350px]  items-center overflow-auto rounded-xl bg-grayWorm-300/5 hover:bg-grayWorm-800"
      prefetch="intent"
    >
      <div className="flex gap-3">
        <img
          src={image ? image : "/images/book-cover.png"}
          alt={title}
          className="max-h-[172px]"
        />
        <div className="py-5 pr-5">
          <h3>{title}</h3>
          {errors && <p className="text-red-600">{errors?.message}</p>}
        </div>
      </div>
    </Link>
  );
}
