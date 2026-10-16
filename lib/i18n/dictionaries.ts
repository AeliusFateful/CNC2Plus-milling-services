import type { Dictionary, Lang } from "@/lib/i18n";
import { kk } from "@/lib/i18n/kk";
import { ru } from "@/lib/i18n/ru";

const dictionaries: Record<Lang, Dictionary> = { ru, kk };

/**
 * Словари тянут за собой весь текст сайта, поэтому клиентские компоненты не импортируют этот файл:
 * layout отдаёт провайдеру только словарь своего языка (см. I18nProvider).
 */
export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
