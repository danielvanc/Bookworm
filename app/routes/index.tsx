import BookList from "~/components/BookLIst";
import Page from "~/components/Page";

export default function Index() {
  return (
    <Page>
      <h1>Home</h1>
      <BookList />
    </Page>
  );
}
