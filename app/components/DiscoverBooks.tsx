import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = async () => {
  throw new Response("Not Found", { status: 404 });
};

export default function BookList() {
  return (
    <div className="h-[50vh] bg-grayWorm-200 md:p-sectionMedium">
      <hr />
      <h1>Discover new books!</h1>
    </div>
  );
}
