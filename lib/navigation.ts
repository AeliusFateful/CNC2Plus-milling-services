/** Ключ раздела: подпись берётся из словаря (`t.nav[key]`), адрес — отсюда. */
export type NavKey =
  | "process"
  | "services"
  | "advantages"
  | "works"
  | "faq"
  | "contact"
  | "portfolio"
  | "about";

export type NavItem = { key: NavKey; href: string };

export const mainPageAnchors: readonly NavItem[] = [
  { key: "process", href: "/#process" },
  { key: "services", href: "/#services" },
  { key: "advantages", href: "/#advantages" },
  { key: "works", href: "/#works" },
  { key: "faq", href: "/#faq" },
  { key: "contact", href: "/#contact" },
];

/** Отдельные страницы в верхнем меню (рядом с «Главной»). */
export const pageNav: readonly NavItem[] = [
  { key: "portfolio", href: "/portfolio" },
  { key: "about", href: "/about" },
];

export const footerNavColumns: readonly (readonly NavItem[])[] = [
  [
    { key: "process", href: "/#process" },
    { key: "services", href: "/#services" },
    { key: "advantages", href: "/#advantages" },
    { key: "works", href: "/#works" },
  ],
  [
    { key: "portfolio", href: "/portfolio" },
    { key: "faq", href: "/#faq" },
    { key: "contact", href: "/#contact" },
    { key: "about", href: "/about" },
  ],
];
