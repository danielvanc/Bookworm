import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { oAuthStrategy, FAILURE_REDIRECT } from "~/auth/auth.server";
import { fetchBookInfo } from "~/models/books.server";

export async function loader({ request, params }: LoaderArgs) {
  await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });
  const { id } = params;

  invariant(id, "id is required");

  const data = await fetchBookInfo(id);

  return json(data);
}

export default function Book() {
  const { description, image, link, title } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{title}</h1>
      <img src={image} alt={title} />
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
      <p>
        <a href={link}>View more information</a>
      </p>
    </div>
  );
}

export function CatchBoundary() {
  return <div>CatchBoundary</div>;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Oh no, no book id was provided!</h1>
      <pre>{error.message}</pre>
    </>
  );
}
