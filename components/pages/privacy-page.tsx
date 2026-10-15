import { PrivacyDocument } from "@/components/legal/privacy-document";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <PrivacyDocument />
      </main>
      <SiteFooter />
    </>
  );
}
