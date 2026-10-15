"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { PortfolioCard } from "@/components/site/portfolio-card";
import { PortfolioModal } from "@/components/site/portfolio-modal";
import {
  bentoGridClass,
  getBentoSpan,
  compareWorks,
  portfolioCategories,
  type PortfolioWork,
} from "@/lib/portfolio-meta";
import { cn } from "@/lib/utils";

type SortOrder = "new" | "old";

const chipClassName = (isActive: boolean) =>
  cn(
    "rounded-full border px-4 py-2 text-sm transition-colors max-md:px-3 max-md:py-1.5 max-md:text-xs",
    isActive
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-foreground",
  );

export function PortfolioGrid({ works }: { works: PortfolioWork[] }) {
  const { t } = useI18n();
  const sortOptions = [
    { value: "new", label: t.portfolio.sortNew },
    { value: "old", label: t.portfolio.sortOld },
  ] as const;
  const [activeCategory, setActiveCategory] = useState<(typeof portfolioCategories)[number]>("Все");
  const [order, setOrder] = useState<SortOrder>("new");
  const [openWork, setOpenWork] = useState<PortfolioWork | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const [wrapped, setWrapped] = useState(false);

  // Фильтры стоят по краям; когда им не хватает места и вторая группа ушла на новую строку,
  // обе группы центрируются. Контейнер всегда остаётся flex-wrap, поэтому проверка не зависит
  // от выравнивания и не «мигает».
  useEffect(() => {
    const el = filtersRef.current;
    if (!el || el.children.length < 2) return;
    const [first, second] = [el.children[0] as HTMLElement, el.children[1] as HTMLElement];
    const check = () => setWrapped(second.offsetTop > first.offsetTop);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibleWorks = useMemo(
    () =>
      works
        .filter((work) => activeCategory === "Все" || work.category === activeCategory)
        .sort((a, b) => (order === "new" ? compareWorks(b, a) : compareWorks(a, b))),
    [works, activeCategory, order],
  );

  return (
    <>
      <div
        ref={filtersRef}
        className={cn(
          "mt-8 flex flex-wrap items-center gap-x-6 gap-y-6",
          wrapped ? "justify-center" : "justify-between",
        )}
      >
        <div className="flex flex-wrap justify-center gap-2" aria-label={t.portfolio.categoriesAria}>
          {portfolioCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={chipClassName(activeCategory === category)}
            >
              {t.portfolio.categories[category] ?? category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2" aria-label={t.portfolio.sortAria}>
          {sortOptions.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setOrder(value)}
              aria-pressed={order === value}
              className={chipClassName(order === value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={cn("mt-8", bentoGridClass)}>
        {visibleWorks.map((work, index) => (
          <PortfolioCard
            key={work.id}
            work={work}
            index={index}
            className={getBentoSpan(index)}
            onOpen={setOpenWork}
          />
        ))}
      </div>

      <PortfolioModal work={openWork} onClose={() => setOpenWork(null)} />
    </>
  );
}
