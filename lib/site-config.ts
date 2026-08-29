export const siteConfig = {
  name: "CNC++",
  address: {
    short: "Астана, ул. Гоголя 31",
    full: "Казахстан, Астана, ул. Гоголя 31",
    workshop: "Мастерская: Казахстан, Астана, ул. Гоголя 31",
  },
  schedule: {
    weekdays: "Пн-Пт 10:00-19:00",
    saturday: "Сб 10:00-17:00",
    sunday: "Вс - выходной",
    weekdaysWeekendShort: "Пн-Пт 10:00-19:00, Сб 10:00-17:00, Вс - выходной",
  },
} as const;

export const phones = {
  display: "+7 (747) 109-25-24",
  href: "+77471092524",
} as const;
