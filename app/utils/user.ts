import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

export function useMatchesData(id: string) {
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
  if (!data?.session?.user || !isUser(data?.session?.user)) return {};

  const { id, email, user_metadata } = data.session.user;

  return { id, email, user_metadata };
}
