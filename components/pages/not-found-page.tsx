import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/base-path";
import { getDictionary, localePath, type Lang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

const LANGS: readonly Lang[] = ["ru", "kk"];

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_65%)]"
      />

      <a href={withBasePath("/")} className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath("/images/logo main.svg")} alt={siteConfig.name} className="w-56 md:w-64" />
      </a>

      <p
        aria-hidden
        className="relative mt-10 font-mono text-8xl font-bold tracking-widest text-primary/30 md:text-9xl"
      >
        404
      </p>

      <div className="relative mt-6 grid w-full max-w-4xl gap-6 sm:grid-cols-2">
        {LANGS.map((lang) => {
          const { notFound } = getDictionary(lang);
          return (
            <section
              key={lang}
              lang={lang}
              className="flex flex-col items-center rounded-xl border border-border/60 bg-card p-6"
            >
              <h1 className="text-2xl font-bold tracking-[0.02em] text-foreground">{notFound.title}</h1>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{notFound.text}</p>
              <Button
                render={<a href={withBasePath(localePath(lang, "/"))} />}
                nativeButton={false}
                size="lg"
                className="mt-6 h-12 px-6"
              >
                <Home />
                {notFound.home}
              </Button>
            </section>
          );
        })}
      </div>
    </main>
  );
}
