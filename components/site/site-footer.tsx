"use client";

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { ScheduleList } from "@/components/site/schedule-list";
import { SocialLinks } from "@/components/site/social-links";
import { footerNavColumns } from "@/lib/navigation";
import { phones, siteConfig } from "@/lib/site-config";
import { withBasePath } from "@/lib/base-path";

export function SiteFooter() {
  const { t, href, path } = useI18n();

  return (
    <footer className="border-t border-border/60 py-16">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        {/* Блоки переносятся, когда не хватает места. До footer (950px) — по центру (space-evenly), дальше — по краям (space-between), чтобы «Разделы» не сжимались в одну колонку. */}
        <div className="flex flex-wrap justify-evenly gap-x-8 gap-y-12 footer:justify-between">
          <div className="w-76 max-w-full footer:w-72">
            <a href={href("/")} className="block w-fit">
              <img
                src={withBasePath("/images/logo.svg")}
                alt={siteConfig.name}
                width={434}
                height={168}
                className="h-auto w-44"
              />
            </a>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              {t.footer.description}
            </p>
            <div className="mt-6 space-y-1 text-sm text-muted-foreground">
              <p className="mb-2">{t.contacts.owner}</p>
              <p>
                {t.contacts.binIin} - {siteConfig.legal.binIin}
              </p>
            </div>
          </div>

          <div className="w-76 max-w-full footer:w-auto">
            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              {t.footer.contacts}
            </h3>
            <a
              href={`tel:${phones.href}`}
              className="mt-4 block text-lg font-medium text-foreground transition-colors hover:text-primary"
            >
              {phones.display}
            </a>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                {t.contacts.addressFull}
              </p>
              <div className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <ScheduleList />
              </div>
            </div>
            <SocialLinks className="mt-6" />
          </div>

          <div className="w-76 max-w-full footer:w-auto">
            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              {t.footer.sections}
            </h3>
            <div className="mt-4 flex flex-wrap gap-x-12 gap-y-3">
              {footerNavColumns.map((column, i) => (
                <ul key={i} className="space-y-3">
                  {column.map((item) => (
                    <li key={item.href}>
                      <a
                        href={href(item.href)}
                        className="whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t.nav[item.key]}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © 2026 {siteConfig.name}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href={path("/privacy")}
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href={path("/consent")}
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {t.footer.consent}
            </Link>
          </div>
        </div>

        <div className="border-t border-border/60 mt-8 flex justify-center items-center font-serif md:text-xl text-muted-foreground">
          <a
            href="https://github.com/AeliusFateful"
            target="_blank"
            rel="noreferrer"
            className="mt-8 transition-colors hover:text-primary"
          >
            <span>{t.footer.developedBy} </span>
            <span>- Aelius Fateful</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
