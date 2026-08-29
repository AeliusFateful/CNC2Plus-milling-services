import { type NextRequest, NextResponse } from "next/server";

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
};

function buildTelegramText({ name, phone, service, comment }: Lead) {
  const lines = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
  ];
  if (service) lines.push(`<b>Услуга:</b> ${escapeHtml(service)}`);
  if (comment) lines.push(`<b>Комментарий:</b> ${escapeHtml(comment)}`);
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead: Lead = {
      name: asTrimmedString(body.name),
      phone: asTrimmedString(body.phone),
      service: asTrimmedString(body.service),
      comment: asTrimmedString(body.comment),
    };

    if (!lead.name || lead.name.length > 100) {
      return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
    }
    if (!lead.phone || lead.phone.length > 30) {
      return NextResponse.json({ error: "Укажите телефон" }, { status: 400 });
    }
    if (lead.comment.length > 1000) {
      return NextResponse.json(
        { error: "Комментарий слишком длинный" },
        { status: 400 },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram env vars are not configured");
      return NextResponse.json(
        { error: "Форма временно недоступна. Свяжитесь с нами напрямую." },
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
        { error: "Не удалось отправить заявку" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: "Что-то пошло не так" }, { status: 500 });
  }
}
