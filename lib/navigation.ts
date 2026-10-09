export type NavItem = { label: string; href: string };

export const mainPageAnchors: readonly NavItem[] = [
  { label: "Услуги", href: "/#services" },
  { label: "Как мы работаем", href: "/#process" },
  { label: "Преимущества", href: "/#advantages" },
  { label: "Работы", href: "/#works" },
  { label: "Вопросы", href: "/#faq" },
  { label: "Оставить заявку", href: "/#contact" },
];

export const footerNavColumns: readonly (readonly NavItem[])[] = [
  [
    { label: "Как мы работаем", href: "/#process" },
    { label: "Услуги", href: "/#services" },
    { label: "Работы", href: "/#works" },
    { label: "Портфолио", href: "/portfolio" },
  ],
  [
    { label: "Преимущества", href: "/#advantages" },
    { label: "Вопросы", href: "/#faq" },
    { label: "О компании", href: "/about" },
    { label: "Контакты", href: "/about#contact" },
  ],
];
