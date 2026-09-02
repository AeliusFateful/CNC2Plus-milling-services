import Image from "next/image";
import { works as WORKS } from "@/lib/sections-data";
import { SectionHeading } from "@/components/site/section-heading";

export function Works() {
  return (
    <section id="works" className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading
          eyebrow="Работы"
          title="Примеры выполненных заказов"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {WORKS.map((work) => (
            <div
              key={work.title}
              className={`group relative aspect-4/3 overflow-hidden rounded-md border border-border/60 ${work.className}`}
            >
              <Image
                src={work.src}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                  {work.tag}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  {work.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
