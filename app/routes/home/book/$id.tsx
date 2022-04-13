import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  console.log("Loading data...");

  return {};
};

export default function Book() {
  return <div>Book</div>;
}
