"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { loadGsap, scrollToHash, whenNear, type GsapModules } from "@/lib/gsap-lazy";
import { withBasePath } from "@/lib/base-path";
import { useI18n } from "@/components/i18n-provider";
import { processVisuals as STEPS } from "@/lib/sections-data";
import { SectionHeading } from "@/components/site/section-heading";

const STACK_QUERY =
  "(min-width: 768px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";
// Отступ закрепления секции от верха экрана; компенсируется верхним padding секции.
const PIN_OFFSET_REM = 2.5;
// Насколько ниже нижнего края экрана (в долях высоты окна) стартуют карточки.
const START_BELOW_SCREEN = 0.3;
const TOTAL =String(STEPS.length).padStart(2, "0");

/** Включает «стопочную» раскладку с закреплением секции; возвращает функцию отката. */
function setupStack({ gsap, ScrollTrigger }: GsapModules, stage: HTMLElement, cards: HTMLDivElement[]) {
  const mm = gsap.matchMedia();

  mm.add(STACK_QUERY, () => {
    // Включает «стопочную» раскладку (CSS завязан на data-stack).
    stage.dataset.stack = "true";

    const stack = cards[0].parentElement as HTMLElement;
    const remPx = () => parseFloat(getComputedStyle(document.documentElement).fontSize);

    // Размеры меряем один раз на refresh, а не на каждое обращение — иначе при
    // ресайзе браузер многократно пересчитывает раскладку.
    let metrics: { peek: number; stackOffset: number } | null = null;
    const getMetrics = () => {
      if (!metrics) {
        const probe = document.createElement("div");
        probe.style.height = "var(--peek)";
        stage.appendChild(probe);
        const peek = probe.offsetHeight;
        probe.remove();
        // Смещение стопки от верха секции: нужно, чтобы карточки стартовали у нижнего края экрана.
        const stackOffset = stack.getBoundingClientRect().top - stage.getBoundingClientRect().top;
        metrics = { peek, stackOffset };
      }
      return metrics;
    };

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage,
        // Закрепляем чуть ниже верха экрана (под шапкой), а не вплотную к нему.
        start: () => `top ${PIN_OFFSET_REM * remPx()}px`,
        end: () => `+=${window.innerHeight * 0.6 * tl.duration()}`,
        pin: true,
        scrub: 0.3,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: () => {
          metrics = null;
        },
      },
    });

    // Карточки по очереди выезжают с нижнего края экрана и ложатся друг на друга.
    cards.slice(1).forEach((card, k) => {
      tl.fromTo(
        card,
        {
          // Выезжают с нижнего края экрана, а не из-под обрезанной границы стопки.
          y: () =>
            window.innerHeight * (1 + START_BELOW_SCREEN) -
            (PIN_OFFSET_REM * remPx() + getMetrics().stackOffset),
        },
        { y: () => (k + 1) * getMetrics().peek, duration: 1, force3D: true },
        k,
      );
    });

    return () => {
      delete stage.dataset.stack;
    };
  });

  // Пин добавляет высоту выше якоря (#contact и т.п.), поэтому позицию, выставленную
  // браузером до инициализации, нужно пересчитать после refresh.
  scrollToHash();
  document.fonts?.ready.then(() => {
    ScrollTrigger.refresh();
    scrollToHash();
  });

  return () => mm.revert();
}

export function Process() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = sectionRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
    if (!stage || cards.length < 2) return;

    let cancelled = false;
    let revert: (() => void) | undefined;
    const stopWaiting = whenNear(stage, async () => {
      const modules = await loadGsap();
      if (!cancelled) revert = setupStack(modules, stage, cards);
    });

    return () => {
      cancelled = true;
      stopWaiting();
      revert?.();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="group/stage border-t border-border/60 bg-card/40 pt-12 pb-10 sm:pt-20 sm:pb-14 [--peek:4rem] data-[stack=true]:min-h-dvh data-[stack=true]:overflow-hidden data-[stack=true]:pt-14 data-[stack=true]:pb-6"
    >
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />
      </div>

      <div
        style={{ "--n": STEPS.length } as React.CSSProperties}
        className="mt-8 group-data-[stack=true]/stage:mt-6 md:mt-12"
      >
        <div className="mx-auto flex max-w-360 flex-col gap-6 px-4 group-data-[stack=true]/stage:gap-0 md:px-6">
          <div className="flex flex-col gap-6 group-data-[stack=true]/stage:relative group-data-[stack=true]/stage:block group-data-[stack=true]/stage:h-[calc(var(--card-h)+(var(--n)-1)*var(--peek))] group-data-[stack=true]/stage:[--card-h:max(15rem,min(50dvh,calc(100dvh-15rem-(var(--n)-1)*var(--peek))))]">
            {STEPS.map(({ icon: Icon, number, image }, index) => {
              const { title, description } = t.process.steps[index];
              return (
              <div
                key={number}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{ zIndex: index }}
                className="grid grid-cols-1 overflow-hidden rounded-xl will-change-transform contain-layout contain-paint border-[0.5px] border-primary/50 bg-card group-data-[stack=true]/stage:not-first:shadow-[0_-30px_44px_-22px_rgb(0_0_0/0.6)] md:grid-cols-2 group-data-[stack=true]/stage:absolute group-data-[stack=true]/stage:inset-x-0 group-data-[stack=true]/stage:top-0 group-data-[stack=true]/stage:h-(--card-h)"
              >
                <div className="flex min-h-0 flex-col justify-between gap-3 p-5 md:p-4 lg:gap-4 lg:p-6">
                  <Icon
                    className="hidden size-8 shrink-0 text-primary group-data-[stack=true]/stage:block"
                    strokeWidth={1.5}
                  />

                  <div>
                    <div className="mb-5 flex items-start gap-3 max-md:items-center group-data-[stack=true]/stage:mb-0 group-data-[stack=true]/stage:block">
                      <Icon
                        className="size-8 shrink-0 text-primary group-data-[stack=true]/stage:hidden"
                        strokeWidth={1.5}
                      />
                      <h3 className="min-w-0 flex-1 text-xl leading-tight font-semibold tracking-[0.02em] text-foreground lg:text-3xl">
                        {title}
                      </h3>
                      <div className="shrink-0 font-mono leading-none font-bold text-primary/85 group-data-[stack=true]/stage:hidden">
                        <span className="text-3xl md:text-4xl">{number}</span>
                        <span className="text-lg md:text-xl">/{TOTAL}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-lg leading-relaxed text-muted-foreground md:mt-2 md:text-base lg:mt-3 lg:text-xl">
                      {description}
                    </p>
                  </div>

                  <div className="hidden font-mono leading-none font-bold text-primary/25 group-data-[stack=true]/stage:block">
                    <span className="text-4xl lg:text-6xl">{number}</span>
                    <span className="text-xl lg:text-3xl">/{TOTAL}</span>
                  </div>
                </div>

                <div className="relative min-h-64 bg-muted md:min-h-0">
                  <Image
                    src={withBasePath(image)}
                    alt={title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
