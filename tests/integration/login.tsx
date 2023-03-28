import { render } from "tests/utils";
import LoginWithEmail from "~/components/LoginWithEmail";
// import AuthenticateForm from "~/components/AuthenticateForm";

// const socialHeading = /or sign in with:/i;

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
  };
});

// const sessionStorage = createCookieSessionStorage({
//   cookie: {
//     name: "BKW",
//     httpOnly: true,
//     path: "/",
//     sameSite: "lax",
//     secrets: [`${process.env.SESSION_SECRET}`],
//     secure: process.env.NODE_ENV === "production",
//   },
// });

test("renders loginWithEmail form with required fields", async () => {
  const { getByRole } = render("/login", <LoginWithEmail />);

  const emailInput = getByRole("textbox", { name: /email address/i });
  const submitButton = getByRole("button", { name: /request a login link/i });
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute("type", "email");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveTextContent(/request a login link/i);
});

test.todo(
  "renders social login form and includes all login methods"
  // render(<AuthenticateForm error={{}} />);
  // expect(
  //   screen.getByRole("heading", { name: socialHeading })
  // ).toBeInTheDocument();
  // expect(screen.getByRole("button", { name: /google/i })).toBeInTheDocument();
  // expect(screen.getByRole("button", { name: /github/i })).toBeInTheDocument();
  // expect(screen.getByRole("button", { name: /facebook/i })).toBeInTheDocument();
  // expect(screen.getByRole("button", { name: /twitter/i })).toBeInTheDocument();
);

// test("returns status of 200 if not logged in", async () => {
//   let session = await sessionStorage.getSession();

//   const request = new Request("/login", {
//     headers: { cookie: await sessionStorage.commitSession(session) },
//   });

//   const response = await loader({ request, params: {}, context: {} });

//   expect(response.status).toBe(200);
// });

test.todo("returns user object if users logged in");
test.todo("logs user out");
