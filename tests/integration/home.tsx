import type { Mock } from "vitest";
import { render, screen, renderHook, useLoaderData, Outlet } from "tests/utils";
import { json } from "@remix-run/node";
import "whatwg-fetch";
import { useUser } from "~/utils/user";
import { getLatestBooks } from "~/models/books.server";
import { buildBookList } from "tests/mocks/books";
import Discover from "~/components/Discover";

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock("~/utils/user.ts", () => ({
  useUser: vi.fn(),
}));

vi.mock("~/models/books.server.ts", () => ({
  getLatestBooks: vi.fn(),
}));

test("render a list of books", async () => {
  const maxResults = 2;
  const mockedGetLatestBooks = (getLatestBooks as Mock).mockImplementation(() =>
    buildBookList(maxResults)
  );
  const mockBooks = mockedGetLatestBooks();
  const mockedUser = (useUser as Mock).mockImplementation(() => ({
    id: "0",
  }));
  const firstTitle = mockBooks[0].title;

  function DiscoverPanel() {
    const { books } = useLoaderData<BooksAndBookmarks>();
    return <Discover books={books} usersBookmarks={[]} />;
  }

  const children = [
    {
      path: "/home",
      element: <DiscoverPanel />,
      loader() {
        return json({ books: mockBooks });
      },
    },
  ];

  renderHook(useUser);

  render("/home", <Outlet />, children);

  expect(await screen.findByTestId("data")).toBeInTheDocument();
  expect(mockedUser).toHaveBeenCalledTimes(2);
  expect(mockedGetLatestBooks).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByRole("list")).toHaveTextContent(firstTitle);
  expect(screen.getAllByRole("listitem")).toHaveLength(maxResults);
});
