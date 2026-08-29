"use client";

import { useState } from "react";
import { Menu, X, MapPin, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { navItems } from "@/lib/navigation";
import { phones, siteConfig } from "@/lib/site-config";

const PHONE = phones.display;
const PHONE_HREF = phones.href;
const ADDRESS = siteConfig.address.short;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 py-3 max-w-360 items-center justify-between px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

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
                  {siteConfig.schedule.weekdays}
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

      {open && (
        <nav className="border-t border-border/60 bg-background px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
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
                {siteConfig.schedule.weekdaysWeekendShort}
              </div>
            </div>
            <Button
              render={<a href="#contact" />}
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
