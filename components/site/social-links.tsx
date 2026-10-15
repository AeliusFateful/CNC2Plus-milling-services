"use client";

import { Camera, MessageCircle, Send } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { getSocialLinks } from "@/lib/social-links";

export const SOCIAL_ICONS: Record<string, typeof Send> = {
  WhatsApp: MessageCircle,
  Telegram: Send,
  Instagram: Camera,
};

export function SocialLinks({ className }: { className?: string }) {
  const { t } = useI18n();
  const labels = t.social as Record<string, string>;

  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {getSocialLinks().map((link) => {
        const Icon = SOCIAL_ICONS[link.name] ?? MessageCircle;
        return (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={labels[link.name]}
              title={labels[link.name]}
              className="flex size-10 items-center justify-center rounded-md border-[0.5px] border-primary/40 bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
