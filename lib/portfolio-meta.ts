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
  1: { title: "Матрица и пуансон для формирования мойки из акрилового камня", category: "Рельефные" },
  2: { title: "Фрезеровка заглушек для синтезатора, из дерева по образцу", category: "Тиражированные" },
  3: { title: "Дизайнерские рамки для зеркал", category: "Интересные" },
  4: { title: "3D элементы для снятия силиконовых форм", category: "Интересные" },
  5: { title: "Элемент мебели - ножка", category: "Интересные" },
  6: { title: "Двери с фрезировкой аля штапик", category: "Рельефные" },
  7: { title: "Быстрая и качественная без сколов резка HPL панелей", category: "Тиражированные" },
  8: { title: "Фрезеровка штапиков из дуба по образцам", category: "Тиражированные" },
  9: { title: "Каркас для скругленных углов тумбочки", category: "Тиражированные" },
  10: { title: "Рамка под зеркало", category: "Интересные" },
  11: { title: "Матрица для заливки бетонных форм. 1.5м x 9м", category: "Рельефные" },
  12: { title: "Заготовка ниши с подсветкой в шкаф c углами в 3D", category: "Интересные" },
  13: { title: "Заготовки для жалюзи фасадов из массива сосны", category: "Тиражированные" },
  14: { title: "Матрицы для формирования мойки из акрилового камня", category: "Тиражированные" },
  15: { title: "Дизайнерская рама для зеркала", category: "Тиражированные" },
  16: { title: "Нанесение рисунка на сосновые доски, фрезерованием по эскизам клиента", category: "Тиражированные" },
  17: { title: "Угловой элемент с 3D радиусом и рефлёнкой", category: "Рельефные" },
  18: { title: "Шаблон для загибки акрилового камня", category: "Интересные" },
  19: { title: "Сборный кухонный фасад из двух элементов, рамка и решетка", category: "Интересные" },
  20: { title: "Один из видов фрезеровки фасадов по референсу клиента", category: "Интересные" },
  21: { title: "3D фасады", category: "Рельефные" },
};

export const fallbackMeta = {
  category: "Интересные",
} as const satisfies Pick<PortfolioMeta, "category">;

/** Сетка портфолио: одна колонка на мобильных, 10 колонок от md (см. getBentoSpan). */
export const bentoGridClass =
  "grid auto-rows-108 grid-cols-1 grid-flow-dense gap-4 md:grid-cols-10 md:auto-rows-66";

/**
 * Размеры плиток бенто-сетки (10 колонок = 5 колонок × 2) по порядку на экране.
 * Цикл из 6 плиток собирает 3 полных ряда; первые две плитки делят пополам
 * общую ширину (3/5), остальные — как в сетке из 5 колонок.
 */
export const bentoSpans = [
  "md:col-span-3 md:row-span-2",
  "md:col-span-3 md:row-span-2",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-6",
  "md:col-span-4",
] as const;

/**
 * Каждый второй цикл схема отзеркалена по горизонтали: первые два ряда (плитки 1–4) меняются
 * местами слева направо, третий ряд (плитки 5–6) остаётся прежним. Колонки заданы явно,
 * остальное раскладывает grid-flow-dense.
 */
const mirroredBentoSpans = [
  "md:col-span-3 md:col-start-8 md:row-span-2",
  "md:col-span-3 md:col-start-5 md:row-span-2",
  "md:col-span-4 md:col-start-1",
  "md:col-span-4 md:col-start-1",
  "md:col-span-6",
  "md:col-span-4",
] as const;

export function getBentoSpan(index: number) {
  const position = index % bentoSpans.length;
  const isMirrored = Math.floor(index / bentoSpans.length) % 2 === 1;
  return (isMirrored ? mirroredBentoSpans : bentoSpans)[position];
}

export function compareWorks(a: PortfolioWork, b: PortfolioWork) {
  return a.id - b.id;
}
