import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  authenticator,
  supabaseStrategy,
  sessionStorage,
} from "~/auth/auth.server";
import { SUCCESS_REDIRECT, FAILURE_REDIRECT } from "~/auth/auth.server";
import AuthenticateForm from "~/components/AuthenticateForm";

type LoaderData = {
  error: { message: string } | null;
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate("sb", request, {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT,
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  await supabaseStrategy.checkSession(request, {
    successRedirect: SUCCESS_REDIRECT,
  });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const error = session.get(
    authenticator.sessionErrorKey
  ) as LoaderData["error"];

  return json<LoaderData>({ error });
};

export default function Welcome() {
  const { error } = useLoaderData<LoaderData>();

  return (
    <div className="unauthed-wrapper">
      <div className="col-start-2 col-end-5 row-span-1 row-start-1 pt-20 lm:col-start-2 lm:col-end-6 xl:col-start-2 xl:col-end-3 xl:self-end xl:pt-10 xl:pl-8">
        <img src="/images/logo.svg" alt="" width="131" height="38" />
      </div>

      <header className="unauthed-header relative">
        <div className="col-start-1 col-end-6 row-span-full row-start-1 pl-[6px]  lm:col-span-full xl:col-start-1 xl:col-end-7 xl:row-start-2 xl:mb-10 xl:self-end">
          <h1 className="main-heading">Read more</h1>
          <h2 className="sub-heading">
            Find read and spread your love for books
          </h2>
        </div>
        <p className="col-start-2 col-end-6 row-start-1 row-end-2 self-end font-fred text-sm text-grayWorm-300 lm:col-start-2 lm:col-end-12 lm:row-start-3 lm:row-end-4 lm:self-start lm:text-xl md:row-start-2 md:row-end-3 xl:col-start-4 xl:col-end-6 xl:row-start-2 xl:row-end-3 xl:bg-white xl:py-3 xl:pl-3">
          Let your mind escape
        </p>
      </header>

      <main className="col-start-2 col-end-8 row-span-1 row-start-4 pb-10 text-grayWorm-300 lm:col-end-9 md:col-end-7 xl:col-start-2 xl:col-end-3 xl:row-start-2 xl:row-end-4 xl:mr-10">
        <p className="my-12 text-base md:text-xl xl:my-8 xl:mb-0 xl:pl-8 xl:pr-[5rem] 2xl:text-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
        <AuthenticateForm error={error} />
        <div className="xl:pl-8 xl:pr-14 xl:text-xl">
          <p className="xl:mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque bibendum suspendisse purus netus est mauris. Morbi
            vivamus rutrum ullamcorper maecenas condimentum nunc sed.
          </p>
          <p className="xl:mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque bibendum suspendisse purus netus est mauris. Morbi
            vivamus rutrum ullamcorper maecenas condimentum nunc sed.
          </p>
        </div>
      </main>
    </div>
  );
}
