import React from "react";
import { Form } from "remix";
import { signInWithProvider } from "~/supabase/supabase.client";
import { FaTwitter, FaFacebookF, FaGithub } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";

type LoaderData = {
  error: { message: string } | null;
};

export default function AuthenticateForm({ error }: LoaderData) {
  const [showSignIn, setShowSignIn] = React.useState(true);

  return (
    <div className="mb-10 rounded-lg border-[1px] bg-white p-5 shadow-lg xl:mr-10 xl:mt-10">
      <h2 className="mb-5 text-center font-fred text-2xl uppercase tracking-widest">
        Sign in
      </h2>
      <div>
        {/* TODO: #1 Add better U.I styling for error response */}
        {error && <div>{error.message}</div>}
        <ul className="social-logins mx-auto flex max-w-[300px] justify-between">
          <li>
            <button
              aria-label="Google"
              onClick={() => signInWithProvider("google")}
            >
              <AiOutlineGoogle className="text-lg lm:text-xl md:text-2xl" />
            </button>
          </li>
          <li>
            <button
              aria-label="Twitter"
              onClick={() => signInWithProvider("twitter")}
            >
              <FaTwitter className="text-lg lm:text-xl md:text-2xl" />
            </button>
          </li>
          <li>
            <button
              aria-label="Facebook"
              onClick={() => signInWithProvider("facebook")}
            >
              <FaFacebookF className="text-lg lm:text-xl md:text-2xl" />
            </button>
          </li>
          <li>
            <button
              aria-label="Github"
              onClick={() => signInWithProvider("github")}
            >
              <FaGithub className="text-lg lm:text-xl md:text-2xl" />
            </button>
          </li>
        </ul>
        <Form
          method="post"
          action="/"
          className="my-5 mx-auto max-w-[450px] py-5"
        >
          {showSignIn ? (
            <>
              <h3 className="relative mb-5 text-center text-xs uppercase tracking-widest before:absolute before:left-0 before:right-0 before:bottom-[8px] before:z-[-1] before:block before:border-t-[1px] before:border-gray-200">
                <span className="bg-white px-3">Sign in with email</span>
              </h3>
              <div className="flex w-full flex-col xl:flex-row xl:justify-between">
                <input
                  className="input focus:shadow-outline mb-3 focus:outline-none xl:mb-0 xl:max-w-[38%]"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Add your email"
                />
                <input
                  className="input mb-3 xl:mb-0 xl:max-w-[38%]"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Add your Password"
                />
                <button
                  name="_action"
                  value="signin"
                  className="btn px-4 pt-2 pb-1 xl:max-w-[35%]"
                >
                  Sign in
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="relative mb-5 text-center text-xs uppercase tracking-widest before:absolute before:left-0 before:right-0 before:bottom-[8px] before:z-[-1] before:block before:border-t-[1px] before:border-gray-200">
                <span className="bg-white px-3">
                  Sign {showSignIn ? "in" : "up"} with email
                </span>
              </h3>
              <div className="flex w-full flex-col xl:flex-row xl:justify-between">
                <input
                  className="input focus:shadow-outline mb-3 focus:outline-none xl:mb-0 xl:max-w-[38%]"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Add your email"
                />
                <input
                  className="input mb-3 xl:mb-0 xl:max-w-[38%]"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Add your Password"
                />
                <button
                  name="_action"
                  value="signup"
                  className="btn px-4 pt-2 pb-1 xl:max-w-[35%]"
                >
                  Sign up!
                </button>
              </div>
            </>
          )}
        </Form>

        <p className="text-center text-sm font-bold">
          {showSignIn ? (
            <>
              Don't have an account yet?{" "}
              <button onClick={() => setShowSignIn(false)}>Sign up!</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setShowSignIn(true)}>Sign in!</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
