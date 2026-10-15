import { ContactSection } from "@/components/site/contact-section";
import { Advantages } from "@/components/site/advantages";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { MaterialsMarquee } from "@/components/site/materials-marquee";
import { Process } from "@/components/site/process";
import { Services } from "@/components/site/services";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Works } from "@/components/site/works";
import { bentoSpans } from "@/lib/portfolio-meta";
import { getPortfolioWorks } from "@/lib/portfolio-works";

export function HomePage() {
  // getPortfolioWorks() отдаёт проекты от новых к старым: в секции — последние, по числу плиток сетки.
  const works = getPortfolioWorks().slice(0, bentoSpans.length);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MaterialsMarquee />
        <Process />
        <Services />
        <Advantages />
        <Works works={works} />
        <Faq />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
