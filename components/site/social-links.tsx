import { Camera, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/lib/social-links";

const ICONS: Record<string, typeof Send> = {
  WhatsApp: MessageCircle,
  Telegram: Send,
  Instagram: Camera,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {socialLinks.map((link) => {
        const Icon = ICONS[link.name] ?? MessageCircle;
        return (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              title={link.label}
              className="flex size-10 items-center justify-center rounded-md border border-border/60 bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
