"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PortfolioWork } from "@/lib/portfolio-meta";

type Slide = { type: "video" | "photo"; src: string };

const SWIPE_THRESHOLD = 50;

type PortfolioModalProps = {
  work: PortfolioWork | null;
  onClose: () => void;
};

export function PortfolioModal({ work, onClose }: PortfolioModalProps) {
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
      aria-label={work?.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto h-[min(85dvh,40rem)] w-[min(92vw,48rem)] max-h-none max-w-none overflow-hidden rounded-xl border border-white/10 bg-black p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {work && <Viewer key={work.id} work={work} onClose={onClose} />}
    </dialog>
  );
}

function Viewer({ work, onClose }: { work: PortfolioWork; onClose: () => void }) {
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
        swipeStart.current =
          event.target instanceof HTMLVideoElement ? null : event.clientX;
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
          <VideoSlide key={slide.src} src={slide.src} poster={work.photos[0]} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={`${work.title} — фото ${index + 1}`}
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-black/85 via-black/40 to-transparent px-4 pb-3 pt-14">
        <p className="text-sm text-white/90">{work.title}</p>
        {count > 1 && (
          <p className="shrink-0 font-mono text-sm text-white/70">
            {index + 1} / {count}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80"
      >
        <X className="size-5" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Предыдущий"
            className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Следующий"
            className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}
    </div>
  );
}

function VideoSlide({ src, poster }: { src: string; poster?: string }) {
  return (
    <video
      src={src}
      poster={poster}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      controlsList="nodownload noremoteplayback"
      className="absolute inset-0 size-full object-contain"
    />
  );
}
