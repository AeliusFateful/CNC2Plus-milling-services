import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  eyebrowClassName?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
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
      <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
