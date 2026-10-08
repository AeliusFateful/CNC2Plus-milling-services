import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  as?: "h1" | "h2";
  eyebrowClassName?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  as: Heading = "h2",
  eyebrowClassName = "text-sm",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered ? "text-center" : "max-w-2xl", className)}>
      <span
        className={cn(
          "font-mono uppercase tracking-[0.2em] text-primary",
          eyebrowClassName,
        )}
      >
        {eyebrow}
      </span>
      <Heading className="mt-4 text-balance text-3xl font-bold leading-snug tracking-[0.03em] text-foreground md:text-4xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
