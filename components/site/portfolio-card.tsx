import Image from "next/image";
import { Play } from "lucide-react";
import type { PortfolioWork } from "@/lib/portfolio-meta";
import { cn } from "@/lib/utils";

type PortfolioCardProps = {
  work: PortfolioWork;
  index: number;
  className?: string;
  onOpen: (work: PortfolioWork) => void;
};

export function PortfolioCard({ work, index, className, onOpen }: PortfolioCardProps) {
  const cover = work.photos[0];

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-primary/60",
        className,
      )}
    >
      {cover ? (
        <Image
          src={cover}
          alt=""
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 portfolio-placeholder",
            `portfolio-placeholder-${(index % 4) + 1}`,
          )}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-background via-background/65 to-transparent" />
      <h3 className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-lg font-semibold tracking-[0.02em] text-foreground md:p-6">
        {work.title}
      </h3>
      {work.video && (
        <span
          className="pointer-events-none absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-background/70 text-primary backdrop-blur-sm"
          aria-hidden="true"
        >
          <Play className="size-4 fill-current" />
        </span>
      )}
      <button
        type="button"
        onClick={() => onOpen(work)}
        aria-label={`Открыть: ${work.title}`}
        className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      />
    </article>
  );
}
