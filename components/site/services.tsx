import { services as SERVICES } from "@/lib/sections-data";
import { SectionHeading } from "@/components/site/section-heading";

export function Services() {
  return (
    <section id="services" className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading
          eyebrow="Услуги"
          title="Что мы вырезаем на ЧПУ"
          description="Работаем с фанерой, массивом, МДФ и шпоном. Берём проекты любой сложности - от единичной детали до серийного производства."
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border/60 bg-border/60 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative flex flex-col gap-4 bg-card p-8 transition-colors hover:bg-secondary"
            >
              <Icon className="size-8 text-primary" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
