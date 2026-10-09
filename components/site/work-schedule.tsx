import { siteConfig } from "@/lib/site-config";

export function WorkSchedule() {
  return (
    // Рамка на обёртке: у таблицы с border-collapse половина границы обрезается overflow-hidden.
    <div className="w-fit overflow-hidden rounded-md border-[0.5px] border-primary/40 bg-card">
      <table className="text-sm">
        <tbody className="divide-y divide-border/60">
          {siteConfig.schedule.map(({ days, hours }) => (
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
