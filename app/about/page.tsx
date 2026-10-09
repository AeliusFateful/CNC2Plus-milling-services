import type { Metadata } from "next";
import Image from "next/image";
import { Handshake, MessageCircle, Ruler, ShieldCheck } from "lucide-react";
import { ContactSection } from "@/components/site/contact-section";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { withBasePath } from "@/lib/base-path";

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
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <SectionHeading
                  as="h1"
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
                    src={withBasePath("/images/Owner/Boss_CNC.png")}
                    alt="Иван Жуков, владелец CNC++"
                    fill
                    className="object-cover object-[35%_50%]"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
