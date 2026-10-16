import type { Metadata } from "next";
import { RootDocument } from "@/components/root-document";
import { NotFoundPage } from "@/components/pages/not-found-page";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `${getDictionary("ru").notFound.title} / ${getDictionary("kk").notFound.title} - CNC++`,
};

/**
 * 404 для всего сайта. У русской и казахской версий разные корневые layout, а статический хостинг отдаёт
 * один и тот же 404.html на любой адрес, поэтому страница сразу на двух языках.
 */
export default function GlobalNotFound() {
  return (
    <RootDocument lang="ru">
      <NotFoundPage />
    </RootDocument>
  );
}
