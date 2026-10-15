"use client";

import Image from "next/image";
import { Eye, MousePointerClick } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { useI18n } from "@/components/i18n-provider";
import { serviceVisuals } from "@/lib/sections-data";
import { SectionHeading } from "@/components/site/section-heading";

export function Services() {
  const { t } = useI18n();

  return (
    <section id="services" className="border-t border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          description={t.services.description}
        />

        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <MousePointerClick className="size-4 shrink-0 text-primary" strokeWidth={1.5} />
          <span className="hidden [@media(hover:hover)]:inline">{t.services.hintHover}</span>
          <span className="[@media(hover:hover)]:hidden">{t.services.hintTouch}</span>
        </p>

        <div className="mt-8 grid grid-cols-1 gap-0.5 overflow-hidden rounded-xl border border-primary/50 bg-border/60 md:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map(({ title, description }, index) => {
            const { icon: Icon, photos } = serviceVisuals[index];
            return (
            <div
              key={title}
              className="group relative flex min-h-60 flex-col gap-4 overflow-hidden bg-card p-8 md:min-h-68 transition-colors hover:bg-secondary"
            >
              <div className="service-collage absolute inset-0 bg-border">
                {photos.map((photo, i) => (
                  <div key={photo} data-i={i} className="service-layer absolute inset-0">
                    <div className="service-photo absolute inset-0">
                      <Image
                        src={withBasePath(photo)}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-0 bg-card/80 transition-colors duration-700 group-hover:bg-card/50" />
                {photos.map((photo, i) => (
                  <div key={photo} data-i={i} className="service-zone absolute inset-0" />
                ))}
              </div>

              <div className="pointer-events-none relative flex flex-col gap-4">
                <Icon className="size-8 text-primary" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold tracking-[0.02em] text-foreground">{title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>

              <Eye
                aria-hidden
                className="pointer-events-none absolute right-4 bottom-4 z-10 size-6 text-primary transition-opacity duration-300 group-hover:opacity-0"
                strokeWidth={1.5}
              />

              <div className="pointer-events-none absolute inset-0 z-10 opacity-0 ring-1 ring-primary/70 transition-opacity duration-700 ease-in-out ring-inset group-hover:opacity-100" />
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
