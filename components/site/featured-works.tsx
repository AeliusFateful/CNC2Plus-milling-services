"use client";

import { useState } from "react";
import { PortfolioCard } from "@/components/site/portfolio-card";
import { PortfolioModal } from "@/components/site/portfolio-modal";
import { bentoGridClass, getBentoSpan, type PortfolioWork } from "@/lib/portfolio-meta";
import { cn } from "@/lib/utils";

export function FeaturedWorks({ works }: { works: PortfolioWork[] }) {
  const [openWork, setOpenWork] = useState<PortfolioWork | null>(null);

  return (
    <>
      <div className={cn("mt-14 max-md:auto-rows-96", bentoGridClass)}>
        {works.map((work, index) => (
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
