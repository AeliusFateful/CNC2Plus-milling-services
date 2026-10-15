import { kk } from "@/lib/i18n/kk";
import { ru, type Dictionary } from "@/lib/i18n/ru";

export type Lang = "ru" | "kk";
export type { Dictionary };

const dictionaries: Record<Lang, Dictionary> = { ru, kk };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Префикс казахской версии сайта: русская лежит в корне, казахская — под /kk. */
const KK_PREFIX = "/kk";

/** Путь внутри сайта с учётом языка (без basePath): «/#faq» → «/kk#faq», «/portfolio» → «/kk/portfolio». */
export function localePath(lang: Lang, path: string): string {
  if (lang === "ru") return path;
  if (path === "/") return KK_PREFIX;
  if (path.startsWith("/#")) return `${KK_PREFIX}${path.slice(1)}`;
  return `${KK_PREFIX}${path}`;
}

/** Путь той же страницы на другом языке. */
export function switchLangPath(pathname: string, target: Lang): string {
  const base = pathname === KK_PREFIX ? "/" : pathname.startsWith(`${KK_PREFIX}/`) ? pathname.slice(KK_PREFIX.length) : pathname;
  return localePath(target, base || "/");
}
