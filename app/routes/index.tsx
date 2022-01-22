import BookList from "~/components/BookLIst";
import Page from "~/components/Page";
import { useAuth } from "~/contexts/auth";

export default function Index() {
  const { logout } = useAuth();
  return (
    <Page>
      <h1>Home</h1>
      <BookList />

      <button onClick={logout}>Logout</button>
    </Page>
  );
}
