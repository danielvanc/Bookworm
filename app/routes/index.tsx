import Faqs from "~/components/Marketing/Faq";
import { Footer } from "~/components/Marketing/Footer";
import Header from "~/components/Marketing/Header";
import { SampleFeatures } from "~/components/Marketing/SampleFeatures";

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
