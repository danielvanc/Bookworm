import { useLoaderData, redirect } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import BookList from "~/components/BookLIst";

export async function loader() {
  let result = await fetch(
    'https://www.googleapis.com/books/v1/volumes?q="&maxResults=2'
  );

  return result.json();
}

export default function home() {
  const data = useLoaderData();
  console.log("data", data);

  <BookList books={data.items} />;
  return <div>hi</div>;
}
