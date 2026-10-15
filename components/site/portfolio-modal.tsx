"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play, X } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import type { PortfolioWork } from "@/lib/portfolio-meta";
import { cn } from "@/lib/utils";

type Slide = { type: "video" | "photo"; src: string };

const SWIPE_THRESHOLD = 50;
// Через сколько мс без движения мыши в полноэкранном режиме скрываются элементы управления.
const FULLSCREEN_IDLE_MS = 1500;

// Круглые кнопки поверх медиа и затемнение под названием вверху.
const roundButtonClass =
  "absolute flex size-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80";
const topFadeClass =
  "pointer-events-none absolute inset-x-0 top-0 bg-linear-to-b from-black/85 via-black/40 to-transparent pb-14";

type PortfolioModalProps = {
  work: PortfolioWork | null;
  onClose: () => void;
};

export function PortfolioModal({ work, onClose }: PortfolioModalProps) {
  const { workTitle } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (work && !dialog.open) dialog.showModal();
    if (!work && dialog.open) dialog.close();
  }, [work]);

  useEffect(() => {
    if (!work) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [work]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-label={work ? workTitle(work) : undefined}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto h-[min(92dvh,56rem)] w-[min(96vw,80rem)] max-h-none max-w-none overflow-hidden rounded-xl border border-white/10 bg-black p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {work && <Viewer key={work.id} work={work} onClose={onClose} />}
    </dialog>
  );
}

function Viewer({ work, onClose }: { work: PortfolioWork; onClose: () => void }) {
  const { t, workTitle } = useI18n();
  const title = workTitle(work);
  const slides: Slide[] = [
    ...(work.video ? [{ type: "video" as const, src: work.video }] : []),
    ...work.photos.map((src) => ({ type: "photo" as const, src })),
  ];
  const [index, setIndex] = useState(0);
  const swipeStart = useRef<number | null>(null);
  const count = slides.length;
  const slide = slides[index];

  const go = useCallback(
    (step: number) => setIndex((current) => (current + step + count) % count),
    [count],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Стрелки на ползунке перемотки двигают видео, а не листают слайды.
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  return (
    <div
      className="absolute inset-0 touch-pan-y select-none"
      onPointerDown={(event) => {
        // На видео горизонтальное движение — это перемотка, а не листание.
        // Элементы управления видео тоже не должны листать слайды.
        const onVideo =
          event.target instanceof Element &&
          event.target.closest("video, [data-no-swipe]");
        swipeStart.current = onVideo ? null : event.clientX;
      }}
      onPointerUp={(event) => {
        if (swipeStart.current === null) return;
        const delta = event.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta > 0 ? -1 : 1);
      }}
    >
      {slide ? (
        slide.type === "video" ? (
          <VideoSlide key={slide.src} src={slide.src} poster={work.photos[0]} title={title} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={`${title} — ${t.modal.photo} ${index + 1}`}
            draggable={false}
            className="absolute inset-0 size-full object-contain"
          />
        )
      ) : null}

      {/* Соседние фото подгружаем заранее */}
      {slides
        .filter((item, i) => item.type === "photo" && Math.abs(i - index) === 1)
        .map((item) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={item.src} src={item.src} alt="" className="hidden" />
        ))}

      <div className={cn(topFadeClass, "flex items-start gap-3 pt-4 pr-16 pl-4")}>
        {count > 1 && (
          <p className="shrink-0 font-mono text-sm text-white/70">
            {index + 1} / {count}
          </p>
        )}
        <p className="text-sm text-white/90">{title}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label={t.modal.close}
        className={cn(roundButtonClass, "right-3 top-3")}
      >
        <X className="size-5" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.modal.previous}
            className={cn(roundButtonClass, "left-3 top-1/2 -translate-y-1/2")}
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.modal.next}
            className={cn(roundButtonClass, "right-3 top-1/2 -translate-y-1/2")}
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}
    </div>
  );
}

function formatTime(seconds: number) {
  const total = Math.max(0, Math.floor(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

const controlButtonClass =
  "flex size-9 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20";

/** Видео всегда без звука: есть пауза, перемотка и полноэкранный режим. */
function VideoSlide({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const { t } = useI18n();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [idle, setIdle] = useState(false);
  const hideControls = fullscreen && idle;

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === wrapRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // В полноэкранном режиме элементы управления и курсор скрываются, если мышь не двигалась.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!fullscreen || !wrap) return;
    let timer = 0;
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), FULLSCREEN_IDLE_MS);
    };
    wake();
    wrap.addEventListener("pointermove", wake);
    wrap.addEventListener("pointerdown", wake);
    return () => {
      window.clearTimeout(timer);
      wrap.removeEventListener("pointermove", wake);
      wrap.removeEventListener("pointerdown", wake);
    };
  }, [fullscreen]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  const toggleFullscreen = () => {
    const wrap = wrapRef.current;
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!wrap || !video) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (wrap.requestFullscreen) void wrap.requestFullscreen();
    else video.webkitEnterFullscreen?.(); // iPhone: только системный плеер
  };

  return (
    <div ref={wrapRef} className="absolute inset-0 bg-black">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onVolumeChange={(e) => {
          // Звук включать нельзя ни при каких условиях.
          if (!e.currentTarget.muted) e.currentTarget.muted = true;
        }}
        className={cn(
          "absolute inset-0 size-full object-contain",
          hideControls ? "cursor-none" : "cursor-pointer",
        )}
      />

      {/* В полном экране заголовок модалки не виден, поэтому название дублируется здесь (без нумерации). */}
      {fullscreen && (
        <div
          className={cn(topFadeClass, "px-4 pt-4 transition-opacity duration-300", hideControls && "opacity-0")}
        >
          <p className="text-sm text-white/90">{title}</p>
        </div>
      )}

      <div
        data-no-swipe
        className={cn(
          "absolute inset-x-3 bottom-4 flex items-center gap-2 rounded-xl bg-black/60 px-2 py-1 backdrop-blur-sm transition-opacity duration-300",
          hideControls && "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? t.modal.pause : t.modal.play}
          className={controlButtonClass}
        >
          {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
        </button>
        <span className="w-10 shrink-0 text-right font-mono text-xs text-white/80">
          {formatTime(time)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.05}
          value={Math.min(time, duration || 0)}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (videoRef.current) videoRef.current.currentTime = next;
            setTime(next);
          }}
          aria-label={t.modal.seek}
          className="h-1 min-w-0 flex-1 cursor-pointer accent-primary"
        />
        <span className="w-10 shrink-0 font-mono text-xs text-white/80">
          {formatTime(duration)}
        </span>
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={fullscreen ? t.modal.exitFullscreen : t.modal.fullscreen}
          className={controlButtonClass}
        >
          {fullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
        </button>
      </div>
    </div>
  );
}
