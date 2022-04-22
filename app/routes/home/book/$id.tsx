import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  return {};
};

export default function Book() {
  return <div>Book</div>;
}
