export const siteConfig = {
  name: "CNC++",
  address: {
    short: "Астана, ул. Гоголя 29",
    full: "Казахстан, Астана, ул. Гоголя 29",
  },
  legal: {
    owner: "ИП Жуков Иван Михайлович",
    binIin: "850222050437",
  },
  schedule: [
    { days: "Пн-Пт", hours: "10:00-19:00" },
    { days: "Сб", hours: "10:00-17:00" },
    { days: "Вс", hours: "выходной" },
  ],
} as const;

export const phones = {
  display: "+7 (747) 109-25-24",
  href: "+77471092524",
} as const;
