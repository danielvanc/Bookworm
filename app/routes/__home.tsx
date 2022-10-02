import { Outlet, useTransition } from "@remix-run/react";
import TabNavigation from "~/components/TabNavigation";
import PreviewBookItemSkeleton from "../components/LoadingUI/PreviewBookItemSkeleton";

const tabs = [
  { name: "Discover", href: "home", current: true },
  { name: "Bookmarked", href: "bookmarks", current: false },
  { name: "Read / Reading", href: "read", current: false },
];

export default function HomeOverview() {
  const transition = useTransition();
  const isLoading = transition?.state !== "idle";

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
