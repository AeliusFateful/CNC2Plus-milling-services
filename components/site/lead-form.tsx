"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { SOCIAL_ICONS, SocialLinks } from "@/components/site/social-links";
import { WorkSchedule } from "@/components/site/work-schedule";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldTitle,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { phones } from "@/lib/site-config";
import { formatPhone, isPhoneComplete, isPhoneEmpty } from "@/lib/phone";
import { messengerNames, type MessengerName } from "@/lib/social-links";

const SERVICE_OPTIONS = [
  "Мебельные фасады",
  "Декоративные панели",
  "Вывески и таблички",
  "Перегородки и решётки",
  "Упаковка и тара",
  "Другое",
] as const;

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [messenger, setMessenger] = useState<MessengerName>(messengerNames[0]);
  const [username, setUsername] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError("Подтвердите согласие с политикой конфиденциальности");
      return;
    }
    if (name.trim().length === 0) {
      setError("Укажите ваше имя");
      return;
    }
    if (!isPhoneComplete(phone)) {
      setError("Укажите корректный телефон");
      return;
    }
    const cleanUsername = username.trim().replace(/^@+/, "");

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service,
          comment,
          messenger: cleanUsername ? messenger : null,
          username: cleanUsername,
          consent,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Не удалось отправить заявку");
      }

      setStatus("success");
      toast.success("Заявка отправлена", {
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      setName("");
      setPhone("");
      setService(null);
      setComment("");
      setMessenger(messengerNames[0]);
      setUsername("");
      setConsent(false);
    } catch (err) {
      setStatus("error");
      const message =
        err instanceof Error ? err.message : "Что-то пошло не так";
      setError(message);
      toast.error(message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col self-center rounded-md border border-border/60 bg-card p-6 md:p-8"
    >
      <FieldGroup className="gap-7">
        <Field>
          <FieldLabel htmlFor="name">Имя</FieldLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как вас зовут"
            autoComplete="name"
            maxLength={100}
            minLength={2}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Телефон</FieldLabel>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => {
              const deleting = (
                e.nativeEvent as InputEvent
              ).inputType?.startsWith("delete");
              setPhone(formatPhone(e.target.value, phone, Boolean(deleting)));
            }}
            onFocus={() => {
              if (!phone) setPhone(formatPhone("", "", false));
            }}
            onBlur={() => {
              if (isPhoneEmpty(phone)) setPhone("");
            }}
            onPaste={(e) => {
              e.preventDefault();
              setPhone(formatPhone(e.clipboardData.getData("text"), "", false));
            }}
            placeholder="+7 (___) ___-__-__"
            autoComplete="tel"
            maxLength={18}
            autoCapitalize="none"
            autoCorrect="off"
          />
        </Field>

        <Field aria-labelledby="messenger-title" className="gap-3">
          <FieldTitle id="messenger-title">Куда вам лучше написать</FieldTitle>
          <div className="flex flex-wrap gap-2">
            {messengerNames.map((item) => {
              const Icon = SOCIAL_ICONS[item];
              const selected = messenger === item;
              return (
                <Button
                  key={item}
                  type="button"
                  size="lg"
                  variant={selected ? "solid" : "outline"}
                  aria-pressed={selected}
                  onClick={() => setMessenger(item)}
                  className="min-w-fit flex-1"
                >
                  <Icon data-icon="inline-start" />
                  {item}
                </Button>
              );
            })}
          </div>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username (необязательно)"
            aria-label="Юзернейм в выбранной соцсети (необязательно)"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            maxLength={64}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="service">Услуга</FieldLabel>
          <Select
            value={service}
            onValueChange={(value) => setService(value as string)}
          >
            <SelectTrigger id="service" className="w-full">
              <SelectValue placeholder="Выберите услугу" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="comment">Комментарий</FieldLabel>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Расскажите о задаче: материал, размеры, чертёж"
            rows={4}
            className="min-h-40"
            maxLength={2000}
          />
        </Field>

        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
          />
          <span>
            Я согласен с{" "}
            <Link
              href="/privacy"
              target="_blank"
              className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
              политикой конфиденциальности
            </Link>
          </span>
        </label>

        {error && (
          <Field data-invalid>
            <FieldError>{error}</FieldError>
          </Field>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={status === "loading" || !consent}
          className="w-full"
        >
          {status === "loading" ? (
            <Loader2 data-icon="inline-start" className="animate-spin" />
          ) : (
            <Send data-icon="inline-start" />
          )}
          Отправить заявку
        </Button>
      </FieldGroup>
    </form>
  );
}

export function ContactDetails() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        eyebrow="Контакты"
        title="Обсудим ваш проект"
        description="Оставьте заявку - рассчитаем стоимость и сроки в течение рабочего дня. Или свяжитесь с нами напрямую."
        className="max-w-xl"
      />

      <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
        <div className="flex flex-col gap-4">
          <a
            href={`tel:${phones.href}`}
            className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
          >
            <span className="flex size-10 items-center justify-center rounded-md border border-border/60 bg-card">
              <Phone className="size-4 text-primary" />
            </span>
            {phones.display}
          </a>
          <SocialLinks />
        </div>
        <WorkSchedule />
      </div>
    </div>
  );
}
