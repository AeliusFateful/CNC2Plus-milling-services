"use client";

import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

export function WorkSchedule({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    // Рамка на обёртке: у таблицы с border-collapse половина границы обрезается overflow-hidden.
    <div
      className={cn(
        "w-fit overflow-hidden rounded-md border-[0.5px] border-primary/40 bg-card",
        className,
      )}
    >
      <table className="w-full text-sm">
        <tbody className="divide-y divide-border/60">
          {t.contacts.schedule.map(({ days, hours }) => (
            <tr key={days}>
              <th
                scope="row"
                className="px-4 py-3 text-left font-medium text-foreground"
              >
                {days}
              </th>
              <td className="px-4 py-3 text-muted-foreground first-letter:uppercase">
                {hours}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
