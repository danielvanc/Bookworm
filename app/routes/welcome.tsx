import type { ActionFunction, LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";
import {
  authenticator,
  supabaseStrategy,
  sessionStorage,
} from "~/auth/auth.server";
import AuthenticateForm from "~/components/AuthenticateForm";

type LoaderData = {
  error: { message: string } | null;
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate("sb", request, {
    successRedirect: "/",
    failureRedirect: "/welcome",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  await supabaseStrategy.checkSession(request, {
    successRedirect: "/",
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
      <div className="col-start-2 col-end-5 row-start-1 row-span-1 lm:col-start-2 lm:col-end-6 xl:col-start-2 xl:col-end-3 xl:self-end pt-20 xl:pt-10 xl:pl-8">
        <img src="/images/logo.svg" alt="" width="131" height="38" />
      </div>

      <header className="unauthed-header relative">
        <div className="col-start-1 col-end-6 row-start-1 row-span-full lm:col-span-full  xl:col-start-1 xl:col-end-7 xl:row-start-2 xl:self-end xl:mb-10 pl-[6px]">
          <h1 className="main-heading">Read more</h1>
          <h2 className="sub-heading">
            Find read and spread your love for books
          </h2>
        </div>
        <p className="font-fred text-grayWorm-300 text-sm lm:text-xl col-start-2 col-end-6 row-start-1 row-end-2 self-end lm:row-start-3 lm:row-end-4 lm:col-start-2 lm:col-end-12 lm:self-start md:row-start-2 md:row-end-3 xl:col-start-4 xl:col-end-6 xl:row-start-2 xl:row-end-3 xl:bg-white xl:py-3 xl:pl-3">
          Let your mind escape
        </p>
      </header>

      <main className="row-start-4 row-span-1 col-start-2 col-end-8 lm:col-end-9 md:col-end-7 xl:col-start-2 xl:col-end-3 xl:row-start-2 xl:row-end-4 xl:mr-10 pb-10 text-grayWorm-300">
        <p className="text-base md:text-xl 2xl:text-3xl my-12 xl:mb-0 xl:my-8 xl:pl-8 xl:pr-[5rem]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
        <AuthenticateForm error={error} />
        <div className="xl:text-xl xl:pl-8 xl:pr-14">
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
