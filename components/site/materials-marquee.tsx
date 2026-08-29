import { materials as MATERIALS } from "@/lib/sections-data";

export function MaterialsMarquee() {
  const items = [...MATERIALS, ...MATERIALS, ...MATERIALS, ...MATERIALS];

  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-card/40 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent md:w-32" />

      <div className="flex w-max animate-[marquee-reverse_60s_linear_infinite] items-center">
        {items.map((material, i) => (
          <div key={`${material}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-6 font-mono text-sm uppercase tracking-[0.15em] text-muted-foreground">
              {material}
            </span>
            <span
              className="size-1.5 rounded-full bg-primary/50"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
