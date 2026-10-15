import type { Metadata, Viewport } from "next";
import { withBasePath } from "@/lib/base-path";
import { getDictionary, type Lang } from "@/lib/i18n";

/** Метаданные корневого layout: название и описание сайта на нужном языке. */
export function rootMetadata(lang: Lang): Metadata {
  const { title, description } = getDictionary(lang).meta.home;
  return {
    title,
    description,
    icons: { icon: withBasePath("/images/icon.svg") },
  };
}

export const rootViewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#1d1b19",
};

/** Метаданные страницы: заголовок (и описание, если есть) на нужном языке. */
export function pageMetadata(
  lang: Lang,
  key: "home" | "portfolio" | "about" | "privacy" | "consent",
): Metadata {
  const meta: { title: string; description?: string } = getDictionary(lang).meta[key];
  return { title: meta.title, ...(meta.description ? { description: meta.description } : {}) };
}
