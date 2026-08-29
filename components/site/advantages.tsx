import { advantages as ADVANTAGES } from "@/lib/sections-data";
import { SectionHeading } from "@/components/site/section-heading";

export function Advantages() {
  return (
    <section id="advantages" className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading eyebrow="Преимущества" title="Почему заказывают у нас" />

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <Icon
                className="size-6 shrink-0 text-primary"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
