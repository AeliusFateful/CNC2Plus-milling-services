"use client";

import Image from "next/image";
import { Handshake, MessageCircle, Ruler, ShieldCheck } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { ContactSection } from "@/components/site/contact-section";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { withBasePath } from "@/lib/base-path";

const PHOTOS = [
  {
    src: "/images/Owner/Boss_CNC.webp",
    alt: "owner",
    // Высота 60% против 40% у второго фото (пропорции 3:2); лицо чуть приближено через scale.
    box: "aspect-12/13 lg:aspect-7/5 lg:flex-[3_1_auto]",
    className: "origin-[38%_30%] scale-130 object-[35%_50%]",
  },
  {
    src: "/images/machines.jpg",
    alt: "machines",
    box: "aspect-18/13 lg:aspect-21/10 lg:flex-[2_1_auto]",
    className: "object-center",
  },
] as const;

const PRINCIPLE_ICONS = [Handshake, Ruler, MessageCircle, ShieldCheck];

export function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <section className="border-b border-border/60 py-12 md:py-16">
          <div className="mx-auto max-w-360 px-4 md:px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <SectionHeading
                  as="h1"
                  eyebrow={t.about.eyebrow}
                  title={t.about.title}
                  className="max-w-none"
                />
                <p className="mt-6 max-w-none text-pretty text-lg leading-relaxed text-muted-foreground">
                  {t.about.lead}
                </p>
                <dl className="mt-8 divide-y divide-border/60 border-y border-border/60">
                  {t.about.principles.map(({ title, text }, index) => {
                    const Icon = PRINCIPLE_ICONS[index];
                    return (
                    <div
                      key={title}
                      className="grid grid-cols-[2.75rem_1fr] gap-x-3 py-5 max-xs:items-center max-xs:gap-y-3"
                    >
                      <dt className="flex size-11 items-center justify-center rounded-md border border-primary/30 text-primary">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </dt>
                      {/* До xs описание уходит под иконку на всю ширину: dd «растворяется» в сетке. */}
                      <dd className="max-xs:contents">
                        <strong className="block text-lg font-semibold tracking-[0.02em] text-foreground">
                          {title}
                        </strong>
                        <span className="mt-1 block leading-relaxed text-muted-foreground max-xs:col-span-2 max-xs:mt-0 max-xs:self-start">
                          {text}
                        </span>
                      </dd>
                    </div>
                    );
                  })}
                </dl>
              </div>
              <div className="mx-auto flex w-full max-w-200 flex-col gap-3">
                {PHOTOS.map(({ src, alt, box, className }) => (
                  <figure
                    key={src}
                    className={`relative overflow-hidden rounded-xl bg-muted ${box}`}
                  >
                    <Image
                      src={withBasePath(src)}
                      alt={t.about.photos[alt]}
                      fill
                      className={`object-cover ${className}`}
                      sizes="(min-width: 1024px) 42vw, 100vw"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
