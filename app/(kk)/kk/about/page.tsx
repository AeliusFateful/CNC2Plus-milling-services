import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/i18n/layout-config";

export const metadata = pageMetadata("kk", "about");

export default function Page() {
  return <AboutPage />;
}
