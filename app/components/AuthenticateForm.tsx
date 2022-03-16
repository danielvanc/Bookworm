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
    <div className="border-[1px] rounded-lg bg-white shadow-lg p-5 xl:mr-10 mb-10 xl:mt-10">
      <h2 className="text-center text-2xl font-fred uppercase tracking-widest mb-5">
        Sign in
      </h2>
      <div>
        {/* TODO: #1 Add better U.I styling for error response */}
        {error && <div>{error.message}</div>}
        <ul className="flex justify-between max-w-[300px] mx-auto social-logins">
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
          action="/welcome"
          className="my-5 py-5 max-w-[450px] mx-auto"
        >
          {showSignIn ? (
            <>
              <h3 className="relative text-xs uppercase tracking-widest text-center mb-5 before:border-t-[1px] before:border-gray-200 before:block before:absolute before:left-0 before:right-0 before:bottom-[8px] before:z-[-1]">
                <span className="bg-white px-3">Sign in with email</span>
              </h3>
              <div className="flex flex-col xl:flex-row w-full xl:justify-between">
                <input
                  className="input xl:max-w-[38%] mb-3 xl:mb-0 focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Add your email"
                />
                <input
                  className="input xl:max-w-[38%] mb-3 xl:mb-0"
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
              <h3 className="relative text-xs uppercase tracking-widest text-center mb-5 before:border-t-[1px] before:border-gray-200 before:block before:absolute before:left-0 before:right-0 before:bottom-[8px] before:z-[-1]">
                <span className="bg-white px-3">
                  Sign {showSignIn ? "in" : "up"} with email
                </span>
              </h3>
              <div className="flex flex-col xl:flex-row w-full xl:justify-between">
                <input
                  className="input xl:max-w-[38%] mb-3 xl:mb-0 focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Add your email"
                />
                <input
                  className="input xl:max-w-[38%] mb-3 xl:mb-0"
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

        <p className="font-bold text-center text-sm">
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
