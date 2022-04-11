import type { Book } from "remix.env";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FAILURE_REDIRECT, oAuthStrategy } from "~/auth/auth.server";
import OverviewList from "~/components/OverviewList";
import { getUsersLatestBookmarks } from "~/models/books.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: FAILURE_REDIRECT,
  });
  const { id } = session?.user!;
  const bookmarks = (await getUsersLatestBookmarks(id, 3)) || [];

  return bookmarks;
};

export default function OverviewIndex() {
  const data: Book[] = useLoaderData();
  return (
    <div className="md:flex md:w-full md:justify-between md:gap-4 md:p-sectionMedium">
      <div className="md:w-1/3">
        <h3>Bookmarked to read</h3>
        <OverviewList data={data} />
      </div>
      <div className="md:w-1/3">
        <h3>Currently reading</h3>
        {/* <OverviewList /> */}
      </div>
      <div className="md:w-1/3">
        <h3>Read</h3>
        {/* <OverviewList /> */}
      </div>
    </div>
  );
}
