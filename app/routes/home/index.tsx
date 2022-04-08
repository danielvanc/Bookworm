import { Outlet } from "@remix-run/react";
import { redirect } from "@remix-run/node";

export function loader() {
  return redirect("/home/overview");
}

export default function HomeOverview() {
  return (
    <>
      <Outlet />
    </>
  );
}
