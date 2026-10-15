const PHONE = "77471092524";

/** Заранее подставленный текст сообщения: всегда на русском, независимо от языка сайта. */
const GREETING = "Здравствуйте!\nПишу с вашего сайта.";

export function getSocialLinks() {
  const text = encodeURIComponent(GREETING);
  return [
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send/?phone=${PHONE}&text=${text}&type=phone_number&app_absent=0`,
    },
    { name: "Telegram", href: `https://t.me/+${PHONE}?text=${text}` },
    { name: "Instagram", href: "https://www.instagram.com/cnc2plus/" },
  ] as const;
}

export const messengerNames = ["WhatsApp", "Instagram", "Telegram"] as const;

export type MessengerName = (typeof messengerNames)[number];
