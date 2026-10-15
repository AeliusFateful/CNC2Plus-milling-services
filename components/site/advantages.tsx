"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/base-path";
import { useI18n } from "@/components/i18n-provider";
import { advantageVisuals as VISUALS } from "@/lib/sections-data";
import { SectionHeading } from "@/components/site/section-heading";

// Слайдер только на планшетах и десктопе; на мобильных остаётся вертикальный список карточек.
const SLIDER_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
// Сколько высот экрана прокрутки уходит на один переход между слайдами.
const SCROLL_PER_SLIDE = 0.8;
// Прозрачность слайда, когда он не в центре экрана.
const DIM_OPACITY = 0.15;
// Пауза в колесе мыши/тачпада (мс), после которой начинается доводка до слайда.
const WHEEL_PAUSE_MS = 90;
// Хвост инерции тачпада (мелкие дельты) не считается прокруткой и не откладывает доводку.
const WHEEL_TAIL_DELTA = 4;
// Длительность плавной доводки до слайда, с.
const SNAP_DURATION = 0.7;
const LAST = VISUALS.length - 1;
const pad = (n: number) => String(n).padStart(2, "0");

export function Advantages() {
  const { t } = useI18n();
  const ADVANTAGES = t.advantages.items;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const slides = slideRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!section || !track || slides.length < 2) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const mm = gsap.matchMedia();

    mm.add(SLIDER_QUERY, () => {
      // Включает горизонтальную раскладку (CSS завязан на data-slider).
      section.dataset.slider = "true";

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * SCROLL_PER_SLIDE * LAST}`,
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Запасная доводка для тач-экранов, клавиатуры и перетаскивания полосы прокрутки.
          // Колесо/тачпад обрабатываются ниже, и намного раньше.
          snap: { snapTo: 1 / LAST, delay: 0.15, duration: { min: 0.4, max: 0.8 }, ease: "power2.inOut" },
          onUpdate: (self) => {
            const current = Math.round(self.progress * LAST) + 1;
            if (counterRef.current) counterRef.current.textContent = pad(current);
          },
        },
      });

      // Лента слайдов едет справа налево на всю свою ширину минус один экран.
      tl.to(track, { xPercent: (-100 * LAST) / slides.length, duration: LAST }, 0);
      tl.fromTo(barRef.current, { scaleX: 1 / slides.length }, { scaleX: 1, duration: LAST }, 0);

      // Слайд проявляется, подъезжая к центру, и гаснет, уезжая влево.
      slides.forEach((slide, i) => {
        const content = slide.firstElementChild;
        if (i > 0) {
          tl.fromTo(
            content,
            { opacity: DIM_OPACITY, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 1 },
            i - 1,
          );
        }
        if (i < LAST) {
          tl.to(content, { opacity: DIM_OPACITY, scale: 0.85, duration: 1 }, i);
        }
      });

      // Колесо/тачпад: доводка начинается почти сразу после паузы в прокрутке, не дожидаясь
      // конца инерции, и идёт плавно в сторону движения.
      const st = tl.scrollTrigger!;
      let snapTween: gsap.core.Tween | null = null;
      let direction = 0;
      let pauseTimer = 0;

      const snapToSlide = () => {
        if (!st.isActive || snapTween) return;
        const raw = st.progress * LAST;
        const index = Math.min(
          LAST,
          Math.max(0, direction > 0 ? Math.ceil(raw - 0.02) : Math.floor(raw + 0.02)),
        );
        const y = st.start + (index / LAST) * (st.end - st.start);
        if (Math.abs(y - window.scrollY) < 1) return;
        snapTween = gsap.to(window, {
          scrollTo: { y, autoKill: false },
          duration: SNAP_DURATION,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            snapTween = null;
          },
        });
      };

      const onWheel = (e: WheelEvent) => {
        // Пока идёт доводка, остаток инерции гасим, чтобы он не сбивал движение.
        if (snapTween) {
          e.preventDefault();
          return;
        }
        if (!st.isActive || Math.abs(e.deltaY) < WHEEL_TAIL_DELTA) return;
        direction = Math.sign(e.deltaY);
        window.clearTimeout(pauseTimer);
        pauseTimer = window.setTimeout(snapToSlide, WHEEL_PAUSE_MS);
      };
      const cancelSnap = () => {
        snapTween?.kill();
        snapTween = null;
      };

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", cancelSnap, { passive: true });
      window.addEventListener("keydown", cancelSnap);

      return () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchstart", cancelSnap);
        window.removeEventListener("keydown", cancelSnap);
        window.clearTimeout(pauseTimer);
        snapTween?.kill();
        delete section.dataset.slider;
        if (counterRef.current) counterRef.current.textContent = pad(1);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="advantages"
      ref={sectionRef}
      className="group/slider relative isolate border-t border-border/60 bg-card/40 py-16 sm:py-24 data-[slider=true]:flex data-[slider=true]:h-dvh data-[slider=true]:flex-col data-[slider=true]:overflow-hidden data-[slider=true]:py-0"
    >
      <div className="relative z-10 mx-auto w-full max-w-360 px-6 group-data-[slider=true]/slider:pt-24">
        <SectionHeading
          eyebrow={t.advantages.eyebrow}
          title={t.advantages.title}
          className="group-data-[slider=true]/slider:mx-auto group-data-[slider=true]/slider:text-center"
        />
      </div>

      <div className="mt-14 group-data-[slider=true]/slider:mt-0 group-data-[slider=true]/slider:min-h-0 group-data-[slider=true]/slider:flex-1">
        <div
          ref={trackRef}
          style={{ "--n": ADVANTAGES.length } as React.CSSProperties}
          className="mx-auto grid max-w-360 grid-cols-1 gap-x-10 gap-y-12 px-6 sm:grid-cols-2 lg:grid-cols-3 group-data-[slider=true]/slider:mx-0 group-data-[slider=true]/slider:flex group-data-[slider=true]/slider:h-full group-data-[slider=true]/slider:w-[calc(var(--n)*100vw)] group-data-[slider=true]/slider:max-w-none group-data-[slider=true]/slider:gap-0 group-data-[slider=true]/slider:px-0 will-change-transform"
        >
          {ADVANTAGES.map(({ title, description }, index) => {
            const { icon: Icon, background } = VISUALS[index];
            return (
            <div
              key={title}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="sm:max-md:last:col-span-2 sm:max-md:last:w-[calc((100%-2.5rem)/2)] sm:max-md:last:justify-self-center group-data-[slider=true]/slider:relative group-data-[slider=true]/slider:flex group-data-[slider=true]/slider:w-screen group-data-[slider=true]/slider:shrink-0 group-data-[slider=true]/slider:items-center group-data-[slider=true]/slider:justify-center group-data-[slider=true]/slider:px-6"
            >
              <div className="group-data-[slider=true]/slider:text-outline flex gap-3 max-xs:grid max-xs:grid-cols-[2.75rem_1fr] max-xs:items-center max-xs:gap-y-3 group-data-[slider=true]/slider:max-w-4xl group-data-[slider=true]/slider:flex-col group-data-[slider=true]/slider:items-center group-data-[slider=true]/slider:gap-8 group-data-[slider=true]/slider:text-center">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-primary/30 group-data-[slider=true]/slider:size-auto group-data-[slider=true]/slider:rounded-none group-data-[slider=true]/slider:border-0">
                  <Icon
                    className="size-5 shrink-0 text-primary group-data-[slider=true]/slider:size-20 lg:group-data-[slider=true]/slider:size-24"
                    strokeWidth={1.25}
                  />
                </span>
                {/* До xs описание уходит под иконку на всю ширину: контейнер «растворяется» в сетке. */}
                <div className="max-xs:contents">
                  <h3 className="text-lg font-semibold tracking-[0.02em] text-foreground group-data-[slider=true]/slider:text-4xl lg:group-data-[slider=true]/slider:text-5xl">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground max-xs:col-span-2 max-xs:mt-0 group-data-[slider=true]/slider:mt-6 group-data-[slider=true]/slider:text-xl lg:group-data-[slider=true]/slider:text-2xl">
                    {description}
                  </p>
                </div>
              </div>

              {/* Фото между заголовком секции и кнопкой (заходит вниз под счётчик с линией), только у этого слайда: едет вместе с ним, поверх — затемнение для читаемости. */}
              {background && (
                <div
                  aria-hidden
                  className="absolute top-5 -bottom-14 left-1/2 -z-10 hidden w-full max-w-360 -translate-x-1/2 px-4 group-data-[slider=true]/slider:block md:px-6"
                >
                  <div className="relative size-full overflow-hidden rounded-xl">
                    <Image
                      src={withBasePath(background)}
                      alt=""
                      fill
                      sizes="(min-width: 1440px) 1440px, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-background/70" />
                  </div>
                </div>
              )}
            </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-14 flex w-full max-w-360 flex-col items-center gap-6 px-4 group-data-[slider=true]/slider:mt-0 group-data-[slider=true]/slider:gap-16 group-data-[slider=true]/slider:pb-11 md:px-6">
        <div className="hidden w-full max-w-md items-center gap-4 font-mono text-sm text-muted-foreground group-data-[slider=true]/slider:flex">
          <span className="tabular-nums">
            <span ref={counterRef} className="text-primary">
              01
            </span>
            /{pad(ADVANTAGES.length)}
          </span>
          <div className="h-px flex-1 bg-border">
            <div ref={barRef} className="h-full origin-left bg-primary" />
          </div>
        </div>

        <Button
          render={<a href="#contact" />}
          nativeButton={false}
          size="lg"
          className="h-14 px-8 text-base"
        >
          {t.nav.contact}
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
