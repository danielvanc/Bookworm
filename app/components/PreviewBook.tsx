import { Link } from "@remix-run/react";

export default function PreviewBook({ book, errors }: BookPreview) {
  const { id, image, title } = book;

  return (
    <Link
      to={`/home/book/${id}`}
      className="relative flex min-w-[350px] items-center justify-center rounded-lg bg-grayWorm-100 py-5 hover:bg-grayWorm-800"
      prefetch="intent"
    >
      <div>
        {/* TODO: Provide fallback image if no image provided */}
        <div className="max-w-[130px]">
          <img src={image} alt={title} className="mb-3 rounded-lg" />
          <h3 className="font-monty">{title}</h3>
          {errors && <p className="text-red-600">{errors?.message}</p>}
        </div>
      </div>
    </Link>
  );
}
