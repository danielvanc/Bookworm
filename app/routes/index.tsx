import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession, SUCCESS_REDIRECT } from "~/auth/auth.server";
import Faqs from "~/components/Marketing/Faq";
import { Footer } from "~/components/Marketing/Footer";
import Header from "~/components/Marketing/Header";
import { SampleFeatures } from "~/components/Marketing/SampleFeatures";

export async function loader({ request }: LoaderArgs) {
  const { session } = await getSession(request);

  if (session) return redirect(SUCCESS_REDIRECT);

  return {};
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
