import {
  LayoutGrid,
  Signpost,
  Sofa,
  SquareDashedBottom,
  Boxes,
  Sparkles,
  Clock,
  ShieldCheck,
  Recycle,
  Award,
  MessageSquareText,
  Calculator,
  Cog,
  Truck,
  type LucideIcon,
} from "lucide-react";

/**
 * Здесь только то, что не зависит от языка: иконки, фото и порядок.
 * Тексты (по тому же порядку) лежат в словарях lib/i18n.
 */

export type ServiceVisual = {
  icon: LucideIcon;
  /** Три фото из портфолио для коллажа на фоне карточки. */
  photos: readonly [string, string, string];
};

export const serviceVisuals: readonly ServiceVisual[] = [
  {
    icon: Sofa,
    photos: ["/images/portfolio/21.1.webp", "/images/portfolio/20.2.webp", "/images/portfolio/19.1.webp"],
  },
  {
    icon: LayoutGrid,
    photos: ["/images/portfolio/4.1.webp", "/images/portfolio/16.1.webp", "/images/portfolio/23.3.webp"],
  },
  {
    icon: Signpost,
    photos: ["/images/portfolio/1.2.webp", "/images/portfolio/5.2.webp", "/images/portfolio/15.2.webp"],
  },
  {
    icon: SquareDashedBottom,
    photos: ["/images/portfolio/26.1.webp", "/images/portfolio/19.2.webp", "/images/portfolio/7.2.webp"],
  },
  {
    icon: Boxes,
    photos: ["/images/portfolio/12.2.webp", "/images/portfolio/18.1.webp", "/images/portfolio/9.2.webp"],
  },
  {
    icon: Sparkles,
    photos: ["/images/portfolio/2.1.webp", "/images/portfolio/8.2.webp", "/images/portfolio/1.2.webp"],
  },
];

export type AdvantageVisual = {
  icon: LucideIcon;
  /** Фото на фоне слайда (только в слайдере на десктопе). */
  background?: string;
};

export const advantageVisuals: readonly AdvantageVisual[] = [
  { icon: ShieldCheck, background: "/images/advantages/handshake.webp" },
  { icon: Award, background: "/images/Owner/Boss_CNC.webp" },
  { icon: Clock, background: "/images/advantages/supervisor.webp" },
  { icon: Recycle, background: "/images/layout_details.webp" },
];

export type ProcessVisual = {
  icon: LucideIcon;
  number: string;
  image: string;
};

export const processVisuals: readonly ProcessVisual[] = [
  { icon: MessageSquareText, number: "01", image: "/images/Owner/Professional_Call.webp" },
  { icon: Calculator, number: "02", image: "/images/layout.webp" },
  { icon: Cog, number: "03", image: "/images/cutting.webp" },
  { icon: Truck, number: "04", image: "/images/transportation.webp" },
];
