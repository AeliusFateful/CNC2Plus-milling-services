import { ContactSection } from "@/components/site/contact-section";
import { Advantages } from "@/components/site/advantages";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { MaterialsMarquee } from "@/components/site/materials-marquee";
import { Process } from "@/components/site/process";
import { Reviews } from "@/components/site/reviews";
import { Services } from "@/components/site/services";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Works } from "@/components/site/works";
import { bentoSpans } from "@/lib/portfolio-meta";
import { getPortfolioWorks } from "@/lib/portfolio-works";

export function HomePage() {
  // getPortfolioWorks() отдаёт проекты от новых к старым: в секции — последние, по числу плиток сетки.
  const allWorks = getPortfolioWorks();
  const works = allWorks.slice(0, bentoSpans.length);
  // Фон Hero: видео проектов от новых к старым.
  const heroVideos = allWorks.flatMap(({ id, title, video }) => (video ? [{ id, title, src: video }] : []));

  return (
    <>
      <SiteHeader />
      <main>
        <Hero videos={heroVideos} />
        <MaterialsMarquee />
        <Process />
        <Services />
        <Advantages />
        <Works works={works} />
        <Reviews />
        <Faq />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
