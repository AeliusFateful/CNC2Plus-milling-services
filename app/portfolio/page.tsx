import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getPortfolioWorks } from "@/lib/portfolio-works";

export const metadata: Metadata = {
  title: "Портфолио CNC++ | Фрезерная резка ЧПУ",
  description:
    "Портфолио CNC++: рельефные панели, интерьерные изделия, серийные детали и нестандартные проекты на ЧПУ.",
};

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <section className="border-b border-border/60 py-20 md:py-28">
          <div className="mx-auto max-w-360 px-4 md:px-6">
            <SectionHeading
              as="h1"
              eyebrow="Наши работы"
              title="Портфолио"
              description="От единичных интерьерных акцентов до повторяемых серий: здесь собраны проекты, в которых точность станка встречается с выразительным материалом и продуманной формой."
              className="max-w-3xl"
            />

            <PortfolioGrid works={getPortfolioWorks()} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
