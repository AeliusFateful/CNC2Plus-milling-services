import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { advantages as ADVANTAGES } from "@/lib/sections-data";
import { SectionHeading } from "@/components/site/section-heading";

export function Advantages() {
  return (
    <section id="advantages" className="border-t border-border/60 bg-card/40 py-24">
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
                <h3 className="text-lg font-semibold tracking-[0.02em] text-foreground">
                  {title}
                </h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            size="lg"
            className="h-14 px-8 text-base"
          >
            Оставить заявку
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
