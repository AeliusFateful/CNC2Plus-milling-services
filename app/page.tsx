import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { MaterialsMarquee } from "@/components/site/materials-marquee";
import { Services } from "@/components/site/services";
import { Advantages } from "@/components/site/advantages";
import { Process } from "@/components/site/process";
import { Works } from "@/components/site/works";
import { Faq } from "@/components/site/faq";
import { ContactSection } from "@/components/site/contact-section";
import { SiteFooter } from "@/components/site/site-footer";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MaterialsMarquee />
        <Services />
        <Advantages />
        <Process />
        <Works />
        <Faq />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
