"use client";

import { useState } from "react";
import { Menu, X, MapPin, Phone, ChevronDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { LangSwitch } from "@/components/site/lang-switch";
import { Logo } from "@/components/site/logo";
import { mainPageAnchors } from "@/lib/navigation";
import { phones } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const PHONE = phones.display;
const PHONE_HREF = phones.href;

export function SiteHeader() {
  const { t, href } = useI18n();
  const ADDRESS = t.contacts.addressShort;
  const [weekdays] = t.contacts.schedule;
  const [open, setOpen] = useState(false);
  const [mainOpen, setMainOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b m-0 border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 py-4 max-w-360 items-center justify-between px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label={t.header.mainNav}>
          <div
            className="relative"
            onMouseEnter={() => setMainOpen(true)}
            onMouseLeave={() => setMainOpen(false)}
          >
            <div className="flex items-center text-sm text-muted-foreground">
              <a
                href={href("/")}
                className="transition-colors hover:text-foreground"
              >
                {t.header.main}
              </a>
              <button
                type="button"
                onClick={() => setMainOpen((value) => !value)}
                aria-label={t.header.openMainSections}
                aria-expanded={mainOpen}
                className="ml-1 rounded-sm p-0.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronDown className={`size-4 transition-transform ${mainOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {mainOpen && (
              <div className="absolute left-1/2 top-full z-10 w-56 -translate-x-1/2 pt-3">
                <div className="rounded-md border border-border/60 bg-card p-2 shadow-xl">
                  {mainPageAnchors.map((item) => (
                    <a
                      key={item.href}
                      href={href(item.href)}
                      onClick={() => setMainOpen(false)}
                      className={cn(
                        "block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-muted",
                        item.key === "contact"
                          ? "font-medium text-primary hover:text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {t.nav[item.key]}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a
            href={href("/portfolio")}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.portfolio}
          </a>
          <a
            href={href("/about")}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.about}
          </a>
        </nav>

        <div className="ml-3 flex items-center gap-4 md:gap-6">
          <LangSwitch />
          <div className="group/schedule relative hidden md:block">
            <div className="flex cursor-default lg:flex-col max-lg:gap-4 gap-2">
              <a
                href={`tel:${PHONE_HREF}`}
                className="flex items-center gap-2 text-md font-medium text-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-6 shrink-0 text-primary" />
                <div className="flex flex-col">
                  {PHONE}
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    {weekdays.days} {weekdays.hours}
                    <ChevronDown className="size-3 transition-transform duration-300 group-hover/schedule:rotate-180" />
                  </div>
                </div>
              </a>
            </div>

            <div className="pointer-events-none absolute right-0 top-full w-50 origin-top-right rounded-md border border-border/60 bg-card px-4 py-3 opacity-0 shadow-lg transition-all duration-200 group-hover/schedule:pointer-events-auto group-hover/schedule:opacity-100 group-hover/schedule:translate-y-1">
              <dl className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-muted-foreground">{t.header.saturday}</dt>
                  <dd className="font-medium text-foreground">{t.contacts.schedule[1].hours}</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-muted-foreground">{t.header.sunday}</dt>
                  <dd className="font-medium text-foreground">{t.header.dayOff}</dd>
                </div>
              </dl>
            </div>
          </div>

          <button
            type="button"
            className="text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            <div>
              <a
                href={href("/")}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.header.main}
              </a>
              <div className="mt-3 flex flex-col gap-3 border-l border-border/60 pl-4">
                {mainPageAnchors.map((item) => (
                  <a
                    key={item.href}
                    href={href(item.href)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-sm transition-colors",
                      item.key === "contact"
                        ? "font-medium text-primary hover:text-primary/80"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t.nav[item.key]}
                  </a>
                ))}
              </div>
            </div>
            <a
              href={href("/portfolio")}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.nav.portfolio}
            </a>
            <a
              href={href("/about")}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.nav.about}
            </a>
            <div className="flex flex-col gap-2 border-t border-border/60 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                {ADDRESS}
              </div>
              <a
                href={`tel:${PHONE_HREF}`}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Phone className="size-4 shrink-0 text-primary" />
                {PHONE}
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="flex flex-col gap-1">
                  {t.contacts.schedule.map(({ days, hours }) => (
                    <p key={days}>
                      {days}: {hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <Button
              size="lg"
              render={<a href={href("/#contact")} />}
              nativeButton={false}
              onClick={() => setOpen(false)}
              className="h-12 text-base"
            >
              {t.nav.contact}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
