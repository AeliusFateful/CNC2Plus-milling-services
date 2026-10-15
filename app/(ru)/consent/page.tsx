import { ConsentPage } from "@/components/pages/consent-page";
import { pageMetadata } from "@/lib/i18n/layout-config";

export const metadata = pageMetadata("ru", "consent");

export default function Page() {
  return <ConsentPage />;
}
