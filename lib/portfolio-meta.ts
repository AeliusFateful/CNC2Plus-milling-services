export const portfolioCategories = [
  "Все",
  "Интересные",
  "Рельефные",
  "Тиражированные",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioWork = {
  id: number;
  title: string;
  category: Exclude<PortfolioCategory, "Все">;
  /** ISO-дата `YYYY-MM-DD`; при равных датах выше номер проекта считается новее. */
  date: string;
  photos: string[];
  video?: string;
};

type PortfolioMeta = Pick<PortfolioWork, "title" | "category" | "date">;

/**
 * Как добавить проект: положите в `public/images/portfolio/` файлы
 * `N.video.mp4` (видео, необязательно) и `N.1.jpg`, `N.2.jpg`… (фото) —
 * проект появится сам с названием «Проект N». Чтобы задать название,
 * категорию и дату, добавьте строку с номером N сюда.
 */
export const portfolioMeta: Record<number, PortfolioMeta> = {
  1: { title: "Матрицы-формы из МДФ", category: "Рельефные", date: "2026-09-29" },
  2: { title: "Угловые элементы: дерево и пластик", category: "Тиражированные", date: "2026-09-29" },
  3: { title: "Слоёная рамка из МДФ", category: "Интересные", date: "2026-09-29" },
  4: { title: "Резной орнамент", category: "Интересные", date: "2026-09-29" },
  5: { title: "Ступенчатые чаши", category: "Интересные", date: "2026-10-07" },
  6: { title: "Рельефные фасадные панели", category: "Рельефные", date: "2026-10-07" },
  7: { title: "Панель с декоративными швами", category: "Рельефные", date: "2026-10-07" },
  8: { title: "Профильный багет из дуба", category: "Тиражированные", date: "2026-10-07" },
  9: { title: "Секционный стеллаж", category: "Интересные", date: "2026-10-07" },
  10: { title: "Арочный молдинг", category: "Интересные", date: "2026-10-07" },
};

export const fallbackMeta = {
  category: "Интересные",
  date: "2000-01-01",
} as const satisfies Pick<PortfolioMeta, "category" | "date">;

/**
 * Размеры плиток бенто-сетки (5 колонок) по порядку на экране.
 * Цикл из 6 плиток собирает 3 полных ряда; первые 4 — 2 полных ряда.
 */
export const bentoSpans = [
  "md:col-span-2 md:row-span-2",
  "md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-2",
] as const;

export function compareWorks(a: PortfolioWork, b: PortfolioWork) {
  return a.date.localeCompare(b.date) || a.id - b.id;
}
