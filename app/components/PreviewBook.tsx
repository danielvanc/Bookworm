import type { BookPreview } from "../../remix.env";
import { Link } from "remix";

export default function PreviewBook({ book }: BookPreview) {
  const { id, image, title } = book;

  return (
    <Link
      to={`/home/discover/${id}`}
      className="relative flex min-w-[350px] items-center justify-center rounded-lg bg-grayWorm-100 py-5 hover:bg-grayWorm-800"
    >
      <div>
        {/* TODO: Provide fallback image if no image provided */}
        <div className="max-w-[130px]">
          <img src={image} alt={title} className="mb-3 rounded-lg" />
          <h3 className="font-monty">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
