import { HomePage } from "@/components/pages/home-page";
import { pageMetadata } from "@/lib/i18n/layout-config";

export const metadata = pageMetadata("kk", "home");

export default function Page() {
  return <HomePage />;
}
