"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { withBasePath } from "@/lib/base-path";
import { switchLangPath, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: readonly Lang[] = ["ru", "kk"];

/** Переключатель РУС | ҚАЗ: ведёт на ту же страницу на другом языке (полная загрузка, якорь сохраняется). */
export function LangSwitch({ className }: { className?: string }) {
  const { lang, t } = useI18n();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t.langSwitch.aria}
      className={cn(
        "flex shrink-0 items-center rounded-md border-[0.5px] border-primary/40 bg-card p-0.5 text-xs font-medium",
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const active = option === lang;
        const target = withBasePath(switchLangPath(pathname, option));
        return (
          <a
            key={option}
            href={target}
            lang={option}
            aria-current={active ? "true" : undefined}
            onClick={(event) => {
              if (active) {
                event.preventDefault();
                return;
              }
              if (window.location.hash) {
                event.preventDefault();
                window.location.assign(`${target}${window.location.hash}`);
              }
            }}
            className={cn(
              "rounded-[0.3rem] px-2 py-1 tracking-[0.08em] transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.langSwitch[option]}
          </a>
        );
      })}
    </div>
  );
}
