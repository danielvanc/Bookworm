import * as React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import LoginWithEmail from "../components/LoginWithEmail";
import AuthenticateForm from "../components/AuthenticateForm";

const socialHeading = /or sign in with:/i;

jest.mock("../supabase/supabase.client", () => {
  return {
    signInWithProvider: jest.fn(),
  };
});

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

  // userEvent.type(emailInput, "dan vc");
  // userEvent.type(passwordInput, "no password required");

  // screen.debug();
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
