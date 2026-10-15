"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import type { PortfolioWork } from "@/lib/portfolio-meta";

export function PortfolioPage({ works }: { works: PortfolioWork[] }) {
  const { t, path } = useI18n();

  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <section className="border-b border-border/60 py-20 md:py-28">
          <div className="mx-auto max-w-360 px-4 md:px-6">
            <SectionHeading
              as="h1"
              eyebrow={t.portfolio.eyebrow}
              title={t.portfolio.title}
              description={t.portfolio.description}
              className="max-w-3xl"
            />

            <PortfolioGrid works={works} />

            <div className="mt-10 flex justify-center">
              <Button
                render={<Link href={path("/#contact")} />}
                nativeButton={false}
                size="lg"
                className="h-14 px-8 text-base"
              >
                {t.nav.contact}
                <ArrowRight />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
