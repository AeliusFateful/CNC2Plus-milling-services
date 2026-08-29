import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности - CNC++",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
          Страница находится в разработке.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
