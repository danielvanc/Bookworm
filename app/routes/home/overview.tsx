import { Outlet } from "remix";
import DiscoverBooks from "~/components/DiscoverBooks";

export default function Overview() {
  return (
    <>
      <DiscoverBooks />
      <Outlet />
    </>
  );
}
