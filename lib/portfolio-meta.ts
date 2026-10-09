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
  photos: string[];
  video?: string;
};

type PortfolioMeta = Pick<PortfolioWork, "title" | "category">;

/**
 * Как добавить проект: положите в `public/images/portfolio/` файлы
 * `N.video.mp4` (видео, необязательно) и `N.1.jpg`, `N.2.jpg`… (фото) —
 * проект появится сам с названием «Проект N». Чем больше номер, тем новее
 * проект. Чтобы задать название и категорию, добавьте строку с номером N сюда.
 */
export const portfolioMeta: Record<number, PortfolioMeta> = {
  1: { title: "Матрицы-формы из МДФ", category: "Рельефные" },
  2: { title: "Угловые элементы: дерево и пластик", category: "Тиражированные" },
  3: { title: "Слоёная рамка из МДФ", category: "Интересные" },
  4: { title: "Резной орнамент", category: "Интересные" },
  5: { title: "Ступенчатые чаши", category: "Интересные" },
  6: { title: "Рельефные фасадные панели", category: "Рельефные" },
  7: { title: "Быстрая и качественная без сколов резка HPL панелей", category: "Тиражированные" },
  8: { title: "Фрезеровка штапиков из дуба по образцам", category: "Тиражированные" },
  9: { title: "Каркас для скругленных углов тумбочки", category: "Тиражированные" },
  10: { title: "Рамка под зеркало", category: "Интересные" },
  11: { title: "Матрица для заливки бетонных форм. 15м на 9м", category: "Рельефные" },
  12: { title: "Заготовка ниши с подсветкой в шкаф c углами в 3D", category: "Интересные" },
};

export const fallbackMeta = {
  category: "Интересные",
} as const satisfies Pick<PortfolioMeta, "category">;

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
  return a.id - b.id;
}
