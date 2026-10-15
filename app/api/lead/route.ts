import { type NextRequest, NextResponse } from "next/server";
import { messengerNames } from "@/lib/social-links";

// Ошибки, которые видит посетитель, — на языке сайта; сообщение в Telegram всегда на русском.
const messages = {
  ru: {
    consent: "Подтвердите согласие на сбор и обработку персональных данных",
    name: "Укажите имя",
    phone: "Укажите корректный телефон",
    commentTooLong: "Комментарий слишком длинный",
    messenger: "Выберите соцсеть, в которую вам написать",
    usernameTooLong: "Юзернейм слишком длинный",
    unavailable: "Форма временно недоступна. Свяжитесь с нами напрямую.",
    failed: "Не удалось отправить заявку",
    generic: "Что-то пошло не так",
  },
  kk: {
    consent: "Дербес деректерді жинауға және өңдеуге келісімді растаңыз",
    name: "Атыңызды көрсетіңіз",
    phone: "Дұрыс телефон нөмірін көрсетіңіз",
    commentTooLong: "Пікір тым ұзын",
    messenger: "Сізге жазу керек әлеуметтік желіні таңдаңыз",
    usernameTooLong: "Пайдаланушы аты тым ұзын",
    unavailable: "Форма уақытша қолжетімсіз. Бізбен тікелей байланысыңыз.",
    failed: "Өтінімді жіберу мүмкін болмады",
    generic: "Бірдеңе дұрыс болмады",
  },
} as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

type Lead = {
  name: string;
  phone: string;
  service: string;
  comment: string;
  messenger: string;
  username: string;
};

function buildTelegramText({
  name,
  phone,
  service,
  comment,
  messenger,
  username,
}: Lead) {
  const lines = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> +${phone.replace(/\D/g, "")}`,
  ];
  // Instagram без юзернейма бесполезен, поэтому его не указываем; WhatsApp и Telegram — всегда.
  if (messenger && (username || messenger !== "Instagram")) {
    lines.push(`<b>Написать в:</b> ${escapeHtml(messenger)}`);
  }
  if (messenger && username) {
    lines.push(`<b>Юзернейм:</b> @${escapeHtml(username)}`);
  }
  if (service) lines.push(`<b>Услуга:</b> ${escapeHtml(service)}`);
  if (comment) lines.push(`<b>Комментарий:</b> ${escapeHtml(comment)}`);
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const msg = messages[body.lang === "kk" ? "kk" : "ru"];
    const lead: Lead = {
      name: asTrimmedString(body.name),
      phone: asTrimmedString(body.phone),
      service: asTrimmedString(body.service),
      comment: asTrimmedString(body.comment),
      messenger: asTrimmedString(body.messenger),
      username: asTrimmedString(body.username).replace(/^@+/, ""),
    };

    if (body.consent !== true) {
      return NextResponse.json(
        { error: msg.consent },
        { status: 400 },
      );
    }
    if (!lead.name || lead.name.length > 100) {
      return NextResponse.json({ error: msg.name }, { status: 400 });
    }
    const phoneDigits = lead.phone.replace(/\D/g, "").length;
    if (lead.phone.length > 30 || phoneDigits < 10 || phoneDigits > 15) {
      return NextResponse.json(
        { error: msg.phone },
        { status: 400 },
      );
    }
    if (lead.comment.length > 2000) {
      return NextResponse.json(
        { error: msg.commentTooLong },
        { status: 400 },
      );
    }

    if (
      (lead.username || lead.messenger) &&
      !(messengerNames as readonly string[]).includes(lead.messenger)
    ) {
      return NextResponse.json(
        { error: msg.messenger },
        { status: 400 },
      );
    }
    if (lead.username.length > 64) {
      return NextResponse.json(
        { error: msg.usernameTooLong },
        { status: 400 },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram env vars are not configured");
      return NextResponse.json(
        { error: msg.unavailable },
        { status: 503 },
      );
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildTelegramText(lead),
          parse_mode: "HTML",
        }),
      },
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error("Telegram API error:", errorData);
      return NextResponse.json(
        { error: msg.failed },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: messages.ru.generic }, { status: 500 });
  }
}
