import ruContent from "@/content/ru.json";

/**
 * Тексты русской версии лежат в content/ru.json (а казахской — в content/kk.json): их правят из админки,
 * поэтому здесь только типы. Названия проектов portfolio.titles в JSON хранятся по строковому номеру.
 */
type Content = typeof ruContent;

export type Dictionary = Omit<Content, "portfolio"> & {
  portfolio: Omit<Content["portfolio"], "titles"> & { titles: Record<number, string> };
};

export const ru: Dictionary = ruContent;
