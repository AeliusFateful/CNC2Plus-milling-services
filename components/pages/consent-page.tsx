import { ConsentDocument } from "@/components/legal/consent-document";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export function ConsentPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <ConsentDocument />
      </main>
      <SiteFooter />
    </>
  );
}
