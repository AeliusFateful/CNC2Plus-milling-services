"use client";

import { createContext, useContext, useMemo } from "react";
import { withBasePath } from "@/lib/base-path";
import { localePath, type Dictionary, type Lang } from "@/lib/i18n";

type I18n = {
  lang: Lang;
  t: Dictionary;
  /** Путь с языковым префиксом без basePath: для next/link, у которого basePath добавляется сам. */
  path: (path: string) => string;
  /** Полный адрес с basePath: для обычных <a>. */
  href: (path: string) => string;
  /** Название проекта на языке сайта. */
  workTitle: (work: { id: number; title: string }) => string;
};

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({
  lang,
  dictionary,
  children,
}: {
  lang: Lang;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo<I18n>(
    () => ({
      lang,
      t: dictionary,
      path: (path) => localePath(lang, path),
      href: (path) => withBasePath(localePath(lang, path)),
      workTitle: (work) => {
        const localized = dictionary.portfolio.titles[work.id];
        if (localized) return localized;
        // Проекты без названия получают «Проект N» — для казахского переводим только префикс.
        if (lang === "kk" && /^Проект \d+$/.test(work.title)) return `${dictionary.portfolio.project} ${work.id}`;
        return work.title;
      },
    }),
    [lang, dictionary],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n должен вызываться внутри I18nProvider");
  return value;
}
