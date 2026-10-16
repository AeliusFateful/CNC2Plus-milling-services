"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { PortfolioModal } from "@/components/site/portfolio-modal-lazy";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/base-path";
import type { PortfolioWork } from "@/lib/portfolio-meta";
import { reviewVisuals } from "@/lib/reviews-data";
import { siteConfig } from "@/lib/site-config";
import { sectionBodyMt, sectionCtaMt, sectionY } from "@/lib/section-spacing";

const STARS = [0, 1, 2, 3, 4];

/** Две первые буквы имени для аватара: «Вундер Вафля» → «ВВ», «Erlan Tolegenov» → «ET». */
function initials(author: string) {
  return author
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function Reviews() {
  const { t } = useI18n();
  // Фото из отзыва открывается в том же модальном окне, что и работы портфолио.
  const [openPhoto, setOpenPhoto] = useState<PortfolioWork | null>(null);

  return (
    <section id="reviews" className={`border-t border-border/60 bg-card/40 ${sectionY}`}>
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <SectionHeading
          eyebrow={t.reviews.eyebrow}
          title={t.reviews.title}
          description={t.reviews.description}
        />

        <ul className={`${sectionBodyMt} columns-1 gap-4 sm:columns-2 lg:columns-3`}>
          {t.reviews.items.map(({ author, date, text }, index) => {
            const photo = reviewVisuals[index]?.photo;
            const photoTitle = `${t.reviews.photoTitle}: ${author}`;
            return (
              <li
                key={author}
                className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border/60 bg-card"
              >
                {photo && (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenPhoto({
                        id: -(index + 1),
                        title: photoTitle,
                        category: "Интересные",
                        photos: [withBasePath(photo)],
                      })
                    }
                    aria-label={`${t.reviews.openPhoto}: ${author}`}
                    className="group relative block aspect-3/2 w-full cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                  >
                    <Image
                      src={withBasePath(photo)}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                )}

                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary"
                    >
                      {initials(author)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{author}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex gap-0.5" role="img" aria-label={t.reviews.rating}>
                          {STARS.map((star) => (
                            <Star key={star} className="size-4 fill-primary text-primary" />
                          ))}
                        </span>
                        <span>{date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 whitespace-pre-line text-pretty leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={`${sectionCtaMt} flex justify-center`}>
          <Button
            render={<a href={siteConfig.reviewsUrl} target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
            size="lg"
            className="h-14 px-8 text-base"
          >
            {t.reviews.all}
            <ArrowUpRight />
          </Button>
        </div>
      </div>

      <PortfolioModal work={openPhoto} onClose={() => setOpenPhoto(null)} />
    </section>
  );
}
