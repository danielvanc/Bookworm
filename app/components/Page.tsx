import type { ReactNode } from "react";
import { useAuth } from "~/contexts/auth";
import Unauthenticated from "./Unauthenticated";
interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  const { user } = useAuth();

  if (!user) return <Unauthenticated />;

  return <div>{children}</div>;
}
