import { PrivacyPage } from "@/components/pages/privacy-page";
import { pageMetadata } from "@/lib/i18n/layout-config";

export const metadata = pageMetadata("ru", "privacy");

export default function Page() {
  return <PrivacyPage />;
}
