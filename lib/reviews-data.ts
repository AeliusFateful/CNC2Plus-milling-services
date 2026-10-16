/**
 * Здесь только то, что не зависит от языка: фото отзывов и их порядок.
 * Автор, дата и текст (по тому же порядку) лежат в словарях lib/i18n (`reviews.items`).
 */
export type ReviewVisual = {
  /** Фото, приложенное к отзыву: показывается в карточке и открывается в модальном окне. */
  photo?: string;
};

export const reviewVisuals: readonly ReviewVisual[] = [
  {},
  { photo: "/images/reviews/drum-platform.webp" },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];
