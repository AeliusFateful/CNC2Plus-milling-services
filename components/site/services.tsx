import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { services as SERVICES } from "@/lib/sections-data";
import { SectionHeading } from "@/components/site/section-heading";

export function Services() {
  return (
    <section id="services" className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading
          eyebrow="Услуги"
          title="Что мы вырезаем на ЧПУ"
          description="Работаем с фанерой, массивом дерева, МДФ, пластиками и искусственным камнем. Берём проекты любой сложности - от единичной детали до серийного производства."
        />

        <div className="mt-14 grid grid-cols-1 gap-0.5 overflow-hidden rounded-xl border border-primary/50 bg-border/60 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description, photos }) => (
            <div
              key={title}
              className="group relative flex min-h-60 flex-col gap-4 overflow-hidden bg-card p-8 md:min-h-68 transition-colors hover:bg-secondary"
            >
              <div className="service-collage absolute inset-0 bg-border">
                {photos.map((photo, i) => (
                  <div key={photo} data-i={i} className="service-layer absolute inset-0">
                    <Image
                      src={withBasePath(photo)}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
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

              <div className="pointer-events-none absolute inset-0 z-10 opacity-0 ring-1 ring-primary/70 transition-opacity duration-700 ease-in-out ring-inset group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
