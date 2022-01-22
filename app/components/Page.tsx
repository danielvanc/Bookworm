import { ReactNode } from "react";
import Unauthenticated from "./Unauthenticated";

type PageProps = {
  children: ReactNode;
};

export default function Page({ children }: PageProps) {
  return <Unauthenticated />;
  return <div>{children}</div>;
}
