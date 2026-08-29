import { processSteps as STEPS } from "@/lib/sections-data";
import { SectionHeading } from "@/components/site/section-heading";

export function Process() {
  return (
    <section id="process" className="border-t border-border/60 bg-card/40 py-24">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading eyebrow="Процесс" title="Как мы работаем" />

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="font-mono text-5xl font-bold text-primary/25 md:text-6xl">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              {index < STEPS.length - 1 && (
                <div
                  className="mt-8 hidden h-px w-full bg-border/60 md:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
