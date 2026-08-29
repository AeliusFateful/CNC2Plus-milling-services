import Image from "next/image";
import { ArrowRight, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RotatingWord } from "@/components/site/rotating-word";

const STATS = [
  { value: "500+", label: "заказов выполнено" },
  { value: "1-3", label: "дня на производство" },
  { value: "0.1 мм", label: "точность фрезеровки" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col overflow-hidden pt-16"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cnc.png"
          alt="ЧПУ станок фрезерует деревянную панель в тёмной мастерской"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-360 flex-1 flex-col justify-center px-4 py-24 md:px-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          <Gauge className="size-4" />
          Точность до 0.1 мм
        </div>

        <h1 className="mt-6 max-w-3xl text-balance text-5xl font-bold leading-tight text-foreground md:text-7xl">
          Фрезерная резка ЧПУ {}
          <span className="whitespace-nowrap">
            по <RotatingWord />
          </span>
        </h1>

        <p className="mt-2 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Вырезаем детали мебели, декоративные панели, вывески и интерьерные
          изделия любой сложности по вашим чертежам или готовым макетам.
        </p>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center">
          <Button
            size="lg"
            render={<a href="#contact" />}
            nativeButton={false}
            className="h-14 px-8 text-base"
          >
            Получить расчёт
            <ArrowRight />
          </Button>
          <a
            href="#works"
            className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Смотреть примеры работ
          </a>
        </div>

        <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-border/60 pt-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-2xl font-bold text-foreground md:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
