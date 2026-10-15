"use client";

import { Fragment } from "react";
import Image from "next/image";
import { ArrowRight, Gauge } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { RotatingWord } from "@/components/site/rotating-word";
import { withBasePath } from "@/lib/base-path";

export function Hero() {
  const { t } = useI18n();
  const { title } = t.hero;

  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col overflow-hidden pt-19"
    >
      <div className="absolute inset-0 opacity-60">
        <Image
          src={withBasePath("/images/hero-cnc.webp")}
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-360 flex-1 flex-col justify-center px-6 max-md:max-w-xl">
        <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-primary">
          <Gauge className="size-4" />
          {t.hero.eyebrow}
        </div>

        <h1 className="mt-6 max-w-3xl text-balance text-5xl font-bold leading-tight text-foreground md:text-7xl">
          {title.before && `${title.before} `}
          <span className="whitespace-nowrap">
            {title.prefix}
            <RotatingWord />
          </span>
          {title.after &&
            title.after.split(" ").map((word, i) => (
              <Fragment key={i}>
                {" "}
                {/* Слово с дефисом («ЧПУ-да») не должно рваться по дефису на две строки. */}
                <span className={word.includes("-") ? "whitespace-nowrap" : undefined}>{word}</span>
              </Fragment>
            ))}
        </h1>

        <p className="mt-2 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          {t.hero.description}
        </p>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center">
          <Button
            size="lg"
            render={<a href="#contact" />}
            nativeButton={false}
            className="h-14 px-8 text-base"
          >
            {t.hero.cta}
            <ArrowRight />
          </Button>
          <a
            href="#works"
            className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline max-sm:self-center"
          >
            {t.hero.examples}
          </a>
        </div>

        <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-border/60 pt-8">
          {t.hero.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-2xl font-bold text-foreground md:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
