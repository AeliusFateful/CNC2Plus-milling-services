export type NavItem = { label: string; href: string };

export const navItems: readonly NavItem[] = [
  { label: "Услуги", href: "#services" },
  { label: "Как мы работаем", href: "#process" },
  { label: "Работы", href: "#works" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contact" },
];

export const footerNavColumns: readonly (readonly NavItem[])[] = [
  [
    { label: "Как мы работаем", href: "#process" },
    { label: "Услуги", href: "#services" },
    { label: "Работы", href: "#works" },
  ],
  [
    { label: "Преимущества", href: "#advantages" },
    { label: "Вопросы", href: "#faq" },
    { label: "Контакты", href: "#contact" },
  ],
];
