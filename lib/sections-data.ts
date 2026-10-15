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
    photos: ["/images/portfolio/6.1.jpg", "/images/portfolio/9.1.jpg", "/images/portfolio/10.1.jpg"],
  },
  {
    icon: LayoutGrid,
    photos: ["/images/portfolio/4.1.jpg", "/images/portfolio/4.2.jpg", "/images/portfolio/6.2.jpg"],
  },
  {
    icon: Signpost,
    photos: ["/images/portfolio/1.2.jpg", "/images/portfolio/5.2.jpg", "/images/portfolio/11.1.jpg"],
  },
  {
    icon: SquareDashedBottom,
    photos: ["/images/portfolio/10.2.jpg", "/images/portfolio/7.1.jpg", "/images/portfolio/7.2.jpg"],
  },
  {
    icon: Boxes,
    photos: ["/images/portfolio/12.2.jpg", "/images/portfolio/8.1.jpg", "/images/portfolio/9.2.jpg"],
  },
  {
    icon: Sparkles,
    photos: ["/images/portfolio/2.1.jpg", "/images/portfolio/3.3.jpg", "/images/portfolio/1.3.jpg"],
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
  { icon: Recycle, background: "/images/layout_details.jpg" },
];

export type ProcessVisual = {
  icon: LucideIcon;
  number: string;
  image: string;
};

export const processVisuals: readonly ProcessVisual[] = [
  { icon: MessageSquareText, number: "01", image: "/images/Owner/Professional_Call.webp" },
  { icon: Calculator, number: "02", image: "/images/layout.webp" },
  { icon: Cog, number: "03", image: "/images/Cutting.jpg" },
  { icon: Truck, number: "04", image: "/images/transportation.webp" },
];
