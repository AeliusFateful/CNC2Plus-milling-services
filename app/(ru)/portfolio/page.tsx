import { PortfolioPage } from "@/components/pages/portfolio-page";
import { pageMetadata } from "@/lib/i18n/layout-config";
import { getPortfolioWorks } from "@/lib/portfolio-works";

export const metadata = pageMetadata("ru", "portfolio");

export default function Page() {
  return <PortfolioPage works={getPortfolioWorks()} />;
}
