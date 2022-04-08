import { useMatches } from "@remix-run/react";
import type { User } from "../../remix.env";
import { useMemo } from "react";

function useMatchesData(id: string) {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any) {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useUser(): User {
  const data = useMatchesData("root");
  if (!data?.user || !isUser(data.user)) {
    return {};
  }

  return {
    id: data.user.id,
    email: data.user.email,
    user_metadata: data.user.user_metadata,
  };
}
