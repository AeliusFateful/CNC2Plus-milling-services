import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Handshake, MapPin, MessageCircle, Phone, Ruler, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SocialLinks } from "@/components/site/social-links";
import { withBasePath } from "@/lib/base-path";
import { phones, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "О CNC++ — фрезерная резка ЧПУ в Астане",
  description:
    "CNC++ — цех фрезерной резки и гравировки ЧПУ в Астане. Изготавливаем детали из фанеры, МДФ, дерева и пластика: от единичных изделий до серий.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <section className="border-b border-border/60 py-12 md:py-16">
          <div className="mx-auto max-w-360 px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <SectionHeading
                  as="h1"
                  eyebrow="О компании"
                  title="CNC++ — фрезерная резка ЧПУ в Астане"
                  className="max-w-none"
                />
                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  CNC++ — цех фрезерной резки и гравировки ЧПУ в Астане. Изготавливаем детали из фанеры, МДФ, дерева, пластика и композитных материалов: мебельные фасады, декоративные панели, вывески и изделия по чертежу или эскизу — от одной детали до серии.
                </p>
                <dl className="mt-6 divide-y divide-border/60 border-y border-border/60" aria-label="Преимущества цеха CNC++">
                  <div className="grid grid-cols-[2.25rem_1fr] gap-4 py-5 transition-colors hover:bg-card/40">
                    <dt className="flex size-9 items-center justify-center rounded-md border border-primary/30 font-mono text-xs text-primary">01</dt>
                    <dd>
                      <strong className="block text-lg font-semibold tracking-[0.02em] text-foreground">Расчёт до запуска</strong>
                      <span className="mt-1 block text-base leading-relaxed text-muted-foreground">Материал, размеры и технология известны до запуска.</span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[2.25rem_1fr] gap-4 py-5 transition-colors hover:bg-card/40">
                    <dt className="flex size-9 items-center justify-center rounded-md border border-primary/30 font-mono text-xs text-primary">02</dt>
                    <dd>
                      <strong className="block text-lg font-semibold tracking-[0.02em] text-foreground">Точность для сборки без переделок</strong>
                      <span className="mt-1 block text-base leading-relaxed text-muted-foreground">Детали готовы к сборке, покраске или монтажу.</span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[2.25rem_1fr] gap-4 py-5 transition-colors hover:bg-card/40">
                    <dt className="flex size-9 items-center justify-center rounded-md border border-primary/30 font-mono text-xs text-primary">03</dt>
                    <dd>
                      <strong className="block text-lg font-semibold tracking-[0.02em] text-foreground">Макет из эскиза или идеи</strong>
                      <span className="mt-1 block text-base leading-relaxed text-muted-foreground">Подготовим файл для ЧПУ, если чертежа пока нет.</span>
                    </dd>
                  </div>
                </dl>
              </div>
              <figure className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card">
                <div className="relative aspect-4/3 flex-1 overflow-hidden md:aspect-auto">
                  <Image
                    src={withBasePath("/images/2026-09-23 22.36.16.jpg")}
                    alt="Вход в цех CNC++"
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Наш цех в Астане
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-12 md:py-16">
          <div className="mx-auto max-w-360 px-4 md:px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="Владелец CNC++"
                  title="Иван Жуков — лично отвечаю за результат"
                  className="max-w-none"
                />
                <p className="mt-6 max-w-none text-pretty text-lg leading-relaxed text-muted-foreground">
                  Я лично веду каждый заказ в CNC++: уточняю задачу до запуска, проверяю ключевые размеры и остаюсь на связи до выдачи готовых деталей. Это помогает избежать переделок, потери материала и непонятных сроков.
                </p>
                <dl className="mt-8 divide-y divide-border/60 border-y border-border/60">
                  <div className="grid grid-cols-[3.5rem_1fr] gap-4 py-5">
                    <dt className="flex size-11 items-center justify-center rounded-md border border-primary/30 text-primary">
                      <Handshake className="size-5" strokeWidth={1.5} />
                    </dt>
                    <dd>
                      <strong className="block text-lg font-semibold tracking-[0.02em] text-foreground">Знаю детали каждого заказа</strong>
                      <span className="mt-1 block leading-relaxed text-muted-foreground">Не передаю вашу задачу между менеджерами — сам держу в фокусе проект от расчёта до готовности.</span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[3.5rem_1fr] gap-4 py-5">
                    <dt className="flex size-11 items-center justify-center rounded-md border border-primary/30 text-primary">
                      <Ruler className="size-5" strokeWidth={1.5} />
                    </dt>
                    <dd>
                      <strong className="block text-lg font-semibold tracking-[0.02em] text-foreground">Проверяю важное до запуска</strong>
                      <span className="mt-1 block leading-relaxed text-muted-foreground">Согласовываем размеры, материал и технологию заранее, чтобы не тратить время и бюджет на исправления.</span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[3.5rem_1fr] gap-4 py-5">
                    <dt className="flex size-11 items-center justify-center rounded-md border border-primary/30 text-primary">
                      <MessageCircle className="size-5" strokeWidth={1.5} />
                    </dt>
                    <dd>
                      <strong className="block text-lg font-semibold tracking-[0.02em] text-foreground">Говорю с вами понятным языком</strong>
                      <span className="mt-1 block leading-relaxed text-muted-foreground">Если есть риск по срокам, материалу или макету, сообщаю до начала работ и предлагаю решение.</span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[3.5rem_1fr] gap-4 py-5">
                    <dt className="flex size-11 items-center justify-center rounded-md border border-primary/30 text-primary">
                      <ShieldCheck className="size-5" strokeWidth={1.5} />
                    </dt>
                    <dd>
                      <strong className="block text-lg font-semibold tracking-[0.02em] text-foreground">Отвечаю за качество фрезеровки</strong>
                      <span className="mt-1 block leading-relaxed text-muted-foreground">Контролирую результат, чтобы вы получили точные детали, готовые к следующему этапу работ.</span>
                    </dd>
                  </div>
                </dl>
              </div>
              <figure className="flex flex-col">
                <div className="relative aspect-3/4 flex-1 overflow-hidden rounded-xl bg-muted lg:aspect-auto">
                  <Image
                    src={withBasePath("/images/ivanTG.jpg")}
                    alt="Иван Жуков, владелец CNC++"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Владелец цеха CNC++</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-12 md:py-16">
          <div className="mx-auto max-w-360 px-4 md:px-6">
            <SectionHeading
              eyebrow="Контакты"
              title="Контакты цеха CNC++ в Астане"
              className="max-w-4xl"
            />
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-80 overflow-hidden rounded-xl border border-border/60">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d445.92159969510624!2d71.43588754926792!3d51.19432428677463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424580c0bea701b1%3A0x77efd08e423d9f72!2z0YPQuy4g0J3QuNC60L7Qu9Cw0Y8g0JPQvtCz0L7Qu9C70Y8gMjksINCh0YHRgtCw0L3QsCAwMjAwMDAsINCa0LDQt9Cw0YXRgdGC0LDQvQ!5e0!3m2!1sru!2sru!4v1789983943590!5m2!1sru!2sru"
                  title="Карта проезда в CNC++"
                  className="absolute inset-0 block size-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6 md:p-8">
                <a
                  href={`tel:${phones.href}`}
                  className="flex items-center gap-3 text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  <Phone className="size-5 text-primary" />
                  {phones.display}
                </a>
                <p className="mt-7 flex items-start gap-3 leading-relaxed text-muted-foreground">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                  {siteConfig.address.workshop}
                </p>
                <div className="mt-7 flex gap-3 text-muted-foreground">
                  <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div className="space-y-2">
                    {siteConfig.schedule.map(({ days, hours }) => (
                      <p key={days}>
                        {days}: {hours}
                      </p>
                    ))}
                  </div>
                </div>
                <SocialLinks className="mt-8" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
