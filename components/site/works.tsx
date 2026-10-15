"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { FeaturedWorks } from "@/components/site/featured-works";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import type { PortfolioWork } from "@/lib/portfolio-meta";

/** Показывает переданные проекты — страница берёт самые новые, по числу плиток сетки. */
export function Works({ works }: { works: PortfolioWork[] }) {
  const { t, path } = useI18n();

  return (
    <section id="works" className="border-t border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading eyebrow={t.works.eyebrow} title={t.works.title} />

        <FeaturedWorks works={works} />

        <div className="mt-10 flex justify-center">
          <Button
            render={<Link href={path("/portfolio")} />}
            nativeButton={false}
            size="lg"
            className="h-14 px-8 text-base"
          >
            {t.works.all}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
