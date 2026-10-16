"use client";

import { useI18n } from "@/components/i18n-provider";
import { withBasePath } from "@/lib/base-path";
import { siteConfig } from "@/lib/site-config";

export function Logo() {
  const { href } = useI18n();

  // Обычная ссылка, а не next/link: полная загрузка страницы перезагружает сайт и ведёт на главную.
  return (
    <a href={href("/")} className="text-xl font-bold">
      <img
        src={withBasePath("/images/logo main.svg")}
        alt={siteConfig.name}
        width={434}
        height={86}
        className="h-auto w-50"
      />
    </a>
  );
}
