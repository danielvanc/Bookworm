import * as React from "react";
import { render, screen } from "@testing-library/react";
import { server } from "../../mocks/setup";
import { createCookieSessionStorage } from "@remix-run/node";
import { Request } from "@remix-run/node";
import { loader } from "~/routes/login";
import LoginWithEmail from "../components/LoginWithEmail";
import AuthenticateForm from "../components/AuthenticateForm";

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

const socialHeading = /or sign in with:/i;

jest.mock("../supabase/supabase.client", () => {
  return {
    signInWithProvider: jest.fn(),
  };
});

jest.mock("../auth/auth.server", () => {
  return {
    oAuthStrategy: {
      checkSession: jest.fn(),
    },
  };
});

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("renders loginWithEmail form with required fields", async () => {
  await render(<LoginWithEmail />);

  const emailInput = screen.getByRole("textbox", { name: /email address/i });
  const passwordInput = screen.getByLabelText(/password/i);

  expect(emailInput).toBeInTheDocument();
  expect(
    screen.getByRole("textbox", { name: /email address/i })
  ).toBeRequired();

  expect(passwordInput).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});

test("renders social login form and includes all login methods", async () => {
  render(<AuthenticateForm error={{}} />);

  expect(
    screen.getByRole("heading", { name: socialHeading })
  ).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /google/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /github/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /facebook/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /twitter/i })).toBeInTheDocument();
});

test("returns status of 200 if not logged in", async () => {
  let session = await sessionStorage.getSession();

  const request = new Request("/login", {
    headers: { cookie: await sessionStorage.commitSession(session) },
  });

  const response = await loader({ request, params: {}, context: {} });

  expect(response.status).toBe(200);
});

test.todo("returns user object if users logged in");
test.todo("logs user out");
