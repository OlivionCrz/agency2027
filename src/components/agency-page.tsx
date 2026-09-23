import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Showcase } from "./showcase";
import { Services, Seo, Plans, ContactSection, Footer } from "./sections";
import { ContactProvider, FloatingContact } from "./contact";
export function AgencyPage({ sector }: { sector?: string }) {
  return (
    <ContactProvider>
      <Navbar />
      <main id="contenido">
        {!sector && <Hero />}
        <Showcase initialId={sector} standalone={Boolean(sector)} />
        <Services />
        <Seo />
        <Plans />
        <ContactSection />
      </main>
      <Footer />
      <FloatingContact />
    </ContactProvider>
  );
}
