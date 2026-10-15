import { phones } from "@/lib/site-config";

const PHONE_DIGITS = phones.href.replace(/\D/g, "");

/** Заранее подставленный текст сообщения: всегда на русском, независимо от языка сайта. */
const GREETING = encodeURIComponent("Здравствуйте!\nПишу с вашего сайта.");

export const socialLinks = [
  {
    name: "WhatsApp",
    href: `https://api.whatsapp.com/send/?phone=${PHONE_DIGITS}&text=${GREETING}&type=phone_number&app_absent=0`,
  },
  { name: "Telegram", href: `https://t.me/+${PHONE_DIGITS}?text=${GREETING}` },
  { name: "Instagram", href: "https://www.instagram.com/cnc2plus/" },
] as const;

export const messengerNames = ["WhatsApp", "Instagram", "Telegram"] as const;

export type MessengerName = (typeof messengerNames)[number];
