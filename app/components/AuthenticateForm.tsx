import * as React from "react";
import { FaTwitter, FaFacebookF, FaGithub, FaSpotify } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
import { useOutletContext } from "@remix-run/react";

export type LoaderData = {
  error: { message?: string } | null;
};

export default function AuthenticateForm({ error }: LoaderData) {
  // TODO: Fix these ts errors
  // @ts-ignore
  const { supabase } = useOutletContext();
  const [redirectTo, setRedirectTo] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!window) return;

    setRedirectTo(`${window?.location?.origin}/oauth/callback/`);
  }, []);

  return (
    <div className="mb-10 rounded-t-md border-t-[1px]">
      <h2 className="mb-5 mt-10 pb-3">Or sign in with:</h2>
      <div>
        {/* TODO: #1 Add better U.I styling for error response */}
        {error?.message && <div>{error.message}</div>}
        {redirectTo ? (
          <ul className="social-logins mx-auto flex max-w-[300px] justify-between">
            <li>
              <button
                aria-label="Sptofy"
                onClick={() => {
                  supabase?.auth.signInWithOAuth({
                    provider: "spotify",
                    options: { redirectTo },
                  });
                }}
              >
                <FaSpotify className="text-lg lm:text-xl md:text-2xl" />
              </button>
            </li>
            <li>
              <button
                aria-label="Google"
                onClick={() => {
                  supabase?.auth.signInWithOAuth({
                    provider: "google",
                    options: { redirectTo },
                  });
                }}
              >
                <AiOutlineGoogle className="text-lg lm:text-xl md:text-2xl" />
              </button>
            </li>
            <li>
              <button
                aria-label="Twitter"
                onClick={() => {
                  supabase?.auth.signInWithOAuth({
                    provider: "twitter",
                    options: { redirectTo },
                  });
                }}
              >
                <FaTwitter className="text-lg lm:text-xl md:text-2xl" />
              </button>
            </li>
            <li>
              <button
                aria-label="Facebook"
                onClick={() => {
                  supabase?.auth.signInWithOAuth({
                    provider: "facebook",
                    options: { redirectTo },
                  });
                }}
              >
                <FaFacebookF className="text-lg lm:text-xl md:text-2xl" />
              </button>
            </li>
            <li>
              <button
                aria-label="Github"
                onClick={() => {
                  supabase?.auth.signInWithOAuth({
                    provider: "github",
                    options: { redirectTo },
                  });
                }}
              >
                <FaGithub className="text-lg lm:text-xl md:text-2xl" />
              </button>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}
