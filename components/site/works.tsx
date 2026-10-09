import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedWorks } from "@/components/site/featured-works";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { getPortfolioWorks } from "@/lib/portfolio-works";
import { bentoSpans } from "@/lib/portfolio-meta";

export function Works() {
  // getPortfolioWorks() отдаёт проекты от новых к старым.
  // Сначала «Интересные», недостающие плитки добираются самыми новыми из остальных.
  const all = getPortfolioWorks();
  const featured = [
    ...all.filter((work) => work.category === "Интересные"),
    ...all.filter((work) => work.category !== "Интересные"),
  ]
    .slice(0, bentoSpans.length)
    .sort((a, b) => b.id - a.id);

  return (
    <section id="works" className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading
          eyebrow="Работы"
          title="Примеры выполненных заказов"
        />

        <FeaturedWorks works={featured} />

        <div className="mt-10 flex justify-center">
          <Button
            render={<Link href="/portfolio" />}
            nativeButton={false}
            size="lg"
            className="h-14 px-8 text-base"
          >
            Все работы
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
