import { Link } from "@remix-run/react";

export default function PreviewBookLarge({ book, errors }: BookPreview) {
  const { id, image, title } = book;

  return (
    <Link
      to={`/home/book/${id}`}
      className="relative flex min-w-[350px] overflow-auto rounded-2xl bg-grayWorm-100 hover:bg-grayWorm-800"
      prefetch="intent"
    >
      <div>
        <img
          src={image ? image : "/images/book-cover.png"}
          alt={title}
          className="mb-3 max-h-[438px] min-w-[350px] max-w-[350px] object-cover"
        />
        <div className="">
          <h3 className="mx-5 mt-5 w-full font-monty">{title}</h3>
          {errors && <p className="text-red-600">{errors?.message}</p>}
        </div>
      </div>
    </Link>
  );
}
