import { About } from "@/components/about";
import { Capabilities } from "@/components/capabilities";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SelectedWork />
        <About />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
