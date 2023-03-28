import type { Mock } from "vitest";
import { render, screen, renderHook } from "@testing-library/react";
import { unstable_createRemixStub } from "@remix-run/testing";
import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import "whatwg-fetch";
import { useUser } from "~/utils/user";
import { getLatestBooks } from "~/models/books.server";
import { buildBookList } from "mocks/books";
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
  const mockedUser = (useUser as Mock).mockImplementation(() => ({
    id: "0",
  }));

  renderHook(useUser);

  const mockBooks = mockedGetLatestBooks();

  function DiscoverPanel() {
    const { books } = useLoaderData();
    return <Discover books={books} usersBookmarks={[]} />;
  }

  let RemixStub = unstable_createRemixStub([
    {
      path: "/home",
      element: <Outlet />,
      children: [
        {
          path: "/home",
          element: <DiscoverPanel />,
          loader() {
            return json({ books: mockBooks });
          },
        },
      ],
    },
  ]);

  render(<RemixStub initialEntries={["/home"]} />);

  expect(await screen.findByTestId("data")).toBeInTheDocument();
  expect(mockedUser).toHaveBeenCalledTimes(2);
  expect(mockedGetLatestBooks).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByRole("list")).toHaveTextContent(mockBooks[0].title);
  expect(screen.getAllByRole("listitem")).toHaveLength(maxResults);
});
