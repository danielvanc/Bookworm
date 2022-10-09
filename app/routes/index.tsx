import { json, type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { oAuthAuthenticator, checkSession } from "~/auth/auth.server";
import { SUCCESS_REDIRECT, FAILURE_REDIRECT } from "~/auth/auth.server";
import Faqs from "~/components/Marketing/Faq";
import { Footer } from "~/components/Marketing/Footer";
import Header from "~/components/Marketing/Header";
import { SampleFeatures } from "~/components/Marketing/SampleFeatures";

export const action = async ({ request }: ActionArgs) => {
  await oAuthAuthenticator.authenticate("BKW-oauth", request, {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT,
  });
};

export async function loader({ request }: LoaderArgs) {
  const error = await checkSession(request);

  return json({ error });
}

export default function Welcome() {
  return (
    <main>
      <Header />
      <SampleFeatures />
      <Faqs />
      <Footer />
    </main>
  );
}
