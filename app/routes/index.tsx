import BookList from "~/components/BookLIst";
import Page from "~/components/Page";
import { useAuth } from "~/contexts/auth";
import { PrismaClient } from "@prisma/client";
import { useLoaderData } from "remix";

export async function loader() {
  const prisma = new PrismaClient();
  const allUsers = await prisma.profile.findMany();
  return { allUsers };
}

export default function Index() {
  const { logout } = useAuth();
  // const { allUsers } = useLoaderData();
  return (
    <Page>
      <h1>Home</h1>
      <BookList />

      <button onClick={logout}>Logout</button>
    </Page>
  );
}
