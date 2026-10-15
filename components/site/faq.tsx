"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";
import { SectionHeading } from "@/components/site/section-heading";

export function Faq() {
  const { t } = useI18n();
  const FAQ_ITEMS = t.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-border/60 bg-card/40 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          centered
        />

        <div className="mx-auto mt-14 divide-y divide-border/60 border-t border-border/60">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-medium text-foreground">
                    {item.question}
                  </span>
                  <Plus
                    className={cn(
                      "size-6 shrink-0 text-primary transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] pb-6 opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-pretty leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
