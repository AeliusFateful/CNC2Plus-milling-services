"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps as STEPS } from "@/lib/sections-data";
import { SectionHeading } from "@/components/site/section-heading";

const STACK_QUERY =
  "(min-width: 768px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";
// Отступ закрепления секции от верха экрана; компенсируется верхним padding секции.
const PIN_OFFSET_REM = 2.5;
const TOTAL =String(STEPS.length).padStart(2, "0");

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = sectionRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
    if (!stage || cards.length < 2) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(STACK_QUERY, () => {
      // Включает «стопочную» раскладку (CSS завязан на data-stack).
      stage.dataset.stack = "true";

      const stack = cards[0].parentElement as HTMLElement;
      const remPx = () => parseFloat(getComputedStyle(document.documentElement).fontSize);

      // Размеры меряем один раз на refresh, а не на каждое обращение — иначе при
      // ресайзе браузер многократно пересчитывает раскладку.
      let metrics: { peek: number; stackHeight: number } | null = null;
      const getMetrics = () => {
        if (!metrics) {
          const probe = document.createElement("div");
          probe.style.height = "var(--peek)";
          stage.appendChild(probe);
          const peek = probe.offsetHeight;
          probe.remove();
          metrics = { peek, stackHeight: stack.offsetHeight };
        }
        return metrics;
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          // Закрепляем чуть ниже верха экрана (под шапкой), а не вплотную к нему.
          start: () => `top ${PIN_OFFSET_REM * remPx()}px`,
          end: () => `+=${window.innerHeight * 0.7 * tl.duration()}`,
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            metrics = null;
          },
        },
      });

      // Карточки по очереди выезжают из-под нижнего края стопки (а не с края экрана)
      // и ложатся друг на друга — так они движутся ближе друг к другу.
      cards.slice(1).forEach((card, k) => {
        tl.fromTo(
          card,
          { y: () => getMetrics().stackHeight },
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
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    };
    scrollToHash();
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
      scrollToHash();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="group/stage border-t border-border/60 bg-card/40 pt-24 pb-16 [--peek:4rem] data-[stack=true]:min-h-dvh data-[stack=true]:overflow-hidden data-[stack=true]:pt-14 data-[stack=true]:pb-6"
    >
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading eyebrow="Процесс" title="Как мы работаем" />
      </div>

      <div
        style={{ "--n": STEPS.length } as React.CSSProperties}
        className="mt-8 group-data-[stack=true]/stage:mt-6"
      >
        <div className="mx-auto flex max-w-360 flex-col gap-6 px-4 group-data-[stack=true]/stage:gap-0 md:px-6">
          <div className="flex flex-col gap-6 group-data-[stack=true]/stage:relative group-data-[stack=true]/stage:block group-data-[stack=true]/stage:overflow-hidden group-data-[stack=true]/stage:h-[calc(var(--card-h)+(var(--n)-1)*var(--peek))] group-data-[stack=true]/stage:[--card-h:max(15rem,min(62dvh,calc(100dvh-15rem-(var(--n)-1)*var(--peek))))]">
            {STEPS.map(({ icon: Icon, number, title, description, image }, index) => (
              <div
                key={number}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{ zIndex: index }}
                className="grid grid-cols-1 overflow-hidden rounded-xl will-change-transform contain-layout contain-paint border border-border/60 bg-card md:grid-cols-[3fr_2fr] lg:grid-cols-2 group-data-[stack=true]/stage:absolute group-data-[stack=true]/stage:inset-x-0 group-data-[stack=true]/stage:top-0 group-data-[stack=true]/stage:h-(--card-h)"
              >
                <div className="flex min-h-0 flex-col justify-between gap-3 p-5 md:p-4 lg:gap-4 lg:p-6">
                  <Icon
                    className="hidden size-8 shrink-0 text-primary group-data-[stack=true]/stage:block"
                    strokeWidth={1.5}
                  />

                  <div>
                    <div className="mb-5 flex items-start gap-3 group-data-[stack=true]/stage:mb-0 group-data-[stack=true]/stage:block">
                      <Icon
                        className="size-8 shrink-0 text-primary group-data-[stack=true]/stage:hidden"
                        strokeWidth={1.5}
                      />
                      <h3 className="min-w-0 flex-1 text-2xl leading-tight font-semibold tracking-[0.02em] text-foreground md:text-xl lg:text-3xl">
                        {title}
                      </h3>
                      <div className="shrink-0 font-mono leading-none font-bold text-primary/25 group-data-[stack=true]/stage:hidden">
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
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
