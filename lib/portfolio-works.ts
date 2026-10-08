import { readdirSync } from "node:fs";
import path from "node:path";
import { withBasePath } from "@/lib/base-path";
import {
  compareWorks,
  fallbackMeta,
  portfolioMeta,
  type PortfolioWork,
} from "@/lib/portfolio-meta";

const PORTFOLIO_DIR = "images/portfolio";
const PHOTO_RE = /^(\d+)\.(\d+)\.(jpe?g|png|webp|avif)$/i;
const VIDEO_RE = /^(\d+)\.video\.(mp4|webm|mov)$/i;

type Draft = { photos: { index: number; file: string }[]; video?: string };

/** Собирает проекты из файлов `N.video.mp4` и `N.1.jpg`, `N.2.jpg`… в public/images/portfolio. */
export function getPortfolioWorks(): PortfolioWork[] {
  const files = readdirSync(path.join(process.cwd(), "public", PORTFOLIO_DIR));
  const drafts = new Map<number, Draft>();
  const draftOf = (id: number) => {
    const draft = drafts.get(id) ?? { photos: [] };
    drafts.set(id, draft);
    return draft;
  };

  for (const file of files) {
    const photo = PHOTO_RE.exec(file);
    if (photo) {
      draftOf(Number(photo[1])).photos.push({ index: Number(photo[2]), file });
      continue;
    }
    const video = VIDEO_RE.exec(file);
    if (video) draftOf(Number(video[1])).video = file;
  }

  const url = (file: string) => withBasePath(`/${PORTFOLIO_DIR}/${file}`);

  return [...drafts]
    .map(([id, { photos, video }]) => ({
      id,
      ...(portfolioMeta[id] ?? { title: `Проект ${id}`, ...fallbackMeta }),
      photos: photos.sort((a, b) => a.index - b.index).map(({ file }) => url(file)),
      video: video ? url(video) : undefined,
    }))
    .sort((a, b) => compareWorks(b, a));
}
