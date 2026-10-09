"use client";

import { useState } from "react";
import { PortfolioCard } from "@/components/site/portfolio-card";
import { PortfolioModal } from "@/components/site/portfolio-modal";
import {
  bentoSpans,
  compareWorks,
  portfolioCategories,
  type PortfolioWork,
} from "@/lib/portfolio-meta";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "new", label: "Сначала новые" },
  { value: "old", label: "Сначала старые" },
] as const;

type SortOrder = (typeof SORT_OPTIONS)[number]["value"];

export const gridClassName =
  "grid auto-rows-108 grid-cols-1 grid-flow-dense gap-4 md:grid-cols-5 md:auto-rows-66";

const chipClassName = (isActive: boolean) =>
  cn(
    "rounded-full border px-4 py-2 text-sm transition-colors",
    isActive
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-foreground",
  );

export function PortfolioGrid({ works }: { works: PortfolioWork[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof portfolioCategories)[number]>("Все");
  const [order, setOrder] = useState<SortOrder>("new");
  const [openWork, setOpenWork] = useState<PortfolioWork | null>(null);

  const visibleWorks = works
    .filter((work) => activeCategory === "Все" || work.category === activeCategory)
    .sort((a, b) => (order === "new" ? compareWorks(b, a) : compareWorks(a, b)));

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <div className="flex flex-wrap gap-2" aria-label="Категории работ">
          {portfolioCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={chipClassName(activeCategory === category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Порядок сортировки">
          {SORT_OPTIONS.map(({ value, label }) => (
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

      <div className={cn("mt-10", gridClassName)}>
        {visibleWorks.map((work, index) => (
          <PortfolioCard
            key={work.id}
            work={work}
            index={index}
            className={bentoSpans[index % bentoSpans.length]}
            onOpen={setOpenWork}
          />
        ))}
      </div>

      <PortfolioModal work={openWork} onClose={() => setOpenWork(null)} />
    </>
  );
}
