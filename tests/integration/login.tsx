import type { Mock } from "vitest";
import { render } from "tests/utils";
import { loader } from "~/routes/login";
import LoginWithEmail from "~/components/LoginWithEmail";
import { getSession } from "~/auth/auth.server";
import { createCookieSessionStorage } from "@remix-run/node";
// import AuthenticateForm from "~/components/AuthenticateForm";

const path = "/login";

vi.mock("~/auth/client", () => {
  return {
    signInWithProvider: vi.fn(),
  };
});

vi.mock("~/auth/auth.server", () => {
  return {
    oAuthStrategy: {
      checkSession: vi.fn(),
    },
    getSession: vi.fn(),
    SUCCESS_REDIRECT: "/login",
  };
});

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "BKW",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [`${process.env.SESSION_SECRET}`],
    secure: process.env.NODE_ENV === "production",
  },
});

test("renders loginWithEmail form with required fields", async () => {
  const { getByRole } = render(path, <LoginWithEmail />);

  const emailInput = getByRole("textbox", { name: /email address/i });
  const submitButton = getByRole("button", { name: /request a login link/i });
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute("type", "email");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveTextContent(/request a login link/i);
});

// TODO: Create e2e test for social login
// test("renders social login form and includes all login methods", () => {

// const socialHeading = /or sign in with:/i;
// const { getByRole, debug } = render(path, <AuthenticateForm error={{}} />);
// expect(
//   getByRole("heading", { name: socialHeading })
// ).toBeInTheDocument();
// expect(getByRole("button", { name: /google/i })).toBeInTheDocument();
// expect(getByRole("button", { name: /github/i })).toBeInTheDocument();
// expect(getByRole("button", { name: /facebook/i })).toBeInTheDocument();
// expect(getByRole("button", { name: /twitter/i })).toBeInTheDocument();

//   debug();
// });

test("should return a response", async () => {
  let session = await sessionStorage.getSession();
  (getSession as Mock).mockReturnValueOnce({
    session,
    error: null,
    response: {
      headers: {
        cookie: await sessionStorage.commitSession(session),
      },
    },
  });

  const response = await loader({
    request: new Request("http://localhost:3000/login"),
    params: {},
    context: {},
  });

  expect(response).toBeInstanceOf(Response);
});

test.todo("returns user object if users logged in");
test.todo("logs user out");
