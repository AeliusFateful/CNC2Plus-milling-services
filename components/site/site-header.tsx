"use client";

import { useState } from "react";
import { Menu, X, MapPin, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { mainPageAnchors } from "@/lib/navigation";
import { phones, siteConfig } from "@/lib/site-config";

const PHONE = phones.display;
const PHONE_HREF = phones.href;
const ADDRESS = siteConfig.address.short;
const [weekdays] = siteConfig.schedule;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mainOpen, setMainOpen] = useState(false);
  const [mobileMainOpen, setMobileMainOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b m-0 border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 py-4 max-w-360 items-center justify-between px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
          <div
            className="relative"
            onMouseEnter={() => setMainOpen(true)}
            onMouseLeave={() => setMainOpen(false)}
          >
            <div className="flex items-center text-sm text-muted-foreground">
              <a
                href="/"
                className="transition-colors hover:text-foreground"
              >
                Главное
              </a>
              <button
                type="button"
                onClick={() => setMainOpen((value) => !value)}
                aria-label="Открыть разделы главной страницы"
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
                      href={item.href}
                      onClick={() => setMainOpen(false)}
                      className="block rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a
            href="/portfolio"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Портфолио
          </a>
          <a
            href="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            О компании
          </a>
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="group/schedule relative hidden md:block">
            <div className="flex cursor-default lg:flex-col max-lg:gap-4 gap-2">
              <a
                href={`tel:${PHONE_HREF}`}
                className="flex items-center gap-2 text-md font-medium text-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-5 shrink-0 text-primary" />
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
                  <dt className="text-muted-foreground">Суббота</dt>
                  <dd className="font-medium text-foreground">10:00-17:00</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-muted-foreground">Воскресенье</dt>
                  <dd className="font-medium text-foreground">Выходной</dd>
                </div>
              </dl>
            </div>
          </div>

          <button
            type="button"
            className="text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            <div className="border-b border-border/60 pb-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <a
                  href="/"
                  onClick={() => setOpen(false)}
                  className="transition-colors hover:text-foreground"
                >
                  Главное
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMainOpen((value) => !value)}
                  aria-label="Открыть разделы главной страницы"
                  aria-expanded={mobileMainOpen}
                  className="rounded-sm p-0.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronDown className={`size-4 transition-transform ${mobileMainOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              {mobileMainOpen && (
                <div className="mt-3 flex flex-col gap-3 border-l border-border/60 pl-4">
                  {mainPageAnchors.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a
              href="/portfolio"
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Портфолио
            </a>
            <a
              href="/about"
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              О компании
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
              <div className="pl-6 text-xs text-muted-foreground">
                {siteConfig.schedule
                  .map(({ days, hours }) => `${days}: ${hours}`)
                  .join(", ")}
              </div>
            </div>
            <Button
              render={<a href="/#contact" />}
              nativeButton={false}
              onClick={() => setOpen(false)}
            >
              Оставить заявку
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
