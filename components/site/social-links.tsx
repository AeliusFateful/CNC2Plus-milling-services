"use client";

import { Camera, MessageCircle, Send, type LucideIcon } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { socialLinks, type MessengerName } from "@/lib/social-links";

export const SOCIAL_ICONS: Record<MessengerName, LucideIcon> = {
  WhatsApp: MessageCircle,
  Telegram: Send,
  Instagram: Camera,
};

export function SocialLinks({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {socialLinks.map(({ name, href }) => {
        const Icon = SOCIAL_ICONS[name];
        return (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={t.social[name]}
              title={t.social[name]}
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
