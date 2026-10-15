"use client";

import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

/** График работы строками «дни: часы» — для шапки (мобильное меню) и подвала. */
export function ScheduleList({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {t.contacts.schedule.map(({ days, hours }) => (
        <p key={days}>
          {days}: {hours}
        </p>
      ))}
    </div>
  );
}
