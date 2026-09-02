import { MapPin, Clock } from "lucide-react";
import { SocialLinks } from "@/components/site/social-links";
import { footerNavColumns } from "@/lib/navigation";
import { phones, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-16">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <a href="#top" className="text-2xl font-bold text-foreground">
              {siteConfig.name}
            </a>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Фрезерная резка и гравировка ЧПУ по дереву. Мебельные детали,
              декоративные панели, вывески и интерьерные изделия на заказ.
            </p>
            <div className="mt-6 space-y-1 text-sm text-muted-foreground">
              <p className="mb-2">ИП Жуков Иван Михайлович</p>
              <p>ИИН 000000000000</p>
              <p>БИН - 000000000000</p>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Разделы
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
              {footerNavColumns.map((column, i) => (
                <ul key={i} className="space-y-3">
                  {column.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Контакты
            </h3>
            <a
              href={`tel:${phones.href}`}
              className="mt-4 block text-lg font-medium text-foreground transition-colors hover:text-primary"
            >
              {phones.display}
            </a>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                {siteConfig.address.full}
              </p>
              <div className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>{siteConfig.schedule.weekdays}</p>
                  <p>{siteConfig.schedule.saturday}</p>
                  <p>{siteConfig.schedule.sunday}</p>
                </div>
              </div>
            </div>
            <SocialLinks className="mt-6" />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 {siteConfig.name}. Все права защищены.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="/privacy"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Политика конфиденциальности
            </a>
            <a
              href="/consent"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Согласие на обработку персональных данных
            </a>
          </div>
        </div>

        <div className="border-t border-border/60 mt-8 flex justify-center items-center font-serif md:text-xl text-muted-foreground">
          <a
            href="https://github.com/AeliusFateful"
            target="_blank"
            rel="noreferrer"
            className="mt-8 transition-colors hover:text-primary"
          >
            <span>Разработка сайта </span>
            <span>- Aelius Fateful</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
