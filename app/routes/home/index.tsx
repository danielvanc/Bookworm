import { Outlet, redirect } from "remix";

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
