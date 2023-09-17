import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as React from "react";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRevalidator,
} from "@remix-run/react";
import {
  createBookmark,
  markAsNotRead,
  markAsNotReading,
  markAsRead,
  markAsReading,
  removeBookmark,
} from "~/models/books.server";
import { FAILURE_REDIRECT, getSession } from "~/auth/auth.server";
import TabNavigation from "~/components/TabNavigation";
import PreviewBookItemSkeleton from "~/components/LoadingUI/PreviewBookItemSkeleton";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

const tabs = [
  { name: "Discover", href: "/home", current: true },
  { name: "Bookmarked", href: "bookmarks", current: false },
  { name: "Read / Reading", href: "read", current: false },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const userId = formData.get("user_id")?.toString() ?? "";
  const bookId = formData.get("book_id")?.toString() ?? "";
  const buid = formData.get("buid")?.toString() ?? "";

  const action = formData.get("_action");

  const isAddingBookmark = action === "create";
  const isRemovingBookmark = action === "remove-bookmark";

  const isReading = action === "reading";
  const isNotReading = action === "remove-reading";

  const isRead = action === "read";
  const isNotRead = action === "remove-read";

  const addingBookmarkError = `Error adding bookmark. Please retry`;
  const removingBookmarkError = `Error removing bookmark. Please retry.`;
  const isReadingError = `Error marking book as reading. Please retry`;
  const isNotReadingError = `Error marking book as not reading. Please retry`;

  const isReadError = `Error marking book as read. Please retry.`;
  const isNotReadError = `Error marking book as not finished. Please retry`;

  let errorMessage = "";
  let successMessage = "";
  let errors = { error: true, action };

  try {
    if (isAddingBookmark) {
      errorMessage = addingBookmarkError;
      successMessage = "Successfully added to your bookmarks!";

      await createBookmark(buid, bookId, userId);
    }

    if (isRemovingBookmark) {
      errorMessage = removingBookmarkError;
      successMessage = "Successfully removed from your bookmarks!";

      await removeBookmark(buid);
    }

    if (isReading) {
      errorMessage = isReadingError;
      successMessage = "Successfully marked as reading!";

      await markAsReading(buid, bookId, userId);
    }

    if (isNotReading) {
      errorMessage = isNotReadingError;
      successMessage = "Successfully marked as not reading!";

      await markAsNotReading(buid);
    }

    if (isRead) {
      errorMessage = isReadError;
      successMessage = "Successfully marked as read!";

      await markAsRead(buid, bookId, userId);
    }

    if (isNotRead) {
      errorMessage = isNotReadError;
      successMessage = "Successfully marked as not finished!";

      await markAsNotRead(buid);
    }

    return json({ status: 200, message: successMessage, id: buid || bookId });
  } catch (e) {
    return {
      ...errors,
      errorMessage,
    };
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, error, response } = await getSession(request);
  if (!session?.user) return redirect(FAILURE_REDIRECT);

  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_KEY: process.env.SUPABASE_KEY!,
  };

  return json({
    env,
    session,
    error,
    headers: response.headers,
  });
};

export default function Home() {
  const { env, session } = useLoaderData<typeof loader>();
  const transition = useNavigation();
  const refreshFetcher = useFetcher();
  const paths = ["/home", "/bookmarks", "/read"];
  const isLoading =
    transition?.state === "loading" &&
    paths.includes(transition.location.pathname);

  const { revalidate } = useRevalidator();

  const [supabase] = React.useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_KEY)
  );

  const serverAccessToken = session?.access_token;

  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        session?.access_token !== serverAccessToken &&
        refreshFetcher.state === "idle"
      ) {
        revalidate();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshFetcher, revalidate, serverAccessToken, supabase]);

  return (
    <>
      <TabNavigation
        tabs={tabs}
        optimisticPath={transition?.location?.pathname}
      />
      <div className="mt-4">
        {isLoading ? <PreviewBookItemSkeleton /> : <Outlet />}
      </div>
    </>
  );
}
