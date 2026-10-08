import { siteConfig } from "@/lib/site-config";

export function WorkSchedule() {
  return (
    <table className="w-fit overflow-hidden rounded-md border border-border/60 bg-card text-sm">
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
  );
}
