"use client";

import { Fragment, useState } from "react";
import { Menu, X, MapPin, Phone, ChevronDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { LangSwitch } from "@/components/site/lang-switch";
import { Logo } from "@/components/site/logo";
import { ScheduleList } from "@/components/site/schedule-list";
import { contactAnchor, mainPageAnchors, pageNav } from "@/lib/navigation";
import { phones } from "@/lib/site-config";

const navLinkClass = "text-sm text-muted-foreground transition-colors hover:text-foreground";

/** «Оставить заявку» — главное действие: отдельный оранжевый пункт меню. */
const contactLinkClass = "text-sm font-medium text-primary transition-colors hover:text-primary/80";

export function SiteHeader() {
  const { t, href } = useI18n();
  const [weekdays, saturday, sunday] = t.contacts.schedule;
  const [open, setOpen] = useState(false);
  const [mainOpen, setMainOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b m-0 border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 py-4 max-w-360 items-center justify-between px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t.header.mainNav}>
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
              <div className="absolute left-1/2 top-full z-10 w-max min-w-44 -translate-x-1/2 pt-3">
                <div className="flex flex-col gap-2.5 rounded-md border border-border/60 bg-card px-4 py-3 shadow-xl">
                  {mainPageAnchors.map((item) => (
                    <a
                      key={item.href}
                      href={href(item.href)}
                      onClick={() => setMainOpen(false)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t.nav[item.key]}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          {pageNav.map((item) => (
            <a key={item.href} href={href(item.href)} className={navLinkClass}>
              {t.nav[item.key]}
            </a>
          ))}
          <a href={href(contactAnchor.href)} className={contactLinkClass}>
            {t.nav[contactAnchor.key]}
          </a>
        </nav>

        <div className="ml-3 flex items-center gap-4 md:gap-6">
          <LangSwitch />
          <div className="group/schedule relative hidden md:block">
            <div className="flex cursor-default lg:flex-col max-lg:gap-4 gap-2">
              <a
                href={`tel:${phones.href}`}
                className="flex items-center gap-2 text-md font-medium text-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-6 shrink-0 text-primary" />
                <div className="flex flex-col">
                  {phones.display}
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <span>{weekdays.days}</span>
                    <span>{weekdays.hours}</span>
                    <ChevronDown className="size-3 transition-transform duration-300 group-hover/schedule:rotate-180" />
                  </div>
                </div>
              </a>
            </div>

            <div className="pointer-events-none absolute left-8 top-full -ml-2 w-max origin-top-left rounded-md border border-border/60 bg-card px-2 py-2 opacity-0 shadow-lg transition-all duration-200 group-hover/schedule:pointer-events-auto group-hover/schedule:opacity-100 group-hover/schedule:translate-y-1">
              {/* Колонка дней по ширине равна «Пн-Пт» из строки в покое, поэтому время стоит ровно под временем Пн-Пт. */}
              <dl className="grid grid-cols-[auto_1fr] items-center gap-x-1.5 gap-y-1.5 text-sm">
                {[
                  { days: saturday.days, hours: saturday.hours },
                  { days: sunday.days, hours: t.header.dayOff },
                ].map(({ days, hours }) => (
                  <Fragment key={days}>
                    <dt className="grid text-muted-foreground">
                      <span aria-hidden className="invisible col-start-1 row-start-1">
                        {weekdays.days}
                      </span>
                      <span className="col-start-1 row-start-1">{days}</span>
                    </dt>
                    <dd className="font-medium text-foreground first-letter:uppercase">{hours}</dd>
                  </Fragment>
                ))}
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
              <a href={href("/")} onClick={closeMenu} className={navLinkClass}>
                {t.header.main}
              </a>
              <div className="mt-3 flex flex-col gap-3 border-l border-border/60 pl-4">
                {mainPageAnchors.map((item) => (
                  <a
                    key={item.href}
                    href={href(item.href)}
                    onClick={closeMenu}
                    className={navLinkClass}
                  >
                    {t.nav[item.key]}
                  </a>
                ))}
              </div>
            </div>
            {pageNav.map((item) => (
              <a key={item.href} href={href(item.href)} onClick={closeMenu} className={navLinkClass}>
                {t.nav[item.key]}
              </a>
            ))}
            <div className="flex flex-col gap-2 border-t border-border/60 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                {t.contacts.addressShort}
              </div>
              <a
                href={`tel:${phones.href}`}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Phone className="size-4 shrink-0 text-primary" />
                {phones.display}
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <ScheduleList />
              </div>
            </div>
            <Button
              size="lg"
              render={<a href={href("/#contact")} />}
              nativeButton={false}
              onClick={closeMenu}
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
