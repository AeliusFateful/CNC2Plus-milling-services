"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { useI18n } from "@/components/i18n-provider";
import { withBasePath } from "@/lib/base-path";
import type { PortfolioWork } from "@/lib/portfolio-meta";
import { cn } from "@/lib/utils";

export type HeroVideo = Pick<PortfolioWork, "id" | "title"> & { src: string };

// Видео играет не дольше стольких секунд; более короткое сменяется сразу по окончании.
const MAX_SECONDS = 10;
// Следующий ролик начинает загружаться, когда текущий проиграл столько секунд (или половину, если он короче).
const PRELOAD_AFTER_SECONDS = 4;
// Длительность плавной смены роликов, мс.
const FADE_MS = 700;
// Видео только от 1024px и без «уменьшения движения».
const VIDEO_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function useVideoEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(VIDEO_QUERY);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => setEnabled(query.matches && !connection?.saveData);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return enabled;
}

// Фото-фон — LCP-кандидат: на телефоне грузится уменьшенная копия, а в <head> добавляется preload с тем же srcset.
const HERO_PHOTO = withBasePath("/images/hero-cnc.webp");
const HERO_PHOTO_SRCSET = `${withBasePath("/images/hero-cnc-768.webp")} 768w, ${HERO_PHOTO} 1024w`;

type Slot = 0 | 1;

/**
 * Видео по очереди в двух слоях <video>: пока играет один, во втором (когда ролик проиграл несколько секунд)
 * загружается следующий. Пока первое видео не загрузилось и не заиграло, виден только фон-фото.
 */
function HeroVideoPlayer({
  videos,
  visible,
  onTitle,
}: {
  videos: HeroVideo[];
  visible: boolean;
  onTitle: (video: HeroVideo | null) => void;
}) {
  const count = videos.length;
  const slotRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const switching = useRef(false);
  // Индекс ролика в каждом слое (null — слой пуст) и какой слой сейчас основной.
  const [pair, setPair] = useState<[number | null, number | null]>([0, null]);
  const [active, setActive] = useState<Slot>(0);
  const [playing, setPlaying] = useState<[boolean, boolean]>([false, false]);

  const setSlotPlaying = (slot: Slot, value: boolean) =>
    setPlaying((current) => (slot === 0 ? [value, current[1]] : [current[0], value]));

  // Основной слой играет, пока Hero на экране; вне экрана — пауза.
  useEffect(() => {
    const video = slotRefs[active].current;
    if (!video) return;
    if (visible) void video.play().catch(() => {});
    else video.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, active]);

  // Подпись — у ролика, который уже виден.
  useEffect(() => {
    const index = playing[active] ? pair[active] : null;
    onTitle(index === null ? null : videos[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, active, pair]);

  const preloadNext = () => {
    const other = (1 - active) as Slot;
    if (pair[other] !== null || pair[active] === null) return;
    setPair((current) => {
      const updated: [number | null, number | null] = [...current];
      updated[other] = (pair[active]! + 1) % count;
      return updated;
    });
  };

  const advance = () => {
    if (switching.current) return;
    switching.current = true;
    const next = (1 - active) as Slot;
    preloadNext(); // если короткий ролик закончился раньше времени предзагрузки
    setActive(next);
    // Когда следующий заиграл (см. onPlaying), прежний слой освобождается; страхуемся таймером.
    window.setTimeout(() => {
      slotRefs[active].current?.pause();
      setSlotPlaying(active, false);
      setPair((current) => {
        const updated: [number | null, number | null] = [...current];
        updated[active] = null;
        return updated;
      });
      switching.current = false;
    }, FADE_MS * 2);
  };

  return (
    <>
      {([0, 1] as const).map((slot) => {
        const index = pair[slot];
        const shown = playing[slot] && (slot === active || !playing[active]);
        return (
          <video
            key={slot}
            ref={slotRefs[slot]}
            src={index === null ? undefined : videos[index].src}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden
            onCanPlay={(event) => {
              if (slot === active && visible) void event.currentTarget.play().catch(() => {});
            }}
            onPlaying={() => setSlotPlaying(slot, true)}
            onTimeUpdate={(event) => {
              if (slot !== active) return;
              const { currentTime, duration } = event.currentTarget;
              if (currentTime >= Math.min(PRELOAD_AFTER_SECONDS, (duration || MAX_SECONDS) / 2)) preloadNext();
              if (currentTime >= MAX_SECONDS) advance();
            }}
            onEnded={() => slot === active && advance()}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity",
              shown ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          />
        );
      })}
    </>
  );
}

/**
 * Фон Hero. Фото показывается всегда (на телефоне — только оно). От 1024px поверх него монтируется
 * плеер видео из портфолио (от новых проектов к старым), а справа снизу — название проекта.
 */
export function HeroBackground({ videos }: { videos: HeroVideo[] }) {
  const { workTitle } = useI18n();
  preload(HERO_PHOTO, { as: "image", imageSrcSet: HERO_PHOTO_SRCSET, imageSizes: "100vw", fetchPriority: "high" });
  const enabled = useVideoEnabled() && videos.length > 0;
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [title, setTitle] = useState<HeroVideo | null>(null);

  // Вне экрана ролики стоят на паузе: не тратим трафик и процессор.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={rootRef} className="absolute inset-0 opacity-60">
        <img
          src={HERO_PHOTO}
          srcSet={HERO_PHOTO_SRCSET}
          sizes="100vw"
          alt=""
          width={1024}
          height={1024}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
        {enabled && <HeroVideoPlayer videos={videos} visible={visible} onTitle={setTitle} />}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-transparent" />
      </div>

      {enabled && title && (
        <p
          key={title.id}
          className="pointer-events-none absolute right-6 bottom-6 z-10 max-w-sm text-right text-sm text-foreground/80 drop-shadow-[0_1px_3px_rgb(0_0_0/0.8)] animate-in fade-in duration-700"
        >
          {workTitle(title)}
        </p>
      )}
    </>
  );
}
